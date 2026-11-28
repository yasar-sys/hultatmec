import { z } from 'zod';
import { defaultContent, sectionIds, type SiteContent } from '@/content/site';

function shape(value: unknown, key = ''): z.ZodType {
  if (typeof value === 'boolean') return z.boolean();
  if (typeof value === 'number') return z.number().int().min(0).max(1000000000);
  if (typeof value === 'string') {
    if (key === 'id') return z.enum(sectionIds);
    if (key === 'email') return z.email().max(255);
    if (key === 'competitionDate') return z.string().refine(v => Number.isFinite(Date.parse(v)), 'Enter a valid date with timezone');
    if (key === 'href') return z.string().regex(/^#[a-z][a-z0-9-]*$/, 'Use a section anchor such as #team');
    if (['photo','src','logo','lockup','hult','hultAlt','mec','ummahHost','facebook','linkedin','instagram'].includes(key)) {
      return z.string().max(2000).refine(v => !v || /^https:\/\//.test(v) || /^\/api\/public\/media\/[a-f0-9-]+\.(png|jpg|webp|gif)$/.test(v), 'Use an HTTPS address or upload a photo');
    }
    return z.string().max(10000);
  }
  if (Array.isArray(value)) return z.array(shape(value[0])).max(100);
  if (value && typeof value === 'object') {
    const fields: Record<string, z.ZodType> = {};
    for (const [k, v] of Object.entries(value)) fields[k] = k === 'tall' ? shape(v, k).optional() : shape(v, k);
    return z.object(fields);
  }
  return z.never();
}
const schema = shape(defaultContent);
export function parseContent(value: unknown): SiteContent {
  const parsed = schema.parse(value) as SiteContent;
  const ids = parsed.presentation.sections.map(s => s.id);
  if (ids.length !== sectionIds.length || new Set(ids).size !== sectionIds.length) throw new Error('Each website section must appear exactly once');
  return parsed;
}
export function mergeContent(saved: unknown): SiteContent {
  function merge(base: unknown, update: unknown): unknown {
    if (Array.isArray(base)) return Array.isArray(update) ? update : base;
    if (base && typeof base === 'object') {
      const other = update && typeof update === 'object' && !Array.isArray(update) ? update as Record<string, unknown> : {};
      return Object.fromEntries(Object.entries(base).map(([k,v]) => [k, merge(v, other[k])]));
    }
    return update === undefined ? base : update;
  }
  return parseContent(merge(defaultContent, saved));
}
