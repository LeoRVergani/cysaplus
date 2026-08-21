# Validação — Cloudflare Pages

Data de preparação: 2026-08-21

## Resultado

**READY (source configuration)** para build estático no Cloudflare Pages.

## Verificações executadas neste ambiente

- `package.json` parseado com sucesso;
- dependências e devDependencies continuam consistentes com os `specifier` do `pnpm-lock.yaml`;
- `manifest.webmanifest` é JSON válido;
- `wrangler.toml` é TOML válido e aponta para `./dist/public`;
- `sw.js` passou em `node --check`;
- novos arquivos TypeScript (`pwa.ts` e `vite.config.ts`) passaram por validação sintática equivalente em JavaScript;
- imports locais do frontend foram verificados: 0 referências locais ausentes;
- ícones PWA conferidos: 180x180, 192x192 e 512x512;
- diretório público específico do ambiente Manus removido;
- não existe `404.html` de nível raiz, preservando o comportamento SPA do Pages;
- nenhum secret novo foi adicionado.

## Build completo

O build completo não foi executado neste ambiente porque as dependências npm/pnpm não estão instaladas e a rede do container não conseguiu concluir a instalação. Portanto, esta validação **não declara `pnpm build:pages` como executado**.

No Cloudflare Pages, o pipeline deve executar automaticamente a instalação a partir de `pnpm-lock.yaml` antes de rodar:

```bash
pnpm build:pages
```

A saída esperada, definida em `vite.config.ts`, é:

```text
dist/public
```

## Configuração recomendada

```text
Framework preset: Vite ou None
Root directory: /
Build command: pnpm build:pages
Build output directory: dist/public
```

Node 22.16.0 está fixado em `.node-version`.
