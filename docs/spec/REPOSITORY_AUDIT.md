# Auditoria do repositório existente

## Conclusão executiva

O **CySA+ Estudo BR** é uma aplicação estática React 19 + TypeScript + Vite, já funcional e adequada para evolução incremental. Não será reconstruída do zero. A arquitetura atual fornece navegação, progresso local, interação de questões, cenários de logs, laboratórios, PBQ, flashcards, simulado, Glossário SOC e documentação inicial de cobertura.

O principal problema é pedagógico e de granularidade: a estrutura atual modela o conteúdo principalmente por **capítulo**. Um capítulo contém um overview, três conceitos, uma rota de estudo e uma extensão curta; isso é suficiente para catálogo e revisão, mas não representa todos os tópicos, exemplos e práticas necessários para uma aula profunda.

## Inventário técnico

| Área | Arquivos principais | Estado observado | Preservar? |
|---|---|---|---|
| Inicialização e rota | `client/src/main.tsx`, `App.tsx` | Uma rota principal, providers e limite de erro estáveis. | Sim |
| Experiência principal | `client/src/pages/Home.tsx` | Dashboard, mapa de curso, prática, laboratório, revisão, simulado e glossário em uma única página de 554 linhas. | Sim, com extração gradual de painéis |
| Catálogo de capítulos | `client/src/data/course.ts` | 13 capítulos, perguntas, flashcards derivados, labs, logs, PBQ e plano diário. | Sim; manter como catálogo e banco legados |
| Aprofundamento atual | `client/src/data/study-extensions.ts` | Quatro campos por capítulo: resumo, exemplo, autorrevisão e prática. | Sim; não sobrecarregar com aulas granulares |
| Consulta de termos | `client/src/data/glossary.ts` | Glossário pesquisável de 121 termos com categorias e vínculos de módulo. | Sim |
| Tema e UI | `contexts/ThemeContext.tsx`, `components/ui/*`, CSS do Atlas | Contexto suporta tema claro/escuro; a raiz atual inicia em modo escuro sem expor alternância. | Sim; preservar o contexto e avaliar alternância separadamente |
| Documentação | `CURSO.md`, `docs/*.md`, `docs/spec/*.md` | Escopo pedagógico, cobertura inicial, fontes de logs e especificações. | Sim; consolidar sem apagar material existente |

## Recursos funcionais que não serão removidos

| Recurso | Comportamento atual | Papel na arquitetura futura |
|---|---|---|
| Progresso local | módulos concluídos, questões respondidas e cards revisados em `localStorage` | Evoluir para registrar progresso por unidade e aula, mantendo chaves atuais compatíveis |
| Questões | prática linear e simulado com explicação no modo de estudo | Filtrar também por capítulo, unidade, tópico e dificuldade |
| Laboratório | logs sintéticos, cenários guiados e PBQ | Vincular novas práticas às aulas sem remover os cenários existentes |
| Glossário | busca e conexão a capítulos | Adicionar relação direta com tópicos e aulas profundas |
| Mapa de curso | catálogo visual dos 13 capítulos | Tornar cada capítulo uma porta de entrada para unidades e aulas |
| Dashboard | cobertura, rota diária e atalho de próxima ação | Exibir progresso de capítulo, unidade e revisão sem perder o painel atual |

## Lacunas pedagógicas observadas no Capítulo 1

| Camada | Cobertura atual em `OPS-01` | Lacuna identificada |
|---|---|---|
| Catálogo | Título, overview, três objetivos e três conceitos | Falta mapa de unidades e de tópicos do capítulo |
| Explicação | Quatro resumos curtos e um exemplo | Falta ensino progressivo por seção, analogia, terminologia bilingue e distinções técnicas |
| Prática | Duas questões simples e uma dica de laboratório | Faltam exercícios por assunto, análise de regra/log de firewall, decisões de risco e prática de controles |
| Revisão | Flashcards automáticos de dois conceitos | Faltam conjunto de flashcards do capítulo, erros comuns, pegadinhas e revisão orientada por tópico |
| Visual | Diagrama genérico de quatro etapas | Faltam modelos específicos de CIA, risco, NAC, firewall, segmentação, pentest, sandbox e automação |
| Auditoria | Matriz recém-criada do capítulo | Ainda faltam vínculo de cada recurso a uma seção, status de implementação e validação de cobertura |

## Riscos de arquitetura a evitar

1. Não adicionar as aulas profundas diretamente a `course.ts`; ele deve permanecer como catálogo de capítulos e práticas gerais existentes.
2. Não ampliar `study-extensions.ts` para um megaobjeto por capítulo; ele pode continuar como resumo de abertura.
3. Não adicionar o leitor aprofundado inteiro a `Home.tsx`; a página deve coordenar navegação e estado, enquanto componentes especializados renderizam capítulo, unidade, aula, prática e revisão.
4. Não substituir as chaves atuais de `localStorage` sem migração ou coexistência.
5. Não considerar a estrutura resumida atual como comprovação de cobertura completa do guia.

## Resultado da auditoria

O projeto deve evoluir com uma camada de conteúdo nova e tipada, arquivos de dados por capítulo e componentes reutilizáveis de aprendizagem. A próxima fase documentará esse modelo antes da primeira integração de conteúdo profundo.
