# Changelog

All notable changes to EchoAI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive open-source documentation
- Apache 2.0 license
- Contributing guidelines
- Code of conduct
- Security policy
- Environment variable templates

### Changed

- Project name from "chatgpt2.0" to "EchoAI"
- Improved error handling with inline options
- Enhanced API key validation for newer OpenAI key formats

### Fixed

- API key validation for `sk-proj-` format keys
- Background coverage issues in dark mode
- Loading state management
- Suggestion button functionality

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

- **1.0.0**: Initial open-source release with full feature set
- **0.x.x**: Development versions (not publicly released)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information on contributing to EchoAI.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
