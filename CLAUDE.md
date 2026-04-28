# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This repo is a collection of example **Agent Skills** — folders of instructions, scripts, and resources that Claude loads dynamically to specialize at specific tasks. It is also packaged as a Claude Code **plugin marketplace** (see `.claude-plugin/marketplace.json`), which exposes two plugins:

- `document-skills` — `document-skills/{xlsx,docx,pptx,pdf}` (source-available, point-in-time snapshots, not actively maintained)
- `example-skills` — every other top-level skill directory (Apache 2.0)

There is no global build system, no test runner, and no top-level package manifest. Each skill is self-contained, and tooling lives inside `skill-creator/scripts/`.

## Skill Anatomy (Spec)

Authoritative spec: `agent_skills_spec.md`. Every skill directory must contain a `SKILL.md` whose YAML frontmatter has at minimum:

```yaml
---
name: hyphen-case-name        # must equal the directory name; lowercase + digits + hyphens only
description: ...              # third-person, explains what it does AND when to use it
---
```

Optional frontmatter keys: `license`, `allowed-tools` (Claude Code only), `metadata` (string→string map).

By convention, bundled resources live in three subdirectories — each implements one tier of **progressive disclosure** (metadata always loaded → SKILL.md loaded on trigger → resources loaded on demand):

- `scripts/` — Executable code Claude runs without loading into context (deterministic operations, repeated boilerplate). E.g. `document-skills/pdf/scripts/fill_fillable_fields.py`.
- `references/` — Markdown that Claude reads into context only when needed (schemas, API docs, long workflow guides). Keep `SKILL.md` lean by moving detail here.
- `assets/` — Files used in Claude's *output*, not loaded into context (templates, fonts, boilerplate project trees).

Information should live in `SKILL.md` **or** a references file, not both.

## SKILL.md Writing Conventions

These conventions are followed by every existing skill and should be preserved when editing or creating one:

- Write the body in **imperative/infinitive form** ("To rotate a PDF, run…"), not second person ("You should…").
- Phrase the `description` in third person and include explicit triggering conditions ("This skill should be used when…").
- Pick one of four documented structural patterns and stick to it: workflow-based, task-based, reference/guidelines, or capabilities-based (see `skill-creator/scripts/init_skill.py` for descriptions).
- Reference any bundled scripts/assets/references by relative path so Claude knows they exist.

## Common Commands

All tooling is under `skill-creator/scripts/` and operates on a single skill folder at a time.

```bash
# Scaffold a new skill (creates dir + SKILL.md + example scripts/references/assets)
skill-creator/scripts/init_skill.py <skill-name> --path <output-dir>

# Validate a skill's frontmatter and naming (fast, no deps)
python skill-creator/scripts/quick_validate.py <path/to/skill-folder>

# Validate then package into <skill-name>.zip for distribution
python skill-creator/scripts/package_skill.py <path/to/skill-folder> [output-dir]
```

`package_skill.py` calls `quick_validate.py` first and refuses to produce a zip if validation fails. There is no separate "test" command — validation IS the test.

## Plugin Marketplace

`/.claude-plugin/marketplace.json` registers this repo as the `anthropic-agent-skills` marketplace. When adding a new top-level skill that should be distributed, add its path to the relevant plugin's `skills` array in that file. Skills under `document-skills/` belong to the `document-skills` plugin; everything else goes in `example-skills`.

## Notes for Editing Existing Skills

- `document-skills/` is explicitly a non-maintained reference snapshot (per README). Avoid drive-by refactors there; fix things only in service of the requested task.
- Several skills bundle non-trivial runtime code (e.g. `slack-gif-creator/core/`, `document-skills/pptx/scripts/html2pptx.js`, `document-skills/pdf/scripts/`). Treat these as the skill's implementation surface, not boilerplate.
- `template-skill/` is intentionally minimal — it's the starting template, not a working example. Don't treat its emptiness as a bug.
