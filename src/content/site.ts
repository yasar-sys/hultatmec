// ✏️ Edit all website text, names and photos here.
// To change a photo: upload it, then point the `photo` field to the new image.
import directorPhoto from "@/assets/director.jpg.asset.json";
import deputy1Photo from "@/assets/deputy-1.jpg.asset.json";
import deputy2Photo from "@/assets/deputy-2.jpg.asset.json";
import hultLogoPink from "@/assets/hult-prize-logo-pink.png.asset.json";
import hultLogoGold from "@/assets/hult-prize-logo-gold.png.asset.json";
import mecLogo from "@/assets/mec-logo.svg.asset.json";
import ummahHostLogo from "@/assets/ummah-host-bd.jpg.asset.json";
import mecFrontPhoto from "@/assets/mec-campus-front.png.asset.json";
import hultFrontLockup from "@/assets/hult-prize-lockup-front.jpg.asset.json";
import eventCampus from "@/assets/event-campus-2022.jpg.asset.json";
import eventPresentation from "@/assets/event-presentation-2022.jpg.asset.json";
import eventSpeaker from "@/assets/event-speaker-2022.jpg.asset.json";
import eventTeam from "@/assets/event-team-2022.jpg.asset.json";
import eventWorkshop from "@/assets/event-workshop-2022.jpg.asset.json";

export const logos = {
  hult: hultLogoPink.url,
  hultAlt: hultLogoGold.url,
  mec: mecLogo.url,
  ummahHost: ummahHostLogo.url,
};
export const heroPhoto = mecFrontPhoto.url;
export const heroLockup = hultFrontLockup.url;

export const site = {
  name: "Hult Prize at MEC",
  tagline: "Ideas that change the world start on our campus",
  competitionDate: "2027-02-15T09:00:00+06:00",
  email: "hello@hultatmec.com",
  phone: "+880 1XXX-XXXXXX",
  whatsapp: "+8801865239302",
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
};

export const director = {
  name: "Samin Yasar Sunny",
  title: "Campus Director, Hult Prize at MEC",
  photo: directorPhoto.url,
  message:
    "Welcome to Hult Prize at MEC! Our campus is full of talented students with ideas that can solve real problems. This program is our chance to turn those ideas into action. Whether you are a coder, a designer, a photographer or a dreamer, there is a place for you here. Join us, build your team, and let's show the world what MEC can do.",
  linkedin: "https://linkedin.com/",
  facebook: "https://facebook.com/",
  email: "director@hultatmec.com",
};

export const deputies = [
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
];

export const stats = [
  { label: "Participants", value: 300, suffix: "+" },
  { label: "Teams", value: 60, suffix: "+" },
  { label: "Events", value: 3, suffix: "" },
  { label: "Partners", value: 8, suffix: "+" },
];

export const events = [
  { title: "Startup Idea Competition", date: "January 2027 (TBA)", description: "Pitch a startup that solves a real social problem. The best teams advance to the local final." },
  { title: "Photography Contest", date: "December 2026 (TBA)", description: "Capture the problems and hopes of our community through your lens." },
  { title: "Real-World Problem Solution Challenge", date: "January 2027 (TBA)", description: "Pick a local problem, research it, and design a practical, workable solution." },
];

export const journey = [
  { title: "Program Launch", date: "November 2026", text: "Official kickoff of Hult Prize at MEC." },
  { title: "Campus Promotion", date: "November – December 2026", text: "Info sessions, posters and class visits across campus." },
  { title: "Participant Recruitment", date: "December 2026", text: "Registration opens for every department and semester." },
  { title: "Team Formation", date: "December 2026", text: "Find teammates and lock in your team of 3–4." },
  { title: "Mentorship & Preparation Sessions", date: "January 2027", text: "Workshops on business models, pitching and impact." },
  { title: "Final Local Competition", date: "15 February 2027", text: "Teams pitch to judges. The winner moves on globally." },
];

export const outreach = {
  text: "We take the spirit of social entrepreneurship beyond our campus with workshops and seminars at 3–4 primary schools in Mymensingh, sparking curiosity and problem-solving in young minds.",
  schools: ["Primary School 1", "Primary School 2", "Primary School 3", "Primary School 4"],
};

export const sponsors = {
  "Official Domain & Hosting Partner": ["Ummah Host BD"],
} as Record<string, string[]>;

export const gallery: { src: string; caption: string; tall?: boolean }[] = [
  { src: eventPresentation.url, caption: "EF Hult Prize 2022 · Student presentation", tall: true },
  { src: eventCampus.url, caption: "EF Hult Prize 2022 · Campus team" },
  { src: eventSpeaker.url, caption: "EF Hult Prize 2022 · Student speaker", tall: true },
  { src: eventWorkshop.url, caption: "EF Hult Prize 2022 · Program session" },
  { src: eventTeam.url, caption: "EF Hult Prize 2022 · Participants", tall: true },
];

export const news = [
  { date: "27 Nov 2026", title: "Hult Prize at MEC is officially live", text: "We are proud to bring the world's largest student competition for social good to MEC." },
  { date: "Dec 2026", title: "Registration is now open", text: "Form your team of 3–4 and register before the deadline. It's completely free." },
  { date: "Coming soon", title: "Mentorship sessions announced", text: "Industry mentors will guide teams on business models and pitching." },
];

export const faqs = [
  { q: "Who can join?", a: "Any current student of Mymensingh Engineering College, from any department or semester." },
  { q: "Is it free?", a: "Yes. Participation in Hult Prize at MEC is completely free." },
  { q: "How do teams form?", a: "Teams have 3–4 members. Come with a team, or join our team-formation sessions to find teammates." },
  { q: "What are the prizes?", a: "Trophies for the top 3 teams, certificates for all participants, and mentorship. The winning team represents MEC at the next stage of the Hult Prize." },
];
