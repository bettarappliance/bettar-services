# Bettar website integrations

Reviewed October 4, 2026. Internal systems confirmed by John: Microsoft 365, Jobber, QuickBooks Online, and Ply inventory. A system used internally is not necessarily connected directly to the website.

| Connection | Evidence in repository | What still needs confirmation |
| --- | --- | --- |
| Jobber service requests | `JobberRequestEmbed.tsx`, form ID 1652150 | End-to-end receipt, dispatch notifications, and appointment confirmation |
| Jobber appliance inquiries | `ApplianceRequestEmbed.tsx` and `ApplianceRequestModal.tsx`, form ID 2104262 | Which team receives sales inquiries and whether both forms are intended |
| Zapier service requests | Removed October 2026. The popup was an unconnected test (no Zap existed). All service buttons now link to `/request-service` (Jobber). | None |
| EmailJS contact messages | `ContactForm.tsx`, configured using environment variables | Recipient, template, and delivery monitoring |
| Google reCAPTCHA | Optional contact-form site key | Whether EmailJS verifies the submitted token |
| Firebase | Appliance catalog, gallery, and admin authentication | Preview environment settings, catalog source, and any synchronization with Ply |
| Google Analytics, Microsoft Clarity | Root layout | Current owners, consent configuration, and conversion tracking |
| Vercel Analytics and Speed Insights | Root layout | Access to reporting and preview team membership |
| Google Maps | Contact-page embed | Showroom location and displayed business details |
| Ply inventory | Confirmed by John; no direct Ply integration found in website source | Whether Ply syncs through Jobber, Zapier, another service, or manual operations |
| QuickBooks Online / Microsoft 365 | Confirmed internal systems; no direct integration found in website source | Any automations outside this repository |

## Changes in this draft

The repair embed no longer uses a global script-URL guard that could be triggered by the appliance inquiry embed. Its script is cleaned up on unmount so a return visit initializes a new container. A direct Jobber form link and telephone fallback remain visible. Request-page copy clarifies that an appointment requires confirmation.

## Service popup (removed)

The custom Zapier popup and `/api/service-request` route were removed. The Zapier catch hook had no Zap behind it, so submissions were not delivered anywhere. Every service button now links to the Jobber request form at `/request-service`.

## New customer paths and usability

The homepage links directly to repair, showroom visits, and property-manager service. `/showroom` provides product categories, directions, a visit checklist, installation planning, and a repair-or-replace explanation. Mobile navigation has a visible call action and Escape-to-close support. Desktop dropdowns can open with keyboard focus, and global focus indicators and reduced-motion styles improve accessibility.

## Validation

TypeScript and ESLint pass (one existing admin-page warning). No real webhook requests were sent. All literal internal links in the new pages and navigation resolve to existing routes. Local visual automation was unavailable because the runtime lacks a Chromium executable; visual review remains pending on the Vercel preview.

## Review before publishing

- Desktop and mobile: navigation, repair form, showroom path, sales inquiry, and commercial pages.
- Open an appliance inquiry, then navigate to repair requests; return to the repair page after leaving it. The form should appear on each visit.
- Confirm the direct-form fallback works and the phone link is usable on mobile.
- With the team's authorization, submit clearly labeled test requests to each active intake path and confirm receipt and follow-up. No test customer requests have been submitted by Codex.
- Ask Shaina to map Jobber → Ply → QuickBooks Online and any Microsoft 365 notifications; record confirmed connections rather than assuming them.
- Review the draft preview before merging to production.
