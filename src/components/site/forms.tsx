import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent } from "@/content/context";
import { contactSchema, partnerSchema, registrationSchema } from "@/lib/schemas";
import { supabase } from "@/integrations/supabase/client";

type FormStatus = "idle" | "saving" | "success" | "error";
type FormErrors = {
  team_name?: string;
  leader_name?: string;
  department?: string;
  semester?: string;
  phone?: string;
  email?: string;
  team_members?: string;
  idea?: string;
  organization?: string;
  contact_name?: string;
  name?: string;
  message?: string;
};

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function formErrors(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  const errors: FormErrors = {};
  const fields: (keyof FormErrors)[] = ["team_name", "leader_name", "department", "semester", "phone", "email", "team_members", "idea", "organization", "contact_name", "name", "message"];
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && fields.includes(key as keyof FormErrors)) {
      const field = key as keyof FormErrors;
      if (!errors[field]) errors[field] = issue.message;
    }
  }
  return errors;
}

function FormFeedback({ status, success }: { status: FormStatus; success: string }) {
  if (status === "success") {
    return <p role="status" aria-live="polite" className="text-sm font-medium text-primary">{success}</p>;
  }
  if (status === "error") {
    return <p role="alert" className="text-sm font-medium text-destructive">We couldn’t send that just now. Please try again.</p>;
  }
  return null;
}

export function RegistrationForm() {
  const { register, presentation } = useSiteContent();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("idle");
    setErrors({});
    const parsed = registrationSchema.safeParse(Object.fromEntries(new FormData(form).entries()));
    if (!parsed.success) {
      setErrors(formErrors(parsed.error));
      return;
    }
    setStatus("saving");
    try {
      const { error } = await supabase.from("registrations").insert(parsed.data);
      if (error) throw error;
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="register" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">{register.eyebrow}</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-5xl">{register.title} <span className="text-gradient-pink">{register.accent}</span></h2>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">{register.intro}</p>
          <p className="mt-6 text-sm text-muted-foreground">{register.note}</p>
        </div>
        <form onSubmit={submit} noValidate className="grid gap-5 rounded-lg border border-border bg-card p-5 shadow-card sm:grid-cols-2 sm:p-8">
          <Field id="team_name" label="Team name" error={errors.team_name}>
            <Input id="team_name" name="team_name" required maxLength={100} autoComplete="organization" aria-invalid={Boolean(errors.team_name)} aria-describedby={errors.team_name ? "team_name-error" : undefined} />
          </Field>
          <Field id="leader_name" label="Team leader" error={errors.leader_name}>
            <Input id="leader_name" name="leader_name" required maxLength={100} autoComplete="name" aria-invalid={Boolean(errors.leader_name)} aria-describedby={errors.leader_name ? "leader_name-error" : undefined} />
          </Field>
          <Field id="department" label="Department" error={errors.department}>
            <Input id="department" name="department" required maxLength={100} placeholder="Your MEC department" aria-invalid={Boolean(errors.department)} aria-describedby={errors.department ? "department-error" : undefined} />
          </Field>
          <Field id="semester" label="Semester" error={errors.semester}>
            <Input id="semester" name="semester" required maxLength={30} placeholder="e.g. 5th semester" aria-invalid={Boolean(errors.semester)} aria-describedby={errors.semester ? "semester-error" : undefined} />
          </Field>
          <Field id="email" label="Email address" error={errors.email}>
            <Input id="email" name="email" type="email" required maxLength={255} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          </Field>
          <Field id="phone" label="Phone number" error={errors.phone}>
            <Input id="phone" name="phone" type="tel" required maxLength={20} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          </Field>
          <div className="sm:col-span-2">
            <Field id="team_members" label="Team members (3–4 total; add one name per line)" error={errors.team_members}>
              <Textarea id="team_members" name="team_members" required maxLength={500} rows={3} aria-invalid={Boolean(errors.team_members)} aria-describedby={errors.team_members ? "team_members-error" : undefined} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field id="idea" label="What problem will your idea solve?" error={errors.idea}>
              <Textarea id="idea" name="idea" required maxLength={300} rows={4} placeholder="A short description of your idea" aria-invalid={Boolean(errors.idea)} aria-describedby={errors.idea ? "idea-error" : undefined} />
            </Field>
          </div>
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <FormFeedback status={status} success={presentation.forms.registrationSuccess} />
            <Button type="submit" variant="hero" disabled={status === "saving"}>
              {status === "saving" ? "Sending…" : presentation.forms.registrationSubmit}<ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function PartnerRequestForm() {
  const { presentation } = useSiteContent();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("idle");
    setErrors({});
    const parsed = partnerSchema.safeParse(Object.fromEntries(new FormData(form).entries()));
    if (!parsed.success) {
      setErrors(formErrors(parsed.error));
      return;
    }
    setStatus("saving");
    try {
      const { error } = await supabase.from("partner_inquiries").insert({ ...parsed.data, phone: parsed.data.phone ?? null });
      if (error) throw error;
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="organization" label="Organization" error={errors.organization}>
        <Input id="organization" name="organization" required maxLength={150} autoComplete="organization" aria-invalid={Boolean(errors.organization)} aria-describedby={errors.organization ? "organization-error" : undefined} />
      </Field>
      <Field id="partner_contact_name" label="Your name" error={errors.contact_name}>
        <Input id="partner_contact_name" name="contact_name" required maxLength={100} autoComplete="name" aria-invalid={Boolean(errors.contact_name)} aria-describedby={errors.contact_name ? "partner_contact_name-error" : undefined} />
      </Field>
      <Field id="partner_email" label="Email address" error={errors.email}>
        <Input id="partner_email" name="email" type="email" required maxLength={255} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "partner_email-error" : undefined} />
      </Field>
      <Field id="partner_phone" label="Phone number (optional)" error={errors.phone}>
        <Input id="partner_phone" name="phone" type="tel" maxLength={20} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "partner_phone-error" : undefined} />
      </Field>
      <div className="sm:col-span-2">
        <Field id="partner_message" label="How would you like to partner?" error={errors.message}>
          <Textarea id="partner_message" name="message" required maxLength={2000} rows={4} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "partner_message-error" : undefined} />
        </Field>
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <FormFeedback status={status} success={presentation.forms.partnerSuccess} />
        <Button type="submit" variant="hero" disabled={status === "saving"}>
          {status === "saving" ? "Sending…" : presentation.forms.partnerSubmit}<Send aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}

