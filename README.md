# Hult Mec Impact Hub

Build a stunning, modern, fully responsive website for "Hult Prize at MEC", the official campus program of the EF Hult Prize at Mymensingh Engineering College (MEC), Bangladesh. Domain: hultatmec.com.

GOAL
Promote the program, recruit participants, let teams register, introduce the leadership team and showcase sponsors. It must feel professional, bold and youthful, like a global startup-competition brand.

THEME (strict): PINK + BLACK + WHITE only
- Primary: hot pink (#FF2E93). Soft pink (#FFB3D9) for light highlights and backgrounds.
- Black (#0A0A0A) for the navbar, hero, footer and dark sections.
- White (#FFFFFF) for light sections and cards.
- No other brand colors. Buttons are pink with white text and a pink glow on hover. Use pink-to-black gradients in the hero.
- Fonts: Poppins or Inter for body, a bold display font for headings.
- Mobile-first design, sticky navbar with a pink "Register Now" button, smooth-scroll anchors, a dark/light mode toggle in the same palette, smooth scroll animations (fade/slide-in), glassmorphism cards, rounded corners, and a subtle animated background (floating pink shapes or particles) in the hero.

SECTIONS (single page, sticky nav)
1. Hero: headline "Hult Prize at MEC", tagline "Ideas that change the world start on our campus", buttons "Register Now" and "Become a Partner", and a live countdown to 15 February 2027 (local competition day).
2. About: what the Hult Prize is (the world's largest student competition for social good) and what Hult Prize at MEC is.
3. Meet Our Team (right after About, also in the navbar):
   A) Campus Director, a large featured card with a big rounded photo on the left (placeholder image slot) and text on the right:
      - Name: Samin Yasar Sunny
      - Title: Campus Director, Hult Prize at MEC
      - Message: "Welcome to Hult Prize at MEC! Our campus is full of talented students with ideas that can solve real problems. This program is our chance to turn those ideas into action. Whether you are a coder, a designer, a photographer or a dreamer, there is a place for you here. Join us, build your team, and let's show the world what MEC can do."
      - Pink social icon buttons (LinkedIn, Facebook, Email).
   B) Two Deputy Directors, side by side (stacked on mobile), each with a photo slot, name, title and message:
      - "Deputy Director Name 1", Deputy Director, Hult Prize at MEC. Message: "Great ideas become real when a team believes in them. We are here to guide you at every step, from forming your team to pitching on the final day."
      - "Deputy Director Name 2", Deputy Director, Hult Prize at MEC. Message: "Hult Prize teaches you teamwork, leadership and how to think about the problems around us. Come with curiosity and we will help you take it forward."
      Cards have a pink border/glow on hover and a pink quote icon.
   All names, titles, messages and the three photos must be easy to edit, with image upload slots.
4. Stats strip: animated counters (Participants, Teams, Events, Partners) with editable placeholder numbers.
5. Events: 3 cards: "Startup Idea Competition", "Photography Contest", "Real-World Problem Solution Challenge". Each has a short description, date placeholder and "Join" button.
6. Program Journey: animated vertical timeline: Program Launch, Campus Promotion, Participant Recruitment, Team Formation, Mentorship & Preparation Sessions, Final Local Competition (15 Feb 2027).
7. Community Outreach: workshops and seminars at 3-4 primary schools, with a photo grid placeholder.
8. Prizes and Recognition: trophies for the top 3 winners, certificates, mentorship.
9. Registration: clean form (Team name, Leader name, Department, Semester, Phone, Email, Team members, Idea in 2 lines). Save submissions to the Lovable Cloud/Supabase database, show a success message, and add a password-protected admin page to view and export registrations as CSV.
10. Sponsors and Partners: logo grid with tiers (Title Partner, Official Domain & Hosting Partner, Supporting Partners) and a "Partner with us" CTA that opens a contact form.
11. Gallery: masonry photo grid with lightbox.
12. News/Updates: 3 announcement cards, easy to edit.
13. FAQ: accordion (Who can join? Is it free? How do teams form? What are the prizes?).
14. Contact: form, email, social icons (Facebook, Instagram, LinkedIn, WhatsApp) and a Google Maps embed for Mymensingh Engineering College.
15. Footer: EF Hult Prize and MEC logo slots, quick links, "Official Hult Prize campus program at MEC", copyright 2026/27.

EXTRAS
- SEO: proper title, meta description, Open Graph image, favicon, semantic HTML.
- Lazy-loaded images, good contrast, alt text.
- Floating WhatsApp chat button in pink.
- Use clear placeholder content where real data is missing.

Tech: React + Tailwind + shadcn/ui, clean component-based code. 1st charecter director

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hult-mec-impact-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f2f90237-bad4-419c-9520-4f1169858436).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
