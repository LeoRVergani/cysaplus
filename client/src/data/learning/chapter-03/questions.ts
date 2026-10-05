import type { LearningQuestion } from "../types";
import { chapter03NetworkQuestions } from "./questions-network";
import { chapter03HostAppQuestions } from "./questions-host-app";
import { chapter03ToolQuestions } from "./questions-tools";
import { chapter03ArtifactQuestions } from "./questions-artifacts";

export const chapter03Questions: LearningQuestion[] = [
  ...chapter03NetworkQuestions,
  ...chapter03HostAppQuestions,
  ...chapter03ToolQuestions,
  ...chapter03ArtifactQuestions,
];
