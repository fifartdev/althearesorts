<?php
/**
 * On-demand revalidation: when content changes, tell the Next.js site which cache tags to refresh.
 *
 * Tags (must match src/lib/wp/ in the Next.js repo):
 *   wp                 everything (media edits, manual "refresh all")
 *   wp:settings        the settings option
 *   wp:<post_type>     a content type, e.g. wp:althea_room
 *   wp:page:<slug>     one site page, e.g. wp:page:home
 *
 * Changes are collected during the request and sent once at shutdown, non-blocking.
 */

defined( 'ABSPATH' ) || exit;

function althea_revalidate_configured() {
	return defined( 'ALTHEA_REVALIDATE_URL' ) && defined( 'ALTHEA_REVALIDATE_SECRET' )
		&& ALTHEA_REVALIDATE_URL && ALTHEA_REVALIDATE_SECRET;
}

/**
 * Queues tags; the first call registers the shutdown sender.
 */
function althea_queue_revalidate( array $tags ) {
	static $queued = null;
	if ( null === $queued ) {
		$queued = array();
		add_action( 'shutdown', function () use ( &$queued ) {
			if ( $queued ) {
				althea_send_revalidate( array_keys( $queued ), false );
			}
		} );
	}
	foreach ( $tags as $tag ) {
		$queued[ $tag ] = true;
	}
}

/**
 * @param bool $blocking Wait for the response (used by the manual button to report the result).
 * @return array|WP_Error|null Response, error, or null when not configured.
 */
function althea_send_revalidate( array $tags, $blocking ) {
	if ( ! althea_revalidate_configured() ) {
		return null;
	}
	return wp_remote_post( ALTHEA_REVALIDATE_URL, array(
		'blocking' => $blocking,
		'timeout'  => $blocking ? 15 : 0.5,
		'headers'  => array(
			'Content-Type'      => 'application/json',
			'x-althea-secret'   => ALTHEA_REVALIDATE_SECRET,
		),
		'body'     => wp_json_encode( array( 'tags' => array_values( $tags ) ) ),
	) );
}

function althea_tags_for_post( $post ) {
	$post = get_post( $post );
	if ( ! $post ) {
		return array();
	}
	if ( 'attachment' === $post->post_type ) {
		return array( 'wp' );
	}
	if ( ! in_array( $post->post_type, althea_post_type_names(), true ) ) {
		return array();
	}
	if ( 'althea_page' === $post->post_type ) {
		// "shared" (header/footer/banners) appears on every page.
		return 'shared' === $post->post_name ? array( 'wp' ) : array( 'wp:page:' . $post->post_name );
	}
	return array( 'wp:' . $post->post_type );
}

add_action( 'save_post', function ( $post_id, $post ) {
	if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) || 'auto-draft' === $post->post_status ) {
		return;
	}
	althea_queue_revalidate( althea_tags_for_post( $post ) );
}, 10, 2 );

foreach ( array( 'before_delete_post', 'trashed_post', 'untrashed_post', 'edit_attachment', 'delete_attachment' ) as $althea_hook ) {
	add_action( $althea_hook, function ( $post_id ) {
		althea_queue_revalidate( althea_tags_for_post( $post_id ) );
	} );
}

// Alt text and other attachment meta edited from the media modal.
add_action( 'updated_post_meta', function ( $meta_id, $post_id, $meta_key ) {
	if ( '_wp_attachment_image_alt' === $meta_key ) {
		althea_queue_revalidate( array( 'wp' ) );
	}
}, 10, 3 );

add_action( 'update_option_althea_settings', function () {
	althea_queue_revalidate( array( 'wp:settings' ) );
} );

foreach ( array( 'created_term', 'edited_term', 'delete_term' ) as $althea_hook ) {
	add_action( $althea_hook, function ( $term_id, $tt_id, $taxonomy ) {
		$schema = althea_schema();
		if ( ! empty( $schema['taxonomies'][ $taxonomy ] ) ) {
			$tags = array();
			foreach ( $schema['taxonomies'][ $taxonomy ]['postTypes'] as $post_type ) {
				$tags[] = 'wp:' . $post_type;
			}
			althea_queue_revalidate( $tags );
		}
	}, 10, 3 );
}
