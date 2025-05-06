# CI Workflow Configuration

This document outlines the Continuous Integration workflow for the Card Slam Fantasy Hoops project.

## GitHub Actions Workflow

The project uses GitHub Actions for CI/CD. The main workflow is defined in `.github/workflows/ci.yml` and includes the following stages:

### Test Stage

1. **Lint checking**: Uses ESLint to check code quality
   ```bash
   yarn lint
   ```

2. **Format checking**: Uses Prettier to ensure consistent code formatting
   ```bash
   yarn format:check
   ```

3. **Unit tests**: Runs Jest tests
   ```bash
   yarn test
   ```

4. **Type checking**: Uses TypeScript to check for type errors in application code
   ```bash
   yarn tsc -p tsconfig.ci.json --noEmit
   ```

5. **Build**: Builds the application to ensure it compiles correctly
   ```bash
   yarn build
   ```

### Deploy Stages

The workflow includes two deployment stages:

1. **Preview Deployment**: Triggered on pull requests to the main branch
2. **Production Deployment**: Triggered when code is merged to the main branch

## TypeScript Configuration

We maintain multiple TypeScript configurations for different purposes:

1. **tsconfig.json**: The base configuration that references other configuration files
2. **tsconfig.app.json**: Configuration for the application code
3. **tsconfig.node.json**: Configuration for Node.js specific code (like Vite config)
4. **tsconfig.test.json**: Configuration for test files with relaxed type checking
5. **tsconfig.ci.json**: Special configuration for CI that excludes test files to focus on application code quality

## Package Scripts

Common commands for development and CI:

- `yarn lint`: Run ESLint on the codebase
- `yarn format`: Format code with Prettier
- `yarn format:check`: Check if code formatting meets Prettier standards
- `yarn typecheck`: Type-check application code (excluding tests)
- `yarn typecheck:all`: Type-check all code (including tests)
- `yarn test`: Run all tests
- `yarn build`: Build the application

## Troubleshooting CI Issues

If the GitHub Actions workflow fails, check the following:

1. **Formatting issues**: Run `yarn format` locally to fix formatting
2. **Linting issues**: Run `yarn lint` to identify and fix linting problems
3. **Type errors**: Run `yarn typecheck` to find type errors in application code
4. **Test failures**: Run `yarn test` to debug test failures

For test-related TypeScript errors, these won't block the CI workflow since we use a separate TypeScript configuration for CI that excludes test files.