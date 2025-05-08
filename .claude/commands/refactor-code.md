<!-- .claude/commands/refactor-code.md -->
# Targeted Code Refactoring

Analyze and refactor $ARGUMENTS for improved code quality:

## Refactoring Process:

1. Code Analysis:
   - Identify code smells and anti-patterns
   - Measure cyclomatic complexity
   - Check for SOLID principle violations
   - Look for repeated patterns

2. Refactoring Opportunities:
   - Extract common functionality
   - Improve naming for clarity
   - Simplify complex conditionals
   - Enhance type safety
   - Remove dead code

3. Prioritize Changes:
   - Focus on high-impact areas first
   - Evaluate risk vs. benefit
   - Maintain behavior preservation
   - Consider impact on tests

4. Implementation Plan:
   - Create step-by-step refactoring sequence
   - Verify tests after each change
   - Suggest improved patterns
   - Preserve API contracts

5. Apply Refactorings Incrementally:
   - Make one logical change at a time
   - Run tests after each change
   - Document reasoning for significant changes
   - Use typed intermediates for complex transformations

6. Verify Results:
   - Ensure all tests pass
   - Compare before/after complexity
   - Verify type safety
   - Check performance impact