import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Events, Faq, Gallery, Journey, News, Outreach, Prizes, Sponsors } from "@/components/site/middle";
import { About, Hero, Stats, Team } from "@/components/site/top";
import { Footer, Navbar, WhatsAppButton } from "@/components/site/layout";
import { ContactSection, PartnerRequestDialog, RegistrationForm } from "@/components/site/forms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hult Prize at MEC | Student Social Impact Competition" },
      { name: "description", content: "Join the EF Hult Prize campus program at Mymensingh Engineering College. Build a team, develop an idea for social impact, and compete in 2026/27." },
      { property: "og:title", content: "Hult Prize at MEC | Student Social Impact Competition" },
      { property: "og:description", content: "Join the EF Hult Prize campus program at Mymensingh Engineering College. Build a team, develop an idea for social impact, and compete in 2026/27." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [partnerOpen, setPartnerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero onPartner={() => setPartnerOpen(true)} />
        <About />
        <Team />
        <Stats />
        <Events />
        <Journey />
        <Outreach />
        <Prizes />
        <Sponsors onPartner={() => setPartnerOpen(true)} />
        <Gallery />
        <News />
        <Faq />
        <RegistrationForm />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <PartnerRequestDialog open={partnerOpen} onOpenChange={setPartnerOpen} />
    </div>
  );
}
