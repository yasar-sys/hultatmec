import { z } from "zod";
const s = (max: number, label: string) => z.string().trim().min(1, `${label} is required`).max(max);
export const registrationSchema = z.object({
  team_name: s(100, "Team name"),
  leader_name: s(100, "Leader name"),
  department: s(100, "Department"),
  semester: s(30, "Semester"),
  phone: z.string().trim().regex(/^[+0-9\s-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  team_members: s(500, "Team members"),
  idea: s(300, "Idea"),
});
export const partnerSchema = z.object({
  organization: s(150, "Organization"),
  contact_name: s(100, "Name"),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: s(2000, "Message"),
});
export const contactSchema = z.object({
  name: s(100, "Name"),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: s(2000, "Message"),
});
