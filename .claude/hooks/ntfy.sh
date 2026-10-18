#!/usr/bin/env bash
# Push a Claude Code event to a self-hosted ntfy server: POST $NTFY_URL/$NTFY_TOPIC.
# Usage (from hooks): ntfy.sh stop | ntfy.sh notification   — hook JSON arrives on stdin.
# NTFY_URL / NTFY_TOPIC come from the environment, else from .env.local (only those two keys are read).
# Optional NTFY_TOKEN (access token) is sent as a Bearer header. Silent no-op when not configured.
set -u
event="${1:-stop}"
dir="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
read_key() { [ -f "$dir/.env.local" ] && grep -E "^$1=" "$dir/.env.local" | tail -1 | cut -d= -f2- | sed -E "s/^[\"']|[\"']$//g"; }
url="${NTFY_URL:-$(read_key NTFY_URL)}"
topic="${NTFY_TOPIC:-$(read_key NTFY_TOPIC)}"
token="${NTFY_TOKEN:-$(read_key NTFY_TOKEN)}"
[ -n "$url" ] && [ -n "$topic" ] || exit 0

input="$(cat)"
project="$(basename "$dir")"
if [ "$event" = "notification" ]; then
  title="Claude needs you ($project)"
  msg="$(printf '%s' "$input" | jq -r '.message // "Waiting for your input or permission."' 2>/dev/null)"
  tags="warning"; priority="high"
else
  title="Claude finished ($project)"
  msg="$(printf '%s' "$input" | jq -r '.last_assistant_message // empty' 2>/dev/null)"
  if [ -z "$msg" ]; then
    transcript="$(printf '%s' "$input" | jq -r '.transcript_path // empty' 2>/dev/null)"
    [ -f "$transcript" ] && msg="$(tail -n 200 "$transcript" | jq -rs '[.[] | select(.type=="assistant") | .message.content[]? | select(.type=="text") | .text] | last // empty' 2>/dev/null)"
  fi
  [ -n "$msg" ] || msg="Done — waiting for your next instruction."
  tags="white_check_mark"; priority="default"
fi
msg="$(printf '%s' "$msg" | tr '\n' ' ' | cut -c1-300)"

auth=()
[ -n "$token" ] && auth=(-H "Authorization: Bearer $token")
curl -sS -m 10 -o /dev/null -w "%{http_code}" ${auth[@]+"${auth[@]}"} \
  -H "Title: $title" -H "Tags: $tags" -H "Priority: $priority" \
  --data-binary "$msg" "${url%/}/$topic"
