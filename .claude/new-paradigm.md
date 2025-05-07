## Mastering the .claude/ directory structure

The `.claude/` directory serves as Claude Code's brain, storing configurations that transform it from a generic assistant to a specialized coding partner.

### Essential configuration files

// I'm the only dev working on this so don't worry about anything related to teams

```
project-root/
├── .claude/
│   ├── settings.json      # Project-specific settings (shared)
│   ├── settings.local.json # Local overrides (git-ignored)
│   ├── commands/          # Custom slash commands
│   │   ├── fix-issue.md   # Custom command templates
│   │   └── subdirectory/  # Organized by domain
│   │       └── deploy.md  # Subcommands
├── CLAUDE.md              # Project context document
└── .mcp.json              # MCP server configurations
```

The hierarchical configuration system includes:

1. **Project settings**: `.claude/settings.json` for shared team settings
2. **Personal settings**: `.claude/settings.local.json` for individual preferences 
3. **Global settings**: `~/.claude/settings.json` for cross-project configurations
4. **Custom commands**: `.claude/commands/` for project-specific commands
5. **Personal commands**: `~/.claude/commands/` for commands available in all projects

### CLAUDE.md: AI-optimized documentation

Create a `CLAUDE.md` file in your project root to provide essential context that Claude automatically loads at the start of each session. This file should include:

```markdown
# Project: YourApp

## Technology Stack
- Frontend: React with TypeScript
- Backend: Firebase 
- Database: Firebase
- Package Manager: Yarn Berry // IMPORTANT. ABSOLUTELY FUCK NPM

## Development Workflows
1. Follow TDD.
2. All code must pass linting before commit
3. Tests must be written for all new features
4. PRs require at least one review

## Architecture
[Brief description of key components and their relationships]

## Common Commands
```bash
yarn test:watch  # Run tests in watch mode
yarn lint:fix    # Fix linting issues
```
```

For optimal Claude understanding, structure documentation hierarchically with explicit mental models, command templates, and code standards. Include cross-references between components using consistent tags like `[#auth]` or `[#user-management]`.


### Recommended VS Code settings

```json
// settings.json
{
  "terminal.integrated.env.windows": {
    "CLAUDE_HOME": "$HOME/.claude"
  },
  "terminal.integrated.env.osx": {
    "CLAUDE_HOME": "$HOME/.claude"
  },
  "terminal.integrated.env.linux": {
    "CLAUDE_HOME": "$HOME/.claude"
  }
}
```

## Automating common workflows

Claude Code excels at automating repetitive development tasks:

### Testing automation

```bash
# Generate tests for a component
claude "write unit tests for the authentication module"

# Run tests and fix failures
claude "run our test suite and fix any failing tests"
```

The community has found Claude Code particularly effective with test-driven development:
1. Ask Claude to write tests based on expected behavior
2. Run the tests to confirm they fail as expected
3. Commit the tests
4. Have Claude implement code that makes tests pass
5. Verify implementation meets performance and design standards

### Linting automation

```bash
# Fix linting issues
claude "run the linter and fix all the errors"

# Create a checklist for complex fixes
claude "run the lint command and create a Markdown checklist of errors, then fix each issue one by one"
```

### Git workflow automation

Claude Code can streamline git operations with commands like:

```bash
# Create a commit with intelligent message
claude commit

# Review changes and create a PR
claude "review my changes and create a pull request"

# Fix issues from code review
claude "address the comments in PR #123"
```

### Yarn Berry integration

For projects using Yarn Berry:

```bash
# Manage workspaces
claude "add a new package to the 'frontend' workspace with these dependencies: react, react-dom"

# Handle PnP compatibility
claude "fix the PnP compatibility issues with the webpack configuration"

# Zero-install workflows
claude "update our Yarn Berry offline cache"
```

## Unlocking Claude Code's hidden superpowers

### Extended thinking mode

One of Claude Code's most powerful features is its extended thinking capability. The community has discovered several "magic words" that trigger different levels of computational resources:

- `think` → 4,000 token thinking budget (basic)
- `think hard`, `think deeply`, `megathink` → 10,000 token budget (intermediate)
- `think harder`, `think very hard`, `ultrathink` → 31,999 token budget (maximum)

Use these extended thinking modes for complex architectural decisions:

```bash
claude "ultrathink about the architectural implications of switching our authentication system from session-based to JWT-based"
```

### Custom slash commands

Create custom commands by adding Markdown files to your `.claude/commands/` directory:

```markdown
<!-- .claude/commands/fix-github-issue.md -->
Please analyze and fix the GitHub issue: $ARGUMENTS. 
Follow these steps:
1. Use `gh issue view` to get the issue details
2. Understand the problem described
3. Search the codebase for relevant files
4. Implement the necessary changes
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Create a descriptive commit message
```

