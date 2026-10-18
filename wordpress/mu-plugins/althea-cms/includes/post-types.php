<?php
/**
 * Registers the custom post types and taxonomies defined in schema.json.
 * None of them are public on the WordPress site: they exist only for wp-admin and the REST API.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'althea_register_post_types', 5 );

function althea_register_post_types() {
	$schema = althea_schema();

	foreach ( $schema['postTypes'] as $name => $def ) {
		$supports   = isset( $def['supports'] ) ? $def['supports'] : array( 'title' );
		$supports[] = 'custom-fields'; // Required for registered meta to appear in the REST API.

		register_post_type(
			$name,
			array(
				'labels'              => array(
					'name'          => $def['label'],
					'singular_name' => $def['singular'],
					'add_new_item'  => 'Add ' . $def['singular'],
					'edit_item'     => 'Edit ' . $def['singular'],
					'all_items'     => $def['label'],
					'search_items'  => 'Search ' . $def['label'],
				),
				'public'              => false,
				'publicly_queryable'  => false,
				'exclude_from_search' => true,
				'show_ui'             => true,
				'show_in_menu'        => 'althea',
				'show_in_nav_menus'   => false,
				'show_in_rest'        => true,
				'rest_base'           => $def['restBase'],
				'menu_icon'           => isset( $def['icon'] ) ? $def['icon'] : null,
				'supports'            => $supports,
				'taxonomies'          => isset( $def['taxonomies'] ) ? $def['taxonomies'] : array(),
				'has_archive'         => false,
				'rewrite'             => false,
				'query_var'           => false,
				'map_meta_cap'        => true,
				'capability_type'     => isset( $def['capabilityType'] ) ? array( $def['capabilityType'], $def['capabilityType'] . 's' ) : 'post',
			)
		);
	}

	foreach ( $schema['taxonomies'] as $name => $def ) {
		register_taxonomy(
			$name,
			$def['postTypes'],
			array(
				'labels'            => array(
					'name'          => $def['label'],
					'singular_name' => $def['singular'],
					'add_new_item'  => 'Add ' . $def['singular'],
					'edit_item'     => 'Edit ' . $def['singular'],
				),
				'public'            => false,
				'show_ui'           => true,
				'show_admin_column' => true,
				'show_in_rest'      => true,
				'rest_base'         => $def['restBase'],
				'hierarchical'      => true, // Checkbox UI in the editor.
				'rewrite'           => false,
				'query_var'         => false,
			)
		);
	}
}

// Classic edit screens: the field meta boxes are plain HTML forms.
add_filter(
	'use_block_editor_for_post_type',
	function ( $use, $post_type ) {
		return in_array( $post_type, althea_post_type_names(), true ) ? false : $use;
	},
	10,
	2
);
