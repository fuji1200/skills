# CLAUDE.md

Guidance for AI assistants (Claude Code and others) working in this repository.

## What this repository is

This is **`anthropic-agent-skills`** — a collection of example [Agent Skills](https://anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) published by Anthropic. It is a *content* repository, not an application: there is no build, no server, and no test suite to run for the repo as a whole. Each top-level directory (with a few exceptions) is a **self-contained skill** that Claude loads dynamically to perform better at a specialized task.

A skill is a folder whose entrypoint is a `SKILL.md` file. See `agent_skills_spec.md` for the authoritative spec and `README.md` for the user-facing overview.

Two licensing tiers coexist here:
- **Example skills** — open source (Apache 2.0). Reference examples for learning and inspiration.
- **Document skills** (`document-skills/`) — source-available (Proprietary, see each skill's `LICENSE.txt`). These are point-in-time snapshots of the skills that power Claude's document capabilities in production. They are **not actively maintained**; treat them as read-only references unless explicitly asked to modify them.

## Repository layout

```
.
├── .claude-plugin/marketplace.json   # Plugin marketplace manifest (MUST be updated when adding/removing skills)
├── agent_skills_spec.md              # The Agent Skills specification (source of truth for SKILL.md format)
├── README.md                         # User-facing overview and install instructions
├── THIRD_PARTY_NOTICES.md            # Third-party license notices
│
├── <skill-name>/                     # Each example skill is a top-level directory
│   ├── SKILL.md                      # Required entrypoint (YAML frontmatter + Markdown body)
│   ├── LICENSE.txt                   # Per-skill license
│   ├── scripts/                      # Optional: executable helpers (Python/Bash/JS)
│   ├── references/                   # Optional: docs loaded into context on demand
│   ├── assets/ / templates/ / etc.   # Optional: files used in the skill's output
│   └── examples/                     # Optional: worked examples
│
├── document-skills/                  # Proprietary document skills (docx, pdf, pptx, xlsx)
└── template-skill/                   # Minimal starting point for new skills
```

Current example skills: `algorithmic-art`, `artifacts-builder`, `brand-guidelines`, `canvas-design`, `frontend-design`, `internal-comms`, `mcp-builder`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `webapp-testing`. Plus `template-skill` (starter) and `document-skills/{docx,pdf,pptx,xlsx}`.

## The SKILL.md contract

Every skill's `SKILL.md` starts with YAML frontmatter followed by a Markdown body.

**Required frontmatter fields:**
- `name` — must be **hyphen-case** (lowercase letters, digits, hyphens only; no leading/trailing/consecutive hyphens) and **must match the directory name**.
- `description` — what the skill does *and when to use it*. Written in the third person (e.g. "This skill should be used when…"). **Must not contain angle brackets (`<` or `>`)** — validation rejects them.

**Optional frontmatter fields:** `license`, `allowed-tools` (Claude Code only), `metadata` (string→string map).

**Body conventions:**
- Write instructions in **imperative/infinitive form** (verb-first: "To do X, run Y"), not second person.
- Follow **progressive disclosure** — keep `SKILL.md` lean (aim well under ~5k words). Push detailed schemas, long references, and examples into `references/` files rather than duplicating them in `SKILL.md`. Information should live in exactly one place.
- Use the three-resource pattern for bundled files:
  - `scripts/` — executable code for deterministic/repeated tasks (can run without loading into context).
  - `references/` — documentation loaded into context only when needed. For large files (>10k words), include grep patterns in `SKILL.md`.
  - `assets/` — files used *in the output* (templates, fonts, boilerplate), not loaded into context.

## Working on skills

### Creating or editing a skill

Prefer the **`skill-creator`** skill's tooling — it encodes the conventions above:

```bash
# Scaffold a new skill from the template
skill-creator/scripts/init_skill.py <skill-name> --path <output-directory>

# Validate a skill's SKILL.md (frontmatter, naming, description rules)
skill-creator/scripts/quick_validate.py <path/to/skill-folder>

# Validate + package into a distributable zip
skill-creator/scripts/package_skill.py <path/to/skill-folder> [output-dir]
```

`package_skill.py` runs validation first and refuses to package an invalid skill. Always validate before considering a skill change complete.

When authoring, remember the audience is **another instance of Claude**: include non-obvious procedural knowledge, domain details, and reusable resources — omit generic advice the model already has.

### Registering a skill in the marketplace

`/.claude-plugin/marketplace.json` lists the skills exposed by each plugin. There are two plugins:
- `document-skills` → `document-skills/{xlsx,docx,pptx,pdf}`
- `example-skills` → the example skills

**When adding, removing, or renaming a skill, update `marketplace.json` in the same change** (add the `./skill-name` path to the appropriate plugin's `skills` array). A skill directory that isn't listed will not be installed via the plugin. Also add the skill to the relevant section of `README.md`.

## Conventions & guardrails

- **Match the surrounding style.** Skills vary in structure (workflow-based, task-based, reference-heavy). When editing an existing skill, follow its established pattern rather than imposing a new one.
- **Keep each skill self-contained.** Skills should not depend on files outside their own directory. Script dependencies are declared per-skill (e.g. `mcp-builder/scripts/requirements.txt`, `slack-gif-creator/requirements.txt`).
- **Respect licensing.** Do not copy proprietary `document-skills/` content into Apache-licensed example skills, or vice versa. Preserve each skill's `LICENSE.txt`.
- **Creative skills avoid copyright infringement.** Art/design skills (`algorithmic-art`, `canvas-design`, etc.) explicitly instruct creating original work rather than copying existing artists — preserve this guidance.
- **No repo-wide build/test.** Validate individual skills with `quick_validate.py`. Test scripts by running them directly with their declared dependencies installed.

## Git & contribution workflow

- Changes land via **pull requests**; commit messages are concise and reference the PR number (e.g. `Add 'frontend-design' example skill (#98)`).
- The default branch is `main`. Develop on a feature branch and push there — never push directly to `main` without explicit permission.
- Do **not** open a pull request unless explicitly asked.
