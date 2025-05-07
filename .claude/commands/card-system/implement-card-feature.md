<!-- .claude/commands/card-system/implement-card-feature.md -->
# Implement Card Feature

Follow this process to implement card feature: $ARGUMENTS

## Implementation Process:

1. Study documentation first:
   - Read `/docs/claude/implementation/card-system.md`
   - Review `/docs/claude/design/design-system.md`
   - Understand `/docs/claude/testing/tdd-approach.md`

2. Review existing card components:
   - Examine `/src/components/Card/*.tsx`
   - Understand current card type definitions in `/src/types/card.ts`
   - Note the styling and component patterns

3. Write failing tests first (RED):
   - Create test file in `/src/components/Card/__tests__/`
   - Write comprehensive tests for the new feature
   - Verify tests compile but fail

4. Implement the feature (GREEN):
   - Follow the card design system guidelines
   - Implement necessary component logic
   - Use existing patterns and utilities
   - Make sure tests now pass

5. Refactor (REFACTOR):
   - Improve code quality while keeping tests green
   - Ensure proper typing
   - Follow project coding standards

6. Verify integration:
   - Run all card component tests
   - Check for visual consistency
   - Verify proper interaction with other components

7. Update documentation if needed:
   - Update card system documentation
   - Add important implementation notes

8. Final quality check:
   - Run linting and type checking
   - Verify all tests pass
   - Check for any performance issues