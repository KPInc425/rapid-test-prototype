# 2) Layering & Naming (Sorted Folders)

Top‑level (exact names, for sort order):
```
__Kernel/
_Common/
++BackgroundTasks/
++SignalR/
_data/
_api/
+Modules/
UI/
```

Module shape (both Lazy/Required use this consistent tree):
```
+Modules/{Lazy|Required}/{{MODULE_NAME}}/
  ___Core/
    _{{MODULE_SHORT}}Core/
      Entities/
      ValueObjects/
      Specifications/
      Ports/
      DomainEvents/
      Services/
    _{{MODULE_SHORT}}Core.UnitTests/
    {{MODULE_SHORT}}Core.{{MODULE_SHORT}}TestData/
  __Infrastructure/
    _{{MODULE_SHORT}}Infrastructure/
      _{{REPO_FILE}}.ts
    {{MODULE_SHORT}}Infrastructure.IntegrationTests/
  _Data/
    {{MODULE_SHORT}}Application.Data/
      src/
      _migrate.sql (optional)
  _Application/
    _{{MODULE_SHORT}}Application/
      handlers/
    {{MODULE_SHORT}}Application.FeatureTests/
  +Api/
    _router.ts
    _server.ts (standalone microservice entry)
  UI/
    _{{MODULE_SHORT}}BlazorModule.js (Web Component entry for demo widgets)
    ... (sub‑packages like +DataQB, +DataSyncronizer)
```

**Identifiers in code DO NOT carry underscores/plus.** These are **sort keys for folders/files only**.
