<!-- .claude/commands/firebase/test-firebase.md -->
# Test Firebase Integration

Test and validate Firebase connectivity and features for $ARGUMENTS:

## Firebase Testing Process:

1. Check Firebase configuration:
   ```bash
   yarn validate:firebase
   ```

2. Run Firebase connectivity test:
   ```bash
   yarn test:firebase
   ```

3. Run Firebase-specific tests:
   ```bash
   yarn test src/firebase/__tests__
   ```

4. If testing specific Firebase feature:
   ```bash
   yarn test src/firebase/__tests__/$ARGUMENTS.test.ts
   ```

5. Analyze test results:
   - Verify authentication is working
   - Confirm database connections are successful
   - Check Cloud Functions are accessible

6. Validate permission settings:
   - Confirm security rules are properly enforced
   - Test with different user roles
   - Verify data access controls

7. Check error handling:
   - Test offline scenarios
   - Verify proper error messages
   - Confirm retry/recovery mechanisms

8. Generate connectivity report:
   - List all Firebase services tested
   - Show connection status for each
   - Provide error details for any failures