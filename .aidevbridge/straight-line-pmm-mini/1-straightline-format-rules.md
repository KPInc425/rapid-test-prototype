# StraightLine Format Rules

## Artifact Types
- **AreaPath** — Markdown headers: `#`, `##`, `###`, ... (left-justified).
- **Ability Statement** — `- ability ...` (left-justified under the correct AreaPath).
- **Additional Details** — `\t+ detail ...` (exactly one tab indent under its Ability).

> Everything in StraightLine must be one of these three. No free-floating text.

## Indentation and Alignment
- AreaPath headers start at column 0.
- Abilities start at column 0 (under their header).
- Additional Details are indented **exactly one tab** under an ability.

## Required Keywords
- Every ability line MUST start with the word `ability` in lowercase.
- Additional Details should NOT restate outcomes; they describe, constrain, or clarify.

## Approved Markdown Symbols (and how to use them)
- `-` (dash) — Ability statements only. Example: `- ability to select pizza size`.
- `+` (plus) — Additional Details only, with one tab indent. Example: `\t+ include size price matrix`.
- `*` (asterisk) — Non-binding note **inside Additional Details only** to mark optional/variant detail.
  - Example: `\t+ * consider limited-time toppings`
- `!` (bang) — **Attention/Warning** prefix **inside Additional Details only**.
  - Example: `\t+ ! PCI scope impact if storing PAN`
- HTML comment `<!-- ... -->` — Allowed anywhere for meta notes to collaborators/AI; ignored by structure.
  - Example: `<!-- do not expose this section externally -->`

## Disallowed or Constrained
- Do not use unordered `*` lists for abilities.
- Do not use numbered lists for abilities/details.
- Do not nest `+` under `+`. Additional Details have only one level.
- Do not mix narrative prose between artifacts; convert all inputs into AreaPath / Ability / Detail.
- Do not remove the word `ability` from any ability statement.

## Decomposition Rule
Decompose abilities until a 3–5 person team can fully deliver in **1–3 days**, including -ilities.
