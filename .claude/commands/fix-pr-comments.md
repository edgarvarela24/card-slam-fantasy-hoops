# Fix PR Comments for #$ARGUMENTS
Process all comments on PR #$ARGUMENTS, implement fixes, and resolve or reply to each comment.

## Step 0: Familiarize yourself with code base and docs
- read ClAUDE.md and README.md in docs/claude.

## Step 1: Gather PR information and comments
Run: REPO_WITH_OWNER=$(gh repo view --json nameWithOwner -q .nameWithOwner)
Run: gh pr checkout $ARGUMENTS
Run: PR_COMMENTS=$(gh api repos/$REPO_WITH_OWNER/pulls/$ARGUMENTS/comments --jq '.[]')

## Step 2: For each comment, extract file path, line number, and content
For each comment in $PR_COMMENTS:
- Extract the file path from .path
- Extract the line number from .line or .position
- Analyze the comment content to understand the issue
- Determine the appropriate fix

## Step 3: For each issue, implement a fix
For each comment:
- Find the file and line mentioned
- Parse the suggested changes or implied fix
- Implement the changes locally
- Run relevant tests if the change is significant
- If tests pass, stage the changes

## Step 4: For each fixed issue, respond to the comment
Run: gh api \
  repos/$REPO_WITH_OWNER/pulls/comments/COMMENT_ID/replies \
  -X POST \
  -F body="✅ Fixed: [DESCRIPTION_OF_FIX]"

## Step 5: Commit and push all the fixes
Run: git commit -m "Address PR feedback from automation"
Run: git push

## Step 6: Add a summary comment
Run: gh pr comment $ARGUMENTS --body "# Fixed Issues from Comments\n\n- [LIST_OF_FIXES]\n\nAll comments have been addressed. Ready for final review!"

Important considerations:
1. Skip comments that require human judgment (will note these in summary)
2. Run tests after each significant change to ensure nothing breaks
3. Provide clear descriptions of what was fixed in each reply
4. For complex fixes, explain the approach taken