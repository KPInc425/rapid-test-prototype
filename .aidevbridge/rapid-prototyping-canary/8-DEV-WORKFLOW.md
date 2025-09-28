# 8) Dev Workflow (Repeatable)

**Install & run**
```bash
pnpm i
pnpm run migrate:up
pnpm run seed
pnpm run api:dev
pnpm dev
# open http://localhost:5173/UI/
```

**Size guard**
- `node _scripts/_size-scan.mjs` fails the build if any TS/JS > ~250 lines.
- If a file tends to grow: slice into helpers or move responsibilities down a layer.

**Flip module to microservice**
1) `pnpm --filter ./+Modules/Lazy/{{MODULE_NAME}} run dev` (add a script in module if needed).  
2) Point UI/API base URL for that module to the new port.  
3) Do not change folder structure or contracts.
