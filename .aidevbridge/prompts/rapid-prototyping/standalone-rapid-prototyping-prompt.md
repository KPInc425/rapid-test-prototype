Rapid Prototyping Guide

StraightLine PMM · Vanilla JS/TS · One System · Modules-ready (ViewModel-only, CQRS = Cmd/Qry)

This is the authoritative guide for new rapid prototypes. It blends StraightLine PMM with a layered yet flat architecture so teams can move fast, teach clearly, and leave a perfect trail for production rewrites.

Core tenets

One system, one language: ViewModels in application.client are the shared contract for browser & server. No DTOs.

Perforated growth: start flat; add layers & modules only when value appears.

Single-port ergonomics: primary app hosts UI, API, MCP, SocketIo on one port; modules contribute to those servers but don’t run their own (in proto mode).

Backlog-first: abilities/ilities in markdown drive scope, not ad-hoc tasks.

1) StraightLine PMM (Working Rules)
1.1 Artifact Types & Markdown Grammar

AreaPath: headings #..#### (categories/folders).

Ability: list item starting with ability (business-readable, 1–3 days).

Additional Details: tab + + beneath an ability (descriptive notes only).

Example

# <ProductName>

## Accounts
- ability for a person to register a new account
	+ requires email verification link
- ability for a person to sign in and out

## Data
- ability to import tabular data from file
	+ CSV + JSON formats


Rules

Keep Abilities outcome-only; put technical specifics in Ilities or Additional Details.

Size discipline: 1–3 days done-done (tests, error handling, docs).

If an AreaPath exceeds 5 Abilities, decompose with sub-areas.

1.2 Ilities (Definition of Done, Cross-Cutting)

Maintain `*-ilities.md` files: logging, error handling, test strategy, feature flags, accessibility, basic security (fake users ok), performance budget, portability. The system scans for files ending in `-ilities.md` anywhere under `.aidevbridge/straightline/**`. Keep it generic and minimal.

2) Global Constraints

Client: Vanilla JS (ES6+), HTML, CSS (no frameworks for MVP).

Server: TypeScript, Node built-ins (http, fs, path, url, crypto).

Rendering: Canvas 2D optional; not assumed.

Dependencies: Avoid in MVP; prefer first-party code.

File size: < 400 LOC (enforced with .utilities/line_count.py).

Contract: ViewModels only (in application.client).

3) Disk Structure (Primary App)
/src
├── /common.UI            # Shared theming/layout used by all fronts (app + modules)
├── /API                  # Primary app REST server (modules contribute registrars)
├── /MCP                  # Primary app MCP server (modules contribute registrars)
├── /SocketIo             # Primary app realtime server (modules contribute registrars)
├── /Modules              # Each module = mini DDD/CleanArch system (no /server)
│   └── /<ModuleName>/src (see module layout below)
/* app skeleton (boots UI, theming, auth, loads modules) */
├── /UI
│   ├── /Client           # SPA shell, router, module loader
│   ├── /Server           # single-port host (mounts UI, API, MCP, SocketIo)
│   └── /Console          # optional CLI/admin/testing tools
/* module layout layered core used by modules */
└── /<ModuleName>/src/
    /kernel.client        # runtime primitives (browser + server)
    /kernel               # server-only pipelines, adapters
    /domain               # pure core (entities, VOs, specs)
    /infrastructure       # adapters (repos, auth, telemetry)
    /data                 # persistence & migrations
    /application.client   # shared ViewModels (browser + server) ← **CONTRACT**
    /application          # CQRS orchestrations (Cmd/Qry handlers, ports, mapping)
    /api                  # REST controllers bound to application (primary app)
    /mcp                  # MCP handlers bound to application (primary app)
    /socketio             # realtime handlers bound to application (primary app)
    /{moduleName}UI             # browser pages/ui/services, html, css, ts, js (app-specific)

Why this shape?

/common.UI keeps consistent look/feel across app & modules.

/API, /MCP, /SocketIo are shared servers; modules register routes/handlers here (no per-module server).

application.client sits above client/server—the ViewModel contract used everywhere.

4) Module Structure (no /server)
/Modules/<ModuleName>/src
├── /kernel.client
├── /kernel
├── /domain
├── /infrastructure
├── /data
├── /application.client   # ViewModels (shared)
├── /application         # Cmd/Qry handlers, request/response, mapping
├── /api                 # export registrar: addRoutes(app) to primary /API
├── /mcp                 # export registrar: addMcp(app) to primary /MCP
├── /socketio            # export registrar: addSocket(io) to primary /SocketIo
└── /ModuleClient        # module UI (HTML/CSS/JS) injected into SPA shell


