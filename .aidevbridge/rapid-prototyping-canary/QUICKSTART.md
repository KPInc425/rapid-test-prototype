# QUICKSTART for humans & copilots

```bash
pnpm i
pnpm run migrate:up
pnpm run seed
pnpm run api:dev
pnpm dev
open http://localhost:5173/UI/
```
**Try this flow**
1) Load Dashboard (Lazy), then create an order via UI → watch realtime event.  
2) Load Usage Analytics (Lazy) → track a click, refresh list.  
3) Load Admin (Required) → see the Socket.IO event log.

**Next:** pick a feature and follow `9-LLM-OPERATING-MANUAL.md`.
