# Development Workflow & Philosophy

## Development Philosophy
- **Test-Driven Development (TDD)**: Write tests first, then implement features
- **Clean Code**: Minimal, readable code with limited comments
- **SOLID, DRY, KISS**: Follow established software principles
- **Functional React**: Prefer functional components with hooks
- **Type Safety**: Use TypeScript throughout the codebase
- **Yarn Berry**: Always use Yarn Berry package manager (NOT npm) for all operations

## TDD Workflow
1. Write failing tests first for new functionality
2. Implement the minimal code necessary to make tests pass
3. Refactor while keeping tests green
4. Mark checklist items as complete once tests pass
5. Run the full test suite periodically to check for regressions
6. Keep commits small and focused on specific features

## Common Commands

> **IMPORTANT**: Always use Yarn Berry commands (NOT npm) for all operations. This project is configured with Yarn Berry's zero-install approach.

### Development Commands
```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

### Testing Commands
```bash
# Run all tests
yarn test

# Run specific test file
yarn test path/to/file.test.ts

# Run tests in watch mode
yarn test --watch

# Run specific jest tests
yarn jest path/to/file.test.tsx
```

###Code Quality Commands
```bash
# Lint code
yarn lint

# Format code
yarn format
```