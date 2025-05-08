<!-- .claude/commands/fix-lint.md -->
# Fix Lint Issues

Analyze and fix linting issues in $ARGUMENTS:

## Lint Fixing Process:

1. Run linter to identify issues:
   ```bash
   yarn lint
   ```

2. If lint-errors.json exists, analyze it first:
   ```bash
   cat lint-errors.json
   ```

3. Create structured checklist of issues:
   - Group by file
   - Categorize by rule/error type
   - Sort by severity

4. Fix issues methodically:
   - Fix one issue type at a time
   - Start with most severe issues first
   - Fix across all files for consistency
   - Follow project code style guidelines

5. Run automatic fixes when appropriate:
   ```bash
   yarn format
   ```

6. Re-check after fixes:
   ```bash
   yarn lint
   ```

7. Verify type-checking passes:
   ```bash
   yarn typecheck
   ```

8. Report results:
   - Summarize fixed issues by category
   - List any remaining issues
   - Explain any unfixable issues with reason