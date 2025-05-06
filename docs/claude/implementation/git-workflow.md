# Git Workflow for Development

This document outlines the git workflow that should be followed when working on features from the roadmap.

## Feature Development Workflow

1. **Create a feature branch**
   - Always create a feature branch when starting work on a new roadmap item
   - Branch naming convention: `feature/descriptive-name` (e.g., `feature/card-visual-components`)
   - Example: `git checkout -b feature/card-visual-components`

2. **Regular commits**
   - Make small, focused commits as work progresses
   - Follow the conventional commit format:
     ```
     type(scope): message
     ```
   - Commit often (approximately every 30-60 minutes of work)
   - Example: `git commit -m "feat(card): implement base card component structure"`

3. **Push changes frequently**
   - Push commits to remote to avoid losing work
   - Example: `git push origin feature/card-visual-components`

4. **Create a Pull Request**
   - When the feature is complete, create a PR to merge into main
   - Include a clear title and description
   - Reference the roadmap item being completed
   - Ensure tests pass before merging

5. **Review and merge**
   - Review the changes in the PR
   - Approve and merge to main when satisfied
   - Delete the feature branch after merging

## Commit Guidelines

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Changes that don't affect code (formatting, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Performance improvements
- **test**: Adding or fixing tests
- **chore**: Changes to build process or tooling

## Checkpoints for Commits

Make commits at these checkpoints:

1. After initial setup for a feature
2. When tests are written
3. When functionality is implemented
4. When refactoring is complete
5. When documentation is updated
6. When any milestone within a feature is reached

## Pull Request Creation

PRs should be created when:
- A roadmap checkbox item is completed
- A significant feature is finished, even if it's part of a larger roadmap item
- Bug fixes or improvements are ready to be merged

Always link PRs to the relevant section of the roadmap they contribute to completing.