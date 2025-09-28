# TS Empire: LLM Copilot Handbook (Drop‑In)

This is the **operator manual** for any coding assistant helping us build **rapid prototypes** in our **TypeScript modular world**.  
It’s prescriptive on purpose. Follow it exactly unless a doc here says otherwise.

**You (the LLM) must:**
- Honor our **folder sorting**: `__Kernel`, `_Common`, `+Modules`, `UI`, and deep module sort keys `___Core`, `__Infrastructure`, `_Data`, `_Application`, `+Api`, `+MCP`, `UI`.
- Keep files **small** and **single‑purpose** (≤ ~250 lines each). If bigger, split.
- Prefer **ViewModels** for API responses consumed by UI.
- Use **CQRS + Specification** in the Application/Core.
- Treat **Data** (migrations/seeds) as isolated from Infrastructure.
- Favor **lazy modules**; allow easy **flip to microservice** later (module `+Api/_server.ts`).
- Use **Socket.IO realtime** (no auth in this prototype layer).

## File Guide

**Essential Setup:**
- `QUICKSTART.md` — Installation and demo flow for humans and copilots.
- `1-STACK-RULES.md` — Technology stack: Node 20+, TypeScript, Fastify, Socket.IO, SQLite.
- `2-LAYERING-AND-NAMING.md` — Folder structure and module organization with sorting rules.
- `9-LLM-OPERATING-MANUAL.md` — Step-by-step instructions for LLM copilots building features.

**Architecture Patterns:**
- `3-MODULES-AND-LAZINESS.md` — Lazy vs Required modules, microservice-ready structure.
- `4-CQRS-SPEC-PATTERNS.md` — Command/Query separation and Specification pattern usage.
- `5-API-VIEWMODELS.md` — ViewModel patterns for API responses consumed by UI.
- `6-REALTIME-SOCKETIO.md` — Socket.IO realtime communication without authentication.
- `7-DATA-MIGRATIONS-SEED.md` — Database migrations and seeding isolated from Infrastructure.

**Development Tools:**
- `8-DEV-WORKFLOW.md` — Development workflow and best practices.
- `10-TEMPLATES-AND-TOKENS.md` — Code templates and reusable patterns.
- `11-CHECKLISTS.md` — Quality gates and validation checklists.

**Start here →** `QUICKSTART.md`, then `1-STACK-RULES.md`, `2-LAYERING-AND-NAMING.md`, and `9-LLM-OPERATING-MANUAL.md`.
