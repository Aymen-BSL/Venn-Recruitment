# Venn Recruitment Website

A responsive recruitment website for Venn Recruitment, connecting employers and candidates across the Middle East and international markets.

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- CSS Modules and Tailwind CSS 4
- GSAP for motion
- Lucide React icons

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Check the project with ESLint |

## Routes

| Route | Description |
| --- | --- |
| `/` | Main recruitment landing page |
| `/submit-cv` | Candidate CV submission page |
| `/hire-talent` | Employer hiring enquiry page |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms and conditions |
| `/cookie-policy` | Cookie policy |
| `/trust-and-safety` | Trust and safety policy |

## Project structure

```text
app/                  Next.js routes, metadata, and global styles
components/
  animation/          Reveal and hero motion components
  forms/              Contact, CV, and hiring forms
  graphics/           Hero and Venn intersection graphics
  interactive/        Interactive FAQ components
  layout/             Shared headers and page shells
  policies/           Shared policy page layout and content
  sections/           Landing-page sections
  ui/                 Reusable interface components
hooks/                Shared React hooks
public/media/         Video and image assets
docs/plans/           Design and implementation notes
```

## Forms

The Contact Us, Submit CV, and Hire Talent forms currently demonstrate frontend validation and confirmation states. They do not yet send submissions to a server.

Before launch, connect them to an approved email, CRM, ATS, or API endpoint and add server-side validation, file-size limits, spam protection, secure document storage, and error handling.

## Privacy and cookies

The current website does not set cookies or use browser storage for analytics, advertising, preferences, or cross-site tracking. If tracking or third-party embeds are introduced, update the Cookie Policy and add consent controls where required.

## Before production

- Replace placeholder contact details, office information, and operating hours.
- Replace placeholder root metadata and Open Graph copy in `app/layout.tsx`.
- Configure the real production domain in `metadataBase`.
- Connect and test all form submission endpoints.
- Confirm social profile URLs.
- Review the legal and policy drafts with qualified counsel.
- Run `npm run lint` and `npm run build`.

## Deployment

Build the project with:

```bash
npm run build
```

The application can be deployed to Vercel or another platform that supports Next.js applications.
