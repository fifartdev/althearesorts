<?php
/**
 * Form controls for schema fields. Translated fields render EN and EL side by side.
 */

defined( 'ABSPATH' ) || exit;

const ALTHEA_LOCALE_LABELS = array( 'en' => 'English', 'el' => 'Ελληνικά' );

/**
 * One input for one storage key.
 *
 * @param array  $field Field definition.
 * @param string $name  Form input name.
 * @param mixed  $value Stored value.
 */
function althea_render_input( array $field, $name, $value ) {
	$id   = 'althea-' . md5( $name );
	$type = $field['type'];

	switch ( $type ) {
		case 'text':
		case 'url':
			printf( '<input type="text" class="widefat" id="%s" name="%s" value="%s">', esc_attr( $id ), esc_attr( $name ), esc_attr( $value ) );
			break;

		case 'number':
			printf( '<input type="number" class="small-text" id="%s" name="%s" value="%s">', esc_attr( $id ), esc_attr( $name ), esc_attr( $value ) );
			break;

		case 'textarea':
		case 'html':
			printf( '<textarea class="widefat" rows="%d" id="%s" name="%s">%s</textarea>', 'html' === $type ? 3 : 4, esc_attr( $id ), esc_attr( $name ), esc_textarea( $value ) );
			break;

		case 'paragraphs':
		case 'lines':
		case 'blocks':
			$rows = 'blocks' === $type ? 24 : ( 'paragraphs' === $type ? 10 : 6 );
			printf( '<textarea class="widefat althea-mono" rows="%d" id="%s" name="%s">%s</textarea>', $rows, esc_attr( $id ), esc_attr( $name ), esc_textarea( $value ) );
			break;

		case 'bool':
			printf( '<input type="hidden" name="%2$s" value="0"><label><input type="checkbox" id="%1$s" name="%2$s" value="1" %3$s> Yes</label>', esc_attr( $id ), esc_attr( $name ), checked( (bool) $value, true, false ) );
			break;

		case 'select':
			printf( '<select id="%s" name="%s"><option value="">—</option>', esc_attr( $id ), esc_attr( $name ) );
			foreach ( $field['options'] as $option ) {
				printf( '<option value="%1$s" %2$s>%1$s</option>', esc_attr( $option ), selected( $value, $option, false ) );
			}
			echo '</select>';
			break;

		case 'image':
		case 'images':
			$ids      = 'images' === $type ? array_filter( array_map( 'absint', (array) $value ) ) : array_filter( array( absint( $value ) ) );
			$multiple = 'images' === $type;
			printf( '<div class="althea-media" data-multiple="%d"><input type="hidden" class="althea-media-ids" name="%s" value="%s"><div class="althea-media-preview">', $multiple ? 1 : 0, esc_attr( $name ), esc_attr( implode( ',', $ids ) ) );
			foreach ( $ids as $attachment_id ) {
				echo wp_get_attachment_image( $attachment_id, 'thumbnail' );
			}
			printf( '</div><button type="button" class="button althea-media-select">%s</button> <button type="button" class="button-link althea-media-clear">Remove</button></div>', $multiple ? 'Choose images' : 'Choose image' );
			break;
	}
}

/**
 * A labelled row for a field: one input, or one per locale side by side.
 *
 * @param callable $name_fn  fn( storageKeyFn result ) => input name.
 * @param callable $value_fn fn( storageKey ) => stored value.
 * @param callable $key_fn   fn( key, locale ) => storage key.
 */
function althea_render_field_row( array $field, $key_fn, $name_fn, $value_fn, $page_locales = null ) {
	$locales = althea_field_locales( $field, $page_locales );
	if ( ! $locales ) {
		return;
	}
	$help = isset( $field['help'] ) ? $field['help'] : '';
	if ( 'paragraphs' === $field['type'] ) {
		$help = trim( $help . ' Separate paragraphs with an empty line.' );
	} elseif ( 'lines' === $field['type'] ) {
		$help = trim( $help . ' One per line.' );
	} elseif ( 'blocks' === $field['type'] ) {
		$help = trim( $help . ' Format: "## Heading" lines start sections; separate paragraphs with an empty line; "- item" lines make a list; "Q: …" followed by "A: …" makes a question; "[cta] Label | /link" makes a button; a line with only "---" starts a new section without a heading; "[address]" on its own line starts an address block.' );
	}

	echo '<div class="althea-row"><div class="althea-row-label"><strong>' . esc_html( $field['label'] ) . '</strong>';
	if ( $help ) {
		echo '<p class="description">' . esc_html( $help ) . '</p>';
	}
	echo '</div><div class="althea-row-inputs althea-cols-' . count( $locales ) . '">';
	foreach ( $locales as $locale ) {
		$key = call_user_func( $key_fn, $field['key'], $locale );
		echo '<div class="althea-col">';
		if ( null !== $locale ) {
			echo '<span class="althea-locale">' . esc_html( ALTHEA_LOCALE_LABELS[ $locale ] ) . '</span>';
		}
		althea_render_input( $field, call_user_func( $name_fn, $key ), call_user_func( $value_fn, $key ) );
		echo '</div>';
	}
	echo '</div></div>';
}

/**
 * Reads a submitted value for a field and sanitizes it to its storage type.
 */
function althea_submitted_value( array $field, $raw ) {
	return althea_sanitize_value( $field['type'], null === $raw ? '' : wp_unslash( $raw ), $field );
}
