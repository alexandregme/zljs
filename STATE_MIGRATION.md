# State Management Migration - Zustand + Wrappers

## Objetivo

Adicionar Zustand ao zljs para gerenciar estado de infraestrutura (fetching, toasts) e criar wrappers reutilizaveis (AppWrapper, DocumentWrapper, Loader). Funciona junto com Redux existente no diagnostico/entregas.

## Fase 1: Proof of Concept

| #   | Tarefa                          | Status                     |
| --- | ------------------------------- | -------------------------- |
| 1   | `pnpm add zustand`              | ✅                         |
| 2   | App Store (TDD)                 | ✅                         |
| 3   | Toast Store (TDD)               | ✅                         |
| 4   | Loader component (TDD)          | ✅                         |
| 5   | AppWrapper component (TDD)      | ✅                         |
| 6   | DocumentWrapper component (TDD) | ✅                         |
| 7   | Barrel exports                  | ✅                         |
| 8   | Integrar no diagnostico         | ✅ (`_app.tsx` atualizado) |

## Fase 2: HTTP Client

| #   | Tarefa                        | Status |
| --- | ----------------------------- | ------ |
| 1   | HTTP Client no zljs (TDD)     | ✅     |
| 2   | Dashboard Sandbox HTTP        | ✅     |
| 3   | Migrar diagnostico HTTPClient | ⏳     |

## Fase 3: Modal Store

| #   | Tarefa                    | Status |
| --- | ------------------------- | ------ |
| 1   | Modal Store (TDD)         | ✅     |
| 2   | ConnectedModal (TDD)      | ✅     |
| 3   | Dashboard Sandbox         | ✅     |
| 4   | Migrar diagnostico modals | ⏳     |

## Fase 4: Migracao completa diagnostico

| #   | Tarefa                           | Status |
| --- | -------------------------------- | ------ |
| 1   | Remover react-toastify           | ⏳     |
| 2   | Remover Loader Redux             | ✅     |
| 3   | Remover app slice Redux          | ⏳     |
| 4   | Remover core/services/httpclient | ⏳     |