Use the command with: `/project:fix-github-issue 1234`

### Model Context Protocol (MCP) integration

Claude Code supports connecting to external MCP servers to extend its capabilities:

```bash
# Add a PostgreSQL MCP server
claude mcp add postgres-server /path/to/postgres-mcp-server --connection-string "postgresql://user:pass@localhost:5432/mydb"

# Add a project-scoped MCP server for team sharing
claude mcp add shared-server -s project /path/to/server
```

Popular community-built MCP servers include:
- Filesystem MCP Server for controlled file access
- PostgreSQL MCP Server for database interactions
- GitHub MCP Server for enhanced GitHub integration
- Puppeteer MCP Server for visual testing and browser automation
- Docker MCP? 
// PLEASE THINK OF OTHER MCP'S THAT WOULD BE HELPFUL FOR OUR PROJECT

## Becoming a true "commander"

To function as a high-level director of the coding process:

### Strategic prompting patterns
// CONSIDER TURNING THESE INTO CUSTOM COMMANDS AND MAYBE EVEN HAVE A PROMPTING PATTERN COMMAND TO LIST STEPS OF PROMPTING PATTERNS AND MAYBE EVEN LOOK INTO AUTOMATING/CHAINING CUSTOM COMMANDS PERHAPS

1. **Task decomposition**: Have Claude break down complex tasks before implementation
   ```
   Analyze the task of implementing real-time notifications and break it down into distinct components with dependencies.
   ```

2. **Counterfactual analysis**: Force consideration of alternatives
   ```
   Before implementing the caching layer, think about three completely different approaches. For each approach, analyze pros/cons.
   ```

3. **Explicit intention framing**: Separate intent from implementation
   ```
   My intention is to improve API response times by adding a caching layer. I'm not committed to any specific strategy. Suggest the best approach.
   ```

### Multi-stage commander workflows

// INCLUDE THESE AS SUB POINTS IN ROADMAP OR IN DOCS SOMEWHERE. THEY CAN BE THINGS LIKE SPIKES BEFORE TAKING ON THE NEXT FEATURE. BUT YES PROMPT CHAINING SEEMS POWERFUL, THINK OF HOW TO UTILIZE THIS WITHIN THIS PROJECT 
Build sophisticated workflows through prompt chaining:

1. **Plan-Review-Execute Cycle**
   ```
   1. Plan how to refactor the authentication system to support multi-factor authentication.
   2. I'll review your plan and provide feedback.
   3. Implement the approved plan across all affected modules.
   ```

2. **Exploration-Decision-Implementation Pipeline**
   ```
   1. Explore three different approaches to implement real-time notifications.
   2. After I select an approach, create a detailed implementation plan.
   3. Execute the plan with tests first, then implementation.
   ```

### Context management for complex projects

Master Claude's context window for more effective interactions:
// CONTEXT PRIMING CAN BE AUTOMATED INTO A CUSTOM COMMAND. ALSO CAN HAVE CUSTOM COMMAND THAT GENERATES WHAT CONTEXT NEEDS TO BE PRIMED FOR CURRENT FEATURE SO WE CAN BE SUPER SPECIFIC AND FOCUSED. FOR EXAMPLE, IF WORKING PURELY IN UI, NO NEED TO READ ANY FIREBASE CODE. IF WE KNOW BEFOREHAND, THEN FINETUNE MATERIAL TO REFERENCE DURING CONTEXT PRIMING
1. **Context priming**: Start sessions with explicit context
   ```
   We're working on a distributed system with microservices. Key concerns are service discovery, fault tolerance, and consistency.
   ```

2. **Context compaction**: Use `/compact` to maintain important context while clearing history

3. **Context partitioning**: Divide complex workflows across multiple sessions

## Optimizing your development workflow

### Research and planning pattern
// INVESTIGATE SUBAGENTS
The community strongly recommends this structured approach for complex tasks:
// CAN THIS BE AUTOMATED AS WELL IN A WAY THAT REQUIRES MINIMAL INPUT FROM ME EXCEPT TO REVIEW? ONLY WANT TO REVIEW IMPORTANT STAGES NOT BOILERPLATE
1. **File Analysis**: Ask Claude to read relevant files but explicitly instruct it not to write code yet
2. **Use Subagents**: Have Claude use subagents to verify details or investigate specific questions
3. **Plan Before Coding**: Trigger extended thinking mode for planning
4. **Documentation**: Have Claude create a document with the plan
5. **Implementation**: Once the plan is solid, proceed with implementation

### Working with large codebases

