/** Registro dos caminhos de aprendizagem aprofundados. */
import { chapterOneCompleteLearningPath } from "./chapter-01/index";
import type { ChapterLearningPath } from "./types";

export * from "./types";

export const learningPaths: ChapterLearningPath[] = [chapterOneCompleteLearningPath];

export function getLearningPathByModuleId(moduleId: string) {
  return learningPaths.find((path) => path.moduleId === moduleId);
}
