# Execução local e Cloudflare Pages

## Ambiente suportado

A distribuição para Cloudflare usa **Node.js 22.16.0**, fixado em `.node-version` e `.nvmrc`, e um lockfile pnpm 10.

## Executar localmente

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

O Vite normalmente inicia em `http://localhost:3000`.

Para simular a versão publicada:

```bash
pnpm build:pages
pnpm preview
```

O resultado fica em `dist/public`.

## Cloudflare Pages — Git integration

| Campo | Valor |
|---|---|
| Framework preset | Vite ou None |
| Root directory | `/` |
| Build command | `pnpm build:pages` |
| Build output directory | `dist/public` |
| Variáveis obrigatórias | Nenhuma |

A imagem v3 atual do Cloudflare Pages usa Node 22.16.0 e pnpm 10 por padrão. O repositório também fixa a versão do Node para tornar a compilação reproduzível. Em um projeto Pages antigo, se necessário, configure `NODE_VERSION=22.16.0` e `PNPM_VERSION=10.11.1` nas variáveis de build.

## Arquitetura de hospedagem

A aplicação é um frontend React/Vite estático. O build padrão não empacota mais `server/index.ts`. O servidor Express legado continua no código apenas como referência/compatibilidade e pode ser gerado separadamente com:

```bash
pnpm build:legacy-node
```

Ele **não é necessário no Cloudflare Pages**.

## SPA

O projeto não produz um `404.html` no nível raiz. O Pages trata esse formato como SPA e permite que o frontend controle a navegação. Por isso não é necessário adicionar uma regra global de redirect para `index.html`.

## PWA

Em produção o navegador registra `/sw.js`. O cache é progressivo: após a primeira visita, o app shell e assets já utilizados podem continuar disponíveis se a conexão cair. O manifesto e os ícones permitem instalar o site como aplicativo em navegadores compatíveis.

## Persistência

Aulas concluídas, respostas, flashcards revisados e tema são persistidos em `localStorage`. O histórico é local ao navegador e não sincroniza entre dispositivos.

## Checklist antes do deploy

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build:pages
```

Confirme então:

```text
dist/public/index.html
dist/public/manifest.webmanifest
dist/public/sw.js
dist/public/_headers
```
