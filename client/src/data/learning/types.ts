/**
 * Atlas de Incidentes — modelo granular de aprendizagem.
 * Mantém a cobertura rastreável ao guia sem reproduzir seu texto ou questões.
 */

export type CoverageStatus = "mapped" | "implemented" | "validated";

export type LearningSource = {
  book: "CompTIA CySA+ Study Guide CS0-003";
  chapter: number;
  section: string;
  coverageStatus: CoverageStatus;
  /** Páginas do PDF anexado usadas como referência de cobertura. */
  pdfPages?: string;
  /** Diferencia conteúdo derivado do capítulo de complemento didático autoral. */
  sourceType?: "book" | "complement";
};

export type LearningBlockKind =
  | "simple"
  | "analogy"
  | "technical"
  | "comparison"
  | "soc"
  | "evidence"
  | "exam"
  | "mistake"
  | "remember"
  | "steps"
  | "scenario"
  | "note"
  | "complement";

export type LearningBlock = {
  id: string;
  kind: LearningBlockKind;
  title: string;
  body: string;
  items?: string[];
  evidence?: string[];
};

export type VisualSpec = {
  id: string;
  title: string;
  type: "flow" | "comparison" | "decision-tree" | "map" | "timeline" | "matrix" | "network" | "cards";
  alt: string;
  caption: string;
  nodes: string[];
};

export type LearningTopic = {
  id: string;
  title: string;
  source: LearningSource;
  termPairs: { english: string; portuguese: string }[];
  blocks: LearningBlock[];
  visual?: VisualSpec;
  practiceIds: string[];
};

export type LearningLesson = {
  id: string;
  title: string;
  duration: number;
  objective: string;
  prerequisites: string[];
  bridge: string;
  examFocus: string[];
  topics: LearningTopic[];
};

export type LearningUnit = {
  id: string;
  title: string;
  summary: string;
  lessons: LearningLesson[];
};

export type LearningPractice = {
  id: string;
  chapter: number;
  unitId: string;
  lessonId: string;
  topicId: string;
  type: "decision" | "log-analysis" | "classification" | "matching" | "pbq" | "lab";
  title: string;
  prompt: string;
  evidence?: string[];
  options?: string[];
  answerIndex?: number;
  expectedOutcome: string;
  correctFeedback: string;
  misconceptionFeedback: string;
};

export type LearningFlashcard = {
  id: string;
  lessonId: string;
  front: string;
  back: string;
  hint: string;
};

export type LearningQuestion = {
  id: string;
  chapter: number;
  unitId: string;
  lessonId: string;
  topicId: string;
  domain: string;
  difficulty: "basic" | "intermediate" | "cysa-style";
  questionType: "concept" | "scenario" | "log" | "pbq";
  examObjective: string;
  prompt: string;
  scenario?: string;
  options: string[];
  answerIndex: number;
  rationale: string;
  distractorRationales: string[];
};

export type ChapterLab = {
  id: string;
  title: string;
  unitId: string;
  lessonId: string;
  objective: string;
  environment: string;
  tools: string[];
  prerequisites: string[];
  procedure: string[];
  evidence: string[];
  expectedOutcome: string;
  observe: string[];
  questions: string[];
  explanation: string;
  cysaRelation: string;
};

export type ChapterCheckpoint = {
  title: string;
  summary: string[];
  essentialTerms: string[];
  commonMistakes: string[];
  flashcards: LearningFlashcard[];
  miniQuizIds: string[];
  questionIds: string[];
  practiceIds: string[];
};

export type CoverageItem = {
  id?: string;
  concept?: string;
  pdfPages?: string;
  section: string;
  unitId: string;
  lessonId: string;
  topicIds: string[];
  status: CoverageStatus;
  practiceIds?: string[];
  questionIds?: string[];
};

export type ChapterLearningPath = {
  chapterId: string;
  chapterNumber: number;
  moduleId: string;
  title: string;
  intro: string;
  units: LearningUnit[];
  visuals: VisualSpec[];
  practices: LearningPractice[];
  labs: ChapterLab[];
  questions: LearningQuestion[];
  checkpoint: ChapterCheckpoint;
  coverage: CoverageItem[];
};
