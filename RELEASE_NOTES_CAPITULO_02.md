# Release Notes — Capítulo 2

## CySA+ Estudo BR — System and Network Architecture

Esta entrega adiciona ao projeto Cloudflare Pages/PWA o **Capítulo 2 — Arquitetura de Sistemas e Redes**, mantendo o Capítulo 1 sem perda de conteúdo ou alteração intencional de IDs de progresso.

### Escopo implementado

- **7 unidades**
- **47 aulas**
- **47 tópicos**
- **221 conceitos atômicos rastreados**
- **247 blocos pedagógicos**
- **47 práticas**
- **53 questões autorais**
- **70 flashcards**
- **6 laboratórios seguros**
- **26 visuais originais**

### Conteúdo

A cobertura inclui infraestrutura serverless/FaaS, virtualização e containers; hardening, Registry e processos; logging/NTP; arquitetura on-premises, cloud e hybrid; segmentação, SDN, Zero Trust e SASE; IAM, MFA, passwordless e SSO; federação, SAML, AD FS, OAuth/OIDC; PAM e CASB; PKI, CRL, TLS inspection, DLP, PII e CHD.

Pequenas estruturas factuais do guia — como nomes dos root keys do Registry, níveis de logging e papéis/protocolos — são preservadas quando melhoram a aprendizagem. Textos explicativos, cenários, exercícios, visuais e questões são autorais em português brasileiro.

### Integração e PWA

- `learningPaths` agora registra os caminhos aprofundados de `m1` e `m2`.
- Componentes do Atlas foram generalizados para exibir o número do capítulo dinamicamente.
- O cache PWA foi incrementado para `2026-08-21-2`, mantendo limpeza automática de caches anteriores.
- O projeto permanece orientado ao build estático `pnpm build:pages` com saída `dist/public`.

### Validações executadas

- TypeScript `strict` isolado em `types.ts` + todos os módulos do Chapter 2: **APROVADO**.
- Integridade estrutural: **221/221 itens de cobertura validados, 0 referências inválidas**.
- IDs duplicados no Chapter 2: **0**.
- Prática + questão + flashcard por aula: **47/47**.
- Questões: opções, `answerIndex` e justificativas individuais: **APROVADO**.
- Imports locais em 105 arquivos TS/TSX: **0 quebrados**.
- Varredura sintática TypeScript/TSX: **0 diagnósticos de sintaxe**.
- `client/public/sw.js`: `node --check` **APROVADO**.

### Limitação de build nesta execução

O ambiente não possui `node_modules` e não conseguiu acessar `registry.npmjs.org` (`EAI_AGAIN`). Por isso, `pnpm check` e `pnpm build:pages` completos **não foram declarados como aprovados**. O Cloudflare Pages deverá instalar as dependências pelo lockfile no deploy; recomenda-se confirmar o build na pipeline ou localmente antes de considerar a validação de produção encerrada.

### Próximo capítulo

**Capítulo 3 não iniciado.**

### Arquivos criados

- `client/src/data/learning/chapter-02/helpers.ts`
- `client/src/data/learning/chapter-02/unit-01-infrastructure.ts`
- `client/src/data/learning/chapter-02/unit-02-operating-systems.ts`
- `client/src/data/learning/chapter-02/unit-03-logging.ts`
- `client/src/data/learning/chapter-02/unit-04-network-architecture.ts`
- `client/src/data/learning/chapter-02/unit-05-iam.ts`
- `client/src/data/learning/chapter-02/unit-06-federation-privileged.ts`
- `client/src/data/learning/chapter-02/unit-07-data-protection.ts`
- `client/src/data/learning/chapter-02/practices.ts`
- `client/src/data/learning/chapter-02/questions.ts`
- `client/src/data/learning/chapter-02/flashcards.ts`
- `client/src/data/learning/chapter-02/labs.ts`
- `client/src/data/learning/chapter-02/index.ts`
- `docs/spec/CHAPTER_02_COVERAGE.md`
- `docs/validation/CHAPTER_02_FINAL_VALIDATION.md`
- `docs/reports/REPORT_CHAPTER_02_COMPLETE.md`
- `RELEASE_NOTES_CAPITULO_02.md`

### Arquivos modificados

- `client/src/data/learning/index.ts`
- `client/src/components/learning/ChapterLearningProgram.tsx`
- `client/src/components/learning/ChapterCheckpoint.tsx`
- `client/src/data/glossary.ts`
- `client/public/sw.js`
- `docs/spec/BOOK_COVERAGE.md`
- `docs/spec/PEDAGOGICAL_STANDARD.md`
- `CURSO.md`
- `todo.md`
