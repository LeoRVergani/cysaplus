import type { ChapterCheckpoint, ChapterLearningPath, CoverageItem, LearningUnit, VisualSpec } from "../types";
import { chapter01Flashcards } from "./flashcards";
import { chapter01Labs } from "./labs";
import { chapter01Practices } from "./practices";
import { chapter01Questions } from "./questions";
import { unit01Foundations } from "./unit-01-foundations";
import { unit02Risk } from "./unit-02-risk";
import { unit03Network } from "./unit-03-network";
import { unit04Endpoint } from "./unit-04-endpoint";
import { unit05Pentest } from "./unit-05-pentest";
import { unit06Reverse } from "./unit-06-reverse";
import { unit07Operations } from "./unit-07-operations";

const units: LearningUnit[] = [unit01Foundations, unit02Risk, unit03Network, unit04Endpoint, unit05Pentest, unit06Reverse, unit07Operations];

const chapterMapVisual: VisualSpec = {
  id: "v-chapter-map",
  title: "Mapa mental do Capítulo 1",
  type: "flow",
  alt: "Mapa mental que conecta objetivos de segurança, risco, controles, validação e automação",
  caption: "A lógica do capítulo progride de objetivos e risco para controles de rede/endpoint, validação por pentest/reverse engineering e eficiência operacional por automação.",
  nodes: ["CIA + Privacy", "Threat / Vulnerability / Risk", "Network Controls", "Endpoint Controls", "Pentest", "Reverse Engineering", "SOAR / Automation"],
};

const visuals = [chapterMapVisual, ...units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.topics.flatMap((topic) => topic.visual ? [topic.visual] : [])))];

const coverage: CoverageItem[] = [];
let coverageIndex = 1;
for (const unit of units) {
  for (const lesson of unit.lessons) {
    for (const currentTopic of lesson.topics) {
      const matchingQuestions = chapter01Questions.filter((question) => question.topicId === currentTopic.id).map((question) => question.id);
      const atomicItems = currentTopic.termPairs.length > 0 ? currentTopic.termPairs : [{ english: currentTopic.title, portuguese: currentTopic.title }];
      for (const term of atomicItems) {
        coverage.push({
          id: `C1-${String(coverageIndex++).padStart(3, "0")}`,
          concept: `${term.english} — ${term.portuguese}`,
          pdfPages: currentTopic.source.pdfPages,
          section: currentTopic.source.section,
          unitId: unit.id,
          lessonId: lesson.id,
          topicIds: [currentTopic.id],
          practiceIds: currentTopic.practiceIds,
          questionIds: matchingQuestions,
          status: "validated",
        });
      }
    }
  }
}

const checkpoint: ChapterCheckpoint = {
  title: "Do objetivo de segurança à decisão operacional",
  summary: [
    "Use CIA Triad para identificar o objetivo afetado e Privacy para avaliar também coleta, uso e compartilhamento de PII.",
    "Separe Threat, Vulnerability, Likelihood e Impact antes de classificar Risk e escolher Acceptance, Avoidance, Mitigation ou Transference.",
    "NAC/802.1X controla admissão; firewall/DMZ/segmentação controlam caminhos entre zonas; deception aumenta observabilidade.",
    "Hardening, patching, GPO e software de endpoint reduzem superfície e mantêm postura; compensating controls cobrem exceções temporárias.",
    "Pentest autorizado segue Planning, Discovery, Attack e Reporting; Red, Blue e White Team treinam ataque, defesa e coordenação.",
    "Reverse engineering, sandboxing e hashing ajudam a entender comportamento e integridade sem presumir malícia apenas por um indicador.",
    "Padronização e SOAR automatizam trabalho repetível; APIs, webhooks e enriquecimento devem preservar critérios e julgamento humano quando o impacto é alto.",
  ],
  essentialTerms: [
    "CIA Triad", "PII", "GAPP", "Threat", "Vulnerability", "Risk", "Likelihood", "Impact", "NIST SP 800-30",
    "NAC", "802.1X", "Supplicant", "Authenticator", "RADIUS", "Quarantine", "ACL", "DMZ", "Default Deny", "WAF",
    "Jump Box", "DNS Sinkhole", "Hardening", "Patch Management", "Compensating Control", "GPO", "MAC", "DAC",
    "Penetration Testing", "Red Team", "Blue Team", "White Team", "Sandbox", "Code Detonation", "SHA", "SOAR", "API", "Webhook", "Single Pane of Glass",
  ],
  commonMistakes: [
    "Confundir Threat com Vulnerability ou transformar Risk em uma fórmula numérica rígida.",
    "Tratar Privacy como sinônimo de Security e esquecer finalidade, consentimento e uso de PII.",
    "Confundir Supplicant, Authenticator e RADIUS no fluxo 802.1X.",
    "Interpretar firewall deny como prova de comprometimento em vez de tentativa bloqueada.",
    "Supor que porta conhecida prova qual aplicação está sendo executada.",
    "Pensar que compensating control remove necessariamente a vulnerabilidade original.",
    "Executar ou propor pentest fora de autorização e escopo.",
    "Concluir que hash diferente significa malware ou que hash igual significa arquivo seguro.",
    "Automatizar contenção disruptiva sem considerar confiança, criticidade, reversibilidade e autoridade.",
  ],
  flashcards: chapter01Flashcards,
  miniQuizIds: chapter01Questions.slice(0, 12).map((question) => question.id),
  questionIds: chapter01Questions.map((question) => question.id),
  practiceIds: chapter01Practices.map((practice) => practice.id),
};

export const chapterOneCompleteLearningPath: ChapterLearningPath = {
  chapterId: "chapter-01-complete-v2",
  chapterNumber: 1,
  moduleId: "m1",
  title: "Capítulo 1 — O Analista de Cibersegurança de Hoje",
  intro: "Curso autoral em português brasileiro baseado na cobertura do Capítulo 1 do Study Guide CS0-003. A sequência parte de conceitos para iniciantes e avança para decisão de SOC, prática, revisão e raciocínio de prova, sem reproduzir o texto original do livro.",
  units,
  visuals,
  practices: chapter01Practices,
  labs: chapter01Labs,
  questions: chapter01Questions,
  checkpoint,
  coverage,
};
