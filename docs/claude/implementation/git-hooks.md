# Git Hooks Configuration

This project uses Husky and lint-staged to enforce code quality and standards through git hooks.

## Pre-commit Hook

The pre-commit hook runs automatically when you attempt to commit changes and performs the following checks:

1. **Code formatting** with Prettier
   - Formats all staged JS, TS, CSS, and JSON files

2. **Linting** with ESLint
   - Lints and fixes JS/TS files

3. **Type checking** with TypeScript
   - Runs the TypeScript compiler on changed TS files to catch type errors

4. **Running related tests**
   - Runs tests related to changed files

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

1. **Prevents pushing directly to the main branch**
   - Forces development through pull requests

2. **Runs all tests**
   - Ensures all tests pass before code is pushed

## Troubleshooting

If you need to bypass hooks temporarily, you can use:
- `git commit --no-verify` to skip pre-commit hooks
- `git push --no-verify` to skip pre-push hooks

However, this is not recommended for normal development workflow.