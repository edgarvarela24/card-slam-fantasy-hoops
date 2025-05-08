# Claude Code Custom Commands

This directory contains custom slash commands for Claude Code that automate common workflows in the Card Slam Fantasy Hoops project.

## Command Usage

All commands in this directory can be invoked with Claude Code using the syntax:

```
/project:<command-name> [arguments]
```

For example:
```
/project:pr-review 42
```

## Available Commands

### PR & Code Review Workflow

| Command | Description | Usage |
|---------|-------------|-------|
| [`pr-review`](./pr-review.md) | Review a pull request and provide detailed feedback | `/project:pr-review <PR_NUMBER> [<DOCUMENTATION_URL>]` |
| [`address-pr-comments`](./address-pr-comments.md) | Fetch and address comments from a PR | `/project:address-pr-comments <PR_NUMBER>` |
| [`prepare-pr`](./prepare-pr.md) | Prepare a high-quality PR for the current branch | `/project:prepare-pr <DESCRIPTION>` |

### TDD & Testing Workflow

| Command | Description | Usage |
|---------|-------------|-------|
| [`tdd-workflow`](./tdd-workflow.md) | Guide through TDD workflow for a feature | `/project:tdd-workflow <FEATURE_NAME>` |
| [`testing/run-tests`](./testing/run-tests.md) | Run and analyze tests | `/project:run-tests [<TEST_PATH>]` |

### Card System

| Command | Description | Usage |
|---------|-------------|-------|
| [`card-system/implement-card-feature`](./card-system/implement-card-feature.md) | Implement a card feature following TDD | `/project:implement-card-feature <FEATURE_DESCRIPTION>` |

### Git Workflow

| Command | Description | Usage |
|---------|-------------|-------|
| [`git-workflow`](./git-workflow.md) | Manage Git workflow for a task | `/project:git-workflow <TASK_DESCRIPTION>` |

### Firebase

| Command | Description | Usage |
|---------|-------------|-------|
| [`firebase/test-firebase`](./firebase/test-firebase.md) | Test Firebase integration | `/project:test-firebase [<FEATURE_NAME>]` |

### Quality & Linting

| Command | Description | Usage |
|---------|-------------|-------|
| [`fix-lint`](./fix-lint.md) | Analyze and fix linting issues | `/project:fix-lint [<FILE_PATH>]` |
| [`quality-check`](./quality-check.md) | Run quality checks on codebase | `/project:quality-check [<FILE_PATTERN>]` |

### Planning & Context

| Command | Description | Usage |
|---------|-------------|-------|
| [`context-prime`](./context-prime.md) | Prime Claude with optimal context | `/project:context-prime <FEATURE_NAME>` |
| [`read-link`](./read-link.md) | Fetch and analyze documentation from a URL | `/project:read-link <URL>` |
| [`roadmap-planning`](./roadmap-planning.md) | Plan features and roadmap | `/project:roadmap-planning <FEATURE_DESCRIPTION>` |
| [`ultrathink`](./ultrathink.md) | Use Claude's extended thinking for complex problems | `/project:ultrathink <COMPLEX_PROBLEM>` |

### Component Generation

| Command | Description | Usage |
|---------|-------------|-------|
| [`generate-component`](./generate-component.md) | Generate a new React component with tests | `/project:generate-component <COMPONENT_NAME>` |

## Command Structure

Each command follows a standard structure:

1. **Header**: Brief command description
2. **Usage**: Examples and parameter explanations
3. **Process Steps**: Detailed steps the command will execute
4. **Implementation**: Actual command implementation with bash scripts and instructions

## Creating New Commands

To create a new command:

1. Create a Markdown file in this directory or an appropriate subdirectory
2. Follow the standard structure pattern
3. Ensure proper input validation for any arguments
4. Include clear examples
5. Test the command with Claude Code

For commands that are related to specific features or domains, place them in appropriate subdirectories (e.g., `card-system/`, `firebase/`, etc.).

## Command Integration

These commands integrate with:

- GitHub CLI (`gh`) for repository operations
- Yarn Berry for dependency management
- Jest for testing
- ESLint for linting
- TypeScript for type checking
- Firebase for backend operations

Make sure these tools are properly installed and configured before using the commands.