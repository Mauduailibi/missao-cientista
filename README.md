# Missão Cientista

Site da **1ª Feira de Ciências Missão Cientista**, realizada pela Udesc CESFI em Balneário Camboriú.

- **Data:** 27 de outubro de 2026
- **Local:** Udesc CESFI — Balneário Camboriú
- **Inscrições:** a partir de 15 de setembro de 2026

Landing page do evento, formulário de inscrição (`/inscricao`) e painel administrativo (`/admin`).

## Stack

- **pnpm** workspaces (monorepo)
- **Frontend:** Vite, React, TypeScript, Tailwind CSS
- **Firebase** (plano gratuito Spark): Firestore para os dados e Authentication (e-mail/senha) para o painel

Não há servidor próprio: o site é estático e fala direto com o Firebase. Quem protege os dados são as regras em `firestore.rules`.

## Estrutura

```
missao-cientista/
  frontend/
    src/components/     # seções da landing e campos de formulário
    src/pages/          # InscricaoPage e admin/ (login, troca de senha, painel)
    src/lib/            # Firebase, municípios de SC, senha, exportação Excel
    src/assets/         # logo e foto do campus
  firestore.rules       # regras de segurança do Firestore
  firebase.json         # config do Firebase CLI
  vercel.json
```

## Rotas

| Rota         | O que é                                                        |
| ------------ | -------------------------------------------------------------- |
| `/`          | landing page                                                   |
| `/inscricao` | formulário de inscrição (só aceita envios com formulário aberto) |
| `/admin`     | painel (login)                                                 |

## Usuários do painel

| Tipo       | Permissões                                                              |
| ---------- | ----------------------------------------------------------------------- |
| **Admin**  | ver, exportar e excluir inscrições; abrir/fechar formulário; gerenciar usuários |
| **Leitor** | ver e exportar inscrições                                               |

Novos usuários recebem uma senha aleatória e precisam trocá-la no primeiro acesso. `mauricio.neto@edu.udesc.br` é o admin principal (fixo nas regras) e não pode ser excluído.

## Dados (Firestore)

- `settings/form` — `{ open }`: formulário aberto ou fechado
- `inscricoes/{id}` — uma inscrição
- `admins/{uid}` — usuários do painel (`email`, `role`, `active`, `mustChangePassword`)

## Desenvolvimento

Requisito: [pnpm](https://pnpm.io) 11.

1. Copie `frontend/.env.example` para `frontend/.env.local` e preencha com o `firebaseConfig` do projeto
   (Firebase Console → Project settings → Your apps → Web app).
2. Rode:

```bash
pnpm install
pnpm dev
```

O site sobe em `http://localhost:5173`.

Outros scripts (também na raiz):

| Comando             | O que faz                                    |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | servidor de desenvolvimento                  |
| `pnpm build`        | build de produção do frontend                |
| `pnpm preview`      | preview do build                             |
| `pnpm lint`         | lint do frontend                             |
| `pnpm deploy:rules` | publica `firestore.rules` no Firebase        |

Alterou `firestore.rules`? Rode `pnpm deploy:rules` (precisa de `npx firebase-tools login` uma vez). As regras **não** são publicadas pelo deploy da Vercel.

Assets da marca ficam em `frontend/src/assets/` (`logo-missao-cientista.webp`, `cesfi.jpg`). O favicon é `frontend/public/favicon.png`.

## Deploy (Vercel)

O repositório inteiro vai para a Vercel. Ela roda `pnpm build` na raiz, que gera o frontend e copia para `dist/`, e publica `dist/` como site estático. O `vercel.json` faz `/inscricao` e `/admin` abrirem o `index.html`.

Na Vercel, em **Settings → General → Build and Deployment**:

- **Root Directory:** vazio (a raiz do repositório, não `frontend`)
- **Framework Preset:** Other
- **Output Directory:** `dist`
- **Build Command:** `pnpm build`
- **Install Command:** `pnpm install`

Em **Settings → Environment Variables**, cadastre as mesmas variáveis do `.env.local`
(`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`). Elas são embutidas no build, então depois de criá-las ou alterá-las é preciso fazer um **Redeploy**.

No Firebase, adicione o domínio da Vercel em **Authentication → Settings → Authorized domains**.

## Realização

Udesc — Universidade do Estado de Santa Catarina  
CESFI · Balneário Camboriú
