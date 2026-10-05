import type { LearningPractice } from "../types";
import { chapter03Questions } from "./questions";

const typeFor = (index: number): LearningPractice["type"] =>
  chapter03Questions[index]?.questionType === "log" ? "log-analysis" : "decision";

export const chapter03Practices: LearningPractice[] = chapter03Questions.slice(0, 51).map((question, index) => ({
  id: question.id.replace("c3q", "c3p") + "-" + question.lessonId.replace(/^c3l\d+-/, ""),
  chapter: 3,
  unitId: question.unitId,
  lessonId: question.lessonId,
  topicId: question.topicId,
  type: typeFor(index),
  title: `Prática ${index + 1} — decisão orientada por evidência`,
  prompt: `Escolha a interpretação ou ação mais consistente e explique qual evidência muda a decisão. ${question.prompt}`,
  ...(question.scenario ? { evidence: [question.scenario] } : {}),
  options: question.options,
  answerIndex: question.answerIndex,
  expectedOutcome: question.rationale,
  correctFeedback: `Decisão consistente. ${question.rationale}`,
  misconceptionFeedback: "Revise o limite da evidência: um indicador isolado raramente prova comprometimento. Procure o contexto que diferencia sintoma, tentativa e impacto.",
}));
