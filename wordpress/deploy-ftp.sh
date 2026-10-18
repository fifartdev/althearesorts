#!/usr/bin/env bash
# Uploads the Althea CMS must-use plugin to wp-content/mu-plugins/ over FTPS.
#
# Reads FTP_USER and FTP_PASSWORD from .env.local. Connects to FTP_TLS_HOST (default
# server98.cretaforce.gr): ftp.althearesorts.com points to the same server, but the TLS
# certificate only covers *.cretaforce.gr.
#
# The server aborts any single upload above ~14 KB (451 Transfer aborted), so larger files are sent
# in 12 KB chunks with FTP APPE into a .tmp file, checksum-verified, then renamed into place.
# The loader (althea-cms.php) is uploaded last so WordPress never loads a half-uploaded plugin.
#
# Usage: wordpress/deploy-ftp.sh [file ...]   (paths relative to wordpress/mu-plugins; default: all)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/wordpress/mu-plugins"
set -a; source "$ROOT/.env.local"; set +a
HOST="${FTP_TLS_HOST:-server98.cretaforce.gr}"
BASE="ftp://$HOST:${FTP_PORT:-21}/${FTP_WP_ROOT:+${FTP_WP_ROOT#/}/}wp-content/mu-plugins"
CHUNK=12000
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

ftp() { printf 'user = "%s:%s"\n' "$FTP_USER" "$FTP_PASSWORD" | curl -sS -K - --ssl-reqd --connect-timeout 20 --max-time 60 "$@"; }

upload() {
  local rel="$1" file="$SRC/$1" dir name
  dir="$(dirname "$rel")"; name="$(basename "$rel")"
  rm -f "$TMP"/part_*
  split -b "$CHUNK" "$file" "$TMP/part_"
  local first=1
  for part in "$TMP"/part_*; do
    if [ "$first" = 1 ]; then
      ftp --ftp-create-dirs -T "$part" "$BASE/$dir/$name.tmp"; first=0
    else
      ftp --append -T "$part" "$BASE/$dir/$name.tmp"
    fi
  done
  if [ "$(ftp -s "$BASE/$dir/$name.tmp" | md5)" != "$(md5 -q "$file")" ]; then
    echo "FAIL $rel (checksum mismatch, left as $name.tmp)"; return 1
  fi
  # Remove the old file if present (ignore failure), then rename the verified upload into place.
  ftp -s -Q "-DELE $name" "$BASE/$dir/" -o /dev/null 2>/dev/null || true
  ftp -s -Q "-RNFR $name.tmp" -Q "-RNTO $name" "$BASE/$dir/" -o /dev/null
  echo "ok   $rel"
}

cd "$SRC"
if [ $# -gt 0 ]; then
  files=("$@")
else
  files=($(find althea-cms -type f ! -name '.DS_Store' | sort) althea-cms.php)
fi
for f in "${files[@]}"; do upload "$f"; done
