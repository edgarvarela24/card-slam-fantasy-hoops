<!-- .claude/commands/quality-check.md -->
# Quality Check

Run quality checks on $ARGUMENTS files (or the most recently modified files if no argument is provided).

## Steps to perform:

1. Run tests for affected files:
   ```bash
   yarn test --findRelatedTests $ARGUMENTS
   ```

2. Run type checking:
   ```bash
   yarn typecheck
   ```

3. Run linting:
   ```bash
   yarn lint
   ```

4. Check formatting:
   ```bash
   yarn format:check
   ```

5. Generate error report:
   - Create a checklist of all issues found
   - Categorize by severity (critical, moderate, minor)
   - Provide specific file:line references for each issue

6. Fix issues:
   - Fix critical typing errors first
   - Fix test failures
   - Fix linting issues
   - Fix formatting issues

7. Verify fixes:
   - Re-run all checks to ensure issues are resolved
   - Report any remaining issues

8. Prepare for commit (if all checks pass):
   - Suggest appropriate commit message using conventional format
   - Include scope based on affected files