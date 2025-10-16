# Contributing to EchoAI

Thank you for your interest in contributing to EchoAI! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Issue Reporting](#issue-reporting)
- [Code Style Guidelines](#code-style-guidelines)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/EchoAI.git
   cd EchoAI
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/droidbg/EchoAI.git
   ```

## Development Setup

### Prerequisites

- Node.js (v16 or above)
- npm or yarn
- Git

### Installation

1. **Install client dependencies**:

   ```bash
   cd client
   npm install
   ```

2. **Install server dependencies**:

   ```bash
   cd ../server
   npm install
   ```

3. **Set up environment variables**:

   - Copy `client/.env.example` to `client/.env`
   - Copy `server/.env.example` to `server/.env`
   - Add your OpenAI API key to `server/.env`

4. **Start development servers**:

   ```bash
   # Terminal 1 - Start server
   cd server
   npm start

   # Terminal 2 - Start client
   cd client
   npm start
   ```

## Making Changes

### Branch Strategy

1. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Test your changes**:

   ```bash
   # Client linting
   cd client
   npm run lint

   # Build test
   npm run build
   ```

### Code Style Guidelines

#### TypeScript/React (Client)

- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Use functional components with hooks
- Add proper TypeScript types for all props and functions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

#### JavaScript/Node.js (Server)

- Use modern ES6+ syntax
- Add JSDoc comments for all functions
- Use proper error handling with appropriate HTTP status codes
- Follow RESTful API conventions

#### General Guidelines

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use semicolons
- **Line length**: Keep lines under 100 characters
- **Comments**: Add comments for complex logic
- **Naming**: Use camelCase for variables and functions, PascalCase for components

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add dark mode toggle to settings
fix: resolve API key validation issue
docs: update installation instructions
style: format code with prettier
refactor: improve error handling in API utils
```

## Submitting Changes

### Pull Request Process

1. **Ensure your branch is up to date**:

   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Push your changes**:

   ```bash
   git push origin your-feature-branch
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - List any breaking changes

### Pull Request Template

When creating a PR, please include:

- **Description**: What changes were made and why
- **Type of change**: Bug fix, new feature, documentation, etc.
- **Testing**: How the changes were tested
- **Screenshots**: For UI changes
- **Breaking changes**: Any breaking changes and migration steps

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Environment**: OS, Node.js version, browser
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Any error messages

### Feature Requests

For feature requests, please include:

- **Use case**: Why this feature would be useful
- **Proposed solution**: How you think it should work
- **Alternatives**: Other solutions you've considered
- **Additional context**: Any other relevant information

## Development Guidelines

### Adding New Features

1. **Plan the feature** - Consider the user experience and technical implementation
2. **Update documentation** - Add/update relevant documentation
3. **Add tests** - Include tests for new functionality
4. **Update types** - Add TypeScript types for new interfaces
5. **Consider accessibility** - Ensure features are accessible

### Security Considerations

- Never commit API keys or sensitive data
- Validate all user inputs
- Use environment variables for configuration
- Follow security best practices for API endpoints

### Performance

- Optimize bundle size for the client
- Use efficient algorithms and data structures
- Consider caching strategies
- Monitor performance impact of changes

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check the README and code comments

## Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes for significant contributions
- GitHub contributor graph

Thank you for contributing to EchoAI! 🚀
