# Changelog

All notable changes to EchoAI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-06-19

A major release: EchoAI moves from OpenAI to **Google Gemini**, gets a full
"Midnight Indigo" workspace redesign with saved conversations, and ships a
one-command setup. This is a **breaking change for self-hosters** — see Migration.

### ⚠️ Breaking

- **AI provider switched from OpenAI to Google Gemini.** The server now requires
  `GEMINI_API_KEY` instead of `OPENAI_API_KEY`, and user-supplied keys are now
  Google AI Studio keys (`AIza…`) rather than OpenAI keys. Model is `gemini-2.5-flash`.

### Added

- **Midnight Indigo workspace redesign** — premium dark-first theme with a polished
  light mode, a signature animated CSS "orb", a suggestion grid, and a calmer layout.
- **Sidebar with saved conversations** — persistent chat history (localStorage) with
  create / select / rename / delete, plus an editable local profile.
- **Theme preference** is now remembered across visits.
- **End-to-end `npm run dev` launcher** — installs client & server dependencies, sets
  safe defaults (e.g. `VITE_SERVER_URL`), interactively collects `GEMINI_API_KEY` with
  setup steps, then starts both apps.
- **`Header` component**; stable message IDs and a ref API to inject suggestions.
- Open-source documentation, Apache 2.0 license, contributing guidelines, code of
  conduct, security policy, and environment variable templates.

### Changed

- **Smaller initial bundle** — the Gemini SDK is lazy-loaded into its own chunk,
  removing the >500 kB warning and deferring ~220 kB until a user key is used.
- **Hardened CORS** with an explicit origin allowlist (fixes production cross-origin errors).
- **Code quality** — single shared ID generator, consolidated API error handling, and
  consistent, meaningful naming across the client.
- **API key storage** hardened and scoped to the browser session.
- Decoupled client and server installs (removed root npm workspaces) for independent setup.

### Fixed

- Cross-platform CI native-binary failures (Tailwind v4 oxide / rollup).
- Bumped CI to Node 20, added workflow permissions, repointed to the public npm
  registry, and resolved numerous dependency vulnerabilities.

### Migration (self-hosted / deployments)

1. Set **`GEMINI_API_KEY`** on the server/host (remove `OPENAI_API_KEY`).
2. Get a key at <https://aistudio.google.com/apikey> (starts with `AIza`).
3. For production, also set **`CLIENT_URL`** to your deployed client origin for CORS.
4. Client env (`VITE_SERVER_URL`) is unchanged.

## [1.0.0] - 2024-12-19

### Added

- Modern React + TypeScript frontend
- Node.js + Express backend
- OpenAI GPT-4 integration
- Dark/light mode support
- User API key management
- Retry mechanisms and error handling
- Responsive design for mobile and desktop
- Inline error options with retry functionality
- Settings modal for API key configuration
- Typing indicator with meaningful messages
- Suggestion prompts for common use cases
- Glass morphism UI design
- Smooth animations and transitions

### Features

- **Frontend**:

  - React 18 with TypeScript
  - Tailwind CSS for styling
  - React Query for state management
  - Vite for build tooling
  - Responsive design
  - Dark/light mode toggle
  - Modern chat interface
  - Error handling with inline options
  - API key management
  - Suggestion prompts

- **Backend**:

  - Node.js with Express
  - OpenAI API integration
  - CORS support
  - Environment variable configuration
  - Error handling
  - Request validation

- **User Experience**:
  - Smooth chat interface
  - Typing indicators
  - Error recovery options
  - Mobile-responsive design
  - Accessibility features
  - Performance optimizations

### Technical Details

- **Client**: React 18, TypeScript, Tailwind CSS, Vite
- **Server**: Node.js, Express, OpenAI API
- **Deployment**: Vercel-ready configuration
- **Security**: Environment variable management, API key validation

### Breaking Changes

- None (initial release)

### Migration Guide

- This is the initial release, no migration needed

---

## Version History

- **2.0.0**: Google Gemini migration, Midnight Indigo workspace redesign, saved conversations, and one-command setup
- **1.0.0**: Initial open-source release with full feature set
- **0.x.x**: Development versions (not publicly released)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information on contributing to EchoAI.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

[Unreleased]: https://github.com/droidbg/EchoAI/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/droidbg/EchoAI/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/droidbg/EchoAI/releases/tag/v1.0.0
