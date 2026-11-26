import { useEffect, useState } from "react";
import { Globe2, Lightbulb, Linkedin, Facebook, Mail, Quote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deputies, director, site, stats } from "@/content/site";
import { Counter, Reveal, SectionHeading } from "./helpers";

function useCountdown(target: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setLeft(Math.max(0, t - Date.now()));
    tick(); const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  const l = left ?? 0;
  return [
    ["Days", Math.floor(l / 864e5)], ["Hours", Math.floor(l / 36e5) % 24],
    ["Minutes", Math.floor(l / 6e4) % 60], ["Seconds", Math.floor(l / 1e3) % 60],
  ] as const;
}

const shapes = [
  "left-[8%] top-[18%] size-24 rounded-3xl", "right-[10%] top-[25%] size-16 rounded-full",
  "left-[20%] bottom-[18%] size-10 rounded-full", "right-[22%] bottom-[12%] size-28 rounded-[2rem]",
  "left-[48%] top-[12%] size-6 rounded-full", "right-[4%] top-[60%] size-8 rounded-lg",
];

export function Hero({ onPartner }: { onPartner: () => void }) {
  const cd = useCountdown(site.competitionDate);
  return (
    <section id="top" className="relative isolate overflow-hidden bg-hero pt-28 pb-20 text-ink-foreground sm:pt-36 sm:pb-28">
      {shapes.map((c, i) => (
        <span key={i} aria-hidden className={`absolute -z-10 border border-pink/40 bg-pink/15 animate-float ${c}`} style={{ animationDelay: `${i * -1.5}s`, animationDuration: `${8 + i}s` }} />
      ))}
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-ink-foreground/90">
            <span className="size-2 animate-pulse rounded-full bg-pink" /> Official EF Hult Prize campus program · 2026/27
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 text-5xl font-black leading-[0.95] sm:text-7xl md:text-8xl">
            Hult Prize <span className="text-gradient-pink">at MEC</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-foreground/75 sm:text-xl">{site.tagline}</p>
        </Reveal>
        <Reveal delay={300} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl"><a href="#register">Register Now</a></Button>
          <Button variant="heroOutline" size="xl" onClick={onPartner}>Become a Partner</Button>
        </Reveal>
        <Reveal delay={400} className="mt-14">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-pink-soft">Local competition · 15 February 2027</p>
          <div className="mx-auto grid max-w-lg grid-cols-4 gap-2 sm:gap-4">
            {cd.map(([label, v]) => (
              <div key={label} className="rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 px-2 py-4 backdrop-blur">
                <div className="font-display text-2xl font-bold tabular-nums sm:text-4xl">{String(v).padStart(2, "0")}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-ink-foreground/60 sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  const cards = [
    { icon: Globe2, title: "The Hult Prize", text: "The world's largest student competition for social good. Every year, thousands of students across 100+ countries build startups that tackle the world's toughest problems, competing for a US$1M prize." },
    { icon: Lightbulb, title: "Hult Prize at MEC", text: "The official campus program at Mymensingh Engineering College. We bring the global competition to our campus, helping MEC students form teams, sharpen ideas, and pitch for a place on the world stage." },
    { icon: Users, title: "Open to everyone", text: "Coders, designers, writers, photographers, dreamers. Every department and every semester is welcome. All you need is curiosity and the will to make an impact." },
  ];
  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="About" title={<>Business for <span className="text-gradient-pink">good</span></>} intro="Turning student ideas into startups that change lives." />
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="glass h-full rounded-3xl p-8 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-gradient-pink text-primary-foreground"><c.icon className="size-6" /></div>
                <h3 className="text-xl font-bold text-foreground">{c.title}</h3>
                <p className="mt-3 text-muted-foreground">{c.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Leadership" title={<>Meet our <span className="text-gradient-pink">team</span></>} intro="The people leading Hult Prize at MEC." />
        <Reveal>
          <article className="group grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-card transition hover:border-pink hover:shadow-glow sm:p-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-pink opacity-30 blur-2xl" aria-hidden />
              <img src={director.photo} alt={`${director.name}, ${director.title}`} loading="lazy" className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover object-top" />
            </div>
            <div>
              <Quote className="size-10 text-primary" aria-hidden />
              <p className="mt-4 text-lg leading-relaxed text-card-foreground/85">{director.message}</p>
              <h3 className="mt-6 text-2xl font-bold text-card-foreground sm:text-3xl">{director.name}</h3>
              <p className="font-medium text-primary">{director.title}</p>
              <div className="mt-6 flex gap-2">
                {[[Linkedin, director.linkedin, "LinkedIn"], [Facebook, director.facebook, "Facebook"], [Mail, `mailto:${director.email}`, "Email"]].map(([Icon, href, label]) => {
                  const I = Icon as typeof Mail;
                  return <a key={label as string} href={href as string} target="_blank" rel="noreferrer" aria-label={label as string} className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-glow"><I className="size-5" /></a>;
                })}
              </div>
            </div>
          </article>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {deputies.map((d, i) => (
            <Reveal key={d.name} delay={i * 120}>
              <article className="h-full rounded-[2rem] border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-pink hover:shadow-glow sm:p-8">
                <div className="flex items-center gap-5">
                  <img src={d.photo} alt={`${d.name}, ${d.title}`} loading="lazy" className="size-24 shrink-0 rounded-3xl object-cover object-top sm:size-28" />
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-card-foreground">{d.name}</h3>
                    <p className="text-sm font-medium text-primary">{d.title}</p>
                  </div>
                </div>
                <Quote className="mt-6 size-8 text-primary" aria-hidden />
                <p className="mt-2 text-card-foreground/80">{d.message}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="bg-ink py-14 text-ink-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl font-black text-gradient-pink sm:text-6xl"><Counter to={s.value} suffix={s.suffix} /></div>
            <div className="mt-2 text-sm uppercase tracking-widest text-ink-foreground/65">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
