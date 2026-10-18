<?php
/**
 * wp-admin: the Althea menu, field meta boxes, site page editor, settings page and term fields.
 */

defined( 'ABSPATH' ) || exit;

/* ---------------------------------------------------------------------------------------------
 * Menu
 * ------------------------------------------------------------------------------------------- */

// Priority 9: the top-level menu must exist before post types attach to it (priority 10).
add_action( 'admin_menu', function () {
	add_menu_page( 'Althea', 'Althea', 'edit_posts', 'althea', 'althea_render_overview', 'dashicons-palmtree', 3 );
	add_submenu_page( 'althea', 'Althea — Overview', 'Overview', 'edit_posts', 'althea', 'althea_render_overview' );
	add_submenu_page( 'althea', 'Althea — Settings', 'Settings', 'manage_options', 'althea-settings', 'althea_render_settings_page' );
	foreach ( althea_schema()['taxonomies'] as $taxonomy => $def ) {
		add_submenu_page( 'althea', $def['label'], $def['label'], 'manage_categories', 'edit-tags.php?taxonomy=' . $taxonomy );
	}
}, 9 );

// Keep the Althea menu highlighted on taxonomy screens.
add_filter( 'parent_file', function ( $parent_file ) {
	$screen = get_current_screen();
	if ( $screen && $screen->taxonomy && isset( althea_schema()['taxonomies'][ $screen->taxonomy ] ) ) {
		return 'althea';
	}
	return $parent_file;
} );

function althea_render_overview() {
	$notice = '';
	if ( isset( $_POST['althea_revalidate_all'] ) && check_admin_referer( 'althea_revalidate_all' ) ) {
		$response = althea_send_revalidate( array( 'wp' ), true );
		if ( null === $response ) {
			$notice = '<div class="notice notice-warning"><p>Revalidation is not configured (see below).</p></div>';
		} elseif ( is_wp_error( $response ) ) {
			$notice = '<div class="notice notice-error"><p>Request failed: ' . esc_html( $response->get_error_message() ) . '</p></div>';
		} else {
			$code   = wp_remote_retrieve_response_code( $response );
			$class  = 200 === $code ? 'notice-success' : 'notice-error';
			$notice = '<div class="notice ' . $class . '"><p>Website refresh requested (HTTP ' . (int) $code . ').</p></div>';
		}
	}

	$pages = get_posts( array( 'post_type' => 'althea_page', 'post_status' => 'any', 'posts_per_page' => -1, 'orderby' => 'title', 'order' => 'ASC' ) );
	$by_slug = array();
	foreach ( $pages as $page ) {
		$by_slug[ $page->post_name ] = $page;
	}

	echo '<div class="wrap"><h1>Althea website content</h1>' . $notice; // phpcs:ignore WordPress.Security.EscapeOutput
	echo '<p>Content edited here is published on the Next.js website. Changes appear within a few seconds when automatic refresh is configured, otherwise within an hour.</p>';

	echo '<h2>Site pages</h2><table class="widefat striped" style="max-width:720px"><tbody>';
	foreach ( althea_schema()['pages'] as $slug => $template ) {
		echo '<tr><td>' . esc_html( $template['label'] ) . '</td><td>';
		if ( isset( $by_slug[ $slug ] ) ) {
			echo '<a href="' . esc_url( get_edit_post_link( $by_slug[ $slug ]->ID ) ) . '">Edit</a>';
		} else {
			echo '<em>Not created yet</em> (slug <code>' . esc_html( $slug ) . '</code>)';
		}
		echo '</td></tr>';
	}
	echo '</tbody></table>';

	echo '<h2>Refresh the website</h2>';
	if ( althea_revalidate_configured() ) {
		echo '<form method="post">';
		wp_nonce_field( 'althea_revalidate_all' );
		echo '<p>Sends <code>' . esc_html( ALTHEA_REVALIDATE_URL ) . '</code> a request to refresh all content.</p>';
		submit_button( 'Refresh all content now', 'secondary', 'althea_revalidate_all', false );
		echo '</form>';
	} else {
		echo '<p>Automatic refresh is off. Add <code>ALTHEA_REVALIDATE_URL</code> and <code>ALTHEA_REVALIDATE_SECRET</code> to <code>wp-config.php</code> to enable it.</p>';
	}
	echo '</div>';
}

/* ---------------------------------------------------------------------------------------------
 * Assets
 * ------------------------------------------------------------------------------------------- */

add_action( 'admin_enqueue_scripts', function () {
	$screen = get_current_screen();
	if ( ! $screen ) {
		return;
	}
	$ours = in_array( $screen->post_type, althea_post_type_names(), true ) || 'toplevel_page_althea' === $screen->id || false !== strpos( $screen->id, 'althea-settings' );
	if ( ! $ours ) {
		return;
	}
	wp_enqueue_media();
	wp_enqueue_script( 'althea-admin', plugins_url( 'admin.js', ALTHEA_CMS_DIR . '/admin.js' ), array( 'jquery' ), ALTHEA_CMS_VERSION, true );
	wp_enqueue_style( 'althea-admin', plugins_url( 'admin.css', ALTHEA_CMS_DIR . '/admin.css' ), array(), ALTHEA_CMS_VERSION );
} );

