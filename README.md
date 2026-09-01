# Missão Cientista

Site da **1ª Feira de Ciências Missão Cientista**, realizada pela Udesc CESFI em Balneário Camboriú.

- **Data:** 27 de outubro de 2026
- **Local:** Udesc CESFI — Balneário Camboriú
- **Inscrições:** a partir de 15 de setembro de 2026

Landing page do evento, com API no mesmo domínio para as inscrições e demais rotas que vierem depois.

## Stack

- **pnpm** workspaces (monorepo)
- **Frontend:** Vite, React, TypeScript, Tailwind CSS
- **API:** [Hono](https://hono.dev) na Vercel (`/api`)

## Estrutura

```
missao-cientista/
  frontend/          # landing page
    src/assets/      # logo e foto do campus
  api/               # rotas Hono (Vercel)
  vercel.json
```

## Desenvolvimento

Requisito: [pnpm](https://pnpm.io) 11.

```bash
pnpm install
pnpm dev
```

O site sobe em `http://localhost:5173`.

Outros scripts (também na raiz):

| Comando        | O que faz                         |
| -------------- | --------------------------------- |
| `pnpm dev`     | servidor de desenvolvimento       |
| `pnpm build`   | build de produção do frontend     |
| `pnpm preview` | preview do build                  |
| `pnpm lint`    | lint do frontend                  |

Assets da marca ficam em `frontend/src/assets/` (`logo-missao-cientista.png`, `cesfi.jpg`). O favicon é `frontend/public/favicon.png`.

## API

A API vive em `api/index.ts`, no caminho `/api`.

Hoje existe só o health check:

```
GET /api/health
```

Resposta: `{ "ok": true, "service": "missao-cientista" }`.

Em produção isso fica no mesmo domínio da landing, por exemplo `https://missao-cientista.vercel.app/api/health`. Novas rotas (inscrições, etc.) entram nesse arquivo, com `basePath('/api')`.

## Deploy (Vercel)

O `vercel.json` gera o site em `dist/` (cópia do build do frontend) e encaminha `/api/*` para o Hono.

Na Vercel, em **Settings → General → Build and Deployment**:

- **Root Directory:** vazio (a raiz do repositório, não `frontend`)
- **Framework Preset:** Other
- **Output Directory:** `dist`
- **Build Command:** `pnpm build`
- **Install Command:** `pnpm install`

Se o preset Vite estiver ativo, ele procura `dist` na raiz e ignora `frontend/dist` — por isso o deploy quebrava. Depois de ajustar, faça um **Redeploy**.

## Realização

Udesc — Universidade do Estado de Santa Catarina  
CESFI · Balneário Camboriú
