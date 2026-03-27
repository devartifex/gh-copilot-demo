# GitHub Copilot Hands-on Workshop Guide

> A practical, step-by-step guide for running a hands-on GitHub Copilot workshop. Covers customization features, operating modes, model selection, premium request mechanics, and real-world use cases — with theory and commands for both VS Code and Copilot CLI.

## Table of Contents

- [Part 1 — Introduction](#part-1--introduction-5-min)
- [Part 2 — Customizing Copilot: The Powerful Levers](#part-2--customizing-copilot-the-powerful-levers-35-min)
  - [2.1 Custom Instructions](#21-custom-instructions)
  - [2.2 Prompt Files](#22-prompt-files)
  - [2.3 Custom Agents](#23-custom-agents)
  - [2.4 Skills](#24-skills-)
  - [2.5 Additional Customization Features (CLI)](#25-additional-customization-features-cli)
  - [2.6 Where Each Customization Can Live: Repo vs User vs Org](#26-where-each-customization-can-live-repo-vs-user-vs-org)
  - [2.7 The Operating Modes: Ask, Plan, Agent, Autopilot, Fleet](#27-the-operating-modes-ask-plan-agent-autopilot-fleet)
- [Part 3 — Focus: Copilot CLI](#part-3--focus-copilot-cli-%EF%B8%8F-10-min)
- [Part 4 — Best Practices: Models, Premium Requests & Real Use Cases](#part-4--best-practices-models-premium-requests--real-use-cases--30-min)
  - [4.1 Choosing the Right Model](#41-choosing-the-right-model)
  - [4.2 Premium Requests: How They REALLY Work](#42-premium-requests-how-they-really-work-)
- [Part 5 — Copilot Beyond Code: Excel & PowerPoint](#part-5--copilot-beyond-code-excel--powerpoint--10-min)
- [Part 6 — Next Steps & Proposed Topics](#part-6--next-steps--proposed-topics-10-min--qa)
- [Appendix A — Complete Customization Reference](#appendix-a--complete-customization-reference)
- [Appendix B — Quick Command Reference](#appendix-b--quick-command-reference)
- [Appendix C — Official Documentation Links](#appendix-c--official-documentation-links)

---

## Part 1 — Introduction (~5 min)

Session objectives:

- Move beyond Copilot basics into advanced, productive workflows
- Learn to customize Copilot for your project and team
- Understand model selection and premium request economics
- Compare VS Code and CLI workflows side by side

### Prerequisites

- Node.js 18+
- VS Code with GitHub Copilot Chat extension
- GitHub Copilot CLI installed
- A GitHub account with Copilot access

### Setup

```bash
git clone https://github.com/devartifex/gh-copilot-demo.git
cd gh-copilot-demo
npm install
npm run dev
```

Verify: Frontend at http://localhost:4321, Backend at http://localhost:3000

---

## Part 2 — Customizing Copilot: The Powerful Levers (~35 min)

Copilot isn't just autocomplete — it's a deeply customizable assistant. This section walks through every lever you can pull to tailor Copilot to your project, your team, and your workflow. These features are available across VS Code and the Copilot CLI, though not every feature has parity on every surface yet.

📎 [Comparing CLI features](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features)
📎 [Customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

---

### 2.1 Custom Instructions

**What they are:** Always-on context that automatically applies to every Copilot interaction within scope. Copilot reads them silently — you never have to repeat project conventions.

**Where they live:**

| Scope | Location | Activation |
|---|---|---|
| Repository-wide | `.github/copilot-instructions.md` | Automatic |
| Path-specific | `.github/instructions/*.instructions.md` | Automatic (when files match `applyTo` glob) |
| Agent instructions | `AGENTS.md` at repo root | Automatic |
| **User-level (personal)** | `$HOME/.copilot/copilot-instructions.md` | Automatic, cross-repo |
| **User-level (advanced)** | Dirs in `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` env var | Automatic |

**When to use:** Standards that should apply broadly — coding style, security rules, review checklists.
**When NOT to use:** If you only want the behavior in one workflow → use a Skill. If instructions are too large/specific → use a Custom Agent.

📎 [Adding custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions)

**🔧 Hands-on Demo:**

1. Open `backend/index.js` in VS Code and ask Copilot: *"Add a new PATCH /todos/:id endpoint to update the todo text"*
   - Observe: Copilot follows Express conventions from `express-backend.instructions.md`
2. Open `frontend/src/pages/index.astro` and ask: *"Add an edit button to each todo item"*
   - Observe: Copilot follows Astro + Bootstrap patterns from `astro-frontend.instructions.md`
3. CLI equivalent:
   ```bash
   copilot -p "Add a new PATCH /todos/:id endpoint to update the todo text"
   ```
   - Same instructions are loaded automatically
4. Disable instructions to see the difference:
   ```bash
   copilot --no-custom-instructions -p "Add a new PATCH /todos/:id endpoint"
   ```

**📁 Files in this repo:**

- `copilot-instructions.md` — general project conventions
- `instructions/express-backend.instructions.md` — Express + SQLite patterns
- `instructions/astro-frontend.instructions.md` — Astro + Bootstrap patterns
- `instructions/security.instructions.md` — OWASP-based security rules
- `instructions/accessibility.instructions.md` — WCAG 2.2 AA guidelines
- `instructions/code-review.instructions.md` — review priorities
- `instructions/code-comments.instructions.md` — commenting rules
- `instructions/github-actions.instructions.md` — CI/CD best practices

---

### 2.2 Prompt Files

**What they are:** Reusable Markdown templates you attach in Copilot Chat. Write the instructions once, reuse with different inputs. Support YAML frontmatter for model, tools, and agent selection, plus `${input:variable}` placeholders.

**Where they live:**

- **Repo**: `.github/prompts/*.prompt.md`
- **User-level (VS Code)**: `prompts/` folder in VS Code user profile

**When to use:** Focused, single-purpose tasks you run repeatedly with different inputs.
**When NOT to use:** If the guidance should apply to everything → use Custom Instructions.

**🔧 Hands-on Demo:**

1. In VS Code Copilot Chat, click the attachment icon (📎) → select `add-dark-mode.prompt.md`
2. Observe: Copilot follows the prompt template to implement dark/light mode toggle
3. Try `generate-backend-tests.prompt.md` — generates a complete Jest test suite
4. CLI: prompt files are available as context in the CLI too

**📁 Files in this repo:**

- `add-dark-mode.prompt.md` — dark/light mode toggle
- `add-rest-endpoint.prompt.md` — new API endpoint
- `create-astro-component.prompt.md` — new UI component
- `generate-backend-tests.prompt.md` — Jest test suite
- `generate-frontend-tests.prompt.md` — Playwright E2E tests
- `add-todo-filtering.prompt.md` — filter buttons
- `refactor-routes.prompt.md` — route modularization

---

### 2.3 Custom Agents

**What they are:** Specialist personas with their own instructions, tool restrictions, and context. Like tailored teammates that already know a specific area of your project.

**Where they live:**

| Scope | Location |
|---|---|
| Repository | `.github/agents/AGENT-NAME.md` |
| Organization/Enterprise | `agents/AGENT-NAME.md` in `.github-private` repo |
| User-level | User profile |

Naming conflicts: lowest level wins (repo > org > enterprise).

**When to use:** Projects with distinct areas needing different expertise (backend, frontend, testing, database).
**When NOT to use:** If you don't need specialization and the default agent works fine.

📎 [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

**🔧 Hands-on Demo:**

1. In VS Code, open Copilot Chat → select `todo-backend` agent from the dropdown
2. Ask: *"Add input validation to the POST /todos endpoint"*
   - Observe: the agent knows Express.js conventions and focuses only on backend
3. Switch to `todo-frontend` agent → ask: *"Create a loading spinner component"*
   - Observe: different expertise, Astro + Bootstrap focus
4. Try `todo-testing` agent → ask: *"Generate tests for the DELETE /todos/:id endpoint"*
5. CLI built-in agents:
   ```bash
   copilot -p "Review the staged changes for security issues"
   # Copilot may auto-delegate to the code-review agent
   ```

**📁 Agents in this repo:**

- `todo-backend.agent.md` — Express.js backend specialist
- `todo-frontend.agent.md` — Astro frontend specialist
- `todo-testing.agent.md` — Jest + Playwright testing specialist
- `todo-database.agent.md` — SQLite database specialist

---

### 2.4 Skills ⭐

**What they are:** Folders of instructions, scripts, and resources that Copilot loads when relevant to improve performance on specialized tasks. The key innovation: skills can dramatically improve results even with lightweight models.

**Where they live:**

| Scope | Location | Notes |
|---|---|---|
| Repository | `.github/skills/<name>/SKILL.md` | Shared with team |
| User-level (personal) | `~/.copilot/skills/<name>/SKILL.md` | Cross-project reuse (CLI + coding agent only) |
| Org/Enterprise | 🔜 Coming soon | — |

**When to use:** Multi-step workflows that should be repeatable and auto-detected.
**When NOT to use:** If guidance should always apply → use Custom Instructions. If you need new capabilities → use MCP Servers.

📎 [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

**🔧 Hands-on Demo:**

1. Ask Copilot: *"Create a new REST endpoint for managing todo categories"*
   - Observe: Copilot automatically loads the `create-rest-endpoint` skill
   - The skill provides step-by-step instructions for Express.js route creation
2. Ask: *"Create a new Astro component for todo statistics"*
   - Observe: `create-astro-component` skill loads automatically
3. CLI:
   ```bash
   /skills list    # List available skills
   # Skills auto-load based on your prompt. Just describe the task:
   copilot -p "Add a GET /todos/stats endpoint"   # create-rest-endpoint skill loads automatically
   ```

**📁 Skills in this repo:**

- `create-rest-endpoint/` — Express.js route creation guide
- `create-astro-component/` — Astro component builder
- `add-database-migration/` — SQLite migration scripts
- `generate-jest-tests/` — Jest test suite generation
- `generate-playwright-tests/` — Playwright E2E tests
- `frontend-error-handling/` — Bootstrap error feedback

---

### 2.5 Additional Customization Features (CLI)

Beyond the four main levers, Copilot CLI supports additional customization primitives:

📎 [Comparing CLI features](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features)

| Feature | What it does | When to use | When NOT to use |
|---|---|---|---|
| **Tools** | Operational abilities (read, edit, search, execute) | Built-in; user can allow/deny per tool | N/A — always present |
| **MCP Servers** | Connect to external systems, APIs, databases | Need external data or domain-specific actions | Built-in tools cover your needs |
| **Hooks** | Custom shell commands at lifecycle moments (`preToolUse`, `postToolUse`, `userPromptSubmitted`, `sessionStart`, `sessionEnd`, `errorOccurred`, `agentStop`, `subagentStop`) | Guardrails, logging, policy enforcement | Just need consistent prompting → use Skills |
| **Subagents** | Delegated agent processes with separate context window | Copilot decides automatically | N/A — runtime behavior |
| **Plugins** | Installable bundles (skills + agents + hooks + MCP) | Team-wide bundles, easy distribution | Experimenting locally → use local files |

---

### 2.6 Where Each Customization Can Live: Repo vs User vs Org

📎 [Customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
📎 [Feature matrix](https://docs.github.com/en/copilot/reference/copilot-feature-matrix)
📎 [Custom instructions support](https://docs.github.com/en/copilot/reference/custom-instructions-support)

> **Important:** Not all customization features are available in all environments. The table below shows what's supported where — differences between VS Code, CLI, and GitHub.com are significant.

#### Feature Availability: VS Code vs CLI vs GitHub.com

| Feature | VS Code | CLI | GitHub.com | Notes |
|---|---|---|---|---|
| **Custom Instructions** | ✅ | ✅ | ✅ | All environments support repo-wide; CLI adds user-level file |
| **Prompt Files** | ✅ | ✅ | ❌ | Not available on GitHub.com |
| **Custom Agents** | ✅ | ✅ | ✅ | All environments |
| **Skills** | ✅ (since 1.108) | ✅ | ✅ (coding agent) | Not in Visual Studio |
| **Hooks** | Preview | ✅ | ✅ (coding agent) | Primarily CLI + GitHub.com coding agent |
| **MCP Servers** | ✅ | ✅ | ✅ | All environments |
| **Subagents** | ✅ | ✅ | ❌ | Runtime process, not user-configured |
| **Plugins** | ❌ | ✅ | ❌ | CLI-only feature |
| **Fleet Mode** | ❌ | ✅ | ❌ | CLI-only feature |

#### Where Each Customization Can Live: Repo vs User vs Org

| Feature | Repo (`.github/`) | User level | Org/Enterprise | Key differences |
|---|---|---|---|---|
| **Custom Instructions** | ✅ `copilot-instructions.md`, `instructions/*.instructions.md`, `AGENTS.md` | ✅ **CLI**: `$HOME/.copilot/copilot-instructions.md` + `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` env. **VS Code**: via settings UI. **GitHub.com**: personal instructions in settings | ✅ Organization instructions via GitHub UI | CLI user-level is file-based; VS Code/GitHub.com is settings-based |
| **Prompt Files** | ✅ `prompts/*.prompt.md` | ✅ **VS Code only**: `prompts/` folder in user profile. **CLI**: ❌ no user-level | ❌ | User-level prompt files are a VS Code feature only |
| **Custom Agents** | ✅ `agents/*.agent.md` | ✅ User profile (VS Code + CLI) | ✅ `.github-private` repo | Lowest level wins on name conflicts |
| **Skills** | ✅ `skills/<name>/SKILL.md` | ✅ **CLI + coding agent**: `~/.copilot/skills/`. **VS Code**: ✅ (since 1.108) | 🔜 Coming soon | Personal skills shared across projects |
| **Hooks** | ✅ `hooks/*.json` | ❌ | ❌ | Repo-level only |
| **MCP Servers** | ✅ `mcp.json` + repo settings | ✅ User IDE config (VS Code `settings.json`, CLI config) | ✅ via `mcp-servers` property in agent configs | Config format varies by environment |
| **Subagents** | N/A (runtime) | N/A | N/A | Not user-configured |
| **Plugins** | N/A | ✅ CLI plugin system (user-installed globally) | N/A | CLI-only |

> **Key takeaway:** If your organization doesn't allow committing AI config files in repos, the workaround is user-level config. Custom Instructions, Skills, and Custom Agents all support user-level in both VS Code and CLI. Prompt Files are user-level in VS Code only (profile `prompts/` folder). Hooks and Plugins are environment-specific — hooks are repo-only, plugins are CLI-only.

---

### 2.7 The Operating Modes: Ask, Plan, Agent, Autopilot, Fleet

| Mode | VS Code | CLI | When to use |
|---|---|---|---|
| **Ask** | Chat panel (default) | Direct prompt | Quick questions, explanations |
| **Plan** | Plan mode in chat | `/plan` | Analyze context → plan → confirm before acting |
| **Agent** | Agent mode (dropdown) | Standard mode (agentic by default) | Complex, iterative tasks |
| **Autopilot** | Agent → Autopilot (VS Code 1.111+) | `--autopilot --allow-all` | Fully autonomous, no approvals |
| **Fleet** | N/A | `/fleet` | Parallelizable tasks, multiple subagents |

#### Autopilot in VS Code (NEW!)

VS Code 1.111+ introduces three approval levels for agent mode:

| Level | Behavior |
|---|---|
| **Default Approvals** | Asks permission for every risky action (file edits, terminal commands) |
| **Bypass Approvals** | Auto-approves all tool executions, but pauses on blocking questions |
| **Autopilot** | Fully hands-off — auto-approves tools AND resolves blocking questions |

How to change: VS Code Settings → search "Copilot" → "Chat: Agent Approval Mode"

#### Fleet Mode (CLI) 🚀

📎 [Fleet mode](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)

The `/fleet` command breaks a complex task into parallelizable subtasks and launches subagents to execute them simultaneously.

```bash
# Example: implement multiple features at once
/fleet "Add priority field to todos: update the database schema, add API endpoints for filtering by priority, and create a frontend priority selector component"
```

Each subagent gets its own context window. Ideal for multi-file implementations, large-scale refactoring, and batch operations.

**🔧 Hands-on Demo — Comparing Modes:**

Same task across all modes to see the difference:

1. **Ask mode:** *"How would you add a priority field to the todos?"*
   - Result: explanation only, no code changes
2. **Plan mode (VS Code):** Switch to Plan → *"Add a priority field to todos"*
   - Result: Copilot produces a plan, waits for approval
   - CLI: `/plan "Add a priority field to todos"`
3. **Agent mode:** Switch to Agent → same prompt
   - Result: Copilot iterates autonomously — edits files, runs tests, self-corrects
4. **Autopilot:** Enable Autopilot approval level → same prompt
   - Result: no approval prompts at all, fully autonomous
5. **Fleet (CLI):** `/fleet "Add priority field: schema + API + frontend component"`
   - Result: parallelizes into 3 subagents working simultaneously

---

## Part 3 — Focus: Copilot CLI 🖥️ (~10 min)

📎 [Comparing CLI features](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features)
📎 [Autopilot mode](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot)

### Installation

```bash
# macOS
brew install copilot-cli

# Windows
winget install GitHub.Copilot

# Verify
copilot --version
```

### VS Code Integration

CLI sessions appear in VS Code's Copilot Chat "Sessions" view, and vice versa. They share the same customization files (instructions, agents, skills, prompts).

### Why use the CLI?

The CLI provides features not available in VS Code:

- **Fleet mode** (`/fleet`) — parallel subagent execution
- **Plugins** (`/plugin install`) — installable feature bundles
- **Hooks** — programmable guardrails at lifecycle events (see [section 2.5](#25-additional-customization-features-cli))
- **Full autonomy flags** — `--allow-all` / `--yolo` for unattended batch work
- **Scriptable** — pipe prompts, chain with CI/CD, automate repetitive tasks

### 🔧 Hands-on Demo

```bash
# Direct prompt
copilot -p "Explain the structure of the backend API"

# Plan mode — analyze before acting
/plan "Add a search endpoint to filter todos by text"

# Fleet mode — parallel execution
/fleet "Add todo categories: create the database table, API endpoints, and frontend selector"

# List skills
/skills list

# Full autonomy for batch work
copilot --autopilot --allow-all -p "Run all tests and fix any failures"
```

> **Key insight:** The CLI is not a separate tool — it's the same Copilot with the same customizations, just in the terminal. Use it when you want scriptability, fleet mode, or unattended automation.

---

## Part 4 — Best Practices: Models, Premium Requests & Real Use Cases ⭐ (~30 min)

**The core of the session.** Use-case driven, with concrete examples.

### 4.1 Choosing the Right Model

📎 [Model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)

#### Official Recommendations by Task

| Task Area | Recommended Models | Why |
|---|---|---|
| **General-purpose coding** | GPT-5.3-Codex, GPT-5 mini, Grok Code Fast 1, Raptor mini | Fast, accurate, good default for most tasks |
| **Fast help / simple tasks** | Claude Haiku 4.5, Gemini 3 Flash | Ultra-fast, low cost, ideal for quick edits |
| **Deep reasoning & debugging** | GPT-5.4, Claude Opus 4.6, Claude Sonnet 4.6, Gemini 3.1 Pro | Complex analysis, multi-file understanding |
| **Agentic development** | GPT-5.4 mini, GPT-5.2-Codex, GPT-5.3-Codex, GPT-5.1-Codex-Max | Optimized for autonomous agent workflows |
| **Visuals (screenshots, UI)** | GPT-5 mini, Claude Sonnet 4.6, Gemini 3.1 Pro | Multimodal input support |

#### Practical Use Cases

| Use Case | Recommended Model | Multiplier | Key Takeaway |
|---|---|---|---|
| In-depth PR review | Claude Opus 4.6 (premium) | 1x | Complex analysis deserves a premium model |
| Planning/architecture + review | Opus for analysis → GPT-5.4 for fix | 1x + 1x | Multi-model pattern: review premium, fix standard |
| Refactoring / implementation | GPT-5.4 | 1x | Unified GPT + Codex, native agent support |
| Quick lightweight tasks | GPT-5.4 mini | 1x | Near-premium benchmarks at standard cost |
| Documentation / comments | Free tier model | 0x | Keep repetitive writing lightweight |
| Auto-fill PR description | Free model + prompt file | 0x | Automate with model auto-selection |
| Commit message generation | Free model + prompt file | 0x | Consistent git history at zero cost |
| **Excel manipulation** ⭐ | GPT-5.4 or Claude Sonnet | 1x | Add columns, compare files, create summaries |
| PowerPoint generation | GPT-5.4 + Python script | 1x | Report automation with agent |
| Basic checks (git status) | Free or manual | 0x | Don't waste premium on trivial tasks |
| **Code Review on PR** 🔍 | Auto-selected by GitHub | varies | AI review directly on the pull request |

#### Multi-Model Pattern

Combine models based on their strengths, not just cost:

1. **Analyze** with a deep reasoning model (Opus 4.6 or GPT-5.4) — get thorough understanding
2. **Implement** with a fast, general-purpose model (GPT-5 mini at 0x on paid plans) — apply changes quickly at zero premium cost
3. **Review** the result with the deep reasoning model again — catch edge cases

> The real savings come from using **included models (0x cost)** for straightforward work, and reserving premium models for tasks that genuinely need deeper reasoning.

#### Auto Model Selection

In VS Code, enabling auto model selection lets Copilot choose the best model for each task.
**Bonus:** Auto model selection gives a **10% discount** on the model multiplier.

📎 [About auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection)

**🔧 Hands-on Demo:**

1. In VS Code, click the model selector → choose different models for the same prompt
2. Compare: ask *"Review backend/index.js for security issues"* with GPT-5 mini vs Claude Opus 4.6
3. In CLI:
   ```bash
   copilot --model claude-opus-4.6 -p "Review backend/index.js for security vulnerabilities"
   copilot --model gpt-5-mini -p "Add a comment to the GET /todos endpoint"
   ```

#### Common Mistakes to Avoid

- ❌ Using a premium request to ask *"Did I commit my changes?"* — check manually or use a free model
- ❌ Using Opus for tasks that GPT-5.4 handles equally well — choose the right model for the task complexity
- ❌ Not selecting the appropriate model — makes Copilot feel frustrating when it's just a model mismatch
- ❌ Writing vague prompts — even with premium models, bad prompts waste the entire allowance

---

### 4.2 Premium Requests: How They REALLY Work ⭐⭐

📎 [Requests in GitHub Copilot](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)
📎 [Premium requests (billing)](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests)

#### The Fundamental Rule

> *"For agentic features, only the prompts you send count as premium requests; actions Copilot takes autonomously to complete your task, such as tool calls, do not."*
> — [GitHub Docs](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)

This is the single most important thing to understand about premium request billing.

#### What Counts vs. What Doesn't

| Your Action | Counts as Premium? | Cost |
|---|---|---|
| Each prompt you send in chat | ✅ Yes | 1 × model multiplier |
| Agent's autonomous tool calls (file reads, edits, tests) | ❌ No | Free |
| `/plan` command in CLI | ✅ Yes | 1 premium request |
| Each follow-up prompt after `/plan` | ✅ Yes | 1 × model multiplier |
| Steering message during agent session | ✅ Yes | 1 × model multiplier |
| Agent iterating internally (edit → test → fix → retry) | ❌ No | Free |

#### Premium Requests by Context

##### 1. VS Code Chat

- Every prompt = **1 × model multiplier**
- Auto model selection = **10% discount** on multiplier
- Included models (GPT-5 mini, GPT-4.1, GPT-4o) = **0 premium requests** on paid plans
- 📎 [Auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection)

##### 2. Copilot CLI

- Same logic: every prompt = **1 × model multiplier**
- No additional interface multiplier
- Fleet mode: `/fleet` — ⚠️ each subagent interacts with the LLM independently, so fleet **may consume MORE premium requests** than a single agent session. The trade-off is speed vs. cost.

##### 3. Coding Agent (remote, on GitHub)

- **1 premium request per session** — regardless of complexity
- A session starts when you assign a task → ends when it completes
- New steering comment on existing session = **new premium request**
- Dedicated billing SKU since November 2025 for separate tracking
- 📎 [Agent management](https://docs.github.com/en/copilot/concepts/agents/coding-agent/agent-management)

##### 4. Code Review on PR

- Premium request billing for code review is covered in [Part 5](#code-review-on-pull-requests-).

##### 5. Planning + Execution (Agentic Pattern)

- `/plan` = **1 premium request**
- Approve plan and start execution = **1 premium request**
- All tool calls during execution = **❌ Free**
- Steering mid-execution = **1 premium request per message**

##### 6. Fleet Mode

- ⚠️ **Fleet can consume MORE premium requests**, not fewer
- Each subagent interacts with the LLM independently → more LLM interactions = more premium requests consumed
- The benefit is **speed** (parallel execution), not cost savings
- Subagents use a low-cost model by default, but you can specify premium models per subtask
- **Trade-off:** faster completion vs. higher premium request consumption
- Use `/model` to check the current model and its multiplier before running `/fleet`
- 📎 [Fleet mode](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)

#### Who Pays? (Enterprise/Organization)

| Question | Answer |
|---|---|
| Who is billed? | The **organization or enterprise** that owns the Copilot seat — NOT the individual user |
| Multiple licenses? | User must select which entity is billed via the "Usage billed to" dropdown |
| Budget controls? | Admins can set limits **per org**, **per SKU** (coding agent vs chat vs review) |
| What happens on overage? | $0.04/request beyond allowance (if enabled by admin policy) |

📎 [Managing premium request allowance](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-request-allowances)

#### Allowance per Plan

| Plan | Premium Requests/month | Included Models (0x cost) | Overage |
|---|---|---|---|
| Free | 50 (hard cap) | Limited selection | Not available |
| Pro | 300 | GPT-5 mini, GPT-4.1, GPT-4o | $0.04/request |
| Pro+ | 1,500 | Same as Pro | $0.04/request |
| Business | 300/user | Same as Pro | $0.04/request |
| Enterprise | 1,000/user | Same as Pro | $0.04/request |

#### Budget & Governance

- Different models have different multipliers (see model comparison docs)
- Set spending limits at organization or enterprise level by cost center
- Premium request analytics dashboard available since September 2025
- Coding Agent and Spark have dedicated billing SKUs for granular tracking

---

## Part 5 — Copilot Beyond Code: Excel & PowerPoint 📊 (~10 min)

Copilot isn't just for developers. It can manipulate files like Excel and generate presentations.

### Working with Excel

Ask Copilot to work with Excel files in natural language:

```
"Analyze the structure of this Excel file — how many rows, columns, what data does it contain?"
"Add a calculated column that is the sum of columns A and B"
"Create a new summary sheet with totals per category"
"Compare these two Excel files and give me a diff report"
"Reformat this Excel with colored headers and auto-filters"
```

> **How it works:** Copilot generates and executes Python scripts (openpyxl/pandas) behind the scenes. You describe what you want in natural language — no coding required.

### PowerPoint Generation (Brief Mention)

Copilot can generate presentations from structured data using agent mode + python-pptx. Best for automated reports, not strategic decks.

### Code Review on Pull Requests 🔍

📎 [About code review](https://docs.github.com/en/copilot/concepts/agents/code-review)

| Aspect | Detail |
|---|---|
| **How to activate** | From PR → click "Copilot" → "Review", or configure auto-review at org/repo level |
| **Model used** | Auto-selected by GitHub (not configurable by user) |
| **Premium cost** | 1 × model multiplier. **Automatic reviews:** charged to the PR author's quota. **Manual reviews:** charged to the requesting user's quota |
| **Configure strictness** | Create `.github/copilot-code-review-instructions.md` in your repo |

**🔧 Hands-on Demo:**

1. Create a PR with the dark mode changes from earlier
2. Click "Copilot" → "Review" on the PR
3. Observe the review comments
4. Show the `copilot-code-review-instructions.md` file that controls what Copilot flags
5. Discuss: without this file, Copilot may flag trivial issues (like `todo` vs `TODO:`)

---

## Part 6 — Next Steps & Proposed Topics (~10 min + Q&A)

### Proposed Future Sessions

| Topic | Description |
|---|---|
| **Coding Agent Deep Dive** | Remote agents, costs, complete workflows from issue to PR |
| **Copilot Customization Governance** | Sharing instructions, agents, skills across organizations |
| **MCP in Enterprise** | GitHub + Azure integrations, governance scenarios |
| **Jira + Coding Agent** | Issue → automated PR workflow |
| **GitHub Copilot SDK** | Building custom apps with Copilot integration |

### Q&A

Submit questions during the session — they'll be addressed throughout and in this final segment.

---

## Appendix A — Complete Customization Reference

📎 [Comparing CLI features](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features)

| Requirement | Best Option |
|---|---|
| Repository conventions always active | **Custom Instructions** |
| Repeatable workflow on demand | **Skills** |
| Focused single task with different inputs | **Prompt Files** |
| Specialized help for a specific area | **Custom Agents** |
| Guardrails and policy on tools | **Hooks** |
| External service integration | **MCP Servers** |
| Complex tasks delegated automatically | **Subagents** (automatic) |
| Distributable bundle of functionality | **Plugins** |

---

## Appendix B — Quick Command Reference

### VS Code

| Action | How |
|---|---|
| Open Copilot Chat | `Ctrl+Shift+I` (Windows) / `Cmd+Shift+I` (Mac) |
| Switch mode (Ask/Plan/Agent) | Dropdown at top of chat panel |
| Select agent | Agent dropdown in chat |
| Attach prompt file | 📎 icon → select `.prompt.md` file |
| Change model | Model selector dropdown |
| Enable Autopilot | Settings → "Chat: Agent Approval Mode" → Autopilot |

### CLI

| Action | Command |
|---|---|
| Start chat | `copilot -p "your prompt"` |
| Plan mode | `/plan "task description"` |
| Fleet mode | `/fleet "complex task"` |
| List skills | `/skills list` |
| Invoke skill | Skills auto-load; use `/skills list` to see available |
| Install plugin | `/plugin install PLUGIN-NAME` |
| Allow specific tool | `--allow-tool TOOL` |
| Skip all permissions | `--allow-all` (or `--yolo`) |
| Disable instructions | `--no-custom-instructions` |
| Select model | `--model MODEL-NAME` |

---

## Appendix C — Official Documentation Links

| Topic | URL |
|---|---|
| Model Comparison | https://docs.github.com/en/copilot/reference/ai-models/model-comparison |
| CLI Customization Features | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features |
| Customization Cheat Sheet | https://docs.github.com/en/copilot/reference/customization-cheat-sheet |
| Premium Requests | https://docs.github.com/en/copilot/concepts/billing/copilot-requests |
| Premium Requests (Billing) | https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests |
| Auto Model Selection | https://docs.github.com/en/copilot/concepts/auto-model-selection |
| Code Review | https://docs.github.com/en/copilot/concepts/agents/code-review |
| Fleet Mode | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet |
| Autopilot (CLI) | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot |
| Coding Agent | https://docs.github.com/en/copilot/concepts/agents/coding-agent/agent-management |
| Custom Agents Config | https://docs.github.com/en/copilot/reference/custom-agents-configuration |
| Agent Skills | https://docs.github.com/en/copilot/concepts/agents/about-agent-skills |
| Custom Instructions | https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions |
| Managing Premium Allowance | https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-request-allowances |

---

*This guide was created as a companion for a hands-on GitHub Copilot workshop. All information is sourced from official GitHub documentation.*
