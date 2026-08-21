# Release Notes — Cloudflare Pages

## Objetivo

Preparar o **CySA+ Estudo BR — Capítulo 1** para hospedagem estática no Cloudflare Pages e acesso móvel.

## Alterações

- build padrão convertido para frontend Vite estático;
- novo `build:pages` com saída em `dist/public`;
- `vite.config.ts` desacoplado dos plugins/proxies específicos do ambiente Manus;
- Node 22.16.0 fixado por `.node-version` e `.nvmrc`;
- `wrangler.toml` com configuração de Pages;
- PWA adicionada com manifesto, ícones e service worker;
- cabeçalhos do Pages adicionados em `client/public/_headers`;
- service worker habilitado somente em produção;
- documentação de deploy e persistência atualizada;
- estado local de Cloudflare (`.wrangler/` e `.dev.vars`) ignorado pelo Git.

## Persistência

O site continua sem backend obrigatório. O progresso usa `localStorage` e fica restrito ao navegador/dispositivo atual.

## Build

O diretório publicado é:

```text
dist/public
```

No Cloudflare Pages, use:

```text
Build command: pnpm build:pages
Build output directory: dist/public
```
