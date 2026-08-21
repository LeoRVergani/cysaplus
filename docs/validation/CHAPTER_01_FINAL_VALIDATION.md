# Validação Final — Capítulo 1 padrão-ouro

## Escopo validado

A implementação atual do Capítulo 1 contém:

- 7 unidades;
- 47 aulas;
- 48 tópicos;
- 225 conceitos atômicos rastreados;
- 48 práticas;
- 53 questões autorais;
- 78 flashcards;
- 6 laboratórios seguros;
- 18 visuais originais.

Todas as 47 aulas possuem ao menos uma prática, uma questão e um flashcard associado.

## Validações executadas nesta entrega

| Verificação | Resultado |
|---|---|
| Compilação isolada de `client/src/data/learning/**/*.ts` com TypeScript (`strict`) | **APROVADA** |
| Integridade de IDs e vínculos unit → lesson → topic → practice/question | **APROVADA — 0 erros** |
| Questões: `answerIndex`, número de alternativas e justificativas individuais das incorretas | **APROVADA — 0 erros** |
| Cobertura por aula: prática + questão + flashcard | **APROVADA — 47/47** |
| Transpilação sintática de todos os `.ts/.tsx` do client | **APROVADA — 90 arquivos, 0 erros de sintaxe** |
| Resolução estática de imports locais (`./...` e `@/...`) | **APROVADA — 90 arquivos, 0 imports locais quebrados** |
| Parse dos CSS do client com PostCSS | **APROVADA — 6 arquivos, 0 erros** |
| Glossário: duplicidade de termos | **APROVADA — 147 entradas, 0 duplicatas** |
| Auditoria de termos-chave do Capítulo 1 no conteúdo final | **APROVADA — nenhum termo obrigatório ausente** |

## Build completo

O build completo **não foi declarado como aprovado nesta entrega**. O ZIP de origem não contém a árvore completa de `node_modules`, e o ambiente não conseguiu acessar `registry.npmjs.org` (`EAI_AGAIN`) para instalar as dependências.

Por isso, `pnpm check`/`pnpm build` devem ser executados no ambiente do usuário após `pnpm install` com acesso ao registry.

## Artefatos antigos

O diretório `dist/` da versão de origem ficou desatualizado após as mudanças. Ele foi removido do pacote final para evitar publicação acidental de um build anterior. O build deve ser regenerado a partir do código-fonte final.

## Critério de aceite

A validação atual prova consistência estrutural e pedagógica dos dados, sintaxe do client, imports locais e CSS. O aceite visual/runtime definitivo deve ser feito após instalar dependências e abrir a aplicação em desktop e mobile.
