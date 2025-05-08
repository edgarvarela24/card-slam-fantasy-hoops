# PR Analysis for #$ARGUMENTS
Analyze PR #$ARGUMENTS and leave detailed line comments and a summary.

## Step 1: Get repository and PR information
Run: REPO_WITH_OWNER=$(gh repo view --json nameWithOwner -q .nameWithOwner)
Run: PR_HEAD_SHA=$(gh pr view $ARGUMENTS --json headRefOid -q .headRefOid)

## Step 2: Check out and examine the changes
Run: gh pr checkout $ARGUMENTS
Run: gh pr diff $ARGUMENTS > pr_diff.txt

## Step 3: Analyze the changed files in context
- Understand how each file fits into our architecture
- Check against our coding standards and best practices
- Look for potential bugs, edge cases, and performance issues
- Consider readability and maintainability

## Step 4: For each issue found, add a line comment using GitHub API
For each issue or suggestion:
Run: gh api \
  repos/$REPO_WITH_OWNER/pulls/$ARGUMENTS/comments \
  -X POST \
  -F body="COMMENT_TEXT" \
  -F commit_id="$PR_HEAD_SHA" \
  -F path="FILE_PATH" \
  -F line=LINE_NUMBER \
  -F side="RIGHT"

## Step 5: Add a summary comment at the end
Run: gh pr comment $ARGUMENTS --body "# PR Analysis Summary\n\n[DETAILED_SUMMARY]"

Important considerations:
1. Be specific and constructive in line comments
2. Suggest concrete improvements when possible
3. Highlight both strengths and areas for improvement
4. Format the summary comment with clear sections using Markdown
5. Consider code patterns in our existing codebase
6. THIS IS A CODE REVIEW. DO NOT TRY TO CREATE/EDIT FILES