Intent

Each module is a mini-system that plugs into the primary app’s servers.

The module’s ModuleClient/ holds its UI to be dynamically loaded into the SPA shell.

5) Unified Type System: ViewModels (no DTOs)

Single source of truth: application.client exports ViewModels used by:

Server application: Cmd/Qry handlers return ViewModels.

API controllers: directly serialize ViewModels to JSON.

Client: imports the same ViewModels for rendering.

Example

// /application.client/user.vm.ts
export type UserVm = {
  id: string;
  name: string;
  roles: string[];
  createdAtIso: string;
};

6) CQRS (Cmd/Qry) + Specifications
6.1 Contracts & Handlers (Application Layer)
// /application/contracts/RegisterUser.cmd.ts
export type RegisterUserCmd = {
  actor: { id: string; roles: string[] };
  input: { name: string; email: string };
};
export type RegisterUserResult = import("../../application.client/user.vm").UserVm;

// /application/handlers/RegisterUser.handler.ts
import { RegisterUserCmd, RegisterUserResult } from "../contracts/RegisterUser.cmd";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../ports/UserRepository.port";
import { IdGen } from "../ports/IdGen.port";
import { Clock } from "../ports/Clock.port";
import { toUserVm } from "../mapping/user.mapping";

export class RegisterUserHandler {
  constructor(private repo: UserRepository, private id: IdGen, private clock: Clock) {}
  async execute(cmd: RegisterUserCmd): Promise<RegisterUserResult> {
    if (!cmd.actor.roles.includes("admin") && !cmd.actor.roles.includes("creator")) {
      throw new Error("forbidden");
    }
    const now = this.clock.now();
    const user = User.register({ id: this.id.next(), name: cmd.input.name, email: cmd.input.email, createdAt: now });
    await this.repo.save(user);
    return toUserVm(user);
  }
}

// /application/mapping/user.mapping.ts
import { User } from "../../domain/entities/User";
import { UserVm } from "../../application.client/user.vm";
export function toUserVm(u: User): UserVm {
  return { id: u.id, name: u.name, roles: u.roles, createdAtIso: new Date(u.createdAt).toISOString() };
}


For reads, create *.qry.ts and *.handler.ts similarly, returning a ViewModel (or list) directly.
Convention: files end with .cmd.ts / .qry.ts; handlers end with .handler.ts.

6.2 Domain Entities & Specifications (Pure)
// /domain/entities/User.ts
import { Email } from "../value-objects/Email";
export type UserProps = { id: string; name: string; email: string; createdAt: number; roles?: string[] };

export class User {
  private constructor(public readonly id: string, private props: Required<Omit<UserProps,"id">>) {}
  static register(p: UserProps) {
    if (!p.name || p.name.trim().length < 2) throw new Error("name too short");
    Email.assertValid(p.email);
    return new User(p.id, { name: p.name.trim(), email: p.email, createdAt: p.createdAt, roles: p.roles ?? ["user"] });
  }
  get name(){ return this.props.name; }
  get email(){ return this.props.email; }
  get roles(){ return this.props.roles; }
  get createdAt(){ return this.props.createdAt; }
}

// /domain/value-objects/Email.ts
export class Email {
  static assertValid(e: string){
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new Error("invalid email");
  }
}

// /domain/specifications/UserNameAcceptable.spec.ts
import { User } from "../entities/User";
export const UserNameAcceptable = {
  isSatisfiedBy(u: User): boolean { return u.name.length >= 2 && !/\bforbidden\b/i.test(u.name); }
};

7) Infrastructure (Adapters, Persistence, Security)
7.1 Ports & Repositories
// /application/ports/UserRepository.port.ts
import { User } from "../../domain/entities/User";
export interface UserRepository {
  save(u: User): Promise<void>;
  getById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

// /infrastructure/repositories/UserRepository.fs.ts
import fs from "fs/promises"; import path from "path";
import { UserRepository } from "../../application/ports/UserRepository.port";
import { User } from "../../domain/entities/User";

const DB = path.resolve(process.cwd(), "data", "users.json");

export class FsUserRepository implements UserRepository {
  async save(u: User): Promise<void> {
    const all = await this.readAll();
    const dto = { id: u.id, name: u.name, email: u.email, roles: u.roles, createdAt: u.createdAt };
    const ix = all.findIndex(x => x.id === u.id);
    if (ix >= 0) all[ix] = dto; else all.push(dto);
    await fs.mkdir(path.dirname(DB), { recursive: true });
    await fs.writeFile(DB, JSON.stringify(all, null, 2), "utf-8");
  }
  async getById(id: string): Promise<User | null> {
    const row = (await this.readAll()).find(x => x.id === id);
    return row ? User.register(row) : null;
  }
  async findByEmail(email: string): Promise<User | null> {
    const row = (await this.readAll()).find(x => x.email === email);
    return row ? User.register(row) : null;
  }
  private async readAll(): Promise<any[]> {
    try { return JSON.parse(await fs.readFile(DB, "utf-8")); } catch { return []; }
  }
}

7.2 Security (Fake but pervasive)

kernel exposes UserContext (e.g., header x-demo-user).

Pipelines check roles before handlers run.

Controllers pass actor to Cmd/Qry.

8) Transport: API · MCP · SocketIo (Registrars)
8.1 API (REST) – Primary App

Controllers parse input → call handler → return ViewModel JSON.

No DTOs—ViewModel is the response.

// /api/users.controller.ts
import { RegisterUserHandler } from "../application/handlers/RegisterUser.handler";
export function registerUser(handler: RegisterUserHandler) {
  return async (req: any, res: any, actor: { id: string; roles: string[] }) => {
    try {
      const body = await readJson(req);
      const vm = await handler.execute({ actor, input: { name: body.name, email: body.email } });
      return json(res, 200, vm);
    } catch (e: any) { return json(res, 400, { error: e?.message ?? "bad request" }); }
  };
}
async function readJson(req: any){ return await new Promise((ok,err)=>{ let d=""; req.on("data",(c:any)=>d+=c); req.on("end",()=>{ try{ok(JSON.parse(d||"{}"))}catch(e){err(e)} }); }); }
function json(res:any, code:number, obj:any){ res.writeHead(code,{"content-type":"application/json"}); res.end(JSON.stringify(obj)); }


Module API registrars
Modules export a function like addRoutes(app) that the primary /API server calls to mount module endpoints.

// /Modules/Users/src/api/register.ts
export function addRoutes(api: { post: (path: string, fn: Function) => void }, handlers: any){
  api.post("/users/register", (req,res,actor) => handlers.registerUser(req,res,actor));
}

8.2 MCP (Backlog Ops)

Module registrar: addMcp(mcp, services) to register MCP handlers.

Core endpoints (example): /mcp/backlog/query, /insert, /update.

Enforce grammar and tokenization (<ProductName>, <Feature>).

8.3 SocketIo (Realtime)

Module registrar: addSocket(io, deps) to register channels/events.

Emit ViewModels so clients render identical shapes.

9) UI System
9.1 /common.UI

Shared CSS variables, typography, palette, layout components, shell regions.

Consumed by /UI/Client and /Modules/*/src/ModuleClient.

9.2 /UI/Client (SPA Shell)

Router, module loader, auth bootstrapping, theme switch.

Injects module UIs at runtime.

// /UI/Client/module-loader.js
export async function loadModuleUi(name){
  // convention-based dynamic import
  return await import(`../../Modules/${name}/src/ModuleClient/entry.js`);
}

// /UI/Client/main.js
import { loadModuleUi } from "./module-loader.js";
const appEl = document.getElementById("app");
document.querySelectorAll("[data-module]").forEach(btn => {
  btn.onclick = async () => {
    const mod = await loadModuleUi(btn.dataset.module);
    appEl.innerHTML = ""; mod.mount(appEl);
  };
});

9.3 ModuleClient (in each module)

All UI/HTML/CSS/JS for that module, encapsulated and lazily loaded.

// /Modules/Users/src/ModuleClient/entry.js
import "./styles.css";
export function mount(root){
  root.innerHTML = `
    <section class="users">
      <h1>Users</h1>
      <form id="reg"><input name="name"/><input name="email"/><button>Register</button></form>
      <ul id="list"></ul>
    </section>`;
  // wire events, call /API, render using shared ViewModels
}

10) Single-Port Server Entrypoint
// /server/server.ts
import http from "http";
import { routes } from "../api/routes";           // primary API routes
import { mcpRoutes } from "../mcp/routes";        // MCP routes
import { socketServer } from "../socketio/server";// SocketIo attach
import { serveStatic } from "./static";           // UI assets
import { sessionFromHeaders } from "../kernel/security/session";
import { wire } from "../kernel/bootstrap/wire";  // build handlers + deps
import { registerModuleApis } from "../Modules/_registry/api";     // mounts module APIs
import { registerModuleMcp } from "../Modules/_registry/mcp";     // mounts module MCP
import { registerModuleSockets } from "../Modules/_registry/socket"; // mounts sockets

const PORT = Number(process.env.PORT || 8091);
const app = wire(); // { handlers, ports, adapters }

const srv = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const actor = sessionFromHeaders(req.headers);

  if (url.pathname === "/" || url.pathname.startsWith("/ui")) return serveStatic(req, res, url);
  if (url.pathname.startsWith("/api/")) return routes(req, res, app, actor);
  if (url.pathname.startsWith("/mcp/")) return mcpRoutes(req, res, app, actor);

  res.writeHead(404); res.end("not found");
});

// Attach realtime
socketServer.attach(srv, io => {
  registerModuleSockets(io, app); // let modules register channels
});

registerModuleApis(app); // mount each module’s API routes into /API
registerModuleMcp(app);  // mount each module’s MCP handlers

srv.listen(PORT, () => console.log("listening on", PORT));


The _registry pattern is a small list that imports each module’s registrar so the host stays declarative and readable.

11) Growth & Modularity

Start with primary app only (no modules).

When concepts grow or files approach 400 LOC, extract to a module:

Move domain/application/infrastructure code into /Modules/<Name>/src.

Add registrars for /api, /mcp, /socketio.

Add ModuleClient entry and load via the SPA shell.

Proto policy: modules do not run their own servers.
Production follow-up can split them into services if needed.

12) Quality Gates (with intent)

Files < 400 LOC: readability & single responsibility.

Run/Stop scripts: repeatable classroom experience.

Single Port (primary): reduced cognitive load.

ViewModels everywhere: one contract, zero drift.

Self-Test: each core module exposes selfTest() for quick checks.

Backlog hygiene: StraightLine docs small, sharp, and tokenized.

13) Prompt Catalog (ready to paste)

Add an Ability

Propose one Ability under the correct AreaPath, sized 1–3 days, with 1–2 Additional Details if necessary. Output exact Markdown only.

Create a ViewModel

Add <Feature>.vm.ts in /application.client with fields <list>. Update the related Cmd/Qry handler to return this VM. Show file diffs.

Add Cmd + Handler

Create <Action><Aggregate>.cmd.ts and <Action><Aggregate>.handler.ts under /application. Use ports, call domain, return the VM. Provide code.

Wire API Controller

Add a controller in /api that parses input, invokes <Action><Aggregate>Handler, and returns the VM JSON. Show full file contents.

Introduce a Domain Spec

Add <Aggregate><Rule>.spec.ts under /domain/specifications and apply it inside the handler. Include a minimal unit test example.

Extract into a Module

Move <Concept> into /Modules/<Concept>/src with the standard layout. Add api/mcp/socketio registrars and a ModuleClient/entry.js. Update _registry and SPA loader.

MCP Backlog Update

Insert the following Ability block into `*-abilities.md` under <AreaPath> using MCP. The system scans for files ending in `-abilities.md` anywhere under `.aidevbridge/straightline/**`. Ensure grammar and tokenization. Show the resulting markdown.

Add Realtime

Add /socketio/<Feature>.ts to broadcast <Event> ViewModels to clients. Show client subscription code in /UI/Client.

14) Teaching Exercises

A: End-to-End User Registration

Ability → Register User.

VM → UserVm.

Cmd/Handler + repo + spec.

API controller + UI page in ModuleClient.

Socket broadcast on success.

B: Moduleization

Extract Users into /Modules/Users/src.

Add registrars for API/MCP/SocketIo.

Load module UI via SPA shell.

C: Backlog Automation

MCP query abilities.

Insert new Ability.

Decompose an oversized Ability.

Display abilities in a read-only app shell page.

15) Definition of Done (Prototype)

Outcome demonstrable in UI (or console/API).

Error paths handled; happy-path console clean.

Handler returns ViewModel; UI renders the same ViewModel.

README updated (run/stop/test).

line_count.py shows no files > 400 LOC (or a decomposition plan).

Ports clear; adapters minimal but documented.

16) Appendix

.utilities/line_count.py

import os, sys
EXTS = {'.js', '.ts', '.html', '.css'}
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
LIMIT = 400
big = []
for base,_,files in os.walk(ROOT):
    for f in files:
        if os.path.splitext(f)[1] in EXTS:
            p = os.path.join(base,f)
            try:
                n = sum(1 for _ in open(p,'r',encoding='utf-8',errors='ignore'))
                if n > LIMIT: big.append((n, os.path.relpath(p, ROOT)))
            except Exception as e:
                print('SKIP', p, e)
for n,p in sorted(big, reverse=True):
    print(f"{n:5d}  {p}")
sys.exit(1 if big else 0)

Final Reminder

We’re building tomorrow’s production system in miniature: structured, teachable, and fast. Keep it clean, keep it coherent, and let ViewModels + Cmd/Qry carry the whole story.