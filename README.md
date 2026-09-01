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

O `vercel.json` já aponta o build para `frontend/dist` e encaminha `/api/*` para o Hono.

1. Publique o repositório no GitHub.
2. Em [vercel.com](https://vercel.com), importe o projeto.
3. Use o nome `missao-cientista` se quiser o endereço `missao-cientista.vercel.app`.
4. Deploy. Cada push na branch principal publica de novo.

Não é necessário outro servidor para a API: site e `/api` saem no mesmo projeto.

## Realização

Udesc — Universidade do Estado de Santa Catarina  
CESFI · Balneário Camboriú
