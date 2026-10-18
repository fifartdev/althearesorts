<?php
/**
 * Read API for the Next.js site: namespace althea/v1.
 *
 * Responses are shaped for direct use by the frontend: translated fields become { en, el },
 * images become { id, url, width, height, alt }, page groups become arrays. Only published
 * content is returned. Writes go through the core /wp/v2 endpoints.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'rest_api_init', 'althea_register_routes' );

function althea_register_routes() {
	$public = '__return_true';

	register_rest_route( 'althea/v1', '/schema', array(
		'methods'             => 'GET',
		'permission_callback' => $public,
		'callback'            => function () {
			return array( 'pluginVersion' => ALTHEA_CMS_VERSION, 'schema' => althea_schema() );
		},
	) );

	register_rest_route( 'althea/v1', '/settings', array(
		'methods'             => 'GET',
		'permission_callback' => $public,
		'callback'            => 'althea_rest_settings',
	) );

	register_rest_route( 'althea/v1', '/pages/(?P<slug>[a-z0-9-]+)', array(
		'methods'             => 'GET',
		'permission_callback' => $public,
		'callback'            => 'althea_rest_page',
	) );

	register_rest_route( 'althea/v1', '/items/(?P<type>[a-z_]+)', array(
		'methods'             => 'GET',
		'permission_callback' => $public,
		'callback'            => 'althea_rest_items',
	) );

	register_rest_route( 'althea/v1', '/terms/(?P<taxonomy>[a-z_]+)', array(
		'methods'             => 'GET',
		'permission_callback' => $public,
		'callback'            => 'althea_rest_terms',
	) );

	// Used by the migration script to find media it uploaded before (idempotent re-runs).
	register_rest_route( 'althea/v1', '/media-index', array(
		'methods'             => 'GET',
		'permission_callback' => function () {
			return current_user_can( 'upload_files' );
		},
		'callback'            => 'althea_rest_media_index',
	) );
}

/**
 * @return array|null { id, url, width, height, alt, mime } or null if the attachment is missing.
 */
function althea_media( $id ) {
	$id = (int) $id;
	if ( $id <= 0 || 'attachment' !== get_post_type( $id ) ) {
		return null;
	}
	$meta = wp_get_attachment_metadata( $id );
	return array(
		'id'     => $id,
		'url'    => wp_get_attachment_url( $id ),
		'width'  => isset( $meta['width'] ) ? (int) $meta['width'] : null,
		'height' => isset( $meta['height'] ) ? (int) $meta['height'] : null,
		'alt'    => (string) get_post_meta( $id, '_wp_attachment_image_alt', true ),
		'mime'   => get_post_mime_type( $id ),
	);
}

/**
 * Converts a stored value to its API form.
 */
function althea_output_value( $type, $value ) {
	switch ( $type ) {
		case 'image':
			return althea_media( $value );
		case 'images':
			return array_values( array_filter( array_map( 'althea_media', (array) $value ) ) );
		case 'bool':
			return (bool) $value;
		case 'number':
			return (int) $value;
		default:
			return (string) $value;
	}
}

/**
 * Reads one field through $get( storageKey ) and returns its value, or { en, el } if translated.
 */
function althea_output_field( array $field, $key_fn, $get, $page_locales = null ) {
	$locales = althea_field_locales( $field, $page_locales );
	if ( array( null ) === $locales ) {
		return althea_output_value( $field['type'], $get( call_user_func( $key_fn, $field['key'], null ) ) );
	}
	$out = array();
	foreach ( $locales as $locale ) {
		$out[ $locale ] = althea_output_value( $field['type'], $get( call_user_func( $key_fn, $field['key'], $locale ) ) );
	}
	return $out;
}

function althea_rest_settings() {
	$stored = get_option( 'althea_settings', array() );
	$get    = function ( $key ) use ( $stored ) {
		return isset( $stored[ $key ] ) ? $stored[ $key ] : '';
	};
	$out = array();
	foreach ( althea_settings_fields() as $field ) {
		$out[ $field['key'] ] = althea_output_field( $field, 'althea_meta_key', $get );
	}
	return $out;
}

function althea_find_post( $post_type, $slug ) {
	$posts = get_posts( array(
		'post_type'      => $post_type,
		'name'           => $slug,
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'no_found_rows'  => true,
	) );
	return $posts ? $posts[0] : null;
}