For large projects:
// WE CURRENTLY ARE BARELY USING BRANCHING. WOULD LIKE A STEP TO AUTOMATE CREATING A BRANCH FOR FEATURE, CHECKING IF WE'RE ON THAT FEATURE. MAYBE SPECIFYING WHAT THE FEATURE BRANCH SHOULD BE CALLED SOMEWHERE SO CLAUDE KNOWS IF ITS WORKING ON THAT FEATURE TO MAKE SURE IT IS ON THAT BRANCH, ETC.
// BUT NOTHING TOO COMPLEX
- **Worktree-based parallel processing**: Use Git worktrees to run multiple Claude Code instances
  ```bash
  # Create a new worktree for a specific task
  git worktree add ../project-feature-x feature-x-branch
  # Run Claude in each worktree directory for parallel work
  ```

- **Context optimization**: Use `/clear` command between tasks to reset the context window

- **Checklist-based approach**: For large tasks with multiple steps, have Claude create and follow a checklist


## Docker and container integration

For enhanced security and reproducibility:

Anthropic provides a reference implementation for secure containerized development:

```json
// .devcontainer/devcontainer.json
{
  "name": "Claude Code Sandbox",
  "build": {
    "dockerfile": "Dockerfile",
    "args": {
      "TZ": "${localEnv:TZ:America/Los_Angeles}"
    }
  },
  "runArgs": [
    "--cap-add=NET_ADMIN",
    "--cap-add=NET_RAW"
  ],
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "eamodio.gitlens"
      ]
    }
  },
  "remoteUser": "node",
  "mounts": [
    "source=claude-code-bashhistory,target=/commandhistory,type=volume"
  ]
}
```

### CI/CD integration

Claude Code can be integrated into CI/CD pipelines:
// THIS WOULD BE VERY SICK TO BE ABLE TO AT LEAST DO AN INITIAL REVIEW IN CI/CD. SO THAT BY THE TIME I GO TO LOOK AT IT, CLAUDE HAS ALREADY REVIEWED AND I CAN AGREE OR DISAGREE, ETC. WILL CLAUDE CODE BE ABLE TO AUTOMATICALLY WORK ON PR COMMENTS THOUGH AFTERWARDS?
```yaml
# Example GitHub Actions workflow
name: Claude Code CI
on:
  pull_request:
    branches: [ main ]

jobs:
  code-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Authenticate Claude Code
        run: echo ${{ secrets.CLAUDE_API_KEY }} > ~/.claude/api_key
      - name: Run Claude Code Review
        run: claude --dangerously-skip-permissions "review the changes in this PR and provide a report" --print > code-review.md
      - name: Upload Review
        uses: actions/upload-artifact@v3
        with:
          name: claude-code-review
          path: code-review.md
```

// ONCE AGAIN, CUSTOM COMMAND TO PRIME CLAUDE WITH THE RIGHT CONTEXT SO I DON'T HAVE TO TYPE EVERYTHING OUT EVERY TIME.
Starting sessions efficiently means giving Claude Code the right context immediately.

### Three-phase workflow pattern

The most effective pattern for Claude Code sessions follows this structure:

1. **Exploration**: "Read and understand the codebase structure"
2. **Planning**: "Create a plan for implementing the feature" 
3. **Implementation**: "Now implement your plan step by step"

This pattern helps Claude Code build appropriate context before taking action. For automation, establish clear markers for phase transitions:

```
When I say "we're ready", please move from exploration to planning.
When I say "let's implement", begin the implementation phase.
During implementation, automatically run linting and tests at appropriate points.
```

### Context management with /clear and /compact

The `/clear` and `/compact` commands are powerful for managing Claude's context window:

- **Use `/clear` when switching tasks** - creates a clean slate for unrelated work
- **Use `/compact` to preserve key context** while reducing token usage
// WOULD BE NICE TO AUTOMATICALLY CALL COMPACT IF AGENT IS CONTINUING ON AFTER A LOGICAL SECTION BUT WISHFUL THINKING
- **Strategic timing matters** - apply `/compact` after completing logical sections

For automation, establish triggers for these commands:

```
After we complete a feature and before starting a new one, please use /compact 
to summarize what we've learned and preserve relevant context.
```

This creates predictable patterns that Claude Code can follow without explicit prompting each time.

## Automating the testing, linting, and commit cycle

Repetitive quality processes are prime candidates for automation with Claude Code.

### Custom slash commands

Create custom slash commands in the `.claude/commands/` directory:

```markdown
# .claude/commands/quality-check.md
Run the following quality checks on the files I've modified:
1. Lint with `yarn lint:fix`
2. Run type checking with `yarn tsc --noEmit`
3. Execute relevant tests with `yarn test --findRelatedTests`
4. Report any issues found in each step
5. If all checks pass, prepare a commit using conventional commit format
```

Then simply use `/project:quality-check` to trigger the entire workflow.

### Pre-commit hook integration

Create a git pre-commit hook that leverages Claude Code's headless mode:

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

