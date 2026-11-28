import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/content/context";
import { SocialIcon } from "./helpers";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="grid size-9 place-items-center rounded-full border border-ink-foreground/20 text-ink-foreground transition hover:border-pink hover:text-pink">
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function Navbar() {
  const { site, logos, presentation } = useSiteContent();
  const links = presentation.navigation;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-ink/85 backdrop-blur-xl border-b border-ink-foreground/10" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <img src={logos.mec} alt="MEC logo" className="size-9 shrink-0" />
          <img src={logos.hultAlt} alt="EF Hult Prize logo" loading="lazy" className="hidden h-7 w-auto shrink-0 sm:block" />
          <span className="truncate font-display text-sm font-bold text-ink-foreground sm:text-base">{site.name}</span>
        </a>
        <ul className="hidden items-center gap-5 xl:flex">
          {links.map(({label: l, href: h}) => (
            <li key={h}><a href={h} className="text-sm text-ink-foreground/75 transition hover:text-pink">{l}</a></li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex"><a href="#register">{presentation.buttons.register}</a></Button>
          <button className="grid size-9 place-items-center text-ink-foreground xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-ink-foreground/10 bg-ink px-4 pb-6 xl:hidden">
          <ul className="grid gap-1 py-3">
            {links.map(({label: l, href: h}) => (
              <li key={h}><a onClick={() => setOpen(false)} href={h} className="block rounded-lg px-3 py-2 text-ink-foreground/85 hover:bg-ink-foreground/5 hover:text-pink">{l}</a></li>
            ))}
          </ul>
          <Button asChild variant="hero" className="w-full"><a href="#register" onClick={() => setOpen(false)}>{presentation.buttons.register}</a></Button>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { site, logos, presentation } = useSiteContent();
  const links = presentation.navigation;
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logos.hult} alt="EF Hult Prize logo" loading="lazy" className="h-12 w-auto" />
            <img src={logos.mec} alt="Mymensingh Engineering College logo" loading="lazy" className="size-12" />
          </div>
          <p className="mt-5 max-w-xs text-sm text-ink-foreground/65">{presentation.footer.text}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-pink">{presentation.footer.linksTitle}</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-ink-foreground/70">
            {links.map(({label: l, href: h}) => <li key={h}><a href={h} className="hover:text-pink">{l}</a></li>)}
            <li><a href="#register" className="hover:text-pink">Register</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-pink">{presentation.footer.connectTitle}</h3>
          <p className="text-sm text-ink-foreground/70">{site.email}</p>
          <div className="mt-4 flex gap-2">
            {(["facebook", "instagram", "linkedin"] as const).map((s) => (
              <a key={s} href={site.socials[s]} target="_blank" rel="noreferrer" aria-label={s} className="grid size-10 place-items-center rounded-full bg-ink-foreground/10 transition hover:bg-pink hover:shadow-glow"><SocialIcon name={s} /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-6 text-center text-xs text-ink-foreground/50">
        {presentation.footer.copyright}
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  const { site } = useSiteContent();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const forms = document.querySelectorAll<HTMLElement>("#register, #contact");
    if (forms.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => setVisible(!entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.01 },
    );
    forms.forEach((form) => observer.observe(form));
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition hover:scale-110 sm:size-14 [&_svg]:size-6">
      <SocialIcon name="whatsapp" />
    </a>
  );
}
