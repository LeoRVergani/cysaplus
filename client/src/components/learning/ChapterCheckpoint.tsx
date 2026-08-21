/** Atlas de Incidentes: checkpoint de revisão do capítulo, com termos, cartões, questões e laboratórios. */
import { useState } from "react";
import type { ChapterLearningPath } from "@/data/learning";
import { ArrowRight, BookOpenCheck, ChevronLeft, ChevronRight, FlaskConical, RotateCcw } from "lucide-react";
import { LearningVisual } from "./LearningBlock";

type Props = {
  path: ChapterLearningPath;
  reviewedCardIds: string[];
  onReviewCard: (id: string) => void;
  onQuestion: (id: string) => void;
  onBack: () => void;
};

export function ChapterCheckpoint({ path, reviewedCardIds, onReviewCard, onQuestion, onBack }: Props) {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFace, setCardFace] = useState<"front" | "back">("front");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const cards = path.checkpoint.flashcards;
  const quiz = path.questions;
  const card = cards[cardIndex % cards.length];
  const question = quiz[questionIndex % quiz.length];
  const correct = selected === question.answerIndex;

  function nextCard(direction: 1 | -1) {
    setCardIndex((current) => (current + direction + cards.length) % cards.length);
    setCardFace("front");
  }

  function nextQuestion() {
    setQuestionIndex((current) => (current + 1) % quiz.length);
    setSelected(null);
    setSubmitted(false);
  }

  return <section className="chapter-checkpoint">
    <button className="back-control" onClick={onBack}><ChevronLeft size={16} /> Voltar à aula</button>
    <header className="checkpoint-hero"><span>CHECKPOINT DO CAPÍTULO {path.chapterNumber}</span><h2>{path.checkpoint.title}</h2><p>Recupere a lógica do capítulo antes de tentar memorizar definições isoladas.</p></header>
    <section className="checkpoint-summary"><div><p className="eyebrow">SÍNTESE OPERACIONAL</p><h3>O que deve permanecer no radar</h3></div><ol>{path.checkpoint.summary.map((item, index) => <li key={item}><b>0{index + 1}</b><span>{item}</span></li>)}</ol></section>
    {path.visuals.find((visual) => visual.id === "v-chapter-map") && <section className="checkpoint-map"><LearningVisual visual={path.visuals.find((visual) => visual.id === "v-chapter-map")!} /></section>}
    <section className="checkpoint-grid">
      <article className="checkpoint-card term-card"><p className="eyebrow">TERMOS ESSENCIAIS</p><h3>Vocabulário que conecta decisão e evidência</h3><div>{path.checkpoint.essentialTerms.map((term) => <span key={term}>{term}</span>)}</div></article>
      <article className="checkpoint-card mistake-card"><p className="eyebrow">ARMADILHAS</p><h3>O que não concluir cedo demais</h3><ul>{path.checkpoint.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></article>
    </section>
    <section className="checkpoint-flashcards"><div className="flashcard-progress"><span>REVISÃO ATIVA</span><strong>{cardIndex + 1}/{cards.length}</strong></div><button className={`checkpoint-flashcard ${cardFace === "back" ? "revealed" : ""}`} onClick={() => setCardFace((face) => face === "front" ? "back" : "front")}><div className="card-face card-front"><span>PERGUNTA</span><h3>{card.front}</h3><p>Toque para revelar</p></div><div className="card-face card-back"><span>RESPOSTA</span><h3>{card.back}</h3><p>{card.hint}</p></div></button><div className="checkpoint-controls"><button className="button-ghost" onClick={() => nextCard(-1)}><ChevronLeft size={16} /> Anterior</button><button className="button-primary" onClick={() => { onReviewCard(card.id); nextCard(1); }}>{reviewedCardIds.includes(card.id) ? "Revisar novamente" : "Entendi — seguir"}<ChevronRight size={16} /></button></div></section>
    <section className="checkpoint-quiz"><div className="quiz-heading"><div><p className="eyebrow">BANCO DE QUESTÕES</p><h3>Decida usando o contexto</h3></div><span>{questionIndex + 1}/{quiz.length}</span></div>{question.scenario && <p className="quiz-scenario">{question.scenario}</p>}<h4>{question.prompt}</h4><div className="quiz-options">{question.options.map((option, index) => <button key={option} disabled={submitted} onClick={() => setSelected(index)} className={`${selected === index ? "selected" : ""} ${submitted && index === question.answerIndex ? "correct" : ""} ${submitted && selected === index && !correct ? "wrong" : ""}`}><b>{String.fromCharCode(65 + index)}</b>{option}</button>)}</div>{!submitted ? <button className="button-primary" disabled={selected === null} onClick={() => { setSubmitted(true); onQuestion(question.id); }}>Conferir raciocínio <ArrowRight size={16} /></button> : <div className={`quiz-feedback ${correct ? "success" : "retry"}`}><strong>{correct ? "Decisão consistente" : "Revise o elemento que muda a decisão"}</strong><p>{question.rationale}</p><div className="quiz-option-explanations"><h5>Por que cada alternativa está certa ou errada?</h5>{question.options.map((option, index) => <p key={`${question.id}-explain-${index}`} className={index === question.answerIndex ? "is-answer" : ""}><b>{String.fromCharCode(65 + index)}. {option}</b><span>{index === question.answerIndex ? question.rationale : question.distractorRationales[index]}</span></p>)}</div><button className="button-ghost" onClick={nextQuestion}><RotateCcw size={15} /> Próxima questão</button></div>}</section>
    <section className="checkpoint-labs"><div><p className="eyebrow">LABORATÓRIOS DO CAPÍTULO</p><h3>Pratique sem depender de sistemas reais</h3></div><div>{path.labs.map((lab) => <article key={lab.id}><FlaskConical size={18} /><div><strong>{lab.title}</strong><p>{lab.objective}</p><span>{lab.cysaRelation}</span></div></article>)}</div></section>
    <footer className="checkpoint-footer"><BookOpenCheck size={19} /><p>O checkpoint confirma prática e revisão local; ele não equivale a uma previsão de aprovação.</p></footer>
  </section>;
}
