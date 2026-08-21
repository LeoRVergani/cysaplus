import type { LearningBlock, LearningLesson, LearningSource, LearningTopic, VisualSpec } from "../types";

export const src = (section: string, pdfPages: string, sourceType: LearningSource["sourceType"] = "book"): LearningSource => ({
  book: "CompTIA CySA+ Study Guide CS0-003",
  chapter: 2,
  section,
  pdfPages,
  sourceType,
  coverageStatus: "validated",
});

export const b = (
  id: string,
  kind: LearningBlock["kind"],
  title: string,
  body: string,
  items?: string[],
  evidence?: string[],
): LearningBlock => ({ id, kind, title, body, ...(items?.length ? { items } : {}), ...(evidence?.length ? { evidence } : {}) });

export const v = (
  id: string,
  title: string,
  type: VisualSpec["type"],
  alt: string,
  caption: string,
  nodes: string[],
): VisualSpec => ({ id, title, type, alt, caption, nodes });

export const topic = (args: {
  id: string;
  title: string;
  section: string;
  pages: string;
  terms: Array<[string, string]>;
  blocks: LearningBlock[];
  visual?: VisualSpec;
  practiceIds?: string[];
  sourceType?: LearningSource["sourceType"];
}): LearningTopic => ({
  id: args.id,
  title: args.title,
  source: src(args.section, args.pages, args.sourceType),
  termPairs: args.terms.map(([english, portuguese]) => ({ english, portuguese })),
  blocks: args.blocks,
  ...(args.visual ? { visual: args.visual } : {}),
  practiceIds: args.practiceIds ?? [],
});

export const lesson = (args: {
  id: string;
  number: number;
  title: string;
  duration: number;
  objective: string;
  bridge: string;
  examFocus: string[];
  topics: LearningTopic[];
  prerequisites?: string[];
}): LearningLesson => ({
  id: args.id,
  title: `Aula ${args.number} — ${args.title}`,
  duration: args.duration,
  objective: args.objective,
  prerequisites: args.prerequisites ?? ["Nenhum conhecimento prévio além da aula anterior"],
  bridge: args.bridge,
  examFocus: args.examFocus,
  topics: args.topics,
});
