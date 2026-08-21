# Proposta de arquitetura educacional granular

## Decisão de arquitetura

O modelo atual continuará responsável pelo **catálogo** e pelos recursos gerais. A nova camada será adicionada ao lado dele para modelar aprendizagem profunda por domínio, capítulo, unidade, aula, tópico, exemplo, prática e revisão.

```text
Domínio
└── Capítulo (catálogo em course.ts)
    └── Unidade
        └── Aula
            └── Tópico
                ├── Blocos de explicação e visualização
                ├── Exemplo empresarial / visão SOC
                ├── Evidência sintética
                ├── Prática interativa
                └── Revisão
```

O `course.ts` seguirá como índice compacto dos 13 capítulos, banco legado de prática geral e entrada do dashboard. O `study-extensions.ts` continuará oferecendo a síntese de abertura de cada capítulo. O conteúdo detalhado fica em arquivos próprios por capítulo, começando por `client/src/data/learning/chapter-01/`.

## Tipos propostos

```ts
type ContentSource = {
  book: "CompTIA CySA+ Study Guide CS0-003";
  chapter: number;
  section: string;
  coverageStatus: "mapped" | "implemented" | "validated";
};

type LearningTopic = {
  id: string;
  title: string;
  source: ContentSource;
  essentialTerms: string[];
  blocks: LearningBlock[];
  practiceIds: string[];
  reviewIds: string[];
};

type LearningLesson = {
  id: string;
  title: string;
  duration: number;
  objective: string;
  prerequisites: string[];
  topics: LearningTopic[];
  examFocus: string[];
};

type LearningUnit = {
  id: string;
  title: string;
  summary: string;
  lessons: LearningLesson[];
  checkpoint: ChapterCheckpoint;
};

type ChapterLearningPath = {
  chapterId: string;
  chapterNumber: number;
  moduleId: string;
  units: LearningUnit[];
  coverage: CoverageItem[];
};
```

## Blocos de aprendizagem

O conteúdo será composto por blocos tipados, em vez de texto solto. Isso permite que o mesmo leitor renderize explicação, tabelas, diagramas, exercícios e revisão sem condicionar o conteúdo a um componente gigante.

| Tipo de bloco | Finalidade educacional | Exemplo no Capítulo 1 |
|---|---|---|
| `explanation` | Ensinar em linguagem simples e técnica | Definir ameaça, vulnerabilidade e risco |
| `analogy` | Reduzir carga cognitiva de conceitos abstratos | Segurança de prédio para firewall e segmentação |
| `comparison` | Diferenciar conceitos próximos | Privacidade versus segurança; allow versus deny |
| `diagram` | Visualizar relação, fluxo ou decisão | Interseção ameaça–vulnerabilidade–risco |
| `socLens` | Conectar conteúdo à rotina defensiva | Triagem de uma tentativa de acesso ao perímetro |
| `evidence` | Exibir log, evento ou regra sintética | Registro de firewall com origem, destino, porta e ação |
| `examNote` | Destacar conceito importante para decisão de prova | Risco requer ameaça e vulnerabilidade relevantes |
| `commonMistake` | Antecipar erro de iniciante | Concluir comprometimento por uma negação isolada |
| `practicePrompt` | Exigir resposta, classificação ou decisão | Selecionar a melhor regra mínima de rede |

## Prática, questões e revisão

Práticas profundas serão dados independentes, ligados a tópicos e aulas. O modelo reutiliza a interface atual de questão, mas acrescenta metadados para filtro e revisão direcionada.

```ts
type LearningPractice = {
  id: string;
  chapter: number;
  unitId: string;
  lessonId: string;
  topicId: string;
  type: "decision" | "log-analysis" | "classification" | "matching" | "pbq" | "lab";
  prompt: string;
  evidence?: string[];
  expectedOutcome: string;
  feedback: { correct: string; misconception: string };
};

type LearningQuestion = {
  id: string;
  chapter: number;
  unitId: string;
  topicId: string;
  difficulty: "basic" | "intermediate" | "cysa-style";
  questionType: "concept" | "scenario" | "log" | "pbq";
  examObjective: string;
  options: string[];
  answerIndex: number;
  rationale: string;
  distractorRationales: string[];
};
```

Cada `ChapterCheckpoint` reunirá o resumo rápido, termos, erros comuns, flashcards, mini quiz, questões por dificuldade, PBQ e laboratórios. Ele será uma experiência de encerramento do capítulo, e não apenas uma lista de cartões.

## Arquivos e responsabilidades propostas

| Local | Responsabilidade | Ação inicial |
|---|---|---|
| `client/src/data/learning/types.ts` | Tipos da camada granular | Criar |
| `client/src/data/learning/chapter-01/` | Dados autorais e modularizados do Capítulo 1 | Implementado |
| `client/src/data/learning/index.ts` | Registro e busca de caminhos de capítulo | Criar |
| `client/src/components/learning/ChapterPath.tsx` | Navegação por unidades e progresso | Criar |
| `client/src/components/learning/LessonReader.tsx` | Leitor de aula e renderização de blocos | Criar |
| `client/src/components/learning/LearningBlock.tsx` | Renderizador de explicação, comparação, visual, SOC e evidência | Criar |
| `client/src/components/learning/ChapterCheckpoint.tsx` | Revisão, flashcards, quiz e práticas finais | Criar |
| `client/src/hooks/useLearningProgress.ts` | Estado de unidade, aula e prática no `localStorage` | Criar |
| `client/src/pages/Home.tsx` | Orquestrar navegação e abrir leitor | Reduzir gradualmente, sem remover os modos atuais |

## Compatibilidade e migração

1. `courseModules` continua sendo a fonte do catálogo de capítulos e do cálculo de cobertura geral existente.
2. `questions`, `labs`, `logScenarios`, `pbq` e `flashcards` atuais permanecem utilizáveis enquanto as práticas granulares são adicionadas.
3. O novo progresso utilizará a chave versionada `cysa-learning-progress:v1`; as chaves atuais `cysa-completed`, `cysa-records` e `cysa-reviewed-cards` permanecem intactas.
4. O leitor aprofundado será usado apenas quando existir um `ChapterLearningPath`; outros capítulos continuam no leitor atual até serem evoluídos.
5. A primeira integração não reclassificará o Capítulo 1 como completo. O status só muda após auditoria da matriz, testes e validação de todos os recursos previstos.

## Componentes existentes reutilizáveis

`SignalTag`, `QuestionPanel`, `AppMark`, `MetricCard`, `Button`, `Progress`, `Tabs`, `Accordion`, `Dialog` e o contexto de tema serão preservados ou extraídos da página atual quando isso reduzir duplicação. A nova interface não introduz uma segunda linguagem visual; ela utiliza o Atlas de Incidentes e amplia a hierarquia de leitura.

## Critério para iniciar implementação

Após aprovação desta estrutura, a primeira mudança de código deverá criar os tipos e dados do Capítulo 1 sem tocar no catálogo de capítulos. Em seguida, componentes novos renderizarão o caminho do capítulo e serão acoplados ao módulo `OPS-01` de forma condicional.
