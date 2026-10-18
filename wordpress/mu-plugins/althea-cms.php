<?php
/**
 * Plugin Name: Althea CMS
 * Description: Content types, fields, admin screens and REST API for the headless Althea Resorts website (Next.js).
 * Version:     1.1.0
 * Author:      Althea Resorts
 *
 * Must-use plugin loader. WordPress only auto-loads PHP files placed directly in
 * wp-content/mu-plugins/, so this file loads the plugin from the althea-cms/ folder next to it.
 *
 * Optional wp-config.php constants (on-demand revalidation of the Next.js site):
 *   define( 'ALTHEA_REVALIDATE_URL', 'https://althearesorts.com/api/revalidate' );
 *   define( 'ALTHEA_REVALIDATE_SECRET', '<same value as REVALIDATE_SECRET in Next.js>' );
 *   define( 'ALTHEA_FRONTEND_URL', 'https://www.althearesorts.com' ); // headless page button target
 */

defined( 'ABSPATH' ) || exit;

define( 'ALTHEA_CMS_VERSION', '1.1.0' );
define( 'ALTHEA_CMS_DIR', __DIR__ . '/althea-cms' );

require_once ALTHEA_CMS_DIR . '/includes/schema.php';
require_once ALTHEA_CMS_DIR . '/includes/sanitize.php';
require_once ALTHEA_CMS_DIR . '/includes/post-types.php';
require_once ALTHEA_CMS_DIR . '/includes/meta.php';
require_once ALTHEA_CMS_DIR . '/includes/rest.php';
require_once ALTHEA_CMS_DIR . '/includes/revalidate.php';
require_once ALTHEA_CMS_DIR . '/includes/headless.php';

if ( is_admin() ) {
	require_once ALTHEA_CMS_DIR . '/includes/admin-fields.php';
	require_once ALTHEA_CMS_DIR . '/includes/admin.php';
}
