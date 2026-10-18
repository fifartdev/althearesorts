<?php
/**
 * Contact-form submissions sent by the website (POST /wp/v2/althea-submissions, status "private").
 *
 * The website writes them as a dedicated user with the "althea_forms" role, which can only create
 * submissions. Administrators and editors can read and manage them under Althea → Form submissions.
 */

defined( 'ABSPATH' ) || exit;

const ALTHEA_SUBMISSION_CAPS_VERSION = 1;

function althea_submission_caps( $all ) {
	$own = array( 'edit_althea_submissions', 'publish_althea_submissions', 'edit_private_althea_submissions', 'read_private_althea_submissions' );
	if ( ! $all ) {
		return $own;
	}
	return array_merge( $own, array(
		'edit_others_althea_submissions',
		'edit_published_althea_submissions',
		'delete_althea_submissions',
		'delete_others_althea_submissions',
		'delete_private_althea_submissions',
		'delete_published_althea_submissions',
	) );
}

// Roles and capabilities are stored in the database, so set them up once (and again when this changes).
add_action( 'init', function () {
	if ( (int) get_option( 'althea_submission_caps' ) === ALTHEA_SUBMISSION_CAPS_VERSION ) {
		return;
	}
	remove_role( 'althea_forms' );
	add_role( 'althea_forms', 'Althea website (form submissions)', array_fill_keys( array_merge( array( 'read' ), althea_submission_caps( false ) ), true ) );
	foreach ( array( 'administrator', 'editor' ) as $name ) {
		$role = get_role( $name );
		if ( $role ) {
			foreach ( althea_submission_caps( true ) as $cap ) {
				$role->add_cap( $cap );
			}
		}
	}
	update_option( 'althea_submission_caps', ALTHEA_SUBMISSION_CAPS_VERSION );
}, 30 );

// The forms user only ever creates private submissions.
add_filter( 'rest_pre_insert_althea_submission', function ( $prepared ) {
	$prepared->post_status = 'private';
	return $prepared;
} );

// List screen: show who, what and status at a glance.
add_filter( 'manage_althea_submission_posts_columns', function ( $columns ) {
	$date = $columns['date'] ?? null;
	unset( $columns['date'] );
	$columns['althea_email'] = 'Email';
	$columns['althea_type']  = 'Type';
	$columns['althea_state'] = 'Status';
	if ( $date ) {
		$columns['date'] = $date;
	}
	return $columns;
} );
add_action( 'manage_althea_submission_posts_custom_column', function ( $column, $post_id ) {
	$map = array( 'althea_email' => 'email', 'althea_type' => 'form_type', 'althea_state' => 'state' );
	if ( isset( $map[ $column ] ) ) {
		echo esc_html( (string) get_post_meta( $post_id, $map[ $column ], true ) );
	}
}, 10, 2 );
