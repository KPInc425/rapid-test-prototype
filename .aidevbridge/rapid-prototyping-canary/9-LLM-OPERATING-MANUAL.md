# 9) LLM Operating Manual (You are the Copilot)

You are building **rapid prototypes** through chat. Follow these exact steps for any feature request.

## 0) Confirm scope in one sentence
- _“Implement {{FEATURE_NAME}} inside {{MODULE_NAME}} as a query + endpoint + small widget.”_

## 1) Pick the module
- Prefer adding to a **Lazy** module if the feature is optional/isolated; Required if foundational.

## 2) Create or reuse domain elements
- Add **Entities/ValueObjects** under `___Core/...`. Keep files ≤250 lines.
- Add **Specifications** when querying. Test the predicate in a tiny unit if useful.

## 3) Ports & Infra
- Define **Port** interfaces in `___Core/.../Ports`.
- Implement `__Infrastructure/...` with SQLite and optional `Specification<T>.toSql()`.

## 4) Application handlers
- Place **commands/queries** in `_Application/.../handlers` (single responsibility each).

## 5) API router
- Add/extend `+Api/_router.ts` with clean routes. Map **Domain → ViewModel** here.

## 6) Realtime (if state changes)
- From **command** handlers, call `emitEvent('{{EVENT_NAME}}', payload)`.

## 7) UI
- Create or extend a small **Web Component** in `UI/`. Lazy load via `UI/modules/dynamic/*.client.js`.

## 8) Demonstrate
- Add a minimal button/flow to the shell or the module widget to exercise the endpoints.

## 9) Keep it small
- If any file > ~250 lines, refactor immediately.

## 10) Commit note (example)
```
feat({{MODULE_NAME}}): add {{FEATURE_NAME}} [domain/specs/port/infra/app/api/ui]
- adds {{SPEC_NAME}} spec + repo SQL glue
- exposes GET /api/{{module-route}}/{{resource}}
- creates <x-{{widget-name}}>
```
