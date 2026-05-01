# Global Signal

A recruiter-ready real-time global intelligence dashboard built with Next.js, TypeScript, validated API routes, caching, health checks, maps, charts, and CI.

[![Live Demo](https://img.shields.io/badge/Live_Demo-global--signal.vercel.app-00d4ff?style=for-the-badge&logo=vercel&logoColor=white)](https://global-signal.vercel.app)
[![CI](https://github.com/gauthambinoy/global-signal/actions/workflows/ci.yml/badge.svg)](https://github.com/gauthambinoy/global-signal/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

> **Global Signal** is the canonical name for the app, package, docs, and deployment slug.

## Why this project exists

Public data is useful, but it is scattered across unreliable APIs, inconsistent response formats, rate limits, and separate dashboards. Global Signal brings those sources into one interface and normalizes the data through server-side API routes before it reaches the browser.

The engineering goal is not just a visual dashboard. The project demonstrates API integration, runtime validation, caching, failure isolation, typed frontend components, charts/maps, CI, Docker, and clear documentation.

## Demo

- **Live app:** https://global-signal.vercel.app
- **Primary route:** `/` renders the Next.js App Router application. It must not depend on uncommitted static design files.
- **Deep links:** `/?tab=system`, `/?tab=weather`, `/?tab=markets`, `/?tab=space`
- **Health endpoint:** `/api/health-check` returns live dependency status for deployment smoke tests.
- **Screenshots to add before pinning:** hero, dashboard overview, 3D Earth/space, system health, and mobile layout. Store them in `public/screenshots/` and embed them below.

| Area | What to capture |
|---|---|
| Hero | Globe, value proposition, CTA |
| Overview | Live global counters and charts |
| Space/ISS | 3D Earth and orbital data |
| System Health | API uptime and latency panel |
| Mobile | Responsive sidebar and tab UI |

## Product features

- Real-time global overview counters for population, emissions, energy, internet activity, and economic indicators
- Weather, earthquake, market, forex, country, health, space, air quality, energy, news, and technology tabs
- 3D/WebGL Earth and map-based visualizations
- System health panel for endpoint visibility
- Command palette and keyboard navigation
- Light/dark theme with responsive layout
- Optional API keys for enhanced providers; core app still runs without paid services
- Health-check endpoint suitable for smoke tests and deployment monitoring

## Engineering highlights

### API reliability layer

- External services are called from Next.js API routes, not directly from the browser
- Circuit breaker pattern isolates failing providers and avoids cascading UI failures
- Endpoint-specific cache/revalidation windows reduce upstream API pressure
- Health checks expose the status of external data dependencies

### Runtime validation

- Zod schemas validate external API responses before data reaches UI components
- Shared inferred TypeScript types keep server responses and frontend usage aligned
- Fallback/default handling keeps optional fields explicit instead of relying on loose objects

### Frontend architecture

- App Router structure with dedicated tab components
- SWR hooks manage stale-while-revalidate polling per data category
- Recharts, maps, and WebGL views present complex data in a recruiter-friendly product UI
- Error boundaries isolate individual tab failures

### Delivery and maintainability

- GitHub Actions runs lint, typecheck, tests, and production build
- Dockerfile supports containerized deployment
- `.env.example` documents optional external API keys
- Architecture and API documentation live in `docs/`

## Architecture

```text
Browser
  |
  |-- SWR hooks and dashboard components
  |
Next.js App Router
  |
  |-- Internal API routes (/api/*)
  |-- Zod response validation
  |-- Cache/revalidate policy
  |-- Circuit breaker wrapper
  |
External public APIs
  |
  |-- Open-Meteo, USGS, CoinGecko, Frankfurter, World Bank
  |-- REST Countries, NASA, OpenAQ, GitHub, Hacker News, NewsAPI
```

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript strict mode |
| UI | React, Tailwind CSS, Framer Motion |
| Data fetching | SWR, Server-Sent Events |
| Validation | Zod |
| Charts/maps | Recharts, react-simple-maps, Leaflet, WebGL globe |
| Testing | Vitest, React Testing Library |
| Delivery | GitHub Actions, Docker, Vercel |

## Local development

Prerequisites: Node.js 20+ and npm 10+.

```bash
git clone https://github.com/gauthambinoy/global-signal.git
cd global-signal
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

Run the same checks locally that CI runs on every push and pull request.

```bash
npm run lint
npm run typecheck
npm run test
npm run build

# or run everything
npm run check
```

## Free Vercel deployment

The app uses server-side Next.js API routes, so deploy it as a Next.js app, not as a static export. A root `vercel.json` pins the framework/build commands so Vercel does not guess the wrong output.

1. Push this repository to GitHub.
2. In Vercel, import `gauthambinoy/global-signal`.
3. Set **Framework Preset** to **Next.js**.
4. Set **Root Directory** to `.` / repository root. Do not point Vercel at `public/` or a design subfolder.
5. Build command: `npm run build`; install command: `npm ci`.
6. Add optional environment variables from `.env.example` (`NASA_API_KEY`, `NEWS_API_KEY`, `NEXT_PUBLIC_CESIUM_ION_TOKEN`). The app still runs without paid keys.
7. Deploy, then verify:

```bash
curl -I https://global-signal.vercel.app/
curl https://global-signal.vercel.app/api/health-check
```

If the live URL returns `404` with `x-vercel-error: DEPLOYMENT_NOT_FOUND`, the domain is not attached to an active Vercel deployment. Create/reconnect the Vercel project, name it `global-signal` if that slug is available, and redeploy from the repository root. If the slug is unavailable, use the generated Vercel URL and update the live-demo badge plus `metadataBase` in `app/layout.tsx`.

## Docker

```bash
docker build -t global-signal .
docker run -p 3000:3000 global-signal
```

## Environment variables

Copy `.env.example` to `.env.local` for local development. Do not commit `.env.local` or real API keys.

```env
NEXT_PUBLIC_CESIUM_ION_TOKEN=
NASA_API_KEY=
NEWS_API_KEY=
NEXT_PUBLIC_APP_NAME=Global Signal
```

The app works without paid API keys. Optional keys unlock richer NASA, news, and globe-related data.

## API health page

Open the **System Health** tab (`/?tab=system`) or call `/api/health-check` to inspect upstream API availability, latency, and degraded/unhealthy states. This is the fastest production smoke test after each deploy.

## Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Contributing Guide](CONTRIBUTING.md)

## Next production-readiness improvements

- Add real screenshots/GIFs under `public/screenshots/` and embed them in the Demo section
- Add Playwright end-to-end tests for navigation, health page, API fallback UI, and mobile layout
- Add Lighthouse report and bundle analysis notes
- Add a short case-study section with measurable performance and reliability outcomes

## License

MIT © 2026 [Gautham Binoy](https://github.com/gauthambinoy)
