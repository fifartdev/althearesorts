import html as H, http.cookiejar, urllib.request, urllib.parse, re, json, sys
B = 'http://localhost:8899/'
cj = http.cookiejar.CookieJar(); op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
op.open(B + 'wp-login.php')
op.open(B + 'wp-login.php', urllib.parse.urlencode({'log': 'admin', 'pwd': 'admin', 'wp-submit': 'Log In', 'testcookie': '1'}).encode())
def save(post_id, extra):
    html = op.open(f'{B}wp-admin/post.php?post={post_id}&action=edit').read().decode()
    form = {}
    for name, val in re.findall(r'<input[^>]*name="([^"]+)"[^>]*value="([^"]*)"', html):
        form.setdefault(name, H.unescape(val))
    for m in re.finditer(r'<input[^>]*value="([^"]*)"[^>]*name="([^"]+)"', html):
        form.setdefault(m.group(2), H.unescape(m.group(1)))
    for name, val in re.findall(r'<textarea[^>]*name="([^"]+)"[^>]*>(.*?)</textarea>', html, re.S):
        form.setdefault(name, H.unescape(val))
    form.update({'action': 'editpost', 'post_ID': str(post_id), 'save': 'Update', 'post_status': 'publish'})
    form.update(extra)
    op.open(B + 'wp-admin/post.php', urllib.parse.urlencode(form).encode()).read()
FAILED = []
def ok(cond, label, *info):
    print('PASS' if cond else 'FAIL', label, *info)
    if not cond: FAILED.append(label)
def rest(route):
    return json.loads(op.open(B + 'index.php?rest_route=' + route).read())
tricky_en = "Don't stop — it's 100% \"real\" & C:\\path"
tricky_el = "Χτίσαμε την Althea γι' αυτή τη στιγμή"
home, room = sys.argv[1], sys.argv[2]
save(home, {'althea_content[hero][tagline.en]': tricky_en, 'althea_content[hero][tagline.el]': tricky_el,
            'althea_content[brand_intro][paragraphs.en]': "First <em>one</em>\r\n\r\n\r\nSecond"})
p = rest('/althea/v1/pages/home')['sections']
ok(p['hero']['tagline'] == {'en': tricky_en, 'el': tricky_el}, 'page form roundtrip', p['hero']['tagline'])
ok(p['brand_intro']['paragraphs']['en'] == 'First <em>one</em>\n\nSecond', 'paragraph normalisation', repr(p['brand_intro']['paragraphs']['en']))
ok(p['hero']['heading']['en'] == 'Where the Gulf<br><em>Begins to Heal You</em>', 'untouched fields preserved', p['hero']['heading'])
save(room, {'althea_meta[short_desc_en]': tricky_en, 'althea_meta[featured]': '0', 'althea_meta[gallery]': ''})
f = rest('/althea/v1/items/althea_room')[0]['fields']
ok(f['short_desc'] == {'en': tricky_en}, 'room form roundtrip', f['short_desc'])
ok(f['featured'] is False and f['gallery'] == [], 'room bool/images cleared', f['featured'], f['gallery'])
ok(f['size'] == '27 m²', 'room other fields preserved', f['size'])
if FAILED:
    sys.exit(f'{len(FAILED)} form check(s) failed')
