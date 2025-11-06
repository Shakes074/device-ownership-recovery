# Device Owner Dashboard PRD

## Overview
The Device Owner portal is a mobile-first dashboard where an owner can view and manage devices that were registered on their behalf by stores or system admins at the point of sale (POS). Owners can review device status (ACTIVE, LOST, STOLEN, RECOVERED, REPAIR_PENDING, REPAIR_ACTIVE, DAMAGED, ARCHIVED), see a status history, assign a device to a child, report lost/stolen, and initiate a repair flow with OTP confirmation. A High-Contrast mode is available throughout.
Policy constraint: Device Owners cannot self-register devices; registration is performed by stores/admins and the devices then appear in the owner’s dashboard.

## Navigation
- Top bar: Brand/title, optional back button, and a High-Contrast toggle in the header.
- Primary views: landing, auth (Register/Login + OTP), onboard (profile), dashboard (My Devices), lost, stolen, transfer, repair, children, archived, profile, about, support.
- Footer: About, Terms & Conditions, POPIA/Privacy, Disclaimer, and Technical Support (opens support form with screenshot upload).

## Sections
### My Devices
- Grid of cards showing an icon (phone/laptop/TV), purchase info, current status chip, and a “View details” action. If the device is assigned to a child, show the assignee label.
- Status set/colors: ACTIVE, LOST, STOLEN, RECOVERED, REPAIR_PENDING, REPAIR_ACTIVE, DAMAGED, ARCHIVED.
- Device detail actions:
  - Toggle QR visibility; add IMEI2 where applicable; assign to child.
  - Report Lost: upload affidavit (≤ 5 MB).
  - Report Stolen: police station autocomplete + case number hint (e.g., “CAS 123/01/2024”).
  - Send to Repair: capture company name, email, phone; confirm via OTP; status → REPAIR_PENDING and track milestones (Received → In Progress → Ready).
  - Transfer Ownership: two-step verification flow (initiator and recipient).
  - Status history timeline (e.g., Active → Damaged → Archived).

### Children & Delegates
- Children profiles: the owner may create up to two child profiles and assign devices to “owner” or a specific child.
- UI behavior: If no child exists, show a centered “Add child” card. After adding the first child, show the child card plus an additional “Add child” card until the limit is reached. Assignment happens from device details. (Ownership remains with the adult; this is organizational only.)
- Delegates (future/optional): trusted adults with limited permissions; high-risk actions (Transfer, Stolen) always require the primary owner’s OTP.

### Profile & Security
- Edit profile details (first/last name, email, phone) and notification preferences.
- Sensitive changes require OTP. High-Contrast preference is persisted in UI state.
- Security: change password, sign out from all sessions, view recent security events (logins, OTP verifications, failed attempts).

### Archived Devices
- Dedicated page lists archived devices with timestamps and reasons.
- Restore is allowed only if policies permit (e.g., not Stolen/Lost). If allowed, require OTP.
- For MVP, view only; export (CSV/PDF) can follow later.

### Log Out
- Invalidate session tokens, clear sensitive local state, and return to public entry.

## Form Enhancements
- Validation & accessibility: labeled inputs, helper text, keyboard-friendly controls.
- Stolen flow: station search and case-number format guidance.
- Repair flow: company name/email/phone required; OTP confirmation prior to submission.
- Lost report: affidavit file size limited to 5 MB.
- High-Contrast: global header toggle that consistently changes component styles.
- Error handling: generic auth errors to avoid account enumeration.
- Performance: disable submit during async; optimistic UI for status chips with rollback on failure.

## Success Criteria
- UX: Mobile-first; clear card layout; 1–2 taps to key actions.
- Accessibility: Meets WCAG 2.1 AA; High-Contrast mode and semantic labels.
- Performance: Snappy navigation and state updates on modest devices.
- Security: OTP verification for sensitive flows (lost/stolen/repair/transfer). Owner cannot alter immutable store-provided records; allowed actions (assignment, QR visibility) are tracked, and statusHistory is appended on changes.
- Policy adherence: Device registration is performed by stores/admins; owners only see linked devices.
