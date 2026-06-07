# R² CONSTRUCTION — PRD

## Original problem statement
> Make me a business portfolio website for R² CONSTRUCTION Remodeling and Renovation, make it so we can collect information for estimates and places to display our portfolio and showcase what we are cable of.

## User choices
- Services: All (Kitchen, Bathroom, Full home, Additions, Exterior/decks, Commercial)
- Phone: 719-499-6248 · Email: Emailhere@gmail.com
- Estimate flow: Save submissions to DB + admin page (no email notifications)
- Portfolio content: Professional placeholder images
- Visual style: Modern & premium — clean, editorial, high-end remodel feel

## Architecture
- Backend: FastAPI + MongoDB (motor). Single `estimates` collection. UUID ids, ISO datetimes.
- Frontend: React + Tailwind + Shadcn UI. Cormorant Garamond (display) + Outfit (body).
- Routes: `/` marketing site, `/admin` estimate admin (no auth, per spec).

## Implemented (initial release)
- Hero (full-bleed editorial, stats strip)
- Services (6 capability cards, asymmetric grid)
- Portfolio (filterable bento grid by category)
- About (editorial split with pull-quote)
- Testimonials (dark section, 3 cards)
- Estimate Form (name/email/phone/project_type/budget/timeline/address/message + toast feedback)
- Contact strip (phone, email, service area)
- Footer with admin link
- Admin: summary cards, table, status select (new/reviewed/contacted/closed), view dialog, delete with confirm, refresh

## API
- POST /api/estimates · GET /api/estimates · GET /api/estimates/{id}
- PATCH /api/estimates/{id} (status) · DELETE /api/estimates/{id}
- GET /api/estimates/stats/summary

## Backlog (P1/P2)
- P1: Email notifications on new estimate (Resend/SendGrid) and auto-reply to customer
- P1: Admin authentication (JWT or Emergent Google Auth)
- P1: Replace placeholder portfolio with real R² project photos + per-project detail pages
- P2: Before/after slider on portfolio items
- P2: Service area map and Google Reviews integration
- P2: SEO meta tags, sitemap, OG images

## Test credentials
N/A (no auth implemented yet).
