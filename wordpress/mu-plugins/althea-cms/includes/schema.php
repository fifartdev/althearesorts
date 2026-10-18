<?php
/**
 * Loads schema.json (the single definition of every content type and field, shared with the
 * Next.js data layer and migration script) and provides helpers to walk it.
 */

defined( 'ABSPATH' ) || exit;

/**
 * @return array The decoded schema.json.
 */
function althea_schema() {
	static $schema = null;
	if ( null === $schema ) {
		$json   = file_get_contents( ALTHEA_CMS_DIR . '/schema.json' );
		$schema = json_decode( $json, true );
		if ( ! is_array( $schema ) ) {
			$schema = array( 'locales' => array( 'en', 'el' ), 'settings' => array( 'groups' => array() ), 'postTypes' => array(), 'taxonomies' => array(), 'pages' => array(), 'pageSeo' => array() );
		}
	}
	return $schema;
}

function althea_locales() {
	return althea_schema()['locales'];
}

/**
 * Locales a field is stored in. Returns array( null ) for a field that is not translated.
 *
 * @param array      $field        Field definition.
 * @param array|null $page_locales Locales the containing page is limited to (e.g. legal pages are EN only).
 */
function althea_field_locales( array $field, $page_locales = null ) {
	if ( ! empty( $field['locales'] ) ) {
		$locales = $field['locales'];
	} elseif ( ! empty( $field['l'] ) ) {
		$locales = althea_locales();
	} else {
		return array( null );
	}
	if ( is_array( $page_locales ) ) {
		$locales = array_values( array_intersect( $locales, $page_locales ) );
	}
	return $locales;
}

/**
 * Storage key for a field in a locale: "key_en" for post/term meta and settings.
 */
function althea_meta_key( $key, $locale ) {
	return null === $locale ? $key : $key . '_' . $locale;
}

/**
 * Storage key inside the althea_content object of a site page: "key.en", "stats.0.label.en".
 */
function althea_leaf_key( $key, $locale ) {
	return null === $locale ? $key : $key . '.' . $locale;
}

/**
 * Maps a schema field type to the stored PHP/REST type.
 */
function althea_storage_type( $type ) {
	switch ( $type ) {
		case 'image':
		case 'number':
			return 'integer';
		case 'images':
			return 'array';
		case 'bool':
			return 'boolean';
		default:
			return 'string';
	}
}

function althea_post_type_names() {
	return array_keys( althea_schema()['postTypes'] );
}

/**
 * All settings fields, flattened across groups.
 */
function althea_settings_fields() {
	$fields = array();
	foreach ( althea_schema()['settings']['groups'] as $group ) {
		foreach ( $group['fields'] as $field ) {
			$fields[] = $field;
		}
	}
	return $fields;
}

/**
 * Template for a site page slug, with the SEO section appended. Null if the slug has no template.
 */
function althea_page_template( $slug ) {
	$schema = althea_schema();
	if ( empty( $schema['pages'][ $slug ] ) ) {
		return null;
	}
	$template = $schema['pages'][ $slug ];
	if ( 'shared' !== $slug ) {
		$template['sections'][] = array(
			'key'    => 'seo',
			'label'  => 'SEO',
			'fields' => $schema['pageSeo'],
		);
	}
	return $template;
}

/**
 * Every leaf of a page template: array of [ section, leafKey, field ]. Group fields are expanded
 * to "group.<index>.<sub>" so a page's content is a flat map of strings per section.
 */
function althea_page_leaves( array $template ) {
	$page_locales = isset( $template['locales'] ) ? $template['locales'] : null;
	$leaves       = array();
	foreach ( $template['sections'] as $section ) {
		foreach ( $section['fields'] as $field ) {
			if ( 'group' === $field['type'] ) {
				for ( $i = 0; $i < (int) $field['count']; $i++ ) {
					foreach ( $field['fields'] as $sub ) {
						foreach ( althea_field_locales( $sub, $page_locales ) as $locale ) {
							$leaves[] = array( $section['key'], althea_leaf_key( $field['key'] . '.' . $i . '.' . $sub['key'], $locale ), $sub );
						}
					}
				}
				continue;
			}
			foreach ( althea_field_locales( $field, $page_locales ) as $locale ) {
				$leaves[] = array( $section['key'], althea_leaf_key( $field['key'], $locale ), $field );
			}
		}
	}
	return $leaves;
}
