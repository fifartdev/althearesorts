<?php
/**
 * Sanitizing for every field type. Text-like values are always stored as strings;
 * the Next.js data layer splits paragraphs/lines/blocks.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Inline HTML allowed in html/paragraphs/blocks fields.
 */
function althea_allowed_html() {
	return array(
		'a'      => array( 'href' => true, 'target' => true, 'rel' => true ),
		'strong' => array(),
		'b'      => array(),
		'em'     => array(),
		'i'      => array(),
		'br'     => array(),
	);
}

function althea_normalize_newlines( $value ) {
	return str_replace( array( "\r\n", "\r" ), "\n", (string) $value );
}

/**
 * @param string $type  Schema field type.
 * @param mixed  $value Raw value (already unslashed).
 * @param array  $field Field definition (used for select options).
 * @return mixed Sanitized value in its storage type.
 */
function althea_sanitize_value( $type, $value, array $field = array() ) {
	switch ( $type ) {
		case 'text':
			return trim( preg_replace( '/\s*\n\s*/', ' ', wp_strip_all_tags( althea_normalize_newlines( $value ) ) ) );

		case 'textarea':
			return trim( wp_strip_all_tags( althea_normalize_newlines( $value ) ) );

		case 'lines':
			$lines = array_map( 'trim', explode( "\n", wp_strip_all_tags( althea_normalize_newlines( $value ) ) ) );
			return implode( "\n", array_values( array_filter( $lines, 'strlen' ) ) );

		case 'html':
		case 'blocks':
			return trim( wp_kses( althea_normalize_newlines( $value ), althea_allowed_html() ) );

		case 'paragraphs':
			$value = trim( wp_kses( althea_normalize_newlines( $value ), althea_allowed_html() ) );
			return preg_replace( "/\n[ \t]*\n\s*/", "\n\n", $value );

		case 'url':
			$value = trim( wp_strip_all_tags( (string) $value ) );
			if ( '' === $value ) {
				return '';
			}
			if ( '/' === $value[0] || '#' === $value[0] ) {
				return preg_replace( '/\s+/', '', $value );
			}
			return esc_url_raw( $value, array( 'http', 'https', 'mailto', 'tel' ) );

		case 'image':
		case 'number':
			return (int) $value;

		case 'images':
			if ( is_string( $value ) ) {
				$value = explode( ',', $value );
			}
			return array_values( array_filter( array_map( 'absint', (array) $value ) ) );

		case 'bool':
			return (bool) filter_var( $value, FILTER_VALIDATE_BOOLEAN );

		case 'select':
			$options = isset( $field['options'] ) ? $field['options'] : array();
			return in_array( $value, $options, true ) ? $value : '';
	}
	return '';
}

/**
 * Sanitizes a site page's althea_content object coming in over REST, where the page template is
 * not known. Every leaf becomes a string with inline HTML only; the REST read route only ever
 * outputs keys declared in the template, so unknown keys are inert.
 */
function althea_sanitize_page_content( $value ) {
	$clean = array();
	foreach ( (array) $value as $section => $leaves ) {
		$section = sanitize_key( $section );
		if ( '' === $section || ! is_array( $leaves ) ) {
			continue;
		}
		foreach ( $leaves as $leaf => $leaf_value ) {
			$leaf = preg_replace( '/[^a-z0-9_.]/', '', strtolower( (string) $leaf ) );
			if ( '' === $leaf || ! is_scalar( $leaf_value ) ) {
				continue;
			}
			$leaf_value = trim( althea_normalize_newlines( $leaf_value ) );
			// Only run kses on values with markup: it would turn a bare "&" in plain text into "&amp;".
			$clean[ $section ][ $leaf ] = false === strpos( $leaf_value, '<' ) ? $leaf_value : trim( wp_kses( $leaf_value, althea_allowed_html() ) );
		}
	}
	return $clean;
}
