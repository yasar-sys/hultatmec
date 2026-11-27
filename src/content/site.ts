// ✏️ Default website text, names and photos.
// The live copy is edited in the admin panel (Website content tab); these values are the
// starting point and the fallback for anything never edited.
import directorPhoto from "@/assets/director.jpg.asset.json";
import deputy1Photo from "@/assets/deputy-1.jpg.asset.json";
import deputy2Photo from "@/assets/deputy-2.jpg.asset.json";
import hultLockupWhite from "@/assets/hult-prize-lockup-white.png.asset.json";
import hultWordmarkIcon from "@/assets/hult-prize-wordmark-icon.png.asset.json";
import mecLogo from "@/assets/mec-logo.svg.asset.json";
import ummahHostLogo from "@/assets/ummah-host-bd.jpg.asset.json";
import mecFrontPhoto from "@/assets/mec-campus-front.png.asset.json";
import eventCampus from "@/assets/event-campus-2022.jpg.asset.json";
import eventPresentation from "@/assets/event-presentation-2022.jpg.asset.json";
import eventSpeaker from "@/assets/event-speaker-2022.jpg.asset.json";
import eventTeam from "@/assets/event-team-2022.jpg.asset.json";
import eventWorkshop from "@/assets/event-workshop-2022.jpg.asset.json";

export type Deputy = {
  name: string;
  title: string;
  photo: string;
  message: string;
};

export type SiteContent = {
  site: {
    name: string;
    tagline: string;
    competitionDate: string;
    email: string;
    phone: string;
    whatsapp: string;
    socials: { facebook: string; instagram: string; linkedin: string };
  };
  logos: { hult: string; hultAlt: string; mec: string; ummahHost: string };
  hero: {
    photo: string;
    lockup: string;
    badge: string;
    title: string;
    accent: string;
    countdownLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    cards: { title: string; text: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    director: {
      name: string;
      title: string;
      photo: string;
      message: string;
      linkedin: string;
      facebook: string;
      email: string;
    };
    deputies: Deputy[];
  };
  stats: { label: string; value: number; suffix: string }[];
  events: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    items: { title: string; date: string; description: string }[];
  };
  journey: {
    eyebrow: string;
    title: string;
    accent: string;
    items: { title: string; date: string; text: string }[];
  };
  outreach: {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    schools: string[];
    photos: { label: string; src: string }[];
  };
  prizes: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    tiers: { place: string; label: string; perk: string }[];
  };
  sponsors: {
    eyebrow: string;
    title: string;
    accent: string;
    ctaTitle: string;
    ctaText: string;
    tiers: { tier: string; partners: { name: string; logo: string }[] }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    accent: string;
    items: { src: string; caption: string; tall?: boolean }[];
  };
  news: {
    eyebrow: string;
    title: string;
    accent: string;
    items: { date: string; title: string; text: string }[];
  };
  faqs: {
    eyebrow: string;
    title: string;
    accent: string;
    items: { q: string; a: string }[];
  };
  register: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    note: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    place: string;
  };
};

