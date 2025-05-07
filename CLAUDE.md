# Project: Card Slam Fantasy Hoops

## Technology Stack
- Frontend: React with TypeScript
- Backend: Firebase (Authentication, Realtime Database, Cloud Functions)
- Database: Firebase
- Package Manager: Yarn Berry // IMPORTANT. ABSOLUTELY FUCK NPM

## Development Workflows
1. **TEST-FIRST DEVELOPMENT IS MANDATORY** - Write tests that run and FAIL before writing any implementation code
2. Tests must be written to verify behavior, not implementation details
3. All code must pass linting and type checking before commit
4. Aim for high test coverage (>80% overall, >95% for core utilities)
5. Feature branches for all development work

## TDD Process (CRITICAL)
1. **UNDERSTAND**: Clearly understand the requirement
2. **DESIGN**: Create the minimal interface/placeholder for the feature
3. **RED**: Write tests that compile but FAIL intentionally
4. **GREEN**: Implement the minimal code to make tests pass
5. **REFACTOR**: Clean up code while keeping tests green
6. **VERIFY**: Run full test suite to check for regressions

Breaking this workflow is NOT acceptable. Always start with failing tests.

## Architecture
Card Slam Fantasy Hoops is a fantasy basketball app combining collectible card game mechanics with real-time NBA statistics. Players collect cards, build lineups, and compete based on real-world performance.

Key components:
- Authentication system: Firebase Auth
- Card system: Card generation, collection, and rendering
- NBA data service: Fetches and processes real NBA statistics
- Game mechanics: Scoring, lineup validation, and special abilities

## Common Commands
```bash
# Development
yarn dev                  # Start development server
yarn build                # Build for production

# Testing (USE THESE CONSTANTLY)
yarn test                 # Run all tests
yarn test --watch         # Run tests in watch mode
yarn test path/to/file    # Run specific test

# Quality
yarn lint                 # Run linter
yarn format               # Format code
yarn typecheck            # Check TypeScript types

# Firebase
yarn setup:firebase       # Setup Firebase configuration
```

## Quality Checkpoints
- Before implementing: Write failing tests that define expected behavior
- After implementation: Run linter and fix issues 
- Before committing: Verify tests pass, lint passes, and types check
- Before PR: Link to roadmap item and verify all tests pass in CI

## Thinking Levels
- Use "think" for routine problem solving
- Use "think hard" for complex algorithmic challenges
- Use "ultrathink" for architecture design decisions like scoring system and card generation

## Automation Triggers
- When I write new code, first write failing tests
- When I finish writing tests, run them to verify they fail as expected
- When I complete implementation, run tests to verify they pass
- When tests pass, run linter and fix any issues
- When all checks pass, prepare a commit following conventional format

## Context Tags
Use these tags when appropriate:
- [#auth] - Authentication system
- [#cards] - Card components and system
- [#nba-data] - NBA data service
- [#scoring] - Scoring calculation system
- [#firebase] - Firebase integration