function althea_rest_page( WP_REST_Request $request ) {
	$slug     = $request['slug'];
	$template = althea_page_template( $slug );
	if ( ! $template ) {
		return new WP_Error( 'althea_unknown_page', 'No template for this page.', array( 'status' => 404 ) );
	}
	$post = althea_find_post( 'althea_page', $slug );
	if ( ! $post ) {
		return new WP_Error( 'althea_page_not_found', 'Page has not been created yet.', array( 'status' => 404 ) );
	}

	$content      = (array) get_post_meta( $post->ID, 'althea_content', true );
	$page_locales = isset( $template['locales'] ) ? $template['locales'] : null;
	$sections     = array();

	foreach ( $template['sections'] as $section ) {
		$stored = isset( $content[ $section['key'] ] ) ? (array) $content[ $section['key'] ] : array();
		$get    = function ( $key ) use ( $stored ) {
			return isset( $stored[ $key ] ) ? $stored[ $key ] : '';
		};
		$out = array();
		foreach ( $section['fields'] as $field ) {
			if ( 'group' === $field['type'] ) {
				$items = array();
				for ( $i = 0; $i < (int) $field['count']; $i++ ) {
					$item = array();
					foreach ( $field['fields'] as $sub ) {
						$prefix              = $field['key'] . '.' . $i . '.';
						$item[ $sub['key'] ] = althea_output_field(
							$sub,
							function ( $key, $locale ) use ( $prefix ) {
								return althea_leaf_key( $prefix . $key, $locale );
							},
							$get,
							$page_locales
						);
					}
					$items[] = $item;
				}
				$out[ $field['key'] ] = $items;
				continue;
			}
			$out[ $field['key'] ] = althea_output_field( $field, 'althea_leaf_key', $get, $page_locales );
		}
		$sections[ $section['key'] ] = $out;
	}

	return array(
		'slug'     => $slug,
		'modified' => mysql_to_rfc3339( $post->post_modified_gmt ),
		'sections' => $sections,
	);
}

/**
 * Terms of a taxonomy with their meta, ordered by sort_order then name.
 */
function althea_terms_output( $taxonomy, $terms ) {
	$def = althea_schema()['taxonomies'][ $taxonomy ];
	$out = array();
	foreach ( (array) $terms as $term ) {
		$item = array( 'id' => $term->term_id, 'slug' => $term->slug, 'name' => $term->name );
		foreach ( $def['fields'] as $field ) {
			$item[ $field['key'] ] = althea_output_value( $field['type'], get_term_meta( $term->term_id, $field['key'], true ) );
		}
		$out[] = $item;
	}
	usort( $out, function ( $a, $b ) {
		$order = (int) $a['sort_order'] - (int) $b['sort_order'];
		return 0 !== $order ? $order : strcmp( $a['name'], $b['name'] );
	} );
	return $out;
}

function althea_rest_terms( WP_REST_Request $request ) {
	$taxonomy = $request['taxonomy'];
	if ( empty( althea_schema()['taxonomies'][ $taxonomy ] ) ) {
		return new WP_Error( 'althea_unknown_taxonomy', 'Unknown taxonomy.', array( 'status' => 404 ) );
	}
	return althea_terms_output( $taxonomy, get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => false ) ) );
}

function althea_rest_items( WP_REST_Request $request ) {
	$type   = $request['type'];
	$schema = althea_schema();
	if ( empty( $schema['postTypes'][ $type ] ) || 'althea_page' === $type ) {
		return new WP_Error( 'althea_unknown_type', 'Unknown content type.', array( 'status' => 404 ) );
	}
	$def   = $schema['postTypes'][ $type ];
	$posts = get_posts( array(
		'post_type'      => $type,
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => array( 'menu_order' => 'ASC', 'ID' => 'ASC' ),
		'no_found_rows'  => true,
	) );

	$items = array();
	foreach ( $posts as $post ) {
		$get    = function ( $key ) use ( $post ) {
			return get_post_meta( $post->ID, $key, true );
		};
		$fields = array();
		foreach ( $def['fields'] as $field ) {
			$fields[ $field['key'] ] = althea_output_field( $field, 'althea_meta_key', $get );
		}
		$terms = array();
		foreach ( isset( $def['taxonomies'] ) ? $def['taxonomies'] : array() as $taxonomy ) {
			$terms[ $taxonomy ] = althea_terms_output( $taxonomy, get_the_terms( $post, $taxonomy ) ?: array() );
		}
		$items[] = array(
			'id'         => $post->ID,
			'slug'       => $post->post_name,
			'title'      => $post->post_title,
			'excerpt'    => $post->post_excerpt,
			'menuOrder'  => (int) $post->menu_order,
			'modified'   => mysql_to_rfc3339( $post->post_modified_gmt ),
			'image'      => althea_media( get_post_thumbnail_id( $post ) ),
			'fields'     => $fields,
			'terms'      => $terms,
		);
	}
	return $items;
}

function althea_rest_media_index() {
	$ids = get_posts( array(
		'post_type'      => 'attachment',
		'post_status'    => 'inherit',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'meta_key'       => '_althea_source_hash', // phpcs:ignore WordPress.DB.SlowDBQuery
		'no_found_rows'  => true,
	) );
	$out = array();
	foreach ( $ids as $id ) {
		$out[] = array(
			'id'     => (int) $id,
			'source' => get_post_meta( $id, '_althea_source', true ),
			'hash'   => get_post_meta( $id, '_althea_source_hash', true ),
			'url'    => wp_get_attachment_url( $id ),
			'alt'    => (string) get_post_meta( $id, '_wp_attachment_image_alt', true ),
		);
	}
	return $out;
}