export function PartnerRequestDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { presentation } = useSiteContent();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogTitle className="font-display text-2xl font-bold">{presentation.forms.partnerTitle}</DialogTitle>
        <p className="mb-2 text-sm text-muted-foreground">{presentation.forms.partnerIntro}</p>
        <PartnerRequestForm />
      </DialogContent>
    </Dialog>
  );
}

export function ContactSection() {
  const { site, contact, presentation } = useSiteContent();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("idle");
    setErrors({});
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form).entries()));
    if (!parsed.success) {
      setErrors(formErrors(parsed.error));
      return;
    }
    setStatus("saving");
    try {
      const { error } = await supabase.from("contact_messages").insert(parsed.data);
      if (error) throw error;
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">{contact.eyebrow}</p>
            <h2 className="text-3xl font-bold text-foreground sm:text-5xl">{contact.title} <span className="text-gradient-pink">{contact.accent}</span></h2>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">{contact.intro}</p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
              {site.email}<ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-foreground"><MapPin className="size-4 text-primary" aria-hidden="true" />{contact.place}</div>
            <div className="mt-5 overflow-hidden rounded-lg border border-border">
              <iframe
                title="Map to Mymensingh Engineering College"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contact.place)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/9] w-full border-0"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{presentation.forms.contactTitle}</h3>
            <form onSubmit={submit} noValidate className="mt-6 grid gap-5">
              <Field id="contact_name" label="Your name" error={errors.name}>
                <Input id="contact_name" name="name" required maxLength={100} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact_name-error" : undefined} />
              </Field>
              <Field id="contact_email" label="Email address" error={errors.email}>
                <Input id="contact_email" name="email" type="email" required maxLength={255} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact_email-error" : undefined} />
              </Field>
              <Field id="contact_message" label="Message" error={errors.message}>
                <Textarea id="contact_message" name="message" required maxLength={2000} rows={6} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact_message-error" : undefined} />
              </Field>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <FormFeedback status={status} success={presentation.forms.contactSuccess} />
                <Button type="submit" variant="hero" disabled={status === "saving"}>
                  {status === "saving" ? "Sending…" : presentation.forms.contactSubmit}<Send aria-hidden="true" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}