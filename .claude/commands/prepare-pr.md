<!-- .claude/commands/prepare-pr.md -->
# Prepare Pull Request

Prepare a high-quality PR for the current branch focusing on: $ARGUMENTS

## PR Preparation Process:

1. Check branch status:
   ```bash
   git status
   git branch --show-current
   ```

2. Ensure all changes are committed:
   ```bash
   # If there are uncommitted changes
   git add .
   git commit -m "feat/fix: Final changes before PR"
   ```

3. Run pre-PR checks:
   ```bash
   # Run tests
   yarn test
   
   # Check linting and types
   yarn lint
   yarn typecheck
   ```

4. Fix any issues found:
   - Address test failures
   - Fix lint warnings and errors
   - Resolve type issues

5. Prepare PR description:
   - Create a clear title matching the branch and feature
   - Write detailed description of changes
   - Link to relevant roadmap items or issues
   - Include test coverage information
   - Add checklist for reviewers

6. Push final changes:
   ```bash
   git push origin $(git branch --show-current)
   ```

7. Create PR using GitHub CLI:
   ```bash
   CURRENT_BRANCH=$(git branch --show-current)
   PR_TITLE="$ARGUMENTS"
   
   gh pr create --title "$PR_TITLE" --body "$(cat <<'EOF'
   ## Summary
   [Brief description of the changes]
   
   ## Changes
   - [Detailed list of changes]
   
   ## Testing
   - [How these changes were tested]
   - [Test coverage information]
   
   ## Roadmap Item
   - [Link to relevant roadmap item]
   
   ## Screenshots (if applicable)
   [Any relevant screenshots]
   
   ## Additional Notes
   [Any additional information]
   EOF
   )"
   ```

8. Check CI status:
   ```bash
   gh pr checks
   ```

9. Share PR link for review