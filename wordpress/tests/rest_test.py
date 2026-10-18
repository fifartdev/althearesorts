import base64, json, sys, urllib.request, urllib.error
B = 'http://localhost:8899/index.php?rest_route='
AUTH = 'Basic ' + base64.b64encode(('admin:' + open(sys.argv[1]).read().strip()).encode()).decode()
def req(method, route, body=None, raw=None, headers=None, auth=True):
    h = {'Content-Type': 'application/json'} if body is not None else {}
    if auth: h['Authorization'] = AUTH
    h.update(headers or {})
    data = json.dumps(body).encode() if body is not None else raw
    r = urllib.request.Request(B + route, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(r) as resp: return resp.status, json.loads(resp.read() or b'null')
    except urllib.error.HTTPError as e: return e.code, json.loads(e.read() or b'null')
FAILED = []
def check(label, cond, extra=''):
    if not cond: FAILED.append(label)
    print(('PASS ' if cond else 'FAIL ') + label + ('' if cond else '  -> ' + str(extra)[:600]))

# 1. media upload + source meta
png = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==')
st, m = req('POST', '/wp/v2/media', raw=png, headers={'Content-Type': 'image/png', 'Content-Disposition': 'attachment; filename="test image.png"'})
check('media upload', st == 201, m)
mid = m['id']
st, m2 = req('POST', f'/wp/v2/media/{mid}', {'alt_text': 'Ελληνικό alt & more', 'meta': {'_althea_source': '/images/test image.png', '_althea_source_hash': 'abc123'}})
check('media meta update', st == 200 and m2['meta']['_althea_source_hash'] == 'abc123', m2)
st, idx = req('GET', '/althea/v1/media-index')
check('media-index authed', st == 200 and idx[0]['hash'] == 'abc123', idx)
st, idx = req('GET', '/althea/v1/media-index', auth=False)
check('media-index requires auth', st in (401, 403), st)

# 2. room with typed meta
meta = {'size': '27 m²', 'featured': True, 'gallery': [mid], 'tagline_en': "Don't & <b>stop</b>", 'features_en': 'Free WiFi\nBalcony', 'list_short_desc_el': 'Ελληνικά γι\' αυτό', '_althea_payload_hash': 'h1'}
st, room = req('POST', '/wp/v2/althea-rooms', {'title': 'Superior Sea View', 'slug': 'superior-sea-view', 'status': 'publish', 'menu_order': 3, 'featured_media': mid, 'meta': meta})
check('create room', st == 201, room)
check('room text sanitized (tags stripped, & kept)', room['meta']['tagline_en'] == "Don't & stop", room['meta'].get('tagline_en'))
check('room greek apostrophe kept', room['meta']['list_short_desc_el'] == "Ελληνικά γι' αυτό", room['meta'].get('list_short_desc_el'))
st, again = req('POST', f"/wp/v2/althea-rooms/{room['id']}", {'meta': meta})
check('update room with identical meta', st == 200, again)
st, found = req('GET', '/wp/v2/althea-rooms&slug=superior-sea-view&status=any&context=edit')
check('lookup by slug', st == 200 and len(found) == 1, found)

# 3. site page object meta
content = {'hero': {'heading.en': 'Where the Gulf<br><em>Begins to Heal You</em>', 'heading.el': 'Εκεί που ο Κόλπος<br><em>Αρχίζει</em>', 'image': str(mid), 'stats.0.value': '41', 'stats.0.label.en': 'Rooms & Suites', 'cta1.en': 'Book Direct & Save'},
           'brand_intro': {'paragraphs.en': 'One <a href="/about" onclick="x()">link</a> & <script>bad()</script>text\n\nTwo'},
           'seo': {'keywords.en': 'a\nb'}}
st, page = req('POST', '/wp/v2/althea-pages', {'title': 'Homepage', 'slug': 'home', 'status': 'publish', 'meta': {'althea_content': content}})
check('create site page', st == 201, page)
st, again = req('POST', f"/wp/v2/althea-pages/{page['id']}", {'meta': {'althea_content': content}})
check('update site page identical content', st == 200, again)
st, p = req('GET', '/althea/v1/pages/home', auth=False)
check('read page public', st == 200, p)
h = p['sections']['hero']
check('page localized heading', h['heading'] == {'en': 'Where the Gulf<br><em>Begins to Heal You</em>', 'el': 'Εκεί που ο Κόλπος<br><em>Αρχίζει</em>'}, h['heading'])
check('page plain text keeps bare &', h['cta1']['en'] == 'Book Direct & Save', h['cta1'])
check('page image resolved', isinstance(h['image'], dict) and h['image']['alt'] == 'Ελληνικό alt & more', h['image'])
check('page group expanded', h['stats'][0] == {'value': '41', 'label': {'en': 'Rooms & Suites', 'el': ''}} and len(h['stats']) == 3, h['stats'])
para = p['sections']['brand_intro']['paragraphs']['en']
check('page html kses (no onclick/script)', 'onclick' not in para and '<script' not in para and '<a href="/about">' in para, para)
check('page seo section present', p['sections']['seo']['keywords']['en'] == 'a\nb', p['sections']['seo'])
check('undeclared section absent', 'nope' not in p['sections'])
st, x = req('GET', '/althea/v1/pages/terms', auth=False)
check('missing page 404', st == 404, x)
st, x = req('GET', '/althea/v1/pages/not-a-template', auth=False)
check('unknown template 404', st == 404, x)

# 4. items endpoint
st, items = req('GET', '/althea/v1/items/althea_room', auth=False)
check('items rooms', st == 200 and items[0]['slug'] == 'superior-sea-view' and items[0]['fields']['size'] == '27 m²', items)
f = items[0]['fields']
check('items localized + el-only', f['tagline'] == {'en': "Don't & stop"} and f['list_short_desc'] == {'el': "Ελληνικά γι' αυτό"}, f)
check('items images + bool', f['featured'] is True and f['gallery'][0]['id'] == mid and items[0]['image']['id'] == mid, f)
st, x = req('GET', '/althea/v1/items/althea_page', auth=False)
check('items refuses althea_page', st == 404, x)

# 5. draft not exposed
st, d = req('POST', '/wp/v2/althea-testimonials', {'title': 'Draft', 'status': 'draft', 'meta': {'name_en': 'X'}})
st, items = req('GET', '/althea/v1/items/althea_testimonial', auth=False)
check('drafts hidden', st == 200 and items == [], items)

# 6. taxonomy + term meta
st, term = req('POST', '/wp/v2/althea-gallery-cats', {'name': 'Views', 'slug': 'views', 'meta': {'name_el': 'Θέες', 'sort_order': 7}})
check('create term with meta', st == 201 and term['meta']['name_el'] == 'Θέες', term)
st, g = req('POST', '/wp/v2/althea-gallery', {'title': 'g1', 'status': 'publish', 'featured_media': mid, 'althea-gallery-cats': [term['id']], 'meta': {'caption_en': 'Views', 'caption_el': 'Θέα', 'wide': True}})
check('gallery item with term', st == 201, g)
st, items = req('GET', '/althea/v1/items/althea_gallery', auth=False)
check('items include terms', items[0]['terms']['althea_gallery_cat'][0]['name_el'] == 'Θέες' and items[0]['terms']['althea_gallery_cat'][0]['sort_order'] == 7, items)

# 7. settings
st, s = req('POST', '/wp/v2/settings', {'althea_settings': {'phone': '+30 27430 24063', 'booking_url': 'https://althearesort.reserve-online.net/?a=1&b=2', 'nav_en': 'About | /about\nBlog | /journal', 'site_tagline_el': 'Κορινθία'}})
check('settings write', st == 200, s)
st, s = req('GET', '/althea/v1/settings', auth=False)
check('settings read', s['phone'] == '+30 27430 24063' and s['booking_url'] == 'https://althearesort.reserve-online.net/?a=1&b=2' and s['nav']['en'] == 'About | /about\nBlog | /journal' and s['site_tagline'] == {'en': '', 'el': 'Κορινθία'}, s)

# 8. blog post blocks
body = '## Heading\n\nPara with <strong>bold</strong> & more\n\n- one\n- two\n\nQ: Why?\nA: Because.\n\n[cta] Book | https://x.example/?a=1&b=2'
st, post = req('POST', '/wp/v2/althea-posts', {'title': 'T', 'slug': 'en-test', 'status': 'publish', 'excerpt': 'Ex', 'meta': {'locale': 'en', 'route_slug': 'test', 'body': body, 'seo_keywords': 'k1\nk2'}})
check('create post', st == 201, post)
st, items = req('GET', '/althea/v1/items/althea_post', auth=False)
check('post body kept', items[0]['fields']['body'].startswith('## Heading') and '- two' in items[0]['fields']['body'] and items[0]['excerpt'] == 'Ex', items[0]['fields']['body'])
st, bad = req('POST', '/wp/v2/althea-posts', {'title': 'T2', 'status': 'draft', 'meta': {'locale': 'fr'}})
check('select rejects invalid option', st == 400, bad)

st, sch = req('GET', '/althea/v1/schema', auth=False)
check('schema route', sch['pluginVersion'] == '1.0.0' and 'althea_room' in sch['schema']['postTypes'], sch.keys() if isinstance(sch, dict) else sch)

if FAILED:
    sys.exit(f'{len(FAILED)} REST check(s) failed')
