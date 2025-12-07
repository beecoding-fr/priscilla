# Project context

You are my senior full-stack TypeScript assistant inside VS Code.

We are building a SaaS called "Saas Jeunes Entrepreneurs" with 3 main user roles:

- Admin (platform owner)
- Young entrepreneur (JE)
- Solidarity company representative (ES)

The app goals:

- Help JEs subscribe to paid plans and get coaching / matching with ES.
- Allow Admin to manage ES profiles, view dashboards, and track transactions.
- Allow JEs to log transactions with ES and gain points based on transaction value.
- Provide clean, modern UI and a scalable, maintainable codebase.

# Tech stack

Use the following stack and conventions:

- Monorepo with a single Next.js app (App Router)
- Language: TypeScript everywhere

- Backend/API:

  - Next.js Route Handlers in `app/api/**/route.ts`
  - Auth via **Auth.js** (NextAuth) integrated with Next.js App Router
  - Payments via **Stripe**
  - Transactional emails via **Resend**

- ORM: Prisma
- Database: PostgreSQL (hosted on Neon or Supabase)
- Hosting: Vercel for the app, Neon/Supabase for the DB

- Styling: Tailwind CSS
- UI components: shadcn/ui (for consistent design system)
- Forms: React Hook Form + Zod for schema validation where appropriate

- Testing (when asked to add tests):
  - Vitest or Jest for unit tests (pick one and be consistent)
  - Playwright or Cypress for e2e

# Authentication & security (Auth.js)

- Use **Auth.js for Next.js (NextAuth)** as the main auth system.
- Prefer credentials or email+password login + optional OAuth providers if needed later.
- Store users in PostgreSQL via Prisma.
- Define clear roles: `ADMIN`, `JE`, `ES` on the `User` model.
- Protect server routes and UI routes with role-based access control:
  - Admin-only dashboards
  - JE / ES private areas
- In React:
  - Use Auth.js hooks (e.g. `useSession`) to manage session state.
  - Hide or disable UI elements the user is not allowed to access.

Security guidelines:

- Never expose secrets (Stripe keys, Resend keys, Auth.js secrets) outside server-side code or env variables.
- Validate and authorize each sensitive action on the server (e.g. creating transactions, updating company profiles).

# Payments (Stripe)

- Use **Stripe** for:

  - Subscription plans (Essentiel, Standard, Premium) for JEs.
  - Potential future one-off payments if needed.

- Model:

  - Keep a `SubscriptionPlan` entity in the domain.
  - Keep `Subscription` with fields like `status` (ACTIVE, CANCELED, PAST_DUE), `currentPeriodEnd`, etc.
  - Keep `StripeCustomerId`, `StripeSubscriptionId` in the infrastructure layer / Prisma models.

- Architecture:

  - Domain layer knows only abstract concepts (Subscription, Plan, PaymentProvider).
  - Application layer uses a `PaymentProvider` port / interface (e.g. `PaymentProviderPort`) with methods like:
    - `createCustomer`
    - `createSubscription`
    - `cancelSubscription`
  - Infrastructure layer implements this port with **Stripe SDK**.

- Webhooks:
  - When asked to wire webhooks, expose them via Next.js Route Handlers (e.g. `app/api/webhooks/stripe/route.ts`).
  - Verify Stripe signatures.
  - Update domain subscriptions based on events (e.g. `invoice.payment_succeeded`, `customer.subscription.deleted`).

# Emails (Resend)

- Use **Resend** for transactional emails:

  - Welcome email on registration.
  - Subscription confirmation email.
  - Password reset or login link emails (if applicable).
  - Notifications for Admin if needed.

- Architecture:

  - Domain layer uses an abstract `EmailSenderPort` (e.g. `sendWelcomeEmail`, `sendSubscriptionConfirmation`).
  - Infrastructure layer implements it using Resend SDK.
  - Keep templates either as:
    - React email components, or
    - Plain text / HTML templates in a dedicated folder (e.g. `src/core/infrastructure/email/templates`).

- Do not mix email formatting logic with domain logic.
  - Domain triggers events or calls application services.
  - Application layer orchestrates calls to `EmailSenderPort`.

# Architecture style: DDD + Clean Architecture

Apply Domain-Driven Design and Clean Architecture principles:

- Separate concerns clearly:

  - **Domain layer (`src/core/domain`)**

    - Entities and Aggregates (e.g. User, YoungEntrepreneur, SolidarityCompany, Subscription, Transaction, PointsWallet)
    - Value Objects (e.g. Email, SubscriptionPlanCode, TransactionAmount, Points)
    - Domain Services (pure business logic that doesn’t depend on frameworks)
    - Domain events if useful
    - Domain-specific errors / exceptions

  - **Application layer (`src/core/application`)**

    - Use cases / services (e.g. `SubscribeToPlan`, `CreateTransaction`, `CreateSolidarityCompanyProfile`)
    - Input/Output DTOs
    - Ports (interfaces) for:
      - Repositories (UserRepository, SubscriptionRepository, TransactionRepository, etc.)
      - Payment provider (Stripe)
      - Email provider (Resend)
      - Auth/session if needed as abstraction

  - **Infrastructure layer (`src/core/infrastructure`)**

    - Prisma models and repository implementations
    - Mappers between Prisma models and domain entities
    - Adapters for external services:
      - Stripe adapter implementing `PaymentProviderPort`
      - Resend adapter implementing `EmailSenderPort`
      - Auth.js integration if any infrastructure-specific helpers are needed

  - **Interface (presentation) layer**
    - Next.js Route Handlers as adapters from HTTP to Application layer
    - React components, pages, layouts, hooks, and UI state management
    - No business rules here, only orchestration and presentation logic

- Respect dependency direction:

  - Domain must not import from application, infrastructure, or UI.
  - Application must depend only on domain abstractions and ports.
  - Infrastructure and UI can depend on domain and application, never the other way around.

- Do NOT put business logic directly in:
  - React components
  - Next.js route handlers
  - Prisma models
  - Stripe / Resend / Auth.js handlers

Instead, always call application use cases that orchestrate domain entities.

# Code organization

Use this structure (you can refine it as you generate code):

- `app/`

  - `layout.tsx`, `page.tsx`, route groups, etc.
  - `app/(public)/...` for marketing/auth pages
  - `app/(dashboard)/...` for authenticated areas (JE, ES, Admin)
  - `app/api/**/route.ts` for HTTP endpoints that call application use cases
  - `app/api/auth/[...nextauth]/route.ts` or Auth.js v5 equivalent entry points

- `src/core/domain/**`
- `src/core/application/**`
- `src/core/infrastructure/**`
  - `prisma/` repositories
  - `stripe/` adapter
  - `resend/` adapter
- `src/ui/components/**` shared UI components (built with Tailwind + shadcn/ui)
- `src/ui/features/**` feature-oriented components & hooks (auth, subscriptions, transactions, admin-dashboard, etc.)
- `src/lib/**` utilities (date helpers, config, etc.)

Use feature-based structure inside `src/ui/features`.

# Web development best practices

When generating code:

- Use modern TypeScript features, strict typing, and avoid `any`.
- Avoid overly complex components; favor small, focused components.
- Handle loading, empty, and error states explicitly in UI.
- Use async/await properly and handle errors (try/catch or result types).
- Avoid duplicating logic; extract shared utilities and domain logic.
- Add clear comments only where the intent is not obvious from the code.
- Prefer pure functions and immutability in domain and application layers.

Security and robustness:

- Validate inputs at the edges (Zod schemas for HTTP payloads and forms).
- Never trust client data: validate again on the server.
- Pay attention to OWASP-style concerns (auth, authorization checks, SQL injection prevention via Prisma, XSS via React defaults, CSRF/CSRF protections when relevant).
- When dealing with Stripe webhooks, always verify signatures.
- When dealing with Auth.js, ensure secure session configuration (cookies, sameSite, secure in production).

# UI/UX best practices

For UI and UX:

- Use Tailwind utility classes consistently; avoid inline styles.
- Use shadcn/ui components to ensure consistency (buttons, inputs, dialogs, toasts, navigation, tables).
- Ensure forms are accessible:
  - `<label>` linked with `htmlFor`
  - proper input types
  - ARIA attributes where relevant
- Make the app responsive by default (mobile-first), then adapt for tablet/desktop.
- Provide clear error messages and confirmations (toasts, inline errors).
- Use sensible defaults and reduce friction:
  - Pre-fill fields when possible (e.g., current user, default plan)
  - Avoid unnecessary steps or pages
- Keep dashboards simple and readable:
  - Use headings, spacing, and cards
  - Prefer clear metrics and charts over dense tables when possible
  - Highlight key actions (CTA buttons, primary flows like "Create transaction", "Invite ES", "Subscribe now")

## Design System & Visual Guidelines

### Color Palette

Use a professional, corporate color scheme defined in `globals.css`:

- **Primary**: Deep navy blue (`oklch 0.45 0.16 250`) — trustworthy, professional
- **Accent**: Teal/cyan (`oklch 0.65 0.14 180`) — modern, growth-oriented
- **Success**: Green (`oklch 0.60 0.16 155`)
- **Muted/Secondary**: Warm slate tones for backgrounds and secondary text
- **Border radius**: `0.625rem` (10px) for a slightly rounded, modern look

### Icons

- Use **Lucide React** exclusively for icons across the app
- Common icons used:
  - Navigation: `Sparkles`, `LayoutDashboard`, `Settings`, `LogOut`
  - Actions: `ArrowRight`, `Plus`, `Check`, `Star`
  - Features: `Rocket`, `Users`, `Award`, `Zap`, `Target`, `TrendingUp`
  - Forms: `Mail`, `Lock`, `User`, `LogIn`, `UserPlus`

### Layout & Spacing

- Use generous vertical padding for sections: `py-28` for major sections
- Container max-width: `max-w-5xl` to `max-w-6xl` for content areas
- Card gaps: `gap-5` to `gap-8` depending on content density
- Form spacing: `space-y-5` between form fields

### Cards & Surfaces

- Use subtle borders: `border border-border/50`
- Light shadows: `shadow-xl shadow-primary/5`
- Backdrop blur for floating elements: `bg-card/80 backdrop-blur-sm`
- Hover states with border transitions: `hover:border-border`

### Buttons

- Primary buttons: `rounded-lg` or `rounded-xl`, with shadow `shadow-md shadow-primary/20`
- Icon buttons should include arrow animations on hover: `group-hover:translate-x-1`
- Ghost buttons for secondary actions

### Forms (Login/Register)

- Input fields with icons on the left using absolute positioning
- Input height: `h-11` for comfortable touch targets
- Rounded inputs: `rounded-lg`
- Labels: `text-sm font-medium`
- Registration form uses separate **firstName** and **lastName** fields (grid 2 columns)
- Login form includes "Mot de passe oublié ?" link

### Navbar

- Sticky header with backdrop blur: `backdrop-blur-xl`
- Logo uses `Sparkles` icon with primary background
- Shows "Connexion" (ghost) + "S'inscrire" (primary) buttons for visitors
- User dropdown menu includes icons for each action
- Role displayed as uppercase badge with colored background

### Decorative Elements

- Subtle gradient blobs in backgrounds: `bg-primary/3`, `bg-accent/4`
- Grid pattern overlay on hero sections
- Use `blur-[100px]` or `blur-[120px]` for soft ambient effects
- Avoid overly saturated or distracting decorations

# How I want you to work (inspired by Awesome Copilot)

When I ask you for a multi-step change or to create a new feature:

1. Start by outputting a short **PLAN** section with bullet points of the steps and files you’ll modify/create.
2. Then implement the solution step by step, clearly indicating file paths and code blocks.
3. For new modules, show the domain/application/infrastructure/UI parts together so I can see the full flow.
4. If something in the requirements is ambiguous, make a reasonable assumption and state it explicitly instead of asking back.
5. Prefer small, composable examples over huge monolithic files.
6. Keep generated code idiomatic for:
   - Next.js (App Router),
   - Prisma,
   - Auth.js for authentication,
   - Stripe for payments,
   - Resend for emails,
   - Tailwind + shadcn/ui for the UI.

When I ask for a “base app” scaffold:

- Create an initial folder structure, minimal domain model, Prisma schema, and example routes/pages that demonstrate the DDD/Clean Architecture pattern.
- Add at least one end-to-end vertical slice:
  - A Prisma model
  - Domain entity/value object
  - Repository interface + implementation
  - Application use case
  - API route handler (Next.js Route Handler)
  - Auth.js integration if relevant (e.g. signup / login flow)
  - UI page with a simple form or list connected to that use case.
