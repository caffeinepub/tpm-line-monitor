# Specification

## Summary
**Goal:** Let the currently signed-in Internet Identity user self-promote to Admin so backend authorization and frontend role-based navigation reflect Admin access persistently.

**Planned changes:**
- Add a backend shared update method in `backend/main.mo` to promote the authenticated caller principal to Admin in the canister’s authorization state, returning a clear success/failure result.
- Ensure existing backend admin checks and any `getCallerUserRole()` logic recognize the promoted principal as Admin without breaking existing profile read/write APIs.
- Add a frontend “Become Admin” UI action for signed-in users that calls the backend promotion API, shows loading state, handles success/error, updates the existing role store to `admin`, and navigates to an admin route.
- Ensure Admin access persists after refresh by relying on backend role state so admin navigation/pages remain accessible without repeating the action.

**User-visible outcome:** A signed-in user can click “Become Admin”; on success they are treated as an Admin (including after refresh) and can access admin navigation and admin pages, while failures show an English error and do not change their role.
