import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { adminEmailMatches, validImageUpload } from './admin-policy';
import { parseContent, mergeContent } from './content-schema';
import { registrationSchema, partnerSchema, contactSchema } from './schemas';

export const unlockAdmin = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ email: z.email().max(255), password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { getRequestIP } = await import('@tanstack/react-start/server');
    const { createHash } = await import('node:crypto');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const ip = getRequestIP({ xForwardedFor: true }) ?? 'unknown';
    const key = createHash('sha256').update(ip).digest('hex');
    const { data: allowed, error } = await supabaseAdmin.rpc('check_admin_login_limit', { attempt_key: key });
    if (error || !allowed) throw new Error('Too many attempts. Try again in 15 minutes.');
    const email = process.env['ADMIN_EMAIL'];
    const password = process.env['ADMIN_PASSWORD'];
    if (!email || !password) throw new Error('Admin access is not configured');
    const { passwordMatches, adminSession } = await import('./admin-auth.server');
    const validPassword = passwordMatches(data.password, password);
    if (!adminEmailMatches(data.email, email) || !validPassword) return { ok: false as const };
    const session = await adminSession();
    await session.update({ email, verifiedAt: Date.now() });
    return { ok: true as const };
  });
export const lockAdmin = createServerFn({ method: 'POST' }).handler(async () => {
  const { adminSession } = await import('./admin-auth.server');
  await (await adminSession()).clear();
  return { ok: true };
});
export const getAdminData = createServerFn({ method: 'GET' }).handler(async () => {
  const { requireAdmin } = await import('./admin-auth.server');
  try { await requireAdmin(); } catch { return { ok: false as const }; }
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const [r, p, c, content] = await Promise.all([
    supabaseAdmin.from('registrations').select('*').order('created_at', { ascending: false }).limit(1000),
    supabaseAdmin.from('partner_inquiries').select('*').order('created_at', { ascending: false }).limit(1000),
    supabaseAdmin.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(1000),
    supabaseAdmin.from('site_content').select('content, revision').eq('id', 'main').single(),
  ]);
  if (r.error || p.error || c.error || content.error) throw new Error('Could not load admin data');
  return { ok: true as const, registrations: r.data, partners: p.data, contacts: c.data, content: mergeContent(content.data.content), revision: content.data.revision };
});
export const saveWebsiteContent = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ content: z.unknown(), revision: z.number().int() }).parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import('./admin-auth.server');
    await requireAdmin();
    const content = parseContent(data.content);
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: row, error } = await supabaseAdmin.from('site_content').update({ content: JSON.parse(JSON.stringify(content)), revision: data.revision + 1, updated_at: new Date().toISOString() }).eq('id','main').eq('revision',data.revision).select('revision').maybeSingle();
    if (error) throw new Error('Could not save website');
    if (!row) throw new Error('Another session changed this page. Reload before saving.');
    return { revision: row.revision, content };
  });
export const uploadWebsiteImage = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import('./admin-auth.server');
    await requireAdmin();
    const file = data.get('file');
    if (!(file instanceof File) || !validImageUpload(file.type, file.size)) throw new Error('Choose a JPG, PNG, WebP or GIF up to 5 MB');
    const bytes = new Uint8Array(await file.arrayBuffer());
    const validSignature = file.type === 'image/png' ? bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71 : file.type === 'image/jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 : file.type === 'image/gif' ? new TextDecoder().decode(bytes.slice(0,6)).startsWith('GIF8') : new TextDecoder().decode(bytes.slice(0,4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8,12)) === 'WEBP';
    if (!validSignature) throw new Error('The file is not a supported image');
    const extensions: Record<string,string> = { 'image/jpeg':'jpg', 'image/png':'png', 'image/webp':'webp', 'image/gif':'gif' };
    const filename = `${crypto.randomUUID()}.${extensions[file.type]}`;
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.storage.from('site-media').upload(filename, file, { contentType: file.type, upsert: false });
    if (error) throw new Error('Could not upload photo');
    return { url: `/api/public/media/${filename}` };
  });
const submissionInput = z.object({ table: z.enum(['registrations','partner_inquiries','contact_messages']), id: z.uuid(), values: z.unknown() });
export const editSubmission = createServerFn({ method: 'POST' }).inputValidator((d: unknown) => submissionInput.parse(d)).handler(async ({ data }) => {
  const { requireAdmin } = await import('./admin-auth.server');
  await requireAdmin();
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const values = data.table === 'registrations' ? registrationSchema.parse(data.values) : data.table === 'partner_inquiries' ? partnerSchema.parse(data.values) : contactSchema.parse(data.values);
  const { error } = await supabaseAdmin.from(data.table).update(values).eq('id',data.id);
  if (error) throw new Error('Could not update submission');
  return { ok: true };
});
export const deleteSubmission = createServerFn({ method: 'POST' }).inputValidator((d: unknown) => submissionInput.omit({values:true}).parse(d)).handler(async ({ data }) => {
  const { requireAdmin } = await import('./admin-auth.server');
  await requireAdmin();
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { error } = await supabaseAdmin.from(data.table).delete().eq('id',data.id);
  if (error) throw new Error('Could not delete submission');
  return { ok: true };
});
