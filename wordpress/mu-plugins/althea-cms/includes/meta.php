<?php
/**
 * Registers post meta, term meta and the settings option with REST schemas (show_in_rest),
 * so content can be written through the core /wp/v2 endpoints with an application password.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'althea_register_meta', 20 );

/**
 * Meta write permission: may the current user edit this post? (Falls back to edit_posts without
 * an object, e.g. term meta.) Works for types with their own capabilities, like submissions.
 */
function althea_can_edit( $allowed = false, $meta_key = '', $object_id = 0 ) {
	return $object_id ? current_user_can( 'edit_post', $object_id ) : current_user_can( 'edit_posts' );
}

/**
 * register_meta() arguments for a schema field.
 */
function althea_meta_args( array $field ) {
	$storage = althea_storage_type( $field['type'] );
	$args    = array(
		'type'              => $storage,
		'single'            => true,
		'show_in_rest'      => true,
		'auth_callback'     => 'althea_can_edit',
		'sanitize_callback' => function ( $value ) use ( $field ) {
			return althea_sanitize_value( $field['type'], $value, $field );
		},
	);
	if ( 'array' === $storage ) {
		$args['show_in_rest'] = array( 'schema' => array( 'type' => 'array', 'items' => array( 'type' => 'integer' ) ) );
		$args['default']      = array();
	} elseif ( 'boolean' === $storage ) {
		$args['default'] = false;
	} elseif ( 'integer' === $storage ) {
		$args['default'] = 0;
	} else {
		$args['default'] = '';
	}
	if ( 'select' === $field['type'] && ! empty( $field['options'] ) ) {
		$args['show_in_rest'] = array( 'schema' => array( 'type' => 'string', 'enum' => array_merge( array( '' ), $field['options'] ) ) );
	}
	return $args;
}

function althea_register_meta() {
	$schema = althea_schema();

	foreach ( $schema['postTypes'] as $post_type => $def ) {
		foreach ( $def['fields'] as $field ) {
			foreach ( althea_field_locales( $field ) as $locale ) {
				register_post_meta( $post_type, althea_meta_key( $field['key'], $locale ), althea_meta_args( $field ) );
			}
		}

		// Hash of the last payload written by scripts/migrate-to-wp.ts, so re-runs can skip unchanged items.
		register_post_meta(
			$post_type,
			'_althea_payload_hash',
			array(
				'type'          => 'string',
				'single'        => true,
				'show_in_rest'  => true,
				'default'       => '',
				'auth_callback' => 'althea_can_edit',
			)
		);
	}

	// Site pages keep all of their fields in one object: { section: { leafKey: string } }.
	register_post_meta(
		'althea_page',
		'althea_content',
		array(
			'type'              => 'object',
			'single'            => true,
			'default'           => array(),
			'auth_callback'     => 'althea_can_edit',
			'sanitize_callback' => 'althea_sanitize_page_content',
			'show_in_rest'      => array(
				'schema' => array(
					'type'                 => 'object',
					'additionalProperties' => array(
						'type'                 => 'object',
						'additionalProperties' => array( 'type' => 'string' ),
					),
				),
			),
		)
	);

	// Media uploaded by the migration script: original path in the Next.js repo and content hash.
	foreach ( array( '_althea_source', '_althea_source_hash' ) as $key ) {
		register_post_meta(
			'attachment',
			$key,
			array(
				'type'          => 'string',
				'single'        => true,
				'show_in_rest'  => true,
				'default'       => '',
				'auth_callback' => function () {
					return current_user_can( 'upload_files' );
				},
			)
		);
	}

	foreach ( $schema['taxonomies'] as $taxonomy => $def ) {
		foreach ( $def['fields'] as $field ) {
			register_term_meta( $taxonomy, $field['key'], althea_meta_args( $field ) );
		}
	}

	althea_register_settings();
}

/**
 * The settings option: one flat object of strings, e.g. { phone, site_tagline_en, nav_el, ... }.
 */
function althea_register_settings() {
	$properties = array();
	$defaults   = array();
	foreach ( althea_settings_fields() as $field ) {
		foreach ( althea_field_locales( $field ) as $locale ) {
			$key                = althea_meta_key( $field['key'], $locale );
			$properties[ $key ] = array( 'type' => 'string' );
			$defaults[ $key ]   = '';
		}
	}

	register_setting(
		'althea',
		'althea_settings',
		array(
			'type'              => 'object',
			'default'           => $defaults,
			'sanitize_callback' => 'althea_sanitize_settings',
			'show_in_rest'      => array(
				'schema' => array(
					'type'                 => 'object',
					'properties'           => $properties,
					'additionalProperties' => false,
				),
			),
		)
	);
}

function althea_sanitize_settings( $value ) {
	$value = (array) $value;
	$clean = array();
	foreach ( althea_settings_fields() as $field ) {
		foreach ( althea_field_locales( $field ) as $locale ) {
			$key           = althea_meta_key( $field['key'], $locale );
			$clean[ $key ] = isset( $value[ $key ] ) ? (string) althea_sanitize_value( $field['type'], $value[ $key ], $field ) : '';
		}
	}
	return $clean;
}
