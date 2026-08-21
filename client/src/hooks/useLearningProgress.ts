/** Atlas de Incidentes: progresso local versionado para unidades, aulas, tópicos e práticas. */
import { useEffect, useMemo, useState } from "react";
import type { ChapterLearningPath } from "@/data/learning";

type LearningProgress = {
  lessons: string[];
  topics: string[];
  practices: string[];
  reviewedCards: string[];
  questions: string[];
};

const emptyProgress: LearningProgress = { lessons: [], topics: [], practices: [], reviewedCards: [], questions: [] };

function unique(items: string[], id: string) {
  return items.includes(id) ? items : [...items, id];
}

export function useLearningProgress(path: ChapterLearningPath) {
  const key = `cysa-learning-progress:v1:${path.chapterId}`;
  const [progress, setProgress] = useState<LearningProgress>(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) setProgress({ ...emptyProgress, ...JSON.parse(stored) });
    } catch {
      setProgress(emptyProgress);
    } finally {
      setReady(true);
    }
  }, [key]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(key, JSON.stringify(progress));
  }, [key, progress, ready]);

  const totalLessons = useMemo(() => path.units.flatMap((unit) => unit.lessons).length, [path.units]);
  const progressPercent = totalLessons ? Math.round((progress.lessons.length / totalLessons) * 100) : 0;
  const markLesson = (id: string) => setProgress((current) => ({ ...current, lessons: unique(current.lessons, id) }));
  const markTopic = (id: string) => setProgress((current) => ({ ...current, topics: unique(current.topics, id) }));
  const markPractice = (id: string) => setProgress((current) => ({ ...current, practices: unique(current.practices, id) }));
  const markCard = (id: string) => setProgress((current) => ({ ...current, reviewedCards: unique(current.reviewedCards, id) }));
  const markQuestion = (id: string) => setProgress((current) => ({ ...current, questions: unique(current.questions, id) }));

  return { progress, ready, totalLessons, progressPercent, markLesson, markTopic, markPractice, markCard, markQuestion };
}
