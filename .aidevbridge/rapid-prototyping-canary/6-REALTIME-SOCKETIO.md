# 6) Realtime with Socket.IO

- Server: `++SignalR/RivalResponse.Signal/_socket.ts` exposes `createSocket(http)` and `emitEvent(event, payload)` and keeps a small **ring buffer** of recent events for observability.
- Client: `__Kernel/...Client/Realtime/SocketClientReal.ts` connects and subscribes.

**Emit from command handlers**
```ts
import { emitEvent } from '../../../../++SignalR/RivalResponse.Signal/_socket';
emitEvent('{{EVENT_NAME}}', {{PAYLOAD}});
```

**UI subscription (example)**
```ts
const { SocketClientReal } = await import('__Kernel/.../SocketClientReal');
const socket = new SocketClientReal(location.origin);
await socket.connect();
socket.on('{{EVENT_NAME}}', payload => render(payload));
```
