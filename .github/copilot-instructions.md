# Copilot Instructions

This repository is a Laravel 13 app with an Inertia + Vue 3 frontend.

- Backend routes are defined in `routes/web.php`.
  - Public pages: `/` → `AdminPageController@home`, `/admin/login` → `AdminPageController@login`
  - Auth-protected admin area: `/admin` + API POST endpoints under `/api/services` and `/api/vacancies`
  - Login endpoint: `/api/admin/login`

- Frontend pages live in `resources/js/Pages/*/index.vue`.
  - Inertia page resolution is done in `resources/js/app/entry.ts` using `resolvePageComponent('./Pages/${name}/index.vue', import.meta.glob('./Pages/**/*.vue'))`.
  - Shared UI components and utilities are under `resources/js/shared/*`.
  - Use `@` alias for `resources/js` imports, e.g. `@/shared/lib/fetch`.

- Data flow and architecture:
  - Controllers accept validated `App\Http\Requests\*Request` objects.
  - Business logic lives in `app/Services` and persistence in `app/Repositories`.
  - Repositories are simple wrappers around Eloquent models (`App\Models\Service`, `App\Models\Vacancy`).
  - Auth flow is session-based: `App\Services\AdminAuthService` checks `User` by email or name and logs in with `Auth::login()`.

- Frontend API conventions:
  - Use `resources/js/shared/lib/fetch.ts` `postJson()` for POST requests.
  - CSRF token is read from `<meta name="csrf-token" ...>` in `resources/views/app.blade.php`.
  - Error handling in pages expects API responses with `message` and status codes.

- Build and developer commands:
  - `npm run dev` starts Vite dev server.
  - `npm run build` builds frontend assets.
  - `composer test` runs Laravel tests via `php artisan test`.
  - `composer setup` is available to bootstrap the project (`composer install`, `.env` creation, migrations, `npm install`, build).

- Important conventions:
  - Keep backend validation in `app/Http/Requests/*` and return user-facing errors from controllers.
  - Keep reusable UI logic in `resources/js/shared/ui` and utility code in `resources/js/shared/lib`.
  - Page names in Inertia must match folder names under `resources/js/Pages`.
  - API endpoints and admin panel actions are implemented via POST requests, not GET updates.

If anything here is unclear or incomplete, please point to the section and I will refine it further.
