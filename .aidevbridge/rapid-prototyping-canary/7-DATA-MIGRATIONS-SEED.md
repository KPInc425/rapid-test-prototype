# 7) Data: Migrations & Seeds

- Global migrations under `_data/_migrations/*.sql` (SQLite).  
- Module‑scoped SQL may live under `+Modules/.../_Data/*/*.sql` where helpful.  
- Seed with simple scripts; do not hide data in domain layers.

**Copilot rules**
- DDL in SQL files; **no** ORMs.  
- Always ensure idempotency when possible (check existence).  
- Keep migration files short and numbered `0001_*.sql`.
