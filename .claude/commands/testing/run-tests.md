<!-- .claude/commands/testing/run-tests.md -->
# Run Tests for Card Slam Fantasy Hoops

Run and analyze tests for $ARGUMENTS:

## Testing Process:

1. Run the appropriate test command:
   ```bash
   # If specific file(s) provided:
   yarn test $ARGUMENTS

   # If no arguments, run all tests:
   yarn test
   ```

2. Run in watch mode if requested:
   ```bash
   yarn test $ARGUMENTS --watch
   ```

3. Analyze test results:
   - Extract list of passing and failing tests
   - Create detailed breakdown of any failures
   - Identify error patterns or common issues

4. For failing tests:
   - Analyze error messages and stack traces
   - Create an ordered list of issues to fix
   - Prioritize issues that block other tests

5. For tests with low coverage:
   - Identify uncovered code paths
   - Suggest additional test scenarios
   - Outline missing edge cases

6. Report Results:
   - Show test status summary
   - Provide list of passing/failing tests
   - Show code coverage metrics if available
   - Create actionable checklist for fixes