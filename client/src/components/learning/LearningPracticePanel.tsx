/** Atlas de Incidentes: prática curta com retorno autoral, proporcional e orientado à decisão. */
import { useEffect, useState } from "react";
import type { LearningPractice } from "@/data/learning";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

export function LearningPracticePanel({ practice, onComplete }: { practice: LearningPractice; onComplete: (id: string) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setSelected(null); setSubmitted(false); }, [practice.id]);
  const isChoice = Boolean(practice.options && practice.answerIndex !== undefined);
  const correct = selected === practice.answerIndex;

  return (
    <section className="learning-practice">
      <header><span>PRÁTICA DE DECISÃO</span><strong>{practice.title}</strong></header>
      {practice.evidence && <div className="practice-evidence">{practice.evidence.map((line) => <code key={line}>{line}</code>)}</div>}
      <h3>{practice.prompt}</h3>
      {isChoice ? <div className="practice-options">{practice.options!.map((option, index) => <button key={option} disabled={submitted} onClick={() => setSelected(index)} className={`${selected === index ? "selected" : ""} ${submitted && index === practice.answerIndex ? "correct" : ""} ${submitted && selected === index && index !== practice.answerIndex ? "wrong" : ""}`}><b>{String.fromCharCode(65 + index)}</b>{option}</button>)}</div> : <div className="practice-pbq"><p>Descreva a sequência proposta com suas próprias palavras antes de revelar o resultado esperado.</p><ol>{practice.prompt.split(";").map((step) => <li key={step}>{step.trim()}</li>)}</ol></div>}
      {!submitted ? <button className="button-primary" onClick={() => { setSubmitted(true); onComplete(practice.id); }} disabled={isChoice && selected === null}>{isChoice ? "Conferir decisão" : "Registrar prática"}<ArrowRight size={16} /></button> : <div className={`practice-feedback ${correct || !isChoice ? "success" : "retry"}`}><strong>{correct || !isChoice ? "Raciocínio registrado" : "Revise o critério"}</strong><p>{correct || !isChoice ? practice.correctFeedback : practice.misconceptionFeedback}</p><p><b>Resultado esperado:</b> {practice.expectedOutcome}</p><button className="button-ghost" onClick={() => { setSelected(null); setSubmitted(false); }}><RotateCcw size={15} /> Tentar novamente</button></div>}
    </section>
  );
}