export const defaultContent: SiteContent = {
  site: {
    name: "Hult Prize at MEC",
    tagline: "Ideas that change the world start on our campus",
    competitionDate: "2027-02-15T09:00:00+06:00",
    email: "efhultprizeatmec@gmail.com",
    phone: "+880 1XXX-XXXXXX",
    whatsapp: "+8801865239302",
    socials: {
      facebook: "https://www.facebook.com/share/19ppHVr3Sw/",
      instagram: "https://instagram.com/",
      linkedin: "https://www.linkedin.com/company/ef-hult-prize-mec/",
    },
  },
  logos: {
    hult: hultLockupWhite.url,
    hultAlt: hultWordmarkIcon.url,
    mec: mecLogo.url,
    ummahHost: ummahHostLogo.url,
  },
  hero: {
    photo: mecFrontPhoto.url,
    lockup: hultLockupWhite.url,
    badge: "Official EF Hult Prize campus program · 2026/27",
    title: "Hult Prize",
    accent: "at MEC",
    countdownLabel: "Local competition · 15 February 2027",
  },
  about: {
    eyebrow: "About",
    title: "Business for",
    accent: "good",
    intro: "Turning student ideas into startups that change lives.",
    cards: [
      {
        title: "The Hult Prize",
        text: "The world's largest student competition for social good. Every year, thousands of students across 100+ countries build startups that tackle the world's toughest problems, competing for a US$1M prize.",
      },
      {
        title: "Hult Prize at MEC",
        text: "The official campus program at Mymensingh Engineering College. We bring the global competition to our campus, helping MEC students form teams, sharpen ideas, and pitch for a place on the world stage.",
      },
      {
        title: "Open to everyone",
        text: "Coders, designers, writers, photographers, dreamers. Every department and every semester is welcome. All you need is curiosity and the will to make an impact.",
      },
    ],
  },
  team: {
    eyebrow: "Leadership",
    title: "Meet our",
    accent: "team",
    intro: "The people leading Hult Prize at MEC.",
    director: {
      name: "Samin Yasar Sunny",
      title: "Campus Director, Hult Prize at MEC",
      photo: directorPhoto.url,
      message:
        "Welcome to Hult Prize at MEC! Our campus is full of talented students with ideas that can solve real problems. This program is our chance to turn those ideas into action. Whether you are a coder, a designer, a photographer or a dreamer, there is a place for you here. Join us, build your team, and let's show the world what MEC can do.",
      linkedin: "https://www.linkedin.com/in/samin-yasar-sunny",
      facebook: "https://www.facebook.com/share/1Mb5Ud2o6Q/",
      email: "saminyasarsunny@gmail.com",
    },
    deputies: [
      {
        name: "Deputy Director Name 1",
        title: "Deputy Director, Hult Prize at MEC",
        photo: deputy1Photo.url,
        message:
          "Great ideas become real when a team believes in them. We are here to guide you at every step, from forming your team to pitching on the final day.",
      },
      {
        name: "Deputy Director Name 2",
        title: "Deputy Director, Hult Prize at MEC",
        photo: deputy2Photo.url,
        message:
          "Hult Prize teaches you teamwork, leadership and how to think about the problems around us. Come with curiosity and we will help you take it forward.",
      },
    ],
  },
  stats: [
    { label: "Participants", value: 300, suffix: "+" },
    { label: "Teams", value: 60, suffix: "+" },
    { label: "Events", value: 3, suffix: "" },
    { label: "Partners", value: 8, suffix: "+" },
  ],
  events: {
    eyebrow: "Events",
    title: "Ways to",
    accent: "compete",
    intro: "Three challenges. One campus. Pick yours.",
    items: [
      {
        title: "Startup Idea Competition",
        date: "January 2027 (TBA)",
        description: "Pitch a startup that solves a real social problem. The best teams advance to the local final.",
      },
      {
        title: "Photography Contest",
        date: "December 2026 (TBA)",
        description: "Capture the problems and hopes of our community through your lens.",
      },
      {
        title: "Real-World Problem Solution Challenge",
        date: "January 2027 (TBA)",
        description: "Pick a local problem, research it, and design a practical, workable solution.",
      },
    ],
  },
  journey: {
    eyebrow: "Program journey",
    title: "From launch to",
    accent: "final",
    items: [
      { title: "Program Launch", date: "November 2026", text: "Official kickoff of Hult Prize at MEC." },
      { title: "Campus Promotion", date: "November – December 2026", text: "Info sessions, posters and class visits across campus." },
      { title: "Participant Recruitment", date: "December 2026", text: "Registration opens for every department and semester." },
      { title: "Team Formation", date: "December 2026", text: "Find teammates and lock in your team of 3–4." },
      { title: "Mentorship & Preparation Sessions", date: "January 2027", text: "Workshops on business models, pitching and impact." },
      { title: "Final Local Competition", date: "15 February 2027", text: "Teams pitch to judges. The winner moves on globally." },
    ],
  },
  outreach: {
    eyebrow: "Community outreach",
    title: "Inspiring the",
    accent: "next generation",
    text: "We take the spirit of social entrepreneurship beyond our campus with workshops and seminars at 3–4 primary schools in Mymensingh, sparking curiosity and problem-solving in young minds.",
    schools: ["Primary School 1", "Primary School 2", "Primary School 3", "Primary School 4"],
    photos: [
      { label: "Workshop photo", src: "" },
      { label: "Seminar photo", src: "" },
      { label: "Storytelling photo", src: "" },
      { label: "Idea lab photo", src: "" },
    ],
  },
  prizes: {
    eyebrow: "Prizes & recognition",
    title: "Win",
    accent: "big, grow bigger",
    intro: "Every participant gets a certificate. The top teams get mentorship from industry experts.",
    tiers: [
      { place: "1st", label: "Champion", perk: "Trophy, certificate, and a ticket to the next Hult Prize stage" },
      { place: "2nd", label: "Runner-up", perk: "Trophy and certificate" },
      { place: "3rd", label: "Second runner-up", perk: "Trophy and certificate" },
    ],
  },
  sponsors: {
    eyebrow: "Sponsors & partners",
    title: "Powered by",
    accent: "partners",
    ctaTitle: "Put your brand behind student changemakers",
    ctaText: "Reach hundreds of future engineers and support social impact on campus.",
    tiers: [
      {
        tier: "Official Domain & Hosting Partner",
        partners: [{ name: "Ummah Host BD", logo: ummahHostLogo.url }],
      },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Moments at",
    accent: "MEC",
    items: [
      { src: eventPresentation.url, caption: "EF Hult Prize 2022 · Student presentation", tall: true },
      { src: eventCampus.url, caption: "EF Hult Prize 2022 · Campus team" },
      { src: eventSpeaker.url, caption: "EF Hult Prize 2022 · Student speaker", tall: true },
      { src: eventWorkshop.url, caption: "EF Hult Prize 2022 · Program session" },
      { src: eventTeam.url, caption: "EF Hult Prize 2022 · Participants", tall: true },
    ],
  },
  news: {
    eyebrow: "News & updates",
    title: "Latest",
    accent: "updates",
    items: [
      { date: "27 Nov 2026", title: "Hult Prize at MEC is officially live", text: "We are proud to bring the world's largest student competition for social good to MEC." },
      { date: "Dec 2026", title: "Registration is now open", text: "Form your team of 3–4 and register before the deadline. It's completely free." },
      { date: "Coming soon", title: "Mentorship sessions announced", text: "Industry mentors will guide teams on business models and pitching." },
    ],
  },
  faqs: {
    eyebrow: "FAQ",
    title: "Got",
    accent: "questions?",
    items: [
      { q: "Who can join?", a: "Any current student of Mymensingh Engineering College, from any department or semester." },
      { q: "Is it free?", a: "Yes. Participation in Hult Prize at MEC is completely free." },
      { q: "How do teams form?", a: "Teams have 3–4 members. Come with a team, or join our team-formation sessions to find teammates." },
      { q: "What are the prizes?", a: "Trophies for the top 3 teams, certificates for all participants, and mentorship. The winning team represents MEC at the next stage of the Hult Prize." },
    ],
  },
  register: {
    eyebrow: "Registration · 2026/27",
    title: "Bring your idea to the",
    accent: "starting line",
    intro: "Register your team for Hult Prize at MEC. Every department and semester is welcome.",
    note: "Teams have 3–4 members. Participation is free.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's",
    accent: "connect",
    intro: "Questions about joining, mentoring, or working with the program? Send us a message.",
    place: "Mymensingh Engineering College, Bangladesh",
  },
};

// Backwards-compatible views of the same content, so the existing section components keep working.
export const site = defaultContent.site;
export const logos = defaultContent.logos;
export const heroPhoto = defaultContent.hero.photo;
export const heroLockup = defaultContent.hero.lockup;
export const director = defaultContent.team.director;
export const deputies = defaultContent.team.deputies;
export const stats = defaultContent.stats;
export const events = defaultContent.events.items;
export const journey = defaultContent.journey.items;
export const outreach = defaultContent.outreach;
export const sponsors: Record<string, string[]> = Object.fromEntries(
  defaultContent.sponsors.tiers.map((t) => [t.tier, t.partners.map((p) => p.name)]),
);
export const gallery = defaultContent.gallery.items;
export const news = defaultContent.news.items;
export const faqs = defaultContent.faqs.items;
