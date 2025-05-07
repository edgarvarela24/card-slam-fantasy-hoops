<!-- .claude/commands/address-pr-comments.md -->
# Address PR Comments

Fetch and address comments from PR #$ARGUMENTS.

## PR Comment Handling Process:

1. Fetch PR comments using GitHub CLI:
   ```bash
   PR_NUMBER=$ARGUMENTS
   gh pr view $PR_NUMBER --json comments --jq '.comments[].body' > pr_comments.txt
   ```

2. Extract actionable feedback:
   - Parse comment format and structure
   - Identify specific code change requests
   - Group similar issues together
   - Prioritize changes by importance

3. Create structured task list:
   - Create a markdown checklist of required changes
   - Group by file or component
   - Include PR comment references
   - Mark code quality issues separately from feature requests

4. Plan implementation approach:
   - For each task, outline the solution strategy
   - Verify solution aligns with project standards
   - Consider impacts on other components

5. Make required changes following TDD workflow:
   - For each change, write/update tests first
   - Implement the minimal code to address the comment
   - Verify tests pass after changes
   - Run linting and type checking
   - Mark task as completed

6. Prepare response comments:
   - Document what was changed and why
   - Explain any technical decisions made
   - Note any comments that were not addressed and why

7. Verify all changes:
   - Run full test suite
   - Ensure all code quality checks pass
   - Verify changes address the original comments

8. Generate summary of changes:
   - List all issues addressed
   - Summarize approach taken
   - Highlight any potential follow-up items