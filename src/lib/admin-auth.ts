import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function digest(s: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));
}

// Runs only on the server. Never expose the stored password: compare digests, in constant time.
export async function passwordOk(input: string) {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) throw new Error("ADMIN_PASSWORD is not set");
  const [a, b] = await Promise.all([digest(input), digest(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0;
}

export const passwordInput = z.object({ password: z.string().min(1).max(200) });
