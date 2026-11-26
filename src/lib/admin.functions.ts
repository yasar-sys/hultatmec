import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function digest(s: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));
}
async function passwordOk(input: string) {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) throw new Error("ADMIN_PASSWORD is not set");
  const [a, b] = await Promise.all([digest(input), digest(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

export const getAdminData = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    if (!(await passwordOk(data.password))) return { ok: false as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [r, p, c] = await Promise.all([
      supabaseAdmin.from("registrations").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("partner_inquiries").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    if (r.error || p.error || c.error) throw new Error("Could not load data");
    return { ok: true as const, registrations: r.data, partners: p.data, contacts: c.data };
  });
