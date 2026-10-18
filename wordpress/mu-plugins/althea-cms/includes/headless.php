<?php
/**
 * Headless mode: WordPress is only the CMS backend for the Next.js site.
 *
 * Every public front-end request (pages, posts, archives, feeds, search, 404s) gets a minimal page
 * with one button to the website, marked noindex so the backend never competes with the site in
 * search results. wp-admin, wp-login.php, the REST API and media files in wp-content/uploads are
 * not affected (they never reach template_redirect or are served directly by the web server).
 *
 * Optional wp-config.php constant:
 *   define( 'ALTHEA_FRONTEND_URL', 'https://www.althearesorts.com' );
 */

defined( 'ABSPATH' ) || exit;

function althea_frontend_url() {
	return defined( 'ALTHEA_FRONTEND_URL' ) && ALTHEA_FRONTEND_URL ? ALTHEA_FRONTEND_URL : 'https://www.althearesorts.com';
}

// Priority 0: before themes and page builders render anything.
add_action( 'template_redirect', function () {
	if ( is_admin() || wp_doing_ajax() || wp_doing_cron() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || is_robots() ) {
		return;
	}
	status_header( 200 );
	nocache_headers();
	header( 'Content-Type: text/html; charset=utf-8' );
	header( 'X-Robots-Tag: noindex, nofollow', true );
	$url = esc_url( althea_frontend_url() );
	?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Althea Resorts</title>
<style>
	html, body { height: 100%; margin: 0; background: #fff; }
	body { display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
	a { display: inline-block; padding: 14px 32px; border: 1px solid #ad8b27; color: #ad8b27; text-decoration: none; text-transform: uppercase; letter-spacing: .2em; font-size: 12px; transition: background .3s, color .3s; }
	a:hover, a:focus { background: #ad8b27; color: #fff; }
</style>
</head>
<body>
<a href="<?php echo $url; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?>">Visit althearesorts.com</a>
</body>
</html>
	<?php
	exit;
}, 0 );

// Keep crawlers out of the backend entirely.
add_filter( 'robots_txt', function () {
	return "User-agent: *\nDisallow: /\n";
}, 99 );
add_filter( 'wp_sitemaps_enabled', '__return_false' );
