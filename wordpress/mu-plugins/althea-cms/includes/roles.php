<?php
/**
 * "Althea content manager" role: can update everything the website shows (all Althea content,
 * site pages, Althea settings, media, categories, form submissions), but not plugins, themes,
 * users or WordPress system settings. Core Posts, Comments and Tools, which the website does not
 * use, are hidden for it.
 *
 * Althea settings are guarded by their own capability (althea_manage_settings), held by
 * administrators and this role, instead of manage_options.
 */

defined( 'ABSPATH' ) || exit;

const ALTHEA_ROLES_VERSION = 1;

function althea_manager_caps() {
	$caps = array(
		'read',
		'upload_files',
		'manage_categories',
		'althea_manage_settings',
		// Althea content types use the "post" capabilities.
		'edit_posts',
		'edit_others_posts',
		'edit_published_posts',
		'edit_private_posts',
		'publish_posts',
		'read_private_posts',
		'delete_posts',
		'delete_others_posts',
		'delete_published_posts',
		'delete_private_posts',
	);
	return array_merge( $caps, althea_submission_caps( true ) );
}

// Roles are stored in the database: set them up once (and again when this changes).
add_action( 'init', function () {
	if ( (int) get_option( 'althea_roles' ) === ALTHEA_ROLES_VERSION ) {
		return;
	}
	remove_role( 'althea_manager' );
	add_role( 'althea_manager', 'Althea content manager', array_fill_keys( althea_manager_caps(), true ) );
	$admin = get_role( 'administrator' );
	if ( $admin ) {
		$admin->add_cap( 'althea_manage_settings' );
	}
	update_option( 'althea_roles', ALTHEA_ROLES_VERSION );
}, 30 );

// Saving the Althea settings form (options.php) needs althea_manage_settings, not manage_options.
add_filter( 'option_page_capability_althea', function () {
	return 'althea_manage_settings';
} );

function althea_is_manager() {
	return ! current_user_can( 'manage_options' ) && current_user_can( 'althea_manage_settings' );
}

// Hide the core screens the website does not use.
add_action( 'admin_menu', function () {
	if ( althea_is_manager() ) {
		remove_menu_page( 'edit.php' );          // Posts (the blog is Althea → Blog posts)
		remove_menu_page( 'edit-comments.php' ); // Comments
		remove_menu_page( 'tools.php' );         // Tools
	}
}, 999 );

add_action( 'admin_bar_menu', function ( $bar ) {
	if ( althea_is_manager() ) {
		$bar->remove_node( 'new-post' );
		$bar->remove_node( 'comments' );
	}
}, 999 );

// ...and block them if opened by URL.
add_action( 'current_screen', function ( $screen ) {
	if ( ! althea_is_manager() ) {
		return;
	}
	$blocked = in_array( $screen->base, array( 'edit-comments', 'comment', 'tools', 'import', 'export' ), true )
		|| ( in_array( $screen->base, array( 'edit', 'post' ), true ) && 'post' === $screen->post_type );
	if ( $blocked ) {
		wp_safe_redirect( admin_url( 'admin.php?page=althea' ) );
		exit;
	}
} );