echo "Running Claude Code quality check..."
echo "$STAGED_FILES" | claude -p "Run linting and tests on these files.
If issues are found, fix them automatically when possible.
Report any issues that require manual attention." --print

# Exit with success (Claude will have fixed what it could)
exit 0
```

This script runs Claude Code in non-interactive mode, having it check staged files before committing.

### Contextual automation triggers

Train Claude Code to recognize contextual triggers by adding this to your CLAUDE.md:
// THESE SEEM NICE, THINK OF OTHER THINGS THAT WOULD BE NICE WITHIN THIS PROJECT
```markdown
## Automation Triggers
- When I save a file, run the linter automatically
- When I say I'm done with an implementation, run tests
- When all tests pass and I signal readiness, create a commit
- When type errors are detected, fix them immediately
- WHEN ERRORS ARE DETECTED, CONVERT THEM INTO A LIST AND WORK ON CHECKING THEM OFF ONE BY ONE UNTIL THEY ARE DONE
```

Claude Code will learn to identify these trigger patterns in your interactions without explicit commands.

## VS Code and IDE integration

While Claude Code operates in the terminal, integration with your IDE improves automation.

### VS Code configuration

Configure VS Code to work optimally with Claude Code:

```json
// settings.json
{
  "terminal.integrated.defaultProfile.linux": "bash",
  "terminal.integrated.profiles.linux": {
    "bash": {
      "path": "bash",
      "args": []
    }
  },
  "terminal.integrated.shellIntegration.enabled": true,
  "editor.formatOnSave": true,
  "claude-code.allowedTools": ["bash", "grep", "git"],
  "claude-code.ignoredDirectories": ["node_modules", "dist"]
}
```

Add custom key bindings to launch Claude Code efficiently:

```json
// keybindings.json
{
  "key": "ctrl+shift+c",
  "command": "workbench.action.terminal.new",
  "args": {
    "cwd": "${fileDirname}",
    "command": "claude"
  }
}
```

// DO EVERYTHING WITH YARN BERRY PLUG'N'PLAY PLEASE

For Yarn Berry specifically, these extensions work with the Plug'n'Play architecture without additional configuration.

## Commander best practices

The "commander" approach means focusing on outcomes while letting Claude Code handle implementation details.

### Command structure patterns
// THIS IS ALSO A JOB FOR CLAUDE. HELP ME BE COMMANDER BY WRITING INSTRUCTIONS/DOCUMENTATION/COMMANDS IN THIS WAY
Effective commanders use these patterns:

1. **Goal-oriented instructions**: "Create unit tests with 90% coverage" instead of "Write a test file called..."
2. **Constraint-based guidance**: "Refactor this component without changing its public API"
3. **Outcome specifications**: "Ensure all API endpoints validate input and return appropriate errors"

This approach leverages Claude Code's understanding of development patterns while maintaining your control over the direction.

### Quality checkpoints
// WOULD LIKE TO SEE THIS AS WELL. CHECKPOINTS TO SAY HEY LET'S STOP AND VALIDATE THINGS AT THIS POINT. HEY THIS IS A VISUAL CHANGE, LET'S AT LEAST VALIDATE THE UI LOOKS GOOD OR LOOKS LIKE THIS, ETC.

// BUT QUALITY CHECKPOINTS GREAT AS WELL AND WE ALREADY DO A LOT OF THIS
Establish explicit quality checkpoints in your CLAUDE.md:

```markdown
## Quality Checkpoints
- Before implementing: Check existing patterns in similar code
- After implementation: Run linter and fix issues
- Before committing: Verify tests pass and coverage meets targets
- For PR creation: Ensure PR description follows team template
```

Claude Code will follow these checkpoints without requiring explicit commands each time.

### Thinking mode activation
// PROBABLY GOOD FOR PLANNING STAGES/COMMANDS
// SO MAYBE POINTS IN ROADMAP WHERE THINKING HARDER MAY BE AN ADVANTAGE WE CAN POINT OUT AND REMIND OURSELVES OR AUTOMATE IT BEFOREHAND.
Use specific phrases to trigger extended thinking for complex problems:

- **"think"**: Basic extended thinking (4,000 token budget)
- **"think hard"**: Moderate extended thinking
- **"think harder"**: Advanced extended thinking
- **"ultrathink"**: Maximum thinking (31,999 tokens)

Include guidance in your CLAUDE.md on when to use each thinking level:

```markdown
## Thinking Levels
- Use "think" for routine problem solving
- Use "think hard" for complex algorithmic challenges
- Use "ultrathink" for architecture design decisions
```

## Generate boilerplate
- generate boilerplate with framework tools if possible so Claude does not have to do the writing and can simply go in and edit necessary changes.
- more efficient.
