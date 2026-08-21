# CySA+ Estudo BR — Cloudflare Pages

Esta variante do projeto foi preparada para publicação como **SPA estática no Cloudflare Pages** e para uso em desktop e celular.

## Configuração recomendada no Cloudflare Pages

| Campo | Valor |
|---|---|
| Framework preset | `Vite` ou `None` |
| Root directory | `/` |
| Build command | `pnpm build:pages` |
| Build output directory | `dist/public` |
| Node.js | `22.16.0` (fixado por `.node-version`) |
| Variáveis obrigatórias | Nenhuma |

O projeto usa `pnpm-lock.yaml`. O build system v3 do Cloudflare Pages possui suporte a pnpm 10. Caso um projeto antigo esteja usando uma imagem de build anterior, configure `PNPM_VERSION=10.11.1` e `NODE_VERSION=22.16.0` no painel do Pages.

## Publicação via GitHub

1. Coloque o conteúdo desta pasta na raiz do repositório.
2. No Cloudflare, abra **Workers & Pages** e crie/conecte um projeto Pages ao repositório.
3. Configure os valores da tabela acima.
4. Salve e faça o primeiro deploy.
5. Os próximos `push` para o branch de produção disparam novos builds automaticamente.

O endereço final terá o formato `https://<projeto>.pages.dev` e pode receber um domínio personalizado depois.

## Teste local

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build:pages
pnpm preview
```

O build estático é produzido em `dist/public`.

## Publicação direta (opcional)

Depois de gerar `dist/public`, também é possível usar Wrangler:

```bash
npx wrangler@latest pages deploy dist/public --project-name cysa-study-br
```

O arquivo `wrangler.toml` já aponta `pages_build_output_dir` para `./dist/public`.

## SPA e rotas

Não há `404.html` no build. O Cloudflare Pages reconhece esse formato como SPA e encaminha rotas desconhecidas para a raiz da aplicação. Não é necessário servidor Express no Pages.

## PWA e uso no celular

A versão Cloudflare inclui:

- `manifest.webmanifest`;
- ícones 192/512 e Apple Touch Icon;
- `sw.js` para cache do app shell e dos assets do Vite;
- modo standalone quando instalado pelo navegador;
- fallback do app shell para uso após a primeira visita mesmo se a conexão cair.

O service worker só é registrado em build de produção. Durante `pnpm dev`, ele fica desativado para evitar cache atrapalhando o desenvolvimento.

## Progresso de estudo

O progresso permanece em `localStorage`. Isso significa:

- fica salvo no mesmo navegador/dispositivo;
- não exige conta, servidor ou banco de dados;
- não sincroniza automaticamente entre celular e computador;
- limpar os dados do navegador pode apagar o progresso local.

Sincronização entre dispositivos pode ser adicionada futuramente com autenticação + armazenamento remoto (por exemplo, Cloudflare D1/KV ou Firebase), sem ser necessária para esta primeira publicação.

## Arquivos específicos do Cloudflare

- `.node-version` — fixa Node 22.16.0;
- `.nvmrc` — mesma versão para desenvolvimento local;
- `wrangler.toml` — diretório de build do Pages;
- `client/public/_headers` — cabeçalhos básicos de segurança e política de cache do SW;
- `client/public/manifest.webmanifest` — metadados da PWA;
- `client/public/sw.js` — cache offline progressivo.

## O que NÃO configurar

Esta versão não precisa de:

- servidor Node/Express no Cloudflare;
- Pages Functions;
- banco de dados;
- secrets;
- `VITE_*` obrigatórias;
- proxy `/manus-storage`.

O build padrão foi alterado para produzir somente o frontend estático necessário pelo Cloudflare Pages.
