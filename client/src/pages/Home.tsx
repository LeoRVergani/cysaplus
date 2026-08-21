/**
 * Atlas de Incidentes — mesa de investigação responsiva.
 * Superfícies grafite, sinais Sinal Lúcido e navegação por prioridades de estudo.
 */
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  FileText,
  Flame,
  Gauge,
  Layers3,
  Menu,
  Network,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset,
  X,
} from "lucide-react";
import {
  courseModules,
  dailyPlan,
  flashcards,
  labs,
  logScenarios,
  pbq,
  questions,
  type StudyModule,
  type StudyQuestion,
} from "@/data/course";
import { glossary, glossaryCategories } from "@/data/glossary";
import { moduleExtensions } from "@/data/study-extensions";
import { getLearningPathByModuleId } from "@/data/learning";
import { ChapterLearningProgram } from "@/components/learning/ChapterLearningProgram";

type View = "Visão geral" | "Curso" | "Praticar" | "Laboratório" | "Revisar" | "Simulado" | "Glossário";
type QuestionRecord = { id: string; correct: boolean; confidence: number; at: number };

const navItems: { label: View; icon: typeof Activity; short: string }[] = [
  { label: "Visão geral", icon: Gauge, short: "01" },
  { label: "Curso", icon: BookOpen, short: "02" },
  { label: "Praticar", icon: CircleHelp, short: "03" },
  { label: "Laboratório", icon: Network, short: "04" },
  { label: "Revisar", icon: BrainCircuit, short: "05" },
  { label: "Simulado", icon: ClipboardCheck, short: "06" },
  { label: "Glossário", icon: Search, short: "07" },
];

const domains = [
  { name: "Operações de Segurança", ids: ["m1", "m2", "m3", "m4", "m5"], color: "lime", state: "EVIDÊNCIA", sector: "SETOR I" },
  { name: "Vulnerabilidades", ids: ["m6", "m7", "m8"], color: "blue", state: "ORIENTAÇÃO", sector: "SETOR II" },
  { name: "Resposta a Incidentes", ids: ["m9", "m10", "m11"], color: "coral", state: "ATENÇÃO", sector: "SETOR III" },
  { name: "Relatórios & Forense", ids: ["m12", "m13"], color: "slate", state: "ARQUIVO", sector: "SETOR IV" },
];

const socCompetencies = [
  { code: "LOG-01", title: "Ler logs de identidade", detail: "Relacionar usuário, MFA, dispositivo, origem e recurso antes de concluir comprometimento.", moduleId: "m10", state: "Praticar" },
  { code: "NET-02", title: "Interpretar telemetria de rede", detail: "Usar protocolo, porta, origem, destino, volume e tempo como contexto de investigação.", moduleId: "m2", state: "Praticar" },
  { code: "VULN-03", title: "Priorizar por risco contextual", detail: "Combinar ativo, exposição, exploração, controle e impacto em vez de usar apenas pontuação técnica.", moduleId: "m8", state: "Praticar" },
  { code: "IR-04", title: "Triagear e escalar incidentes", detail: "Separar fato, hipótese, escopo e próximo responsável com confiança explícita.", moduleId: "m10", state: "Praticar" },
  { code: "IR-05", title: "Conter e recuperar com segurança", detail: "Escolher a menor ação proporcional, preservar evidência e validar o retorno ao serviço.", moduleId: "m11", state: "Estudar" },
  { code: "FOR-06", title: "Preservar evidência", detail: "Aplicar ordem de volatilidade, cadeia de custódia, hash e cópia de trabalho em um cenário autorizado.", moduleId: "m13", state: "Praticar" },
  { code: "COM-07", title: "Comunicar para cada público", detail: "Transformar o mesmo caso em briefing executivo, atualização operacional e ticket técnico.", moduleId: "m12", state: "Revisar" },
];

const portReference = [
  { service: "DNS", port: "53 TCP/UDP", signal: "Consulta, resposta, processo e destino" },
  { service: "HTTP/HTTPS", port: "80/443 TCP", signal: "Host, método, status, certificado e volume" },
  { service: "SSH", port: "22 TCP", signal: "Conta, origem, falhas, sucesso e sessão" },
  { service: "RDP", port: "3389 TCP", signal: "Dispositivo, MFA, login, privilégio e horário" },
  { service: "SMB", port: "445 TCP", signal: "Compartilhamento, conta, origem e lateralidade" },
  { service: "LDAP/LDAPS", port: "389/636 TCP", signal: "Bind, consulta, grupo e diretório" },
  { service: "NTP", port: "123 UDP", signal: "Desvio de tempo e confiança da linha do tempo" },
  { service: "SMTP", port: "25/465/587 TCP", signal: "Remetente, autenticação, anexo e reputação" },
];

function getToday() {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" })
    .format(new Date())
    .replace(".", "")
    .toUpperCase();
}

function formatTime(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function markQuestionLabel(question: StudyQuestion) {
  return question.format === "Cenário" ? "CENÁRIO" : "CONCEITO";
}

function AppMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`app-mark ${small ? "app-mark-small" : ""}`} aria-hidden="true">
      <ShieldCheck size={small ? 20 : 24} strokeWidth={1.7} />
    </div>
  );
}

function SignalTag({ children, tone = "lime" }: { children: React.ReactNode; tone?: "lime" | "coral" | "blue" | "slate" }) {
  return <span className={`signal-tag signal-${tone}`}>{children}</span>;
}

