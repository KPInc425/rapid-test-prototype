# 11) Checklists

## Feature DoD
- [ ] Domain element(s) created (Entity/VO/Spec) in `___Core`
- [ ] Port defined + Repo implemented in `__Infrastructure`
- [ ] Handler added in `_Application/.../handlers`
- [ ] Routes exposed in `+Api/_router.ts` with **ViewModel mapping**
- [ ] (Optional) Event emitted on mutate, UI subscribes
- [ ] UI demo (button or small widget) exists
- [ ] Files all ≤ ~250 lines
- [ ] Naming matches underscore/plus sort keys

## PR Review Prompts (for you, LLM)
- What single responsibility does each new file have?
- Are any files over 250 lines? If so, propose a split.
- Is viewmodel mapping at the edge (not in domain)?
- Are specs pure predicates with `toSql()` glue?

## Anti‑patterns (reject changes that do this)
- Business logic inside routers or UI
- DTOs dominating the domain (we use **ViewModels** at edges)
- Coupling across modules without ports
- Giant files / god modules
