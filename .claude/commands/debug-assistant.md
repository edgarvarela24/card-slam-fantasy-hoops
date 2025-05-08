<!-- .claude/commands/debug-assistant.md -->

```markdown
# Debug Assistant

Methodically debug the issue with $ARGUMENTS:

## Debugging Process:

1. Issue Clarification:
   - Define expected vs. actual behavior
   - Identify reproducibility pattern
   - Categorize issue type (render, state, timing, etc.)

2. Environment Verification:
   - Check Node/npm versions
   - Verify environment variables
   - Review browser/device specifics
   - Check for recent dependency changes

3. Evidence Collection:
   - Gather relevant logs:
     ```bash
     yarn dev --debug
     ```
   - Examine relevant state snapshots
   - Review network activity
   - Check for console errors

4. Hypothesis Generation:
   - List possible root causes
   - Rank by likelihood
   - Connect symptoms to potential causes
   - Consider timing and state management issues

5. Targeted Investigation:
   - Design minimal test cases
   - Suggest logging strategy
   - Identify code paths to inspect
   - Create reproducible examples

6. Solution Development:
   - Propose fixes for each hypothesis
   - Estimate side-effect risk
   - Develop verification steps
   - Create test cases

7. Fix Verification:
   - Implement highest-likelihood fix
   - Verify issue resolution
   - Document fix for future reference
   - Add regression tests