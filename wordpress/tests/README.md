# Plugin integration tests

```sh
wordpress/tests/run-local.sh
```

The script downloads WordPress, the SQLite database drop-in and wp-cli into a temp folder, then installs WordPress with the plugin symlinked in and runs it on PHP's built-in server. It then runs:

- `rest_test.py`: REST writes and reads for media (with source meta), rooms, site pages, terms, settings and blog posts. It also checks sanitizing (kses, a bare `&`, Greek text, apostrophes), that drafts stay hidden, and the auth rules.
- `form_test.py`: saves the wp-admin edit forms and checks the round-trip, including slashes, quotes, and fields left untouched.

It needs `php` (with pdo_sqlite), `python3` and `curl`. Nothing is written to the repo.
