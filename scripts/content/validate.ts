/**
 * Validates content (src/lib/wp/fallback/content.json shape) against wordpress/…/schema.json.
 * Every schema field must be present with the right shape and no undeclared keys may exist.
 * Used by scripts/migrate-to-wp.ts before writing anything, and runnable on its own:
 *   npx tsx scripts/content/validate.ts
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
export const SCHEMA_PATH = path.join(ROOT, 'wordpress/mu-plugins/althea-cms/schema.json')
export const CONTENT_PATH = path.join(ROOT, 'src/lib/wp/fallback/content.json')

export type Field = { key: string; type: string; l?: boolean; locales?: string[]; count?: number; fields?: Field[]; options?: string[] }

export function loadSchema() {
  return JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'))
}

export function fieldLocales(field: Field, schemaLocales: string[], pageLocales?: string[]): Array<string | null> {
  let locales: string[] | null = field.locales ?? (field.l ? schemaLocales : null)
  if (!locales) return [null]
  if (pageLocales) locales = locales.filter((l) => pageLocales.includes(l))
  return locales
}

function checkValue(type: string, v: unknown, where: string, errors: string[], field: Field) {
  const isImg = (x: unknown) => x === null || (typeof x === 'object' && x !== null && typeof (x as any).url === 'string')
  switch (type) {
    case 'image':
      if (!isImg(v)) errors.push(`${where}: expected image {url} or null`)
      break
    case 'images':
      if (!Array.isArray(v) || !v.every((x) => isImg(x) && x !== null)) errors.push(`${where}: expected image array`)
      break
    case 'bool':
      if (typeof v !== 'boolean') errors.push(`${where}: expected boolean`)
      break
    case 'number':
      if (typeof v !== 'number') errors.push(`${where}: expected number`)
      break
    case 'select':
      if (typeof v !== 'string' || (v !== '' && !field.options?.includes(v))) errors.push(`${where}: invalid option ${JSON.stringify(v)}`)
      break
    default:
      if (typeof v !== 'string') errors.push(`${where}: expected string, got ${JSON.stringify(v)?.slice(0, 60)}`)
      else if (['text', 'url', 'select'].includes(type) && v.includes('\n')) errors.push(`${where}: single-line field contains a newline`)
      else if (['text', 'textarea', 'lines', 'url'].includes(type) && /<[a-z/]/i.test(v)) errors.push(`${where}: plain-text field contains markup: ${v.slice(0, 80)}`)
  }
}

function checkField(field: Field, value: unknown, where: string, errors: string[], schemaLocales: string[], pageLocales?: string[]) {
  if (field.type === 'group') {
    if (!Array.isArray(value) || value.length !== field.count) {
      errors.push(`${where}: expected ${field.count} group items, got ${Array.isArray(value) ? value.length : typeof value}`)
      return
    }
    value.forEach((item, i) => checkObject(field.fields!, item, `${where}[${i}]`, errors, schemaLocales, pageLocales))
    return
  }
  const locales = fieldLocales(field, schemaLocales, pageLocales)
  if (locales[0] === null) return checkValue(field.type, value, where, errors, field)
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    errors.push(`${where}: expected { ${locales.join(', ')} }`)
    return
  }
  const keys = Object.keys(value)
  for (const l of locales) {
    if (!(l! in value)) errors.push(`${where}.${l}: missing`)
    else checkValue(field.type, (value as any)[l!], `${where}.${l}`, errors, field)
  }
  for (const k of keys) if (!locales.includes(k)) errors.push(`${where}.${k}: locale not declared`)
}

function checkObject(fields: Field[], obj: any, where: string, errors: string[], schemaLocales: string[], pageLocales?: string[]) {
  if (typeof obj !== 'object' || obj === null) {
    errors.push(`${where}: expected object`)
    return
  }
  for (const f of fields) {
    if (!(f.key in obj)) errors.push(`${where}.${f.key}: missing`)
    else checkField(f, obj[f.key], `${where}.${f.key}`, errors, schemaLocales, pageLocales)
  }
  for (const k of Object.keys(obj)) if (!fields.some((f) => f.key === k)) errors.push(`${where}.${k}: not in schema`)
}

export function validate(content: any, schema = loadSchema()): string[] {
  const errors: string[] = []
  const locales: string[] = schema.locales
  const settingsFields = schema.settings.groups.flatMap((g: any) => g.fields)
  checkObject(settingsFields, content.settings, 'settings', errors, locales)

  for (const [slug, template] of Object.entries<any>(schema.pages)) {
    const page = content.pages?.[slug]
    if (!page) {
      errors.push(`pages.${slug}: missing`)
      continue
    }
    const sections = [...template.sections, ...(template.seo === false ? [] : [{ key: 'seo', fields: schema.pageSeo }])]
    for (const s of sections) checkObject(s.fields, page.sections?.[s.key], `pages.${slug}.${s.key}`, errors, locales, template.locales)
    for (const k of Object.keys(page.sections ?? {})) if (!sections.some((s: any) => s.key === k)) errors.push(`pages.${slug}.${k}: section not in schema`)
  }
  for (const slug of Object.keys(content.pages ?? {})) if (!schema.pages[slug]) errors.push(`pages.${slug}: no template`)

  for (const [type, def] of Object.entries<any>(schema.postTypes)) {
    if (type === 'althea_page') continue
    const items = content.items?.[type]
    if (!Array.isArray(items)) {
      errors.push(`items.${type}: missing`)
      continue
    }
    const slugs = new Set<string>()
    items.forEach((item: any, i: number) => {
      const where = `items.${type}[${item.slug ?? i}]`
      if (!item.slug || slugs.has(item.slug)) errors.push(`${where}: missing or duplicate slug`)
      slugs.add(item.slug)
      if (typeof item.title !== 'string' || !item.title) errors.push(`${where}.title: missing`)
      checkObject(def.fields, item.fields, `${where}.fields`, errors, locales)
      for (const tax of def.taxonomies ?? []) {
        const termSlugs = item.terms?.[tax]
        if (!Array.isArray(termSlugs) || !termSlugs.every((s: string) => content.terms?.[tax]?.some((t: any) => t.slug === s))) errors.push(`${where}.terms.${tax}: unknown or missing term`)
      }
    })
  }
  return errors
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const errors = validate(JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8')))
  if (errors.length) {
    console.error(`${errors.length} problem(s):\n` + errors.join('\n'))
    process.exit(1)
  }
  console.log('content.json matches schema.json')
}
