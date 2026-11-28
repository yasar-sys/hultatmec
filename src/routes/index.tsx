import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { websiteContentOptions } from "@/lib/content.functions";
import { SiteContentContext } from "@/content/context";
import { defaultContent, type SectionId } from "@/content/site";
import { createFileRoute } from "@tanstack/react-router";
import { Events, Faq, Gallery, Journey, News, Outreach, Prizes, Sponsors } from "@/components/site/middle";
import { About, Hero, Stats, Team } from "@/components/site/top";
import { Footer, Navbar, WhatsAppButton } from "@/components/site/layout";
import { ContactSection, PartnerRequestDialog, RegistrationForm } from "@/components/site/forms";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(websiteContentOptions()),
  head: ({ loaderData }) => {
    const content = loaderData ?? defaultContent;
    const title = content.presentation.seo.title;
    const description = content.presentation.seo.description;
    return ({
    meta: [
      { title: title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...(/^https:\/\//.test(content.hero.photo) ? [{ property: "og:image", content: content.hero.photo }, { name: "twitter:image", content: content.hero.photo }] : []),
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }); },
  component: Index,
});

function Index() {
  const { data: content } = useSuspenseQuery(websiteContentOptions());
  const [partnerOpen, setPartnerOpen] = useState(false);

  const sections: Record<SectionId, React.ReactNode> = {
    hero: <Hero onPartner={() => setPartnerOpen(true)} />, about: <About />, team: <Team />, stats: <Stats />,
    events: <Events />, journey: <Journey />, outreach: <Outreach />, prizes: <Prizes />,
    sponsors: <Sponsors onPartner={() => setPartnerOpen(true)} />, gallery: <Gallery />, news: <News />,
    faqs: <Faq />, register: <RegistrationForm />, contact: <ContactSection />,
  };
  return (
    <SiteContentContext.Provider value={content}>
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {content.presentation.sections.filter(s => s.visible).map(s => <div key={s.id}>{sections[s.id]}</div>)}
      </main>
      <Footer />
      <WhatsAppButton />
      <PartnerRequestDialog open={partnerOpen} onOpenChange={setPartnerOpen} />
    </div>
    </SiteContentContext.Provider>
  );
}
