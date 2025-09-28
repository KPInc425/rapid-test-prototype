# 5) API → ViewModels

**Why VM?** UI consumes ready‑to‑render shapes; domain stays pure.

**Pattern**
- Handler returns domain entities.
- Router maps entity → viewmodel `{ ...display fields }`.
- UI contracts are documented inline in router files.

**Example**
```ts
// +Api/_router.ts
app.get('/items', async (_req, reply) => {
  const rows = await list{{ENTITY_PLURAL}}(/* optional spec */);
  const vms = rows.map(r => ({ id:r.id, displayAmount:`$${r.amount.toFixed(2)}`, status:r.status }));
  reply.send(vms);
});
```
