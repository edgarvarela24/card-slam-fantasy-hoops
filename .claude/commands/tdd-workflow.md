<!-- .claude/commands/tdd-workflow.md -->
# TDD Workflow for Card Slam Fantasy Hoops

Please follow this test-driven development process for $ARGUMENTS:

## 1. Understand Requirements
- Clarify what functionality is needed
- Define expected behavior, edge cases, and success criteria

## 2. Create Interface/Placeholder
- Create minimal type definitions or empty functions/components
- Don't implement real functionality yet

## 3. Write Failing Tests (RED)
- Write comprehensive tests covering the expected behavior
- VERIFY tests run and fail (not compile errors)
- Use `yarn test path/to/test.tsx --watch` to run tests

## 4. Implement Minimal Code (GREEN)
- Write the simplest code that passes the tests
- Focus on correctness, not optimization
- Run tests continuously as you implement

## 5. Refactor (REFACTOR)
- Clean up code while keeping tests passing
- Improve structure, naming, and performance
- Eliminate duplication and code smells

## 6. Verify & Integrate
- Run the full test suite: `yarn test`
- Verify lint and type checks: `yarn lint && yarn typecheck`
- Prepare for commit using conventional format

Remember:
- Tests MUST fail before implementation
- Focus on behavior, not implementation details
- Write small, focused tests
- Commit after meaningful progress is made