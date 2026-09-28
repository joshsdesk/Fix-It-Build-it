# Admin Authentication Setup

The admin area uses two fixed usernames (`JoshsDesk` and `MarysDesk`), password hashes in D1, and signed eight-hour HttpOnly sessions. Passwords are never stored in plaintext. Each account can change its own password from `/admin/settings`.

## Before deploying

1. In Cloudflare Pages, open the project settings and add these as **Secrets** for every environment you plan to use (Production and Preview):
   - `ADMIN_SESSION_SECRET`: a new random value of at least 32 characters.
   - `ADMIN_BOOTSTRAP_TOKEN`: a separate, one-time random value of at least 32 characters.
2. Apply the additive D1 migration from the repository root:

   ```sh
   pnpm exec wrangler d1 migrations apply purple-db --remote
   ```

3. Deploy the application. The admin route fails closed until the session secret and database migration are available.

## Create the two accounts

1. Visit `/admin/setup` on the deployed site.
2. Enter the `ADMIN_BOOTSTRAP_TOKEN` value from Cloudflare and choose a separate, new password for each desk account. Passwords must be at least 12 characters.
3. After setup succeeds, remove `ADMIN_BOOTSTRAP_TOKEN` from the Cloudflare Pages environment. Account creation is one-time; the endpoint refuses to run again after the two users exist.
4. Visit `/admin` and sign in. Use `/admin/settings` to change the signed-in account's password; changing it signs that account out on other devices.

Do not reuse passwords that were previously pasted into chat. Generate and enter fresh values directly in Cloudflare and the setup page; do not put secrets in source files or commits. Add a Cloudflare rate-limiting rule for `POST /api/admin/login` as an additional defense against password guessing.

## Local development

Copy `.dev.vars.example` to `.dev.vars`, fill in fresh local-only values for both admin secrets, and apply the D1 migrations locally before running Pages Functions. `.dev.vars` is ignored by Git.
