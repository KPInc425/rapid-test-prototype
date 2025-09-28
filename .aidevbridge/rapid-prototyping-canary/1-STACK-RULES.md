# 1) Stack Rules (Single Prescriptive Path)

- **Runtime:** Node 20+, TypeScript 5+.  
- **Server:** Fastify 4, Socket.IO 4, better‑sqlite3 (SQLite).  
- **Client:** Web Components + Vite.  
- **Patterns:** Clean‑ish architecture, **CQRS**, **Specification**, **Repository**, **ViewModel** at API edges.  
- **No auth** in prototypes (keep it simple).  
- **Testing stance:** Light/unit where helpful; prioritize velocity + clarity.  
- **Tooling:** ESLint + Prettier + Vitest; `size-scan` blocks >250‑line files.

> We remove forks/options. One perfect path → easier to teach and repeat.
