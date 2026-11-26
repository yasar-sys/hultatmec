import { useState } from "react";
import { Award, Calendar, Camera, GraduationCap, Medal, School, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { events, faqs, gallery, journey, logos, news, outreach, sponsors } from "@/content/site";
import { Reveal, SectionHeading } from "./helpers";

export function Events() {
  const icons = [Trophy, Camera, GraduationCap];
  return (
    <section id="events" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Events" title={<>Ways to <span className="text-gradient-pink">compete</span></>} intro="Three challenges. One campus. Pick yours." />
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((e, i) => {
            const I = icons[i] ?? Trophy;
            return (
              <Reveal key={e.title} delay={i * 100}>
                <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-card transition hover:-translate-y-1 hover:border-pink hover:shadow-glow">
                  <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-ink text-pink transition group-hover:bg-primary group-hover:text-primary-foreground"><I className="size-7" /></div>
                  <h3 className="text-xl font-bold text-card-foreground">{e.title}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{e.description}</p>
                  <p className="mt-5 flex items-center gap-2 text-sm font-medium text-card-foreground/80"><Calendar className="size-4 text-primary" /> {e.date}</p>
                  <Button asChild variant="hero" className="mt-6 self-start"><a href="#register">Join</a></Button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading light eyebrow="Program journey" title={<>From launch to <span className="text-gradient-pink">final</span></>} />
        <ol className="relative ml-4 border-l-2 border-pink/30 md:mx-auto md:ml-0 md:border-none">
          <span aria-hidden className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-pink to-pink/10 md:block" />
          {journey.map((j, i) => (
            <li key={j.title} className={`relative mb-10 pl-8 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}>
              <span className={`absolute -left-[9px] top-1.5 size-4 rounded-full bg-primary shadow-glow md:left-auto ${i % 2 ? "md:-left-2" : "md:-right-2"}`} />
              <Reveal delay={i * 60}>
                <p className="text-xs font-semibold uppercase tracking-widest text-pink">{j.date}</p>
                <h3 className="mt-1 text-xl font-bold">{j.title}</h3>
                <p className="mt-1 text-ink-foreground/65">{j.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Outreach() {
  return (
    <section id="outreach" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Community outreach</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-5xl">Inspiring the <span className="text-gradient-pink">next generation</span></h2>
          <p className="mt-5 text-lg text-muted-foreground">{outreach.text}</p>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {outreach.schools.map((s, i) => (
              <li key={i} className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-card"><School className="size-4 shrink-0 text-primary" /> {s}</li>
            ))}
          </ul>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {["Workshop", "Seminar", "Storytelling", "Idea lab"].map((t, i) => (
            <Reveal key={t} delay={i * 80} className={i % 2 ? "translate-y-8" : ""}>
              <div className="grid aspect-square place-items-center rounded-3xl bg-gradient-to-br from-pink-soft to-pink text-primary-foreground">
                <div className="text-center"><Camera className="mx-auto size-8 opacity-80" /><p className="mt-2 text-sm font-semibold">{t} photo</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Prizes() {
  const tiers = [
    { place: "1st", label: "Champion", icon: Trophy, perk: "Trophy, certificate, and a ticket to the next Hult Prize stage", big: true },
    { place: "2nd", label: "Runner-up", icon: Medal, perk: "Trophy and certificate" },
    { place: "3rd", label: "Second runner-up", icon: Award, perk: "Trophy and certificate" },
  ];
  return (
    <section id="prizes" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Prizes & recognition" title={<>Win <span className="text-gradient-pink">big</span>, grow bigger</>} intro="Every participant gets a certificate. The top teams get mentorship from industry experts." />
        <div className="grid items-end gap-6 md:grid-cols-3">
          {[tiers[1]!, tiers[0]!, tiers[2]!].map((t, i) => (
            <Reveal key={t.place} delay={i * 100}>
              <article className={`rounded-3xl p-8 text-center transition hover:-translate-y-1 hover:shadow-glow ${t.big ? "bg-ink py-12 text-ink-foreground shadow-glow" : "border border-border bg-card text-card-foreground shadow-card"}`}>
                <t.icon className={`mx-auto ${t.big ? "size-16" : "size-12"} text-primary`} />
                <p className="mt-4 font-display text-5xl font-black text-gradient-pink">{t.place}</p>
                <h3 className="mt-2 text-lg font-bold">{t.label}</h3>
                <p className={`mt-2 text-sm ${t.big ? "text-ink-foreground/70" : "text-muted-foreground"}`}>{t.perk}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Sponsors({ onPartner }: { onPartner: () => void }) {
  return (
    <section id="partners" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Sponsors & partners" title={<>Powered by <span className="text-gradient-pink">partners</span></>} />
        <div className="space-y-12">
          {Object.entries(sponsors).map(([tier, names], ti) => (
            <Reveal key={tier}>
              <h3 className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">{tier}</h3>
              <div className={`mx-auto grid gap-4 ${ti === 0 ? "max-w-md" : ti === 1 ? "max-w-sm" : "grid-cols-2 md:grid-cols-4"}`}>
                {names.map((n, i) => (
                  <div key={i} className={`grid place-items-center rounded-2xl border-2 bg-card font-display font-bold transition hover:border-pink ${n === "Ummah Host BD" ? "border-solid border-pink/30 text-card-foreground hover:text-card-foreground" : "border-dashed border-pink/30 text-card-foreground/40 hover:text-primary"} ${ti === 0 ? "h-36 text-xl" : "h-24"}`}>
                    {n === "Ummah Host BD" ? (
                      <span className="flex flex-col items-center gap-2">
                        <img src={logos.ummahHost} alt="" loading="lazy" className="size-16 rounded-lg object-cover" />
                        <span>{n}</span>
                      </span>
                    ) : n}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 rounded-3xl bg-hero p-10 text-center text-ink-foreground">
          <h3 className="text-2xl font-bold sm:text-3xl">Put your brand behind student changemakers</h3>
          <p className="mx-auto mt-3 max-w-lg text-ink-foreground/70">Reach hundreds of future engineers and support social impact on campus.</p>
          <Button variant="hero" size="xl" className="mt-6" onClick={onPartner}>Partner with us</Button>
        </Reveal>
      </div>
    </section>
  );
}

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const item = active !== null ? gallery[active] : undefined;
  return (
    <section id="gallery" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Gallery" title={<>Moments at <span className="text-gradient-pink">MEC</span></>} />
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {gallery.map((g, i) => (
            <Button key={i} type="button" variant="ghost" aria-label={`View ${g.caption}`} onClick={() => setActive(i)} className="group mb-4 block h-auto w-full break-inside-avoid overflow-hidden rounded-md p-0">
              <img src={g.src} alt={g.caption} loading="lazy" className={`w-full object-cover transition duration-500 group-hover:scale-105 ${g.tall ? "aspect-[3/4]" : "aspect-square"}`} />
            </Button>
          ))}
        </div>
      </div>
      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl border-none bg-ink p-2 text-ink-foreground">
          <DialogTitle className="sr-only">{item?.caption}</DialogTitle>
          {item && <img src={item.src} alt={item.caption} className="max-h-[80vh] w-full rounded-md object-contain" />}
          <p className="px-2 pb-1 text-center text-sm text-ink-foreground/70">{item?.caption}</p>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function News() {
  return (
    <section id="news" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="News & updates" title={<>Latest <span className="text-gradient-pink">updates</span></>} />
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.title} delay={i * 100}>
              <article className="glass h-full rounded-3xl p-7 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{n.date}</span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{n.title}</h3>
                <p className="mt-2 text-muted-foreground">{n.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title={<>Got <span className="text-gradient-pink">questions?</span></>} />
        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="rounded-2xl border border-border bg-card px-6 data-[state=open]:border-pink">
                <AccordionTrigger className="text-left font-display text-base font-semibold text-card-foreground hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
