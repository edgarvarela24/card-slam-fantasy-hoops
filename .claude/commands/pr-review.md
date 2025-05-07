<!-- .claude/commands/pr-review.md -->
# PR Review Command

Review PR #$ARGUMENTS thoroughly and provide detailed feedback aligned with project standards.

## PR Review Process:

1. Gather PR Information:
   ```bash
   # Get PR details
   PR_NUMBER=${ARGUMENTS%% *}
   gh pr view $PR_NUMBER --json files,title,body,commits > pr_details.json
   
   # Fetch PR diff
   gh pr diff $PR_NUMBER > pr_diff.txt
   ```

2. Load project documentation:
   - Read CLAUDE.md for project standards
   - Examine relevant docs in /docs/claude/
   - Focus on TDD requirements, code quality standards

3. Check documentation context (if provided):
   ```bash
   # If URL provided as second argument, fetch it
   if [[ "$ARGUMENTS" =~ " " ]]; then
     DOC_URL=${ARGUMENTS#* }
     # Use WebFetch to retrieve relevant context
   fi
   ```

4. Analyze changes in detail:
   - Group files by type/component
   - Check each file against project standards
   - Apply appropriate code review criteria:
     - **Test files**: Verify proper TDD approach
     - **Components**: Check TypeScript usage, React patterns
     - **Services**: Verify architecture consistency
     - **Documentation**: Check clarity and completeness

5. TDD compliance verification:
   - Check that tests were written before implementation
   - Verify test files show proper RED-GREEN-REFACTOR approach
   - Assess test coverage and completeness
   - Flag any implementation without proper test coverage

6. Code quality assessment:
   - Verify TypeScript types are properly defined
   - Check for ESLint/formatting compliance
   - Look for potential performance issues
   - Assess component composition and reusability

7. Provide line-specific feedback:
   ```bash
   # For each issue found, add a line comment
   gh api -X POST /repos/$(gh repo view --json nameWithOwner -q .nameWithOwner)/pulls/$PR_NUMBER/comments \
     -f body="[Issue description with specific recommendation]" \
     -f commit_id="$(gh pr view $PR_NUMBER --json headRefOid -q .headRefOid)" \
     -f path="FILE_PATH" \
     -f line=LINE_NUMBER
   ```

8. Generate comprehensive review summary:
   ```bash
   gh pr comment $PR_NUMBER --body "# PR Review Summary

   ## Strengths
   - [Detailed list of strengths found]

   ## Areas for Improvement
   - [Specific, actionable improvements needed]

   ## TDD Workflow Assessment
   - [Evaluation of RED-GREEN-REFACTOR adherence]
   - [Test coverage analysis]
   - [Test quality assessment]

   ## Code Quality
   - [TypeScript usage assessment]
   - [Component design evaluation]
   - [Performance considerations]
   - [Linting/formatting compliance]

   ## Documentation
   - [Documentation completeness]
   - [Code comments quality]
   - [JSDoc usage]

   ## Security Considerations
   - [Any security concerns]
   - [Firebase security rules impact]

   ## Overall Assessment
   [Final recommendation with action items]"
   ```

9. Follow-up tracking:
   - Create checklist for required changes
   - Suggest specific improvements with examples
   - Provide references to project documentation