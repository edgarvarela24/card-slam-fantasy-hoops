# Git Hooks Configuration

This project uses Husky and lint-staged to enforce code quality and standards through git hooks.

## Pre-commit Hook

The pre-commit hook runs automatically when you attempt to commit changes and performs the following checks:

1. **Code formatting** with Prettier
   - Formats all staged JS, TS, CSS, and JSON files

2. **Linting** with ESLint
   - Lints and fixes JS/TS files

## Commit Message Hook

We use commitlint to enforce conventional commit message format:

```
type(scope): message
```

Where `type` is one of:
- **feat**: A new feature
- **fix**: A bug fix 
- **docs**: Documentation changes
- **style**: Changes that don't affect code (formatting, etc)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Performance improvements
- **test**: Adding or fixing tests
- **chore**: Changes to build process or tooling

## Pre-push Hook

The pre-push hook runs before pushing to a remote repository and:

1. **Runs all tests**
   - Ensures all tests pass before code is pushed

## Simplified Workflow

This project uses a simplified git workflow:

1. Direct pushes to main are allowed, as this is a single-developer project
2. Code quality is maintained through pre-commit hooks for formatting and linting
3. Tests are run before pushing to catch issues early

## Troubleshooting

If you need to bypass hooks temporarily, you can use:
- `git commit --no-verify` to skip pre-commit hooks
- `git push --no-verify` to skip pre-push hooks

However, this is not recommended for normal development workflow.