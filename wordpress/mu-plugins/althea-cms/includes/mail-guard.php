<?php
/**
 * The hosting disables PHP's mail() function. Real email goes through SMTP (Post SMTP), but some
 * code still falls back to mail(), e.g. Post SMTP's "sending failed" notice to the admin, and a call
 * to the missing function is a fatal error that shows WordPress's error page. This replacement
 * reports "not sent" and logs it instead.
 *
 * PHP 8+ only: from PHP 8.0 disabled functions are not registered, so the name is free to declare.
 */

defined( 'ABSPATH' ) || exit;

if ( PHP_VERSION_ID >= 80000 && ! function_exists( 'mail' ) ) {
	function mail( $to, $subject, $message, $additional_headers = '', $additional_params = '' ) {
		error_log( 'Althea CMS: PHP mail() is disabled on this server; message to ' . $to . ' was not sent (use SMTP).' );
		return false;
	}
}
