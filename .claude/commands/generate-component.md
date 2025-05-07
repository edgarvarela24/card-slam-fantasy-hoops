<!-- .claude/commands/generate-component.md -->
# Generate React Component

Generate a new React component with appropriate testing: $ARGUMENTS

## Component Generation Process:

1. Analyze component requirements:
   - Understand the component's purpose and behavior
   - Define required props and state
   - Identify UI/UX requirements

2. Create component directory structure:
   ```bash
   mkdir -p src/components/$ARGUMENTS/__tests__
   ```

3. Write component interface and types:
   - Define props interface
   - Create any necessary type definitions

4. Write component test file FIRST:
   - Create comprehensive test cases
   - Test props, rendering, and behavior
   - Verify tests fail appropriately

5. Implement the component:
   - Follow React best practices
   - Use TypeScript for type safety
   - Follow project styling patterns

6. Create index.ts for component export:
   - Export the component as a named export
   - Export any related types or utilities

7. Run tests to verify implementation:
   ```bash
   yarn test src/components/$ARGUMENTS/__tests__
   ```

8. Run linting and type checking:
   ```bash
   yarn lint && yarn typecheck
   ```

9. Document component usage:
   - Add JSDoc comments
   - Include example usage
   - Document available props