# Global Signals

Real-time global intelligence dashboard built with Next.js, TypeScript, validated API routes, caching, health checks, maps, charts, and CI.

[![Live Demo](https://img.shields.io/badge/Live_Demo-sapien--signal.vercel.app-00d4ff?style=for-the-badge&logo=vercel&logoColor=white)](https://sapien-signal.vercel.app)
[![CI](https://github.com/gauthambinoy/sapien-signal/actions/workflows/ci.yml/badge.svg)](https://github.com/gauthambinoy/sapien-signal/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

> Product rename in progress: the app is now positioned as **Global Signals**. The current deployment and repository URL still use the previous `sapien-signal` slug until the deployment/repository rename is completed.

## Why this project exists

Public data is useful, but it is scattered across unreliable APIs, inconsistent response formats, rate limits, and separate dashboards. Global Signals brings those sources into one interface and normalizes the data through server-side API routes before it reaches the browser.

The engineering goal is not just a visual dashboard. The project demonstrates API integration, runtime validation, caching, failure isolation, typed frontend components, charts/maps, CI, Docker, and clear documentation.

## Product features

- Real-time global overview counters for population, emissions, energy, internet activity, and economic indicators
- Weather, earthquake, market, forex, country, health, space, air quality, energy, news, and technology tabs
- 3D/WebGL Earth and map-based visualizations
- System health panel for endpoint visibility
- Command palette and keyboard navigation
- Light/dark theme with responsive layout
- Optional API keys for enhanced providers; core app still runs without paid services

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

```bash
git clone https://github.com/gauthambinoy/sapien-signal.git
cd sapien-signal
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build

# or run everything
npm run check
```

## Docker

```bash
docker build -t global-signals-dashboard .
docker run -p 3000:3000 global-signals-dashboard
```

## Environment variables

```env
NEXT_PUBLIC_CESIUM_ION_TOKEN=
NASA_API_KEY=
NEWS_API_KEY=
NEXT_PUBLIC_APP_NAME=Global Signals
```

The app works without paid API keys. Optional keys unlock richer NASA, news, and globe-related data.

## Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Contributing Guide](CONTRIBUTING.md)

## Next production-readiness improvements

- Add screenshots/GIFs under `docs/screenshots/`
- Add Playwright end-to-end tests for navigation, health page, API fallback UI, and mobile layout
- Add Lighthouse report and bundle analysis notes
- Rename the GitHub repository and Vercel deployment from `sapien-signal` to `global-signals-dashboard`
- Add a short case-study section with measurable performance and reliability outcomes

## License

MIT © 2026 [Gautham Binoy](https://github.com/gauthambinoy)
