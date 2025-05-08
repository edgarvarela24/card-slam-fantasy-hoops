<!-- .claude/commands/context-prime.md -->
# Context Priming for Feature Development

Prime Claude with the optimal context for working on: $ARGUMENTS

## Context Priming Process:

1. Determine relevant context areas:
   - Identify core domain of feature
   - Determine related components
   - Find applicable documentation

2. Load essential project documentation:
   - Always include `/CLAUDE.md`
   - Include relevant docs from `/docs/claude/`
   - Focus on specific implementation details

3. Load relevant code examples:
   - Find similar components/features
   - Include related tests for reference
   - Add type definitions

4. Filter unnecessary context:
   - Skip unrelated documentation
   - Omit tangential code files
   - Focus only on directly relevant material

5. Load documentation in this order:
   - Project overview (CLAUDE.md)
   - Architecture docs
   - Implementation details
   - Specific component examples
   - Test examples

6. Prime with specific instructions:
   - State the specific feature/task
   - Emphasize TDD workflow requirements
   - Highlight key architectural constraints

7. Ready Claude for work:
   - Summarize loaded context
   - Confirm understanding of requirements
   - Begin planning with TDD approach