# "Althea content manager" role: can change all website content and Althea settings,
# cannot reach plugins, themes, users, WordPress settings or the unused core screens.
import html as H, http.cookiejar, urllib.request, urllib.parse, urllib.error, re, json, sys
B = 'http://localhost:8899/'
cj = http.cookiejar.CookieJar()

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj), NoRedirect)
def get(path):
    try:
        r = op.open(B + path); return r.status, r.read().decode(), r.headers.get('Location', '')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode(), e.headers.get('Location', '')
def post(path, data):
    try:
        r = op.open(B + path, urllib.parse.urlencode(data).encode()); return r.status, r.headers.get('Location', '')
    except urllib.error.HTTPError as e:
        return e.code, e.headers.get('Location', '')

op.open(B + 'wp-login.php')
post('wp-login.php', {'log': 'manager', 'pwd': 'manager-pass', 'wp-submit': 'Log In', 'testcookie': '1'})
FAILED = []
def ok(cond, label, *info):
    print('PASS' if cond else 'FAIL', 'manager:', label, *info)
    if not cond: FAILED.append(label)

st, page, _ = get('wp-admin/admin.php?page=althea-settings')
ok(st == 200 and 'althea_settings[phone]' in page, 'opens Althea settings', st)
# WordPress writes some hidden fields (option_page, action) with single quotes.
form = {m.group(2): H.unescape(m.group(4)) for m in re.finditer(r'<input[^>]*name=(["\'])([^"\']+)\1[^>]*value=(["\'])([^"\']*)\3', page)}
form['althea_settings[phone]'] = '+30 99999 00000'
st, loc = post('wp-admin/options.php', form)
saved = json.loads(urllib.request.urlopen(B + 'index.php?rest_route=/althea/v1/settings').read())
ok(saved['phone'] == '+30 99999 00000', 'saves Althea settings', st, loc)

room = sys.argv[1]
st, page, _ = get(f'wp-admin/post.php?post={room}&action=edit')
ok(st == 200 and 'althea_meta[' in page, 'edits a room', st)
st, page, _ = get('wp-admin/edit.php?post_type=althea_page')
ok(st == 200, 'lists site pages', st)
st, page, _ = get('wp-admin/upload.php')
ok(st == 200, 'opens Media', st)
st, page, _ = get('wp-admin/edit.php?post_type=althea_submission')
ok(st == 200, 'opens form submissions', st)
st, page, _ = get('wp-admin/edit-tags.php?taxonomy=althea_faq_cat&post_type=althea_faq')
ok(st == 200, 'manages categories', st)
st, page, _ = get('wp-admin/admin.php?page=althea')
ok(st == 200 and 'href="plugins.php"' not in page and 'href="themes.php"' not in page and 'href="users.php"' not in page and 'href="options-general.php"' not in page,
   'menu has no Plugins, Appearance, Users, Settings')
ok('href="edit.php"' not in page and 'href="edit-comments.php"' not in page and 'href="tools.php"' not in page, 'menu hides Posts, Comments, Tools')
for path in ['wp-admin/plugins.php', 'wp-admin/themes.php', 'wp-admin/users.php', 'wp-admin/options-general.php', 'wp-admin/plugin-install.php', 'wp-admin/theme-editor.php']:
    st, page, _ = get(path)
    ok(st == 403 or 'not allowed' in page.lower(), f'refused {path}', st)
for path in ['wp-admin/edit.php', 'wp-admin/edit-comments.php', 'wp-admin/tools.php']:
    st, _, loc = get(path)
    ok(st in (302, 303) and 'page=althea' in loc, f'redirects {path}', st, loc)
if FAILED:
    sys.exit(f'{len(FAILED)} manager check(s) failed')
