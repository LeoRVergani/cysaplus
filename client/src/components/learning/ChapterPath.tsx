/** Atlas de Incidentes: navegação lateral por unidade e aula em um capítulo aprofundado. */
import type { LearningUnit } from "@/data/learning";
import { CheckCircle2, ChevronRight } from "lucide-react";

type Props = {
  units: LearningUnit[];
  activeLessonId: string;
  completedLessonIds: string[];
  onSelect: (unitId: string, lessonId: string) => void;
};

export function ChapterPath({ units, activeLessonId, completedLessonIds, onSelect }: Props) {
  return (
    <aside className="chapter-path" aria-label="Rota do capítulo">
      <div className="chapter-path-head"><span>ROTA DO CAPÍTULO</span><p>Unidades e aulas</p></div>
      {units.map((unit, unitIndex) => <section className="path-unit" key={unit.id}>
        <div className="path-unit-title"><i>U{unitIndex + 1}</i><strong>{unit.title.replace(/^Unidade [A-Z0-9]+ — /, "")}</strong></div>
        <div className="path-lesson-list">{unit.lessons.map((lesson, lessonIndex) => {
          const complete = completedLessonIds.includes(lesson.id);
          const active = lesson.id === activeLessonId;
          return <button key={lesson.id} className={active ? "path-lesson active" : "path-lesson"} onClick={() => onSelect(unit.id, lesson.id)}>
            <span>{complete ? <CheckCircle2 size={14} /> : `${unitIndex + 1}.${lessonIndex + 1}`}</span><div><strong>{lesson.title.replace(/^Aula \d+ — /, "")}</strong><small>{lesson.duration} min</small></div><ChevronRight size={14} />
          </button>;
        })}</div>
      </section>)}
    </aside>
  );
}
