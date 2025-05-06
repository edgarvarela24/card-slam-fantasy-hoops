# Card Slam Fantasy Hoops

## Claude Code Instructions

This project uses a modular documentation system in the `/docs/claude/` directory to help Claude Code provide optimal assistance.

### How to Navigate:
1. First, review the current development stage in `/docs/claude/core/dev-workflow.md`
2. For any task, select the most relevant files from the directories below based on the task type
3. Always include `/docs/claude/testing/tdd-approach.md` for implementation tasks

### Documentation Structure:
- `/docs/claude/core/` - Project overview, architecture, workflows
- `/docs/claude/testing/` - TDD approach, testing standards
- `/docs/claude/implementation/` - Component-specific implementation details
- `/docs/claude/design/` - UI/UX guidance, design system, animations

### Common Tasks and Relevant Files:
- UI Component Implementation → design/ui-components.md + implementation/(relevant-system).md
- Firebase Feature → core/architecture.md + implementation/firebase.md
- Animation Implementation → design/animation.md
- Testing Strategy → testing/tdd-approach.md + testing/unit-testing.md
- Git Workflow/Hooks → implementation/git-hooks.md

Always follow the TDD approach for all implementation tasks!