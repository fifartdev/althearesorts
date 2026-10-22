#!/usr/bin/env bash
# Integration test for the Althea CMS plugin against a throwaway local WordPress
# (PHP built-in server + SQLite, no MySQL/Docker needed).
# Usage: wordpress/tests/run-local.sh [work-dir]   (default: a new temp dir; nothing is written to the repo)
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
PLUGIN="$(cd "$HERE/../mu-plugins" && pwd)"
WORK="${1:-$(mktemp -d)}"
PORT=8899
if curl -s -o /dev/null "http://localhost:$PORT/"; then echo "Port $PORT is already in use; stop that server first." >&2; exit 1; fi
mkdir -p "$WORK/dl"
cd "$WORK"

[ -f dl/wordpress.tar.gz ] || curl -sSLo dl/wordpress.tar.gz https://wordpress.org/latest.tar.gz
[ -f dl/sqlite.zip ] || curl -sSLo dl/sqlite.zip https://downloads.wordpress.org/plugin/sqlite-database-integration.latest-stable.zip
[ -f dl/wp-cli.phar ] || curl -sSLo dl/wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

rm -rf wordpress && tar xzf dl/wordpress.tar.gz
unzip -q dl/sqlite.zip -d wordpress/wp-content/plugins/
SQLITE="$WORK/wordpress/wp-content/plugins/sqlite-database-integration"
sed "s#{SQLITE_IMPLEMENTATION_FOLDER_PATH}#$SQLITE#; s#{SQLITE_PLUGIN}#sqlite-database-integration/load.php#" "$SQLITE/db.copy" > wordpress/wp-content/db.php

wp() { php "$WORK/dl/wp-cli.phar" --path="$WORK/wordpress" "$@"; }
wp config create --dbname=wp --dbuser=x --dbpass=x --skip-check --quiet
wp config set WP_ENVIRONMENT_TYPE local --quiet
wp config set WP_DEBUG true --raw --quiet
wp config set WP_DEBUG_LOG true --raw --quiet
wp config set WP_DEBUG_DISPLAY false --raw --quiet
wp core install --url="http://localhost:$PORT" --title=Test --admin_user=admin --admin_password=admin --admin_email=a@example.com --skip-email --quiet
mkdir -p wordpress/wp-content/mu-plugins
ln -sf "$PLUGIN/althea-cms.php" wordpress/wp-content/mu-plugins/althea-cms.php
ln -sfn "$PLUGIN/althea-cms" wordpress/wp-content/mu-plugins/althea-cms
wp user application-password create admin test --porcelain > apppass.txt
wp user create forms forms@example.com --role=althea_forms --porcelain > /dev/null
wp user application-password create forms test --porcelain > formspass.txt
wp user create manager manager@example.com --role=althea_manager --user_pass=manager-pass --porcelain > /dev/null

php -S "localhost:$PORT" -t wordpress > server.log 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
for _ in $(seq 1 50); do curl -s -o /dev/null "http://localhost:$PORT/" && break; sleep 0.2; done

python3 -I "$HERE/rest_test.py" apppass.txt formspass.txt
python3 -I "$HERE/form_test.py" \
  "$(wp post list --post_type=althea_page --name=home --field=ID)" \
  "$(wp post list --post_type=althea_room --field=ID | head -1)"
python3 -I "$HERE/manager_test.py" "$(wp post list --post_type=althea_room --field=ID | head -1)"

# Headless front end: button page with noindex everywhere public; admin/login/REST untouched.
hfail=0
hcheck() { if eval "$2"; then echo "PASS headless: $1"; else echo "FAIL headless: $1"; hfail=1; fi; }
B="http://localhost:$PORT"
home=$(curl -s -D - "$B/")
hcheck "home shows button page" '[[ "$home" == *"Visit althearesorts.com"* && "$home" == *"https://www.althearesorts.com"* ]]'
hcheck "home has X-Robots-Tag noindex" '[[ "$(echo "$home" | tr -d "\r" | grep -i "^x-robots-tag:")" == *noindex* ]]'
hcheck "404 path shows button page" '[[ "$(curl -s "$B/?p=999999")" == *"Visit althearesorts.com"* ]]'
hcheck "feed shows button page" '[[ "$(curl -s "$B/?feed=rss2")" == *"Visit althearesorts.com"* ]]'
hcheck "robots.txt disallows all" '[[ "$(curl -s "$B/?robots=1")" == *"Disallow: /"* ]]'
hcheck "wp sitemap disabled" '[[ "$(curl -s "$B/?sitemap=index")" != *"<sitemapindex"* ]]'
hcheck "login page untouched" '[[ "$(curl -s "$B/wp-login.php")" == *"user_login"* ]]'
hcheck "REST untouched" '[[ "$(curl -s "$B/index.php?rest_route=/althea/v1/schema")" == *pluginVersion* ]]'
[ "$hfail" = 0 ] || exit 1

# Core logs "Undefined array key mm" because the form test does not post the date selects; ignore those.
if [ -f wordpress/wp-content/debug.log ] && grep -v 'Undefined array key "mm"' wordpress/wp-content/debug.log | grep -q 'PHP'; then
  echo "FAIL PHP errors in debug.log:"; grep -v 'Undefined array key "mm"' wordpress/wp-content/debug.log; exit 1
fi
echo "Done. Work dir: $WORK"
