# Bettar website integrations

Reviewed October 4, 2026. Internal systems confirmed by John: Microsoft 365, Jobber, QuickBooks Online, and Ply inventory. A system used internally is not necessarily connected directly to the website.

| Connection | Evidence in repository | What still needs confirmation |
| --- | --- | --- |
| Jobber service requests | `JobberRequestEmbed.tsx`, form ID 1652150 | End-to-end receipt, dispatch notifications, and appointment confirmation |
| Jobber appliance inquiries | `ApplianceRequestEmbed.tsx` and `ApplianceRequestModal.tsx`, form ID 2104262 | Which team receives sales inquiries and whether both forms are intended |
| Zapier service requests | `RequestServiceModal.tsx` submits through `/api/service-request` to the existing catch hook | Owner, active status, destination actions, error monitoring, and whether it creates a Jobber request |
| EmailJS contact messages | `ContactForm.tsx`, configured using environment variables | Recipient, template, and delivery monitoring |
| Google reCAPTCHA | Optional contact-form site key | Whether EmailJS verifies the submitted token |
| Firebase | Appliance catalog, gallery, and admin authentication | Preview environment settings, catalog source, and any synchronization with Ply |
| Google Analytics, Microsoft Clarity | Root layout | Current owners, consent configuration, and conversion tracking |
| Vercel Analytics and Speed Insights | Root layout | Access to reporting and preview team membership |
| Google Maps | Contact-page embed | Showroom location and displayed business details |
| Ply inventory | Confirmed by John; no direct Ply integration found in website source | Whether Ply syncs through Jobber, Zapier, another service, or manual operations |
| QuickBooks Online / Microsoft 365 | Confirmed internal systems; no direct integration found in website source | Any automations outside this repository |

## Changes in this draft

The repair embed no longer uses a global script-URL guard that could be triggered by the appliance inquiry embed. Its script is cleaned up on unmount so a return visit initializes a new container. A direct Jobber form link and telephone fallback remain visible. Request-page copy clarifies that an appointment requires confirmation. The custom service popup no longer logs customer contact details to the browser console.

## Service popup reliability

The popup now waits for server-confirmed webhook acceptance before showing receipt. It preserves the existing Zapier destination and form-encoded field names. A failed or timed-out submission keeps the user's entries and shows a phone fallback; a timeout may still have been accepted upstream, so the message asks customers to call before retrying. The server validates the origin, expected fields, required details, email, consent, and payload size. Customer details are not logged. Duplicate clicks are disabled while sending, required fields are validated between steps, and checkbox consent is stored as a boolean.

Webhook acceptance does not confirm a downstream Jobber action or an appointment. Shaina still needs to verify the active automation and its notifications. `ZAPIER_SERVICE_REQUEST_WEBHOOK_URL` is an optional server-only override for the existing destination. No new external requests were sent during verification.

## New customer paths and usability

The homepage links directly to repair, showroom visits, and property-manager service. `/showroom` provides product categories, directions, a visit checklist, installation planning, and a repair-or-replace explanation. Mobile navigation has a visible call action and Escape-to-close support. Desktop dropdowns can open with keyboard focus, and global focus indicators and reduced-motion styles improve accessibility.

## Validation

TypeScript and ESLint pass (one existing admin-page warning). Six mocked service-request tests cover acceptance, upstream rejection, transport failure, origin validation, required fields/consent, and oversized or invalid payloads. No real webhook requests were sent. All literal internal links in the new pages and navigation resolve to existing routes. Local visual automation was unavailable because the runtime lacks a Chromium executable; visual review remains pending on the Vercel preview.

## Review before publishing

- Desktop and mobile: navigation, repair form, showroom path, sales inquiry, and commercial pages.
- Open an appliance inquiry, then navigate to repair requests; return to the repair page after leaving it. The form should appear on each visit.
- Confirm the direct-form fallback works and the phone link is usable on mobile.
- With the team's authorization, submit clearly labeled test requests to each active intake path and confirm receipt and follow-up. No test customer requests have been submitted by Codex.
- Ask Shaina to map Jobber → Ply → QuickBooks Online and any Microsoft 365 notifications; record confirmed connections rather than assuming them.
- Review the draft preview before merging to production.
