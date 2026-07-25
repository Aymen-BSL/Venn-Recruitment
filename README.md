# Venn Recruitment Website

A responsive recruitment website for Venn Recruitment, connecting employers and candidates across the Middle East and international markets.

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- CSS Modules and Tailwind CSS 4
- GSAP for motion
- Lucide React icons
- Zod validation and Supabase Postgres/Storage
- Vitest and Testing Library

## Getting started

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env.local` and provide the server-only Supabase and ClickUp values. Generate both maintenance secrets with a cryptographically secure password generator; each must be at least 32 characters. Never prefix a secret with `NEXT_PUBLIC_`.

Apply the SQL files in order through the Supabase SQL Editor:

1. `supabase/migrations/202607220001_form_submissions.sql`
2. `supabase/migrations/202607220002_submission_retention.sql`
3. `supabase/migrations/20260722165258_clickup_delivery.sql`
4. `supabase/migrations/20260722175400_fix_clickup_delivery_composite_return.sql`

All migrations are transactional. The first creates the restricted tables, RPC functions, RLS configuration, and private `candidate-cvs` bucket. The second adds the 12-month retention functions. The third adds atomic ClickUp delivery claims and separate task/chat checkpoints, and the fourth corrects composite claim handling for the deployed Phase 6 functions. If local Supabase is available, the same migrations and pgTAP tests can be run through the CLI; Docker is not required for normal application development.

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
| `npm test` | Run all unit and interaction tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:db` | Run Supabase pgTAP tests against a local stack |

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
  graphics/           Hero media components
  interactive/        Interactive FAQ components
  layout/             Shared headers and page shells
  policies/           Shared policy page layout and content
  sections/           Landing-page sections
  ui/                 Reusable interface components
hooks/                Shared React hooks
public/brand/         Venn wordmark and mark variants
public/media/         Optimized video and image assets
public/venn-favicon.svg Branded browser favicon
lib/clickup/          Safe task mapping, API client, and durable delivery
lib/forms/            Validation, action-state, and anti-spam contracts
lib/storage/          Private CV validation and storage operations
lib/submissions/      Typed Supabase persistence and retention operations
supabase/              Database migrations, configuration, and SQL tests
```

## Forms

The Contact Us, Submit CV, and Hire Talent forms validate on the server and persist through restricted Supabase RPC functions. Browser code cannot query or insert submission records directly. Request IDs make genuine retries idempotent, and signed form-start tokens plus honeypots reject simple automated abuse.

CVs are limited to 3 MB and accepted only when their extension, browser MIME, and detected file signature agree for PDF, DOC, or DOCX. Accepted files use randomized paths in the private configured Storage bucket. If database persistence fails, the uploaded object is removed on a best-effort basis. CVs are never exposed through permanent public URLs.

Supabase remains the source of truth. After persistence, the server makes one best-effort ClickUp delivery attempt. A ClickUp outage never changes the successful response shown to the submitter: the database record stays queued for a later retry. Candidate tasks state that the CV is privately stored but never include the CV attachment, bucket name, or object path.

## ClickUp notifications

Create three ClickUp lists for the durable work queue and one Chat channel named `Venn Website Notifications`. Set their IDs, the workspace ID, and channel ID in `.env.local`. For this single internal integration, use a current ClickUp personal API token: in ClickUp open **Settings → Apps**, then generate or copy the API token. OAuth is only needed if the application will connect accounts for multiple ClickUp users.

Every submission creates a task in its matching Contact, Candidate, or Hiring list, followed by a short message in the notification channel linking to that task. Task and chat IDs are checkpointed separately, so a chat retry does not recreate an already-recorded task. The ClickUp Chat API is currently experimental; keep the task lists as the durable operational record.

Call the protected retry endpoint from the production scheduler every five minutes:

```text
POST /api/internal/clickup/retry
Authorization: Bearer <CLICKUP_RETRY_SECRET>
```

Each call atomically claims at most 10 due records. Transient failures (network errors, rate limits, and server errors) use capped exponential backoff; permanent configuration or authorization failures remain failed until corrected. Responses contain counts only. Rotate `CLICKUP_API_TOKEN` and `CLICKUP_RETRY_SECRET` in ClickUp/hosting and `.env.local`, restart or redeploy, then run an authorized retry.

## Retention maintenance

Submissions and private CVs are eligible for deletion after 12 months. Call the protected endpoint once per day from the production hosting scheduler:

```text
POST /api/internal/retention
Authorization: Bearer <RETENTION_MAINTENANCE_SECRET>
```

Each call examines at most 100 records. Candidate objects are deleted before their database rows; failed object deletions are deferred so the next run can retry safely. The response contains counts only and never returns submitted personal data. The hosting scheduler itself is not configured in this repository because it depends on the selected deployment provider.

Rotate `SUPABASE_SECRET_KEY` and `RETENTION_MAINTENANCE_SECRET` in the Supabase/hosting dashboards and `.env.local` without committing their values. Restart or redeploy the application after rotation, then verify one form submission and one authorized maintenance request.

## Privacy and cookies

The current form architecture does not set cookies or use browser storage for analytics, advertising, preferences, or cross-site tracking. If tracking or third-party embeds are introduced, update the Cookie Policy and add consent controls where required. The policy text is a working draft and requires qualified legal review before launch.

## Before production

- Replace placeholder contact details, office information, and operating hours.
- Update `metadataBase` and canonical URLs when moving from the current Vercel URL to a custom production domain.
- Configure `RETENTION_MAINTENANCE_SECRET` and a daily maintenance scheduler.
- Apply all four Supabase migrations and run all three SQL test files.
- Test all three form workflows against the non-production Supabase project.
- Configure the ClickUp token, workspace/channel/list IDs, and retry scheduler.
- Create one task of each type, test a temporary bad token, restore it, and verify retries create no duplicate tasks.
- Confirm social profile URLs.
- Review the legal and policy drafts with qualified counsel.
- Run `npm run lint` and `npm run build`.

## Deployment

Build the project with:

```bash
npm run build
```

The application can be deployed to Vercel or another platform that supports Next.js applications.
