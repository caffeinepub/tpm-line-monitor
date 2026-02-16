# Specification

## Summary
**Goal:** Allow an existing Admin to identify the account for “Uday Chougule” and promote that user to the Admin role via backend APIs and the Admin > Users UI.

**Planned changes:**
- Add a backend admin-only API to promote a specified user (not the caller) to Admin, enforcing authorization checks.
- Add a backend admin-only query API to let Admins discover/resolve the Internet Identity principal for the profile named “Uday Chougule” (and prevent non-admin enumeration).
- Update the Admin > Users page to list/lookup users and provide a “Make Admin” action that calls the promotion API, shows success/error feedback in English, and refreshes role indicators after promotion.

**User-visible outcome:** An Admin can find the user profile for “Uday Chougule” in the Admin > Users area and promote that account to Admin, with clear UI feedback and updated role display.