/* ---------------------------------------------------------------------------------------------
 * Post type meta boxes
 * ------------------------------------------------------------------------------------------- */

add_action( 'add_meta_boxes', function ( $post_type, $post ) {
	$schema = althea_schema();
	if ( empty( $schema['postTypes'][ $post_type ] ) ) {
		return;
	}
	remove_meta_box( 'postcustom', $post_type, 'normal' ); // Raw custom fields would bypass the forms.

	if ( 'althea_page' === $post_type ) {
		add_meta_box( 'althea-page-content', 'Page content', 'althea_render_page_box', $post_type, 'normal', 'high' );
		return;
	}
	add_meta_box( 'althea-fields', $schema['postTypes'][ $post_type ]['singular'] . ' details', 'althea_render_fields_box', $post_type, 'normal', 'high' );
}, 10, 2 );

function althea_render_fields_box( WP_Post $post ) {
	$def = althea_schema()['postTypes'][ $post->post_type ];
	wp_nonce_field( 'althea_save_' . $post->ID, 'althea_nonce' );
	if ( ! empty( $def['help'] ) ) {
		echo '<p class="description">' . esc_html( $def['help'] ) . '</p>';
	}

	$current_section = null;
	foreach ( $def['fields'] as $field ) {
		$section = isset( $field['section'] ) ? $field['section'] : null;
		if ( $section !== $current_section && null !== $section ) {
			echo '<h3 class="althea-section-title">' . esc_html( $section ) . '</h3>';
		}
		$current_section = $section;
		althea_render_field_row(
			$field,
			'althea_meta_key',
			function ( $key ) {
				return 'althea_meta[' . $key . ']';
			},
			function ( $key ) use ( $post ) {
				return get_post_meta( $post->ID, $key, true );
			}
		);
	}
}

function althea_render_page_box( WP_Post $post ) {
	$template = althea_page_template( $post->post_name );
	if ( ! $template ) {
		echo '<p>This page\'s slug (<code>' . esc_html( $post->post_name ) . '</code>) does not match any website page. Valid slugs: <code>' . esc_html( implode( ', ', array_keys( althea_schema()['pages'] ) ) ) . '</code>.</p>';
		return;
	}
	wp_nonce_field( 'althea_save_' . $post->ID, 'althea_nonce' );
	$content      = (array) get_post_meta( $post->ID, 'althea_content', true );
	$page_locales = isset( $template['locales'] ) ? $template['locales'] : null;

	echo '<p class="description">Editing: <strong>' . esc_html( $template['label'] ) . '</strong>. Headings and text fields accept &lt;em&gt;, &lt;strong&gt;, &lt;br&gt; and links.</p>';

	foreach ( $template['sections'] as $section ) {
		$stored   = isset( $content[ $section['key'] ] ) ? (array) $content[ $section['key'] ] : array();
		$value_fn = function ( $key ) use ( $stored ) {
			return isset( $stored[ $key ] ) ? $stored[ $key ] : '';
		};
		$name_fn  = function ( $key ) use ( $section ) {
			return 'althea_content[' . $section['key'] . '][' . $key . ']';
		};

		echo '<details class="althea-section" open><summary>' . esc_html( $section['label'] ) . '</summary>';
		foreach ( $section['fields'] as $field ) {
			if ( 'group' !== $field['type'] ) {
				althea_render_field_row( $field, 'althea_leaf_key', $name_fn, $value_fn, $page_locales );
				continue;
			}
			for ( $i = 0; $i < (int) $field['count']; $i++ ) {
				echo '<fieldset class="althea-group"><legend>' . esc_html( $field['label'] ) . ' ' . ( $i + 1 ) . '</legend>';
				$prefix = $field['key'] . '.' . $i . '.';
				foreach ( $field['fields'] as $sub ) {
					althea_render_field_row(
						$sub,
						function ( $key, $locale ) use ( $prefix ) {
							return althea_leaf_key( $prefix . $key, $locale );
						},
						$name_fn,
						$value_fn,
						$page_locales
					);
				}
				echo '</fieldset>';
			}
		}
		echo '</details>';
	}
}

add_action( 'save_post', 'althea_save_post_fields', 5, 2 );

