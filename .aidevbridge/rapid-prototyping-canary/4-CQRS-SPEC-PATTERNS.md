# 4) CQRS + Specification Patterns

**Commands** (create/change state) live under `_Application/.../handlers/*Command*.ts`.
**Queries** (read) live under `_Application/.../handlers/*List/Get*.ts`.

**Specification**
- Define in `___Core/.../Specifications/*.ts` with `{ test(entity), toSql(): {where, params} }`.
- Infra repos accept optional `Specification<T>` and compose SQL via `toSql()`.

**Example tokens**
```ts
// ___Core/_{{SHORT}}Core/Specifications/{{SPEC_NAME}}.ts
export class {{SPEC_NAME}} implements Specification<{{ENTITY_NAME}}> {
  constructor(private arg: {{ARG_TYPE}}) {}
  test(e: {{ENTITY_NAME}}){ /* pure predicate */ }
  toSql(){ return { where: "{{COLUMN}} = ?", params: [this.arg] }; }
}
```

**Views**
- API returns **ViewModels** shaped for UI.
- Map domain → viewmodel in **Api router** (not in domain/entity).
