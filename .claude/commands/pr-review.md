# PR Review Command

I'll review PR #$ARGUMENTS and leave detailed comments directly on GitHub.

Steps:
1. First, I'll read all project docs to understand our coding standards
2. Get the PR details using: `gh pr view $ARGUMENTS --json files,title,body`
3. Fetch the PR diff using: `gh pr diff $ARGUMENTS`
4. Analyze changes against our coding standards
5. Leave specific, actionable comments directly on the PR using: 
   `gh pr comment $ARGUMENTS --body "..."` for general comments
6. Use line-specific comments when appropriate

Let me start the review now!