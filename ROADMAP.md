# zljs Roadmap

This list tracks potential improvements. Agents must review and update it when new ideas are discussed or implemented.

1. Design tokens export (`tokens` object with typed colors/spacing/radii)
2. Layout primitives (`Stack`, `Inline`, `Grid`, `Spacer`)
3. DataGrid extensions (valueFormatter, typed cellRenderer, loading/empty states)
4. Form feedback primitives (`Label`, `HelperText`, `Field` wrappers)
5. Modal enhancements (size prop, footer slot, closeOnOverlayClick)
6. Notification hooks (`useToast` with typed variants + preset `Toaster`)

---

## Shared Backend Components (chat-core)

1. Mongo connection module (shared Mongoose config + connection health)
2. Config module (typed env loading + validation)
3. Logger module (structured logs + request correlation id)
4. Request context (per-request metadata, trace ids)
5. Base repository helpers (pagination, soft delete, common filters)
6. Error handling layer (domain errors + HTTP mapping)
7. HTTP client wrapper (timeouts, retries, circuit breaker)
8. Webhook verification utility (signature validation + timestamp)
9. Queue/worker module (background jobs + retries)
10. Rate limiting guard/interceptor
11. Health check endpoints (DB, external APIs)
12. Audit trail service (who/when/what changes)

---

## Shared Frontend Components (ruralissima-diagnostico)

1. Page shell layout (header, breadcrumb, action bar)
2. Empty/Loading/State views (standardized UX)
3. DataGrid wrappers (filters, column presets, export)
4. Form sections (FieldGroup + validation summary)
5. Status badges (stages, health, severity)
6. KPI cards (stats variants + trend indicators)
7. Modal variants (confirm, form, detail)
8. Side panel/drawer (details + quick actions)
9. Notification banner (global alerts)
10. Contact actions (WhatsApp/chat/call buttons)

---

## Shared Backend Components (ruralissima-service)

1. Auth module (JWT + roles + permissions)
2. Config module (typed env + validation)
3. Logger module (structured logs + correlation id)
4. Error handling (domain errors + HTTP mapping)
5. Database module (connection + health checks)
6. Cache layer (Redis client + helpers)
7. File storage adapter (S3/local abstraction)
8. Webhook utilities (signature validation + retries)
9. HTTP client wrapper (timeouts + retries)
10. Audit trail (who/when/what changes)
