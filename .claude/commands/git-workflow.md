<!-- .claude/commands/git-workflow.md -->
# Git Workflow Assistant

Manage Git workflow for task: $ARGUMENTS

## Git Workflow Process:

1. Verify current branch status:
   ```bash
   git status
   git branch
   ```

2. Create feature branch if needed:
   ```bash
   git checkout -b feature/$ARGUMENTS
   ```

3. Stage changes appropriately:
   - Review files to be staged
   - Group related changes
   - Use atomic commits for clarity

4. Create conventional commit:
   - Use correct type (feat, fix, docs, etc.)
   - Include scope when appropriate
   - Write clear description
   - Follow format: `type(scope): description`

5. Push changes:
   ```bash
   git push origin feature/$ARGUMENTS
   ```

6. Create pull request (if ready):
   - Set appropriate title
   - Include detailed description
   - Reference roadmap item or issue
   - Request review if applicable

7. Check CI status:
   - Verify tests pass
   - Ensure lint checks succeed
   - Address any CI failures

8. Merge when ready:
   - Ensure all checks pass
   - Use squash and merge if appropriate
   - Clean up branch after merge