/**
 * Renderizadores pedagógicos reutilizáveis do Atlas de Incidentes.
 * O conteúdo é autoral e transforma conceitos do capítulo em explicações, cenários e visuais.
 */
import type { LearningBlock as LearningBlockData, VisualSpec } from "@/data/learning";
import {
  AlertTriangle,
  BookOpenText,
  Brain,
  CheckCircle2,
  GitBranch,
  Lightbulb,
  ListChecks,
  Network,
  Radar,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const blockMeta = {
  simple: { label: "EXPLICAÇÃO SIMPLES", Icon: Lightbulb },
  analogy: { label: "ANALOGIA", Icon: Sparkles },
  technical: { label: "COMO FUNCIONA", Icon: BookOpenText },
  comparison: { label: "COMPARE", Icon: Scale },
  soc: { label: "VISÃO DE SOC", Icon: Radar },
  evidence: { label: "EVIDÊNCIA", Icon: Network },
  exam: { label: "IMPORTANTE PARA O CySA+", Icon: Target },
  mistake: { label: "ERRO COMUM", Icon: AlertTriangle },
  remember: { label: "O QUE LEVAR DESTA AULA", Icon: Brain },
  steps: { label: "PASSO A PASSO", Icon: ListChecks },
  scenario: { label: "CENÁRIO", Icon: ShieldCheck },
  note: { label: "NOTA DIDÁTICA", Icon: CheckCircle2 },
  complement: { label: "COMPLEMENTO DIDÁTICO", Icon: GitBranch },
} satisfies Record<LearningBlockData["kind"], { label: string; Icon: typeof Lightbulb }>;

export function LearningBlock({ block }: { block: LearningBlockData }) {
  const { label, Icon } = blockMeta[block.kind];
  return (
    <section className={`learning-block block-${block.kind}`}>
      <div className="learning-block-label"><Icon size={15} /><span>{label}</span></div>
      <h4>{block.title}</h4>
      <p>{block.body}</p>
      {block.items && block.items.length > 0 && (
        <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
      )}
      {block.evidence && block.evidence.length > 0 && (
        <div className="learning-block-evidence" aria-label="Exemplo de evidência sintética">
          {block.evidence.map((line) => <code key={line}>{line}</code>)}
        </div>
      )}
    </section>
  );
}

function RiskMatrix() {
  const cells = [
    ["Médio", "Alto", "Alto"],
    ["Baixo", "Médio", "Alto"],
    ["Baixo", "Baixo", "Médio"],
  ];
  return (
    <div className="risk-matrix" role="img" aria-label="Matriz qualitativa de risco: probabilidade e impacto baixo, médio e alto">
      <div className="risk-axis risk-y">PROBABILIDADE</div>
      <div className="risk-grid">
        <span className="risk-empty" />
        <b>Baixo</b><b>Médio</b><b>Alto</b>
        {["Alta", "Média", "Baixa"].map((row, rowIndex) => (
          <div className="risk-row" key={row}>
            <b>{row}</b>
            {cells[rowIndex].map((value, colIndex) => <span key={`${row}-${colIndex}`} data-risk={value.toLowerCase()}>{value}</span>)}
          </div>
        ))}
      </div>
      <div className="risk-axis risk-x">IMPACTO</div>
    </div>
  );
}

function NetworkDiagram({ visual }: { visual: VisualSpec }) {
  return (
    <div className="network-diagram" role="img" aria-label={visual.alt}>
      {visual.nodes.map((node, index) => (
        <div className="network-step" key={`${visual.id}-${node}`}>
          <span>{String(index + 1).padStart(2, "0")}</span><strong>{node}</strong>
          {index < visual.nodes.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

function CardsDiagram({ visual }: { visual: VisualSpec }) {
  return (
    <div className="learning-cards-diagram" role="img" aria-label={visual.alt}>
      {visual.nodes.map((node, index) => {
        const [title, detail] = node.split(" — ");
        return <article key={`${visual.id}-${node}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong>{detail && <p>{detail}</p>}</article>;
      })}
    </div>
  );
}

function TimelineDiagram({ visual }: { visual: VisualSpec }) {
  return (
    <ol className="learning-timeline" aria-label={visual.alt}>
      {visual.nodes.map((node, index) => <li key={`${visual.id}-${node}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node}</strong></li>)}
    </ol>
  );
}

export function LearningVisual({ visual }: { visual: VisualSpec }) {
  const content = visual.type === "matrix"
    ? <RiskMatrix />
    : visual.type === "cards" || visual.type === "comparison"
      ? <CardsDiagram visual={visual} />
      : visual.type === "timeline"
        ? <TimelineDiagram visual={visual} />
        : <NetworkDiagram visual={visual} />;

  return (
    <figure className={`learning-visual visual-${visual.type}`}>
      <div className="learning-visual-top"><div><span>VISUAL DIDÁTICO ORIGINAL</span><h4>{visual.title}</h4></div><GitBranch size={19} /></div>
      {content}
      <figcaption>{visual.caption}</figcaption>
    </figure>
  );
}
