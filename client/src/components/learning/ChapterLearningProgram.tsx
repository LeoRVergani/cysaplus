/** Atlas de Incidentes: orquestrador de capítulo granular com navegação, leitura, prática e checkpoint. */
import { useMemo, useState } from "react";
import type { ChapterLearningPath, LearningLesson } from "@/data/learning";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, Clock3, FlaskConical, ListChecks, Target } from "lucide-react";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { ChapterCheckpoint } from "./ChapterCheckpoint";
import { ChapterPath } from "./ChapterPath";
import { LearningBlock, LearningVisual } from "./LearningBlock";
import { LearningPracticePanel } from "./LearningPracticePanel";

type Props = { path: ChapterLearningPath; onExit: () => void };

function getLesson(path: ChapterLearningPath, lessonId: string) {
  return path.units.flatMap((unit) => unit.lessons).find((lesson) => lesson.id === lessonId) ?? path.units[0].lessons[0];
}

function getUnitId(path: ChapterLearningPath, lessonId: string) {
  return path.units.find((unit) => unit.lessons.some((lesson) => lesson.id === lessonId))?.id ?? path.units[0].id;
}

export function ChapterLearningProgram({ path, onExit }: Props) {
  const firstLesson = path.units[0].lessons[0];
  const [activeLessonId, setActiveLessonId] = useState(firstLesson.id);
  const [activeTopicId, setActiveTopicId] = useState(firstLesson.topics[0].id);
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const { progress, progressPercent, totalLessons, markLesson, markTopic, markPractice, markCard, markQuestion } = useLearningProgress(path);
  const activeLesson = getLesson(path, activeLessonId);
  const activeTopic = activeLesson.topics.find((topic) => topic.id === activeTopicId) ?? activeLesson.topics[0];
  const activeUnitId = getUnitId(path, activeLessonId);
  const activePractice = path.practices.find((practice) => activeTopic.practiceIds.includes(practice.id));
  const activeLabs = path.labs.filter((lab) => lab.lessonId === activeLesson.id);
  const allLessons = useMemo(() => path.units.flatMap((unit) => unit.lessons), [path.units]);
  const currentLessonIndex = allLessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const nextLesson: LearningLesson | undefined = allLessons[currentLessonIndex + 1];

  function selectLesson(_unitId: string, lessonId: string) {
    const lesson = getLesson(path, lessonId);
    setActiveLessonId(lessonId);
    setActiveTopicId(lesson.topics[0].id);
    setShowCheckpoint(false);
  }

  function continueRoute() {
    const topicIndex = activeLesson.topics.findIndex((topic) => topic.id === activeTopic.id);
    const nextTopic = activeLesson.topics[topicIndex + 1];
    if (nextTopic) { setActiveTopicId(nextTopic.id); return; }
    markLesson(activeLesson.id);
    if (nextLesson) selectLesson(getUnitId(path, nextLesson.id), nextLesson.id);
    else setShowCheckpoint(true);
  }

  if (showCheckpoint) return <ChapterCheckpoint path={path} reviewedCardIds={progress.reviewedCards} onReviewCard={markCard} onQuestion={markQuestion} onBack={() => setShowCheckpoint(false)} />;

  return <section className="chapter-program">
    <header className="chapter-program-header"><div className="chapter-brand-instrument"><span className="chapter-reticle"><i /></span><div><span>CYSA+ / ESTUDO BR</span><strong>ATLAS · BR-01</strong></div><em>COORD 01.24</em></div><button className="back-control" onClick={onExit}><ArrowLeft size={16} /> Voltar ao mapa</button><div className="chapter-program-progress"><span>CAPÍTULO 1</span><div><i style={{ width: `${progressPercent}%` }} /></div><strong>{progress.lessons.length}/{totalLessons} aulas</strong></div></header>
    <div className="chapter-program-intro"><div><p className="eyebrow">TRILHA APROFUNDADA · ROTA ATIVA</p><h1>{path.title}</h1><p>{path.intro}</p></div><div className="program-intro-metrics"><span><Clock3 size={16} /> {totalLessons} aulas</span><span><Target size={16} /> {path.practices.length} práticas</span><span><FlaskConical size={16} /> {path.labs.length} labs</span></div><div className="route-instruments"><span><b>SETOR</b> OPS-01</span><span><b>EVIDÊNCIA</b> {path.questions.length} Q / {path.checkpoint.flashcards.length} FC</span><span><b>ESTADO</b> LOCAL</span></div></div>
    <div className="chapter-program-layout"><ChapterPath units={path.units} activeLessonId={activeLesson.id} completedLessonIds={progress.lessons} onSelect={selectLesson} />
      <article className="lesson-deep-reader">
        <div className="lesson-deep-meta"><span>{activeUnitId.toUpperCase()}</span><span>{activeLesson.duration} MIN</span><span>{activeLesson.examFocus.join(" · ")}</span></div>
        <h2>{activeLesson.title}</h2><p className="lesson-objective">{activeLesson.objective}</p><div className="lesson-bridge"><BookOpen size={18} /><p>{activeLesson.bridge}</p></div>
        <div className="lesson-prerequisites"><strong>Antes de começar:</strong>{activeLesson.prerequisites.map((item) => <span key={item}>{item}</span>)}</div>
        <nav className="topic-tabs" aria-label="Tópicos da aula">{activeLesson.topics.map((topic, index) => <button key={topic.id} className={topic.id === activeTopic.id ? "active" : ""} onClick={() => setActiveTopicId(topic.id)}><b>0{index + 1}</b>{topic.title}</button>)}</nav>
        <section className="topic-reader"><header><p className="eyebrow">TÓPICO ATUAL</p><h3>{activeTopic.title}</h3><div className="topic-source"><span>{activeTopic.source.sourceType === "complement" ? "COMPLEMENTO DIDÁTICO" : "BASEADO NO CAPÍTULO 1"}</span>{activeTopic.source.pdfPages && <span>PDF {activeTopic.source.pdfPages}</span>}<span>{activeTopic.source.section}</span></div><div className="topic-terms">{activeTopic.termPairs.map((term) => <span key={term.english}><b>{term.english}</b> · {term.portuguese}</span>)}</div></header>{activeTopic.blocks.map((block) => <LearningBlock key={`${activeTopic.id}-${block.id}`} block={block} />)}{activeTopic.visual && <LearningVisual visual={activeTopic.visual} />}</section>
        {activePractice && <LearningPracticePanel practice={activePractice} onComplete={markPractice} />}
        {activeLabs.length > 0 && <section className="lesson-labs"><div><p className="eyebrow">LABORATÓRIO SEGURO</p><h3>Aplicação guiada desta aula</h3></div>{activeLabs.map((lab) => <details className="lesson-lab-detail" key={lab.id}><summary><ListChecks size={19} /><div><strong>{lab.title}</strong><p>{lab.objective}</p><span>{lab.environment}</span></div></summary><div className="lab-detail-body"><p><b>Ferramentas:</b> {lab.tools.join(" · ")}</p><h4>Procedimento</h4><ol>{lab.procedure.map((step) => <li key={step}>{step}</li>)}</ol><h4>O que observar</h4><ul>{lab.observe.map((item) => <li key={item}>{item}</li>)}</ul><h4>Perguntas de revisão</h4><ul>{lab.questions.map((item) => <li key={item}>{item}</li>)}</ul><p className="lab-relation"><b>Relação com CySA+:</b> {lab.cysaRelation}</p></div></details>)}</section>}
        <footer className="lesson-deep-actions"><button className={`complete-topic ${progress.topics.includes(activeTopic.id) ? "done" : ""}`} onClick={() => markTopic(activeTopic.id)}>{progress.topics.includes(activeTopic.id) ? <><CheckCircle2 size={16} /> Tópico estudado</> : <><Check size={16} /> Marcar tópico estudado</>}</button><button className="button-primary" onClick={continueRoute}>{nextLesson ? "Continuar rota" : "Abrir checkpoint"}<ArrowRight size={16} /></button></footer>
      </article>
    </div>
  </section>;
}