function althea_save_post_fields( $post_id, WP_Post $post ) {
	$schema = althea_schema();
	if ( empty( $schema['postTypes'][ $post->post_type ] ) ) {
		return;
	}
	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || wp_is_post_revision( $post_id ) ) {
		return;
	}
	if ( ! isset( $_POST['althea_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['althea_nonce'] ), 'althea_save_' . $post_id ) ) {
		return; // Not our form (e.g. REST or quick edit).
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( 'althea_page' === $post->post_type ) {
		$template = althea_page_template( $post->post_name );
		if ( ! $template ) {
			return;
		}
		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- each leaf is sanitized below by type.
		$submitted = isset( $_POST['althea_content'] ) ? (array) $_POST['althea_content'] : array();
		$content   = (array) get_post_meta( $post_id, 'althea_content', true );
		foreach ( althea_page_leaves( $template ) as $leaf ) {
			list( $section, $key, $field ) = $leaf;
			if ( ! isset( $submitted[ $section ] ) || ! array_key_exists( $key, (array) $submitted[ $section ] ) ) {
				continue;
			}
			$value = althea_submitted_value( $field, $submitted[ $section ][ $key ] );
			if ( 'images' === $field['type'] ) {
				$value = implode( ',', $value );
			}
			$content[ $section ][ $key ] = (string) $value;
		}
		update_post_meta( $post_id, 'althea_content', wp_slash( $content ) );
		return;
	}

	// phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- each value is sanitized below by type.
	$submitted = isset( $_POST['althea_meta'] ) ? (array) $_POST['althea_meta'] : array();
	foreach ( $schema['postTypes'][ $post->post_type ]['fields'] as $field ) {
		foreach ( althea_field_locales( $field ) as $locale ) {
			$key = althea_meta_key( $field['key'], $locale );
			if ( array_key_exists( $key, $submitted ) ) {
				update_post_meta( $post_id, $key, wp_slash( althea_submitted_value( $field, $submitted[ $key ] ) ) );
			}
		}
	}
}

// Show the slug column on site pages, since the slug decides which page is edited.
add_filter( 'manage_althea_page_posts_columns', function ( $columns ) {
	$columns['althea_slug'] = 'Slug';
	return $columns;
} );
add_action( 'manage_althea_page_posts_custom_column', function ( $column, $post_id ) {
	if ( 'althea_slug' === $column ) {
		echo '<code>' . esc_html( get_post_field( 'post_name', $post_id ) ) . '</code>';
	}
}, 10, 2 );

/* ---------------------------------------------------------------------------------------------
 * Settings page
 * ------------------------------------------------------------------------------------------- */

function althea_render_settings_page() {
	$stored = get_option( 'althea_settings', array() );
	echo '<div class="wrap"><h1>Althea settings</h1><form method="post" action="options.php">';
	settings_fields( 'althea' );
	foreach ( althea_schema()['settings']['groups'] as $group ) {
		echo '<details class="althea-section" open><summary>' . esc_html( $group['label'] ) . '</summary>';
		foreach ( $group['fields'] as $field ) {
			althea_render_field_row(
				$field,
				'althea_meta_key',
				function ( $key ) {
					return 'althea_settings[' . $key . ']';
				},
				function ( $key ) use ( $stored ) {
					return isset( $stored[ $key ] ) ? $stored[ $key ] : '';
				}
			);
		}
		echo '</details>';
	}
	submit_button();
	echo '</form></div>';
}

/* ---------------------------------------------------------------------------------------------
 * Taxonomy term fields
 * ------------------------------------------------------------------------------------------- */

foreach ( array_keys( althea_schema()['taxonomies'] ) as $althea_taxonomy ) {
	add_action( $althea_taxonomy . '_add_form_fields', function () use ( $althea_taxonomy ) {
		wp_nonce_field( 'althea_term', 'althea_term_nonce' );
		foreach ( althea_schema()['taxonomies'][ $althea_taxonomy ]['fields'] as $field ) {
			echo '<div class="form-field"><label>' . esc_html( $field['label'] ) . '</label>';
			althea_render_input( $field, 'althea_term[' . $field['key'] . ']', '' );
			echo '</div>';
		}
	} );

	add_action( $althea_taxonomy . '_edit_form_fields', function ( $term ) use ( $althea_taxonomy ) {
		wp_nonce_field( 'althea_term', 'althea_term_nonce' );
		foreach ( althea_schema()['taxonomies'][ $althea_taxonomy ]['fields'] as $field ) {
			echo '<tr class="form-field"><th scope="row">' . esc_html( $field['label'] ) . '</th><td>';
			althea_render_input( $field, 'althea_term[' . $field['key'] . ']', get_term_meta( $term->term_id, $field['key'], true ) );
			echo '</td></tr>';
		}
	} );

	$althea_save_term = function ( $term_id ) use ( $althea_taxonomy ) {
		if ( ! isset( $_POST['althea_term_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['althea_term_nonce'] ), 'althea_term' ) ) {
			return;
		}
		if ( ! current_user_can( 'manage_categories' ) ) {
			return;
		}
		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- sanitized below by type.
		$submitted = isset( $_POST['althea_term'] ) ? (array) $_POST['althea_term'] : array();
		foreach ( althea_schema()['taxonomies'][ $althea_taxonomy ]['fields'] as $field ) {
			if ( array_key_exists( $field['key'], $submitted ) ) {
				update_term_meta( $term_id, $field['key'], wp_slash( althea_submitted_value( $field, $submitted[ $field['key'] ] ) ) );
			}
		}
	};
	add_action( 'created_' . $althea_taxonomy, $althea_save_term );
	add_action( 'edited_' . $althea_taxonomy, $althea_save_term );
}