function LearningDiagram({ module }: { module: StudyModule }) {
  const nodes = module.domain.includes("Vulner")
    ? ["Ativo", "Evidência", "Prioridade", "Verificação"]
    : module.domain.includes("Resposta")
      ? ["Sinal", "Contexto", "Decisão", "Registro"]
      : module.domain.includes("Relatórios")
        ? ["Fato", "Confiança", "Público", "Ação"]
        : ["Fonte", "Telemetria", "Hipótese", "Decisão"];

  return <section className="learning-diagram" aria-label={`Mapa visual de estudo para ${module.title}`}>
    <div className="diagram-header"><SignalTag tone="blue">MAPA DIDÁTICO</SignalTag><span>do conceito à decisão</span></div>
    <div className="diagram-track">{nodes.map((node, index) => <div className="diagram-node" key={node}><span>0{index + 1}</span><strong>{node}</strong></div>)}</div>
  </section>;
}

function MetricCard({ label, value, note, icon: Icon, tone = "lime", code }: { label: string; value: string; note: string; icon: typeof Gauge; tone?: "lime" | "coral" | "blue"; code: string }) {
  return (
    <article className="metric-card">
      <span className="metric-code">{code}</span>
      <div className={`metric-icon metric-${tone}`}><Icon size={18} /></div>
      <p className="eyebrow">{label}</p>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}

function QuestionPanel({
  question,
  selected,
  submitted,
  onSelect,
  onSubmit,
  onNext,
  compact = false,
}: {
  question: StudyQuestion;
  selected: number | null;
  submitted: boolean;
  onSelect: (index: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  compact?: boolean;
}) {
  return (
    <article className={`question-panel ${compact ? "question-compact" : ""}`}>
      <div className="question-meta">
        <SignalTag tone="blue">{markQuestionLabel(question)}</SignalTag>
        <span>{question.domain}</span>
        <span>·</span>
        <span>{question.difficulty}</span>
      </div>
      {question.scenario && <div className="scenario-box">{question.scenario}</div>}
      <h2>{question.prompt}</h2>
      <div className="answer-list" role="radiogroup" aria-label="Alternativas da questão">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = index === question.answerIndex;
          const resultClass = submitted ? (isCorrect ? "answer-correct" : isSelected ? "answer-wrong" : "") : isSelected ? "answer-selected" : "";
          return (
            <button key={option} className={`answer-option ${resultClass}`} onClick={() => !submitted && onSelect(index)} role="radio" aria-checked={isSelected}>
              <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
              <span>{option}</span>
              {submitted && isCorrect && <CheckCircle2 size={18} />}
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <button className="button-primary" onClick={onSubmit} disabled={selected === null}>
          {compact ? "Registrar e avançar" : "Conferir resposta"} <ArrowRight size={17} />
        </button>
      ) : (
        <div className="question-feedback">
          <div className={selected === question.answerIndex ? "feedback-title success" : "feedback-title danger"}>
            {selected === question.answerIndex ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            {selected === question.answerIndex ? "Raciocínio confirmado" : "Revise o critério de decisão"}
          </div>
          <p>{question.explanation}</p>
          <p className="trap-note"><strong>Armadilha comum:</strong> {question.trap}</p>
          <button className="button-secondary" onClick={onNext}>Próxima questão <ArrowRight size={16} /></button>
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<View>("Visão geral");
  const [menuOpen, setMenuOpen] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [questionRecords, setQuestionRecords] = useState<QuestionRecord[]>([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceSelected, setPracticeSelected] = useState<number | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [confidence, setConfidence] = useState(3);
  const [selectedModule, setSelectedModule] = useState<StudyModule | null>(null);
  const [selectedLog, setSelectedLog] = useState(logScenarios[0].id);
  const [showLogNote, setShowLogNote] = useState(false);
  const [selectedLab, setSelectedLab] = useState(labs[0].id);
  const [showLabSolution, setShowLabSolution] = useState(false);
  const [pbqOrder, setPbqOrder] = useState<string[]>([...pbq.correctOrder].sort(() => 0.5 - Math.random()));
  const [pbqResult, setPbqResult] = useState<"idle" | "correct" | "retry">("idle");
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<string[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examIndex, setExamIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examSeconds, setExamSeconds] = useState(35 * 60);
  const [glossaryQuery, setGlossaryQuery] = useState("");
  const [glossaryCategory, setGlossaryCategory] = useState("Todos");

  useEffect(() => {
    const storedCompleted = window.localStorage.getItem("cysa-completed");
    const storedRecords = window.localStorage.getItem("cysa-records");
    const storedCards = window.localStorage.getItem("cysa-reviewed-cards");
    if (storedCompleted) setCompleted(JSON.parse(storedCompleted));
    if (storedRecords) setQuestionRecords(JSON.parse(storedRecords));
    if (storedCards) setReviewedCards(JSON.parse(storedCards));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const moduleId = params.get("module");
    if (params.get("view") !== "course" || !moduleId) return;
    const module = courseModules.find((candidate) => candidate.id === moduleId);
    if (module) {
      setActiveView("Curso");
      setSelectedModule(module);
    }
  }, []);

  useEffect(() => window.localStorage.setItem("cysa-completed", JSON.stringify(completed)), [completed]);
  useEffect(() => window.localStorage.setItem("cysa-records", JSON.stringify(questionRecords)), [questionRecords]);
  useEffect(() => window.localStorage.setItem("cysa-reviewed-cards", JSON.stringify(reviewedCards)), [reviewedCards]);

  useEffect(() => {
    if (!examStarted || examSubmitted || examSeconds <= 0) return;
    const timer = window.setInterval(() => setExamSeconds((seconds) => seconds - 1), 1000);
    return () => window.clearInterval(timer);
  }, [examStarted, examSubmitted, examSeconds]);

  const coverage = Math.round((completed.length / courseModules.length) * 100);
  const answered = questionRecords.length;
  const correctCount = questionRecords.filter((record) => record.correct).length;
  const accuracy = answered ? Math.round((correctCount / answered) * 100) : 0;
  const currentQuestion = questions[practiceIndex % questions.length];
  const currentLog = logScenarios.find((scenario) => scenario.id === selectedLog) ?? logScenarios[0];
  const currentLab = labs.find((lab) => lab.id === selectedLab) ?? labs[0];
  const nextModule = courseModules.find((module) => !completed.includes(module.id)) ?? courseModules[0];
  const examQueue = questions.slice(0, 10);
  const examQuestion = examQueue[examIndex];
  const examScore = examQueue.reduce((score, question) => score + (examAnswers[question.id] === question.answerIndex ? 1 : 0), 0);
  const selectedExtension = selectedModule ? moduleExtensions[selectedModule.id] : undefined;
  const selectedLearningPath = selectedModule ? getLearningPathByModuleId(selectedModule.id) : undefined;
  const filteredGlossary = glossary.filter((entry) => {
    const matchesCategory = glossaryCategory === "Todos" || entry.category === glossaryCategory;
    const query = glossaryQuery.trim().toLocaleLowerCase("pt-BR");
    const matchesQuery = !query || [entry.term, entry.full, entry.definition, entry.socUse].join(" ").toLocaleLowerCase("pt-BR").includes(query);
    return matchesCategory && matchesQuery;
  });

  const domainMetrics = useMemo(
    () => domains.map((domain) => {
      const done = domain.ids.filter((id) => completed.includes(id)).length;
      const records = questionRecords.filter((record) => {
        const question = questions.find((item) => item.id === record.id);
        return question && domain.ids.includes(question.moduleId);
      });
      const rate = records.length ? Math.round((records.filter((item) => item.correct).length / records.length) * 100) : null;
      return { ...domain, done, total: domain.ids.length, rate };
    }),
    [completed, questionRecords],
  );

  const setView = (view: View) => {
    setActiveView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleModule = (moduleId: string) => {
    setCompleted((items) => items.includes(moduleId) ? items.filter((id) => id !== moduleId) : [...items, moduleId]);
  };

  const submitPractice = () => {
    if (practiceSelected === null) return;
    setPracticeSubmitted(true);
    setQuestionRecords((records) => [...records.filter((record) => record.id !== currentQuestion.id), { id: currentQuestion.id, correct: practiceSelected === currentQuestion.answerIndex, confidence, at: Date.now() }]);
  };

  const nextPractice = () => {
    setPracticeIndex((index) => (index + 1) % questions.length);
    setPracticeSelected(null);
    setPracticeSubmitted(false);
    setConfidence(3);
  };

  const recordCard = (quality: "again" | "good") => {
    const card = flashcards[cardIndex % flashcards.length];
    if (quality === "good") setReviewedCards((cards) => Array.from(new Set([...cards, card.id])));
    setCardIndex((index) => (index + 1) % flashcards.length);
    setCardFlipped(false);
  };

  const movePbq = (index: number, direction: -1 | 1) => {
    setPbqResult("idle");
    setPbqOrder((items) => {
      const target = index + direction;
      if (target < 0 || target >= items.length) return items;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const checkPbq = () => setPbqResult(pbqOrder.join("|") === pbq.correctOrder.join("|") ? "correct" : "retry");

  const startExam = () => {
    setExamStarted(true);
    setExamIndex(0);
    setExamAnswers({});
    setExamSubmitted(false);
    setExamSeconds(35 * 60);
  };

  const submitExam = () => {
    setExamSubmitted(true);
    setQuestionRecords((records) => [
      ...records.filter((record) => !examQueue.some((question) => question.id === record.id)),
      ...examQueue.filter((question) => examAnswers[question.id] !== undefined).map((question) => ({ id: question.id, correct: examAnswers[question.id] === question.answerIndex, confidence: 3, at: Date.now() })),
    ]);
  };

  return (
    <div className="atlas-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-brand">
            <AppMark />
            <div>
              <span className="brand-overline">CENTRAL DE ESTUDO</span>
              <strong>CySA+<em>/</em> Estudo BR</strong>
              <span className="brand-coordinate">ATLAS BR-01 · SINAL LÚCIDO</span>
            </div>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X size={19} /></button>
        </div>
        <div className="sidebar-rail-label"><span>ROTAS</span><i /></div>
        <nav className="main-nav" aria-label="Navegação principal">
          {navItems.map(({ label, icon: Icon, short }) => (
            <button key={label} className={`nav-link ${activeView === label ? "nav-active" : ""}`} onClick={() => setView(label)}>
              <span className="nav-index">{short}</span><Icon size={18} /><span>{label}</span><ChevronRight size={15} />
            </button>
          ))}
        </nav>
        <div className="sidebar-case-index">
          <div className="sidebar-rail-label"><span>ÍNDICE DO CASO</span><i /></div>
          <div className="case-row"><span className="case-reticle" />SETOR ATUAL <strong>{nextModule.code}</strong></div>
          <div className="case-row"><span className="case-route" />ROTA <strong>{completed.length}/{courseModules.length}</strong></div>
          <div className="case-row"><span className="case-pin" />SINAL <strong>LOCAL</strong></div>
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-signal"><span className="pulse-dot" />Modo local ativo</div>
          <p>Seu progresso permanece neste navegador.</p>
        </div>
      </aside>

      {menuOpen && <button className="mobile-scrim" onClick={() => setMenuOpen(false)} aria-label="Fechar navegação" />}

      <main className="main-workspace">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu size={21} /></button>
          <div className="crumbs"><span>ATLAS</span><ChevronRight size={14} /><strong>{activeView}</strong></div>
          <div className="topbar-actions">
            <span className="date-stamp">{getToday()}</span>
            <button className="reset-link" onClick={() => { localStorage.clear(); window.location.reload(); }}><RotateCcw size={14} /> reiniciar</button>
          </div>
        </header>

        {activeView === "Visão geral" && (
          <section className="page-content dashboard-page">
            <div className="briefing-hero">
              <div className="hero-scrim" />
              <div className="hero-content">
                <SignalTag>BRIEFING DE HOJE</SignalTag>
                <h1>Investigue o sinal<br /><em>antes que ele vire incidente.</em></h1>
                <p>Uma sequência curta, uma decisão clara e um registro de progresso por vez.</p>
                <div className="hero-actions">
                  <button className="button-primary" onClick={() => setView("Curso")}><Play size={16} fill="currentColor" /> Iniciar rota</button>
                  <button className="hero-link" onClick={() => setView("Laboratório")}>Abrir laboratório <ArrowRight size={16} /></button>
                </div>
              </div>
              <div className="hero-coordinate"><span>SETOR</span><strong>OPS / {nextModule.code}</strong></div>
            </div>

            <div className="section-heading compact-heading">
              <div><p className="eyebrow">LEITURA OPERACIONAL</p><h2>Seu painel de situação</h2></div>
              <span className="status-live"><i /> Atualização local</span>
            </div>
            <div className="metrics-grid">
              <MetricCard code="COV-01" label="Cobertura do curso" value={`${coverage}%`} note={`${completed.length} de ${courseModules.length} módulos concluídos`} icon={Layers3} />
              <MetricCard code="PRAT-02" label="Questões respondidas" value={`${answered}`} note={answered ? `${accuracy}% de acerto observado` : "Nenhuma resposta registrada ainda"} icon={CircleHelp} tone="blue" />
              <MetricCard code="REV-03" label="Revisões concluídas" value={`${reviewedCards.length}`} note={reviewedCards.length ? "Sinais armazenados para reforço" : "Fila pronta para começar"} icon={BrainCircuit} tone="coral" />
              <MetricCard code="ROTA-04" label="Próximo setor" value={nextModule.code} note={nextModule.title} icon={Network} />
            </div>

            <div className="dashboard-split">
              <article className="panel daily-panel">
                <div className="panel-head"><div><p className="eyebrow">ROTA DIÁRIA</p><h2>Uma sessão que cabe na rotina</h2></div><span className="mono">60 MIN</span></div>
                <div className="study-route">
                  {dailyPlan.map((step, index) => (
                    <button className="route-step" key={step.id} onClick={() => setView(step.label === "Aprender" ? "Curso" : step.label === "Praticar" ? "Praticar" : "Revisar")}>
                      <span className="route-index">0{index + 1}</span><div><strong>{step.label}</strong><p>{step.description}</p></div><span className="route-time">{step.minutes}m</span><ArrowRight size={16} />
                    </button>
                  ))}
                </div>
              </article>
              <article className="panel next-action-panel">
                <div className="panel-head"><div><p className="eyebrow">AÇÃO RECOMENDADA</p><h2>Continue a rota</h2></div><Sparkles size={20} /></div>
                <div className="next-module-code">{nextModule.code}</div><div className="next-evidence"><i /> ROTA ATIVA · BASE + CONTEXTO</div>
                <h3>{nextModule.title}</h3>
                <p>{nextModule.overview}</p>
                <button className="button-primary full-width" onClick={() => { setSelectedModule(nextModule); setView("Curso"); }}>Abrir módulo <ArrowRight size={16} /></button>
              </article>
            </div>

            <div className="section-heading"><div><p className="eyebrow">COBERTURA POR DOMÍNIO</p><h2>Mapa de domínio observado</h2></div><button className="text-button" onClick={() => setView("Curso")}>Ver todos os módulos <ArrowRight size={15} /></button></div>
            <div className="domain-grid">
              {domainMetrics.map((domain) => {
                const percent = Math.round((domain.done / domain.total) * 100);
                return <article className={`domain-card domain-${domain.color}`} key={domain.name}>
                  <div className="domain-card-head"><div><span className="domain-dot" /><p>{domain.name}</p></div><div className="domain-marker"><span>{domain.sector}</span><span>{domain.state}</span></div></div>
                  <strong>{percent}%</strong>
                  <div className="domain-bar"><i style={{ width: `${percent}%` }} /></div>
                  <footer><span>{domain.done}/{domain.total} módulos</span><span>{domain.rate === null ? "Aguardando prática" : `${domain.rate}% observado`}</span></footer>
                </article>;
              })}
            </div>

            <div className="dashboard-split bottom-split">
              <article className="panel signal-panel">
                <div className="panel-head"><div><p className="eyebrow">FILA DE SINAIS</p><h2>O que precisa de atenção</h2></div><AlertTriangle size={20} /></div>
                <div className="signal-list">
                  <button onClick={() => setView("Praticar")}><span className="signal-bullet signal-lime" /><div><strong>{answered ? "Mantenha a prática distribuída" : "Nenhuma questão registrada"}</strong><p>{answered ? "Continue registrando confiança para priorizar revisão." : "Resolva a primeira questão para iniciar suas métricas."}</p></div><ChevronRight size={16} /></button>
                  <button onClick={() => setView("Revisar")}><span className="signal-bullet signal-coral" /><div><strong>{reviewedCards.length ? "Revisão em movimento" : "Flashcards aguardando leitura"}</strong><p>{reviewedCards.length ? "Use ‘difícil’ para manter conceitos na fila." : "Comece por termos-chave de operações e identidade."}</p></div><ChevronRight size={16} /></button>
                  <button onClick={() => setView("Laboratório")}><span className="signal-bullet signal-blue" /><div><strong>Laboratório de logs disponível</strong><p>Pratique correlação de identidade, endpoint, rede e nuvem.</p></div><ChevronRight size={16} /></button>
                </div>
              </article>
              <article className="intelligence-card">
                <div className="intelligence-scrim" />
                <div><SignalTag tone="blue">ORIENTAÇÃO</SignalTag><h3>Progresso é evidência, não promessa.</h3><p>O painel mostra cobertura, desempenho observado e próximo passo recomendado. Nenhuma métrica equivale a garantia de aprovação.</p></div>
              </article>
            </div>
          </section>
        )}

        {activeView === "Curso" && (
          <section className="page-content course-page">
            <div className="page-intro"><div><p className="eyebrow">13 MÓDULOS AUTORAIS</p><h1>Mapa do curso</h1><p>Estude por capítulos, conecte conceitos com rotinas de SOC e marque a rota concluída quando terminar.</p></div><div className="course-progress"><span>{coverage}%</span><p>cobertura local</p></div></div>
            {selectedModule ? (
              selectedLearningPath ? (
                <ChapterLearningProgram path={selectedLearningPath} onExit={() => setSelectedModule(null)} />
              ) : (
              <article className="lesson-reader">
                <button className="back-control" onClick={() => setSelectedModule(null)}><ArrowLeft size={16} /> Voltar ao mapa</button>
                <div className="lesson-topline"><SignalTag>{selectedModule.code}</SignalTag><span>CAPÍTULO {selectedModule.chapter}</span><span>{selectedModule.duration} min</span><span>{selectedModule.difficulty}</span></div>
                <h1>{selectedModule.title}</h1><p className="lesson-overview">{selectedModule.overview}</p>
                {selectedExtension && <>
                  <section className="field-summary"><div><p className="eyebrow">RESUMO DE CAMPO</p><h2>O que entender antes de praticar</h2></div><ol>{selectedExtension.summary.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></section>
                  <LearningDiagram module={selectedModule} />
                  <section className="guided-example"><div className="guided-example-head"><div><SignalTag tone="coral">EXEMPLO GUIADO</SignalTag><h2>{selectedExtension.example.title}</h2><p>{selectedExtension.example.context}</p></div><span>FICTÍCIO E DEFENSIVO</span></div><ol>{selectedExtension.example.steps.map((step, index) => <li key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol><footer><strong>Ideia-chave:</strong> {selectedExtension.example.takeaway}</footer></section>
                </>}
                <div className="lesson-grid">
                  <div><p className="eyebrow">OBJETIVOS DA SESSÃO</p><ol className="objective-list">{selectedModule.objectives.map((objective, index) => <li key={objective}><span>0{index + 1}</span>{objective}</li>)}</ol></div>
                  <div className="study-sequence"><p className="eyebrow">ROTA DE INVESTIGAÇÃO</p>{selectedModule.studyRoute.map((step, index) => <div key={step}><b>{index + 1}</b><span>{step}</span></div>)}</div>
                </div>
                <div className="concepts-title"><p className="eyebrow">CONCEITOS PARA O SOC</p><h2>O que levar para a prática</h2></div>
                <div className="concept-grid">{selectedModule.keyConcepts.map((concept) => <article className="concept-card" key={concept.term}><span className="concept-mark">//</span><h3>{concept.term}</h3><p>{concept.definition}</p><footer><strong>Nota de campo:</strong> {concept.fieldNote}</footer></article>)}</div>
                {selectedExtension && <section className="self-check"><div><p className="eyebrow">AUTORREVISÃO</p><h2>Teste sua explicação</h2><p>Responda em voz alta antes de consultar o glossário ou iniciar uma questão.</p></div><ol>{selectedExtension.selfCheck.map((question, index) => <li key={question}><span>0{index + 1}</span>{question}</li>)}</ol><div className="self-check-output"><strong>Entrega prática:</strong> {selectedExtension.practiceOutput}</div></section>}
                <div className="lab-nudge"><Network size={22} /><div><p className="eyebrow">PRÁTICA SEGURA</p><strong>{selectedModule.labHint}</strong></div><button className="button-secondary" onClick={() => setView("Laboratório")}>Ir ao laboratório <ArrowRight size={16} /></button></div>
                <button className={`complete-module ${completed.includes(selectedModule.id) ? "complete-done" : ""}`} onClick={() => toggleModule(selectedModule.id)}>{completed.includes(selectedModule.id) ? <><CheckCircle2 size={18} /> Módulo concluído — desfazer</> : <><Check size={18} /> Marcar módulo como concluído</>}</button>
              </article>
              )
            ) : (
              <div className="module-map">{courseModules.map((module, index) => <article className={`module-card ${completed.includes(module.id) ? "module-complete" : ""}`} key={module.id}>
                <div className="module-card-top"><span className="module-number">{String(module.chapter).padStart(2, "0")}</span><SignalTag tone={module.domain.includes("Vulner") ? "blue" : module.domain.includes("Resposta") ? "coral" : "lime"}>{module.code}</SignalTag></div>
                <p>{module.domain}</p><h2>{module.title}</h2><div className="module-card-footer"><span><Clock3 size={14} />{module.duration} min</span><button onClick={() => setSelectedModule(module)}>{completed.includes(module.id) ? "Rever" : "Abrir"}<ArrowRight size={15} /></button></div>
                {index < courseModules.length - 1 && <i className="module-route" />}
              </article>)}</div>
            )}
          </section>
        )}

        {activeView === "Praticar" && (
          <section className="page-content practice-page">
            <div className="page-intro practice-intro"><div><p className="eyebrow">BANCO AUTORAL</p><h1>Prática orientada a decisão</h1><p>Questões de cenário e conceito, com explicação de raciocínio e registro de confiança.</p></div><div className="practice-counter"><span>{practiceIndex + 1}</span><p>de {questions.length}</p></div></div>
            <div className="practice-layout">
              <aside className="practice-rail"><p className="eyebrow">CONTEXTO</p><h3>Como praticar melhor</h3><p>Leia o cenário, identifique o dado que muda a decisão e só então escolha a alternativa.</p><div className="confidence-box"><p className="eyebrow">SUA CONFIANÇA</p><div className="confidence-dots">{[1, 2, 3, 4, 5].map((level) => <button key={level} className={confidence >= level ? "dot-active" : ""} onClick={() => setConfidence(level)} aria-label={`Confiança ${level} de 5`} />)}</div><span>{confidence <= 2 ? "Baixa: priorizar revisão" : confidence === 3 ? "Moderada: validar conceito" : "Alta: seguir para o próximo"}</span></div><div className="practice-progress"><span>SEQUÊNCIA</span><div><i style={{ width: `${((practiceIndex + 1) / questions.length) * 100}%` }} /></div></div></aside>
              <QuestionPanel question={currentQuestion} selected={practiceSelected} submitted={practiceSubmitted} onSelect={setPracticeSelected} onSubmit={submitPractice} onNext={nextPractice} />
            </div>
          </section>
        )}

        {activeView === "Laboratório" && (
          <section className="page-content lab-page">
            <div className="page-intro"><div><p className="eyebrow">EVIDÊNCIAS SINTÉTICAS</p><h1>Laboratório de investigação</h1><p>Treine triagem, correlação e comunicação com dados fictícios, defensivos e anonimizados.</p></div><SignalTag tone="coral">DADOS SINTÉTICOS</SignalTag></div>
            <div className="lab-hero-strip"><div><p className="eyebrow">PRINCÍPIO DO LAB</p><h2>Observe. Contextualize. Decida. Registre.</h2><p>Nenhum exercício usa dados de clientes ou instrui atividades contra sistemas externos.</p></div></div>
            <div className="lab-tabs">{[...logScenarios, ...labs].map((item) => {
              const isLog = "logs" in item;
              const active = isLog ? selectedLog === item.id : selectedLab === item.id;
              return <button key={item.id} className={active ? "lab-tab-active" : ""} onClick={() => { if (isLog) { setSelectedLog(item.id); setShowLogNote(false); } else { setSelectedLab(item.id); setShowLabSolution(false); } }}><span>{isLog ? "LOG" : "LAB"}</span>{item.title}</button>;
            })}</div>
            <div className="lab-workspace">
              <article className="log-console"><div className="console-top"><div><span className="console-led" /><span className="console-led" /><span className="console-led" /></div><p>evidence://{currentLog.id}</p><span>{currentLog.source}</span></div><div className="console-body">{currentLog.logs.map((log) => <code key={log}>{log}</code>)}</div></article>
              <aside className="lab-brief"><SignalTag tone={currentLog.severity === "Alta" ? "coral" : "blue"}>SEVERIDADE {currentLog.severity.toUpperCase()}</SignalTag><h2>{currentLog.title}</h2><p>{currentLog.objective}</p><div className="prompt-list">{currentLog.prompts.map((prompt, index) => <div key={prompt}><span>0{index + 1}</span>{prompt}</div>)}</div><button className="button-primary full-width" onClick={() => setShowLogNote((show) => !show)}>{showLogNote ? "Ocultar orientação" : "Comparar com orientação"}<ChevronRight size={16} /></button>{showLogNote && <div className="analyst-note"><strong>Nota do analista</strong><p>{currentLog.analystNote}</p></div>}</aside>
            </div>
            <div className="section-heading"><div><p className="eyebrow">LABORATÓRIOS GUIADOS</p><h2>Cenários por procedimento</h2></div></div>
            <article className="guided-lab"><div className="guided-lab-head"><div><SignalTag tone="blue">{currentLab.difficulty}</SignalTag><h2>{currentLab.title}</h2><p>{currentLab.scenario}</p></div><span><Clock3 size={16} /> {currentLab.duration} min</span></div><div className="guided-lab-grid"><div><p className="eyebrow">EVIDÊNCIAS</p>{currentLab.evidence.map((evidence) => <code key={evidence}>{evidence}</code>)}</div><div><p className="eyebrow">MISSÃO</p><ol>{currentLab.tasks.map((task) => <li key={task}>{task}</li>)}</ol></div></div><button className="button-secondary" onClick={() => setShowLabSolution((show) => !show)}>{showLabSolution ? "Ocultar gabarito guiado" : "Verificar linha de raciocínio"}<ArrowRight size={16} /></button>{showLabSolution && <div className="lab-solution"><strong>Raciocínio esperado</strong><p>{currentLab.solution}</p></div>}</article>
            <article className="pbq-card"><div><p className="eyebrow">PBQ SIMULADA</p><h2>{pbq.title}</h2><p>{pbq.scenario}</p></div><div className="pbq-order">{pbqOrder.map((step, index) => <div key={step} className="pbq-step"><span>{index + 1}</span><p>{step}</p><div><button onClick={() => movePbq(index, -1)} aria-label="Mover etapa para cima">↑</button><button onClick={() => movePbq(index, 1)} aria-label="Mover etapa para baixo">↓</button></div></div>)}</div><button className="button-primary" onClick={checkPbq}>Validar sequência <Check size={16} /></button>{pbqResult !== "idle" && <p className={`pbq-result ${pbqResult}`}>{pbqResult === "correct" ? "Sequência consistente. A resposta inicial preserva evidências e organiza decisões." : "Ainda há etapas fora da ordem. Pense em preservar, contextualizar e escalar antes de aplicar uma contenção."}</p>}</article>
          </section>
        )}

        {activeView === "Revisar" && (
          <section className="page-content review-page">
            <div className="page-intro"><div><p className="eyebrow">REPETIÇÃO INTENCIONAL</p><h1>Fila de revisão</h1><p>Use a autoavaliação para destacar conceitos que precisam voltar mais cedo ao seu radar.</p></div><div className="review-count"><BrainCircuit size={22} /><strong>{reviewedCards.length}</strong><span>marcados como compreendidos</span></div></div>
            <div className="flashcard-layout"><div className="flashcard-rail"><p className="eyebrow">CICLO DIÁRIO</p><h2>Recupere, não apenas releia.</h2><p>Antes de virar o cartão, tente explicar o conceito e um caso de uso de SOC com suas próprias palavras.</p><div className="flashcard-meter"><span>{(cardIndex % flashcards.length) + 1}</span><i /> <span>{flashcards.length}</span></div></div><button className={`flashcard ${cardFlipped ? "card-flipped" : ""}`} onClick={() => setCardFlipped((flipped) => !flipped)} aria-label="Virar flashcard"><div className="flashcard-front"><SignalTag>PERGUNTA</SignalTag><h2>{flashcards[cardIndex % flashcards.length].front}</h2><p>Toque para revelar</p></div><div className="flashcard-back"><SignalTag tone="blue">RESPOSTA</SignalTag><h2>{flashcards[cardIndex % flashcards.length].back}</h2><p>{flashcards[cardIndex % flashcards.length].hint}</p></div></button></div>
            <div className="flash-actions"><button className="button-ghost" onClick={() => recordCard("again")}><TimerReset size={17} /> Difícil — revisar logo</button><button className="button-primary" onClick={() => recordCard("good")}><Check size={17} /> Entendi — seguir</button></div>
          </section>
        )}

        {activeView === "Glossário" && (
          <section className="page-content glossary-page">
            <div className="page-intro"><div><p className="eyebrow">REFERÊNCIA OPERACIONAL</p><h1>Glossário SOC</h1><p>Consulte siglas, portas, protocolos, telemetria, vulnerabilidades, resposta a incidentes e governança pelo contexto de uso defensivo.</p></div><SignalTag tone="blue">{glossary.length} TERMOS</SignalTag></div>
            <section className="glossary-control-panel"><label className="glossary-search"><Search size={18} /><input value={glossaryQuery} onChange={(event) => setGlossaryQuery(event.target.value)} placeholder="Buscar por sigla, termo ou conceito" aria-label="Buscar no Glossário SOC" /></label><div className="glossary-filters"><button className={glossaryCategory === "Todos" ? "filter-active" : ""} onClick={() => setGlossaryCategory("Todos")}>Todos</button>{glossaryCategories.map((category) => <button key={category.id} className={glossaryCategory === category.id ? "filter-active" : ""} onClick={() => setGlossaryCategory(category.id)}>{category.label}</button>)}</div></section>
            <section className="glossary-guidance"><div><SignalTag>{glossaryCategory === "Todos" ? "CONSULTA CONTEXTUAL" : glossaryCategory.toUpperCase()}</SignalTag><h2>{glossaryCategory === "Todos" ? "Termos para entender antes de decidir" : glossaryCategories.find((category) => category.id === glossaryCategory)?.label}</h2></div><p>{glossaryCategory === "Todos" ? "Use a busca para sair da definição isolada e encontrar o termo no contexto de logs, triagem, risco, resposta e comunicação." : glossaryCategories.find((category) => category.id === glossaryCategory)?.guidance}</p></section>
            <section className="competency-section"><div className="section-heading compact-heading"><div><p className="eyebrow">CHECKLIST DE COMPETÊNCIAS</p><h2>O que um analista SOC precisa praticar</h2></div><span className="mono">7 FRENTES</span></div><div className="competency-grid">{socCompetencies.map((competency) => <article className="competency-card" key={competency.code}><header><span>{competency.code}</span><SignalTag tone={competency.state === "Revisar" ? "coral" : competency.state === "Estudar" ? "blue" : "lime"}>{competency.state}</SignalTag></header><h3>{competency.title}</h3><p>{competency.detail}</p><button onClick={() => { const target = courseModules.find((module) => module.id === competency.moduleId); if (target) { setSelectedModule(target); setView("Curso"); } }}>Ver prática associada <ArrowRight size={15} /></button></article>)}</div></section>
            <section className="port-reference"><div className="section-heading compact-heading"><div><p className="eyebrow">REFERÊNCIA RÁPIDA</p><h2>Portas e protocolos para interpretar logs</h2></div><button className="text-button" onClick={() => setGlossaryCategory("Redes")}>Ver termos de redes <ArrowRight size={15} /></button></div><div className="port-grid">{portReference.map((item) => <article key={item.service}><div><strong>{item.service}</strong><span>{item.port}</span></div><p>{item.signal}</p></article>)}</div></section>
            <p className="glossary-count">{filteredGlossary.length} {filteredGlossary.length === 1 ? "resultado" : "resultados"} encontrados</p>
            <div className="glossary-grid">{filteredGlossary.map((entry) => <article className="glossary-card" key={entry.term}><div><SignalTag tone={entry.category === "Incidentes" ? "coral" : entry.category === "SOC" || entry.category === "Redes" ? "blue" : "lime"}>{entry.category}</SignalTag><h2>{entry.term}</h2><p className="glossary-full">{entry.full}</p></div><p>{entry.definition}</p><div className="glossary-soc-use"><strong>No SOC:</strong> {entry.socUse}</div><footer><span>{entry.modules.map((moduleId) => courseModules.find((module) => module.id === moduleId)?.code).filter(Boolean).join(" · ")}</span><button onClick={() => { const target = courseModules.find((module) => entry.modules.includes(module.id)); if (target) { setSelectedModule(target); setView("Curso"); } }}>Abrir módulo <ArrowRight size={14} /></button></footer></article>)}</div>
            {!filteredGlossary.length && <div className="glossary-empty"><Search size={22} /><h2>Nenhum termo encontrado</h2><p>Tente uma sigla como “SIEM”, um protocolo como “DNS” ou uma área como “cadeia de custódia”.</p></div>}
          </section>
        )}

        {activeView === "Simulado" && (
          <section className="page-content exam-page">
            <div className="page-intro"><div><p className="eyebrow">SIMULADO RÁPIDO</p><h1>Teste sua tomada de decisão</h1><p>Dez questões autorais, tempo configurado para treino e relatório local ao final.</p></div><SignalTag tone="coral">SEM PROMESSAS</SignalTag></div>
            {!examStarted ? <div className="exam-launch"><div><span className="exam-ordinal">10</span><p>questões autorais</p></div><div><span className="exam-ordinal">35</span><p>minutos sugeridos</p></div><div><span className="exam-ordinal">4</span><p>domínios do curso</p></div><button className="button-primary" onClick={startExam}><Play size={17} fill="currentColor" /> Iniciar simulado</button></div> : examSubmitted ? <div className="exam-result"><SignalTag tone={examScore >= 7 ? "lime" : "coral"}>RESULTADO LOCAL</SignalTag><h2>{examScore} / {examQueue.length}</h2><p>{examScore >= 7 ? "Boa tendência neste recorte. Revise as explicações das questões erradas para consolidar o raciocínio." : "Use o resultado como sinal de estudo: retorne às explicações e aos módulos associados antes de repetir."}</p><div className="result-bar"><i style={{ width: `${(examScore / examQueue.length) * 100}%` }} /></div><div className="result-actions"><button className="button-secondary" onClick={() => setView("Praticar")}>Praticar pontos fracos <ArrowRight size={16} /></button><button className="button-primary" onClick={startExam}>Tentar novamente <RotateCcw size={16} /></button></div></div> : <div className="exam-running"><header><div><SignalTag tone="blue">QUESTÃO {examIndex + 1} / {examQueue.length}</SignalTag><p>{examQuestion.domain}</p></div><strong><Clock3 size={18} />{formatTime(examSeconds)}</strong></header><QuestionPanel question={examQuestion} selected={examAnswers[examQuestion.id] ?? null} submitted={false} onSelect={(index) => setExamAnswers((answers) => ({ ...answers, [examQuestion.id]: index }))} onSubmit={() => setExamIndex((index) => index < examQueue.length - 1 ? index + 1 : index)} onNext={() => setExamIndex((index) => index < examQueue.length - 1 ? index + 1 : index)} compact /><footer><button className="button-ghost" onClick={() => setExamIndex((index) => Math.max(0, index - 1))} disabled={examIndex === 0}><ArrowLeft size={16} /> Anterior</button><div className="exam-dots">{examQueue.map((question, index) => <button key={question.id} className={`${index === examIndex ? "exam-dot-active" : ""} ${examAnswers[question.id] !== undefined ? "exam-dot-done" : ""}`} onClick={() => setExamIndex(index)} aria-label={`Ir para questão ${index + 1}`}>{index + 1}</button>)}</div><button className="button-primary" onClick={examIndex === examQueue.length - 1 ? submitExam : () => setExamIndex((index) => index + 1)}>{examIndex === examQueue.length - 1 ? "Finalizar" : "Próxima"}<ArrowRight size={16} /></button></footer></div>}
          </section>
        )}
      </main>
    </div>
  );
}
