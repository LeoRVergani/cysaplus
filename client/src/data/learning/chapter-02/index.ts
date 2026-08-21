import type { ChapterCheckpoint, ChapterLearningPath, CoverageItem, LearningUnit, VisualSpec } from "../types";
import { chapter02Flashcards } from "./flashcards";
import { chapter02Labs } from "./labs";
import { chapter02Practices } from "./practices";
import { chapter02Questions } from "./questions";
import { chapter02Unit01Infrastructure } from "./unit-01-infrastructure";
import { chapter02Unit02OperatingSystems } from "./unit-02-operating-systems";
import { chapter02Unit03Logging } from "./unit-03-logging";
import { chapter02Unit04NetworkArchitecture } from "./unit-04-network-architecture";
import { chapter02Unit05Iam } from "./unit-05-iam";
import { chapter02Unit06FederationPrivileged } from "./unit-06-federation-privileged";
import { chapter02Unit07DataProtection } from "./unit-07-data-protection";

const units: LearningUnit[] = [
  chapter02Unit01Infrastructure,
  chapter02Unit02OperatingSystems,
  chapter02Unit03Logging,
  chapter02Unit04NetworkArchitecture,
  chapter02Unit05Iam,
  chapter02Unit06FederationPrivileged,
  chapter02Unit07DataProtection,
];

const chapterMapVisual: VisualSpec = {
  id: "v-chapter-map",
  title: "Mapa mental do Capítulo 2",
  type: "flow",
  alt: "Mapa que conecta infraestrutura, sistemas operacionais, logging, rede, identidade, federação e proteção de dados",
  caption: "O capítulo progride do lugar onde o workload executa para o sistema operacional e logs, passa por arquitetura de rede e identidade, e termina com confiança criptográfica e proteção de dados.",
  nodes: ["Infrastructure", "Operating Systems", "Logging", "Network Architecture", "IAM", "Federation / PAM", "PKI / DLP"],
};

const visualCandidates = [chapterMapVisual, ...units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.topics.flatMap((topic) => topic.visual ? [topic.visual] : [])))];
const visuals = visualCandidates.filter((visual, index, all) => all.findIndex((candidate) => candidate.id === visual.id) === index);

const coverage: CoverageItem[] = [];
let coverageIndex = 1;
for (const unit of units) {
  for (const lesson of unit.lessons) {
    for (const currentTopic of lesson.topics) {
      const matchingQuestions = chapter02Questions.filter((question) => question.topicId === currentTopic.id).map((question) => question.id);
      const atomicItems = currentTopic.termPairs.length > 0 ? currentTopic.termPairs : [{ english: currentTopic.title, portuguese: currentTopic.title }];
      for (const term of atomicItems) {
        coverage.push({
          id: `C2-${String(coverageIndex++).padStart(3, "0")}`,
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
  title: "Da arquitetura à evidência e ao controle de acesso",
  summary: [
    "Serverless/FaaS, VMs e containers mudam a camada administrada pelo time; a investigação precisa começar identificando onde o workload realmente executa.",
    "Hardening reduz attack surface por patching, remoção do desnecessário, controle administrativo, logging, Secure Boot e criptografia; benchmarks precisam ser testados antes de virar baseline.",
    "Registry, locais de configuração, processos de sistema e arquitetura x86/ARM dão contexto ao host e ajudam a distinguir comportamento esperado de masquerading e execução incompatível.",
    "Logs só são correlacionáveis quando possuem contexto e relógios alinhados; NTP, níveis 0–7, integridade, centralização e retenção determinam a qualidade da evidência.",
    "On-premises, cloud e hybrid têm fronteiras de responsabilidade diferentes. Segmentação, VPN, SDN, Zero Trust e SASE reorganizam como tráfego e confiança são controlados.",
    "IAM separa identity, authentication, authorization e accounting. MFA exige fatores distintos; passwordless não é automaticamente MFA; SSO concentra conveniência e risco.",
    "Federação conecta IdP e SP por trust, assertions e tokens. SAML, AD FS, OAuth e OpenID Connect têm papéis diferentes; PAM e CASB tratam privilégio e uso de cloud.",
    "PKI organiza confiança por CA/RA/certificados; revogação encerra confiança antes do vencimento. TLS inspection recupera visibilidade com trade-offs e DLP protege PII/CHD durante todo o ciclo do dado.",
  ],
  essentialTerms: [
    "FaaS", "Virtualization", "Containerization", "Docker", "Kubernetes", "CIS Benchmark", "Windows Registry", "HKLM", "HKCU", "NTP", "Logging Level 7",
    "IDS", "IPS", "SaaS", "PaaS", "IaaS", "VPC", "Air Gap", "VLAN", "VPN", "SDN", "SD-WAN", "Zero Trust", "SASE",
    "AAA", "MFA", "Passwordless", "SSO", "Federation", "IDP", "SP/RP", "SAML", "AD FS", "OAuth", "OpenID Connect", "PAM", "CASB",
    "PKI", "CA", "RA", "CSR", "CRL", "TLS Inspection", "DLP", "PII", "CHD", "PAN", "CVV",
  ],
  commonMistakes: [
    "Achar que serverless significa ausência de servidores ou que o cliente não possui mais responsabilidade de segurança.",
    "Confundir container com VM e esquecer que containers compartilham o host/kernel em muitos modelos.",
    "Aplicar benchmark de hardening cegamente sem testar impacto e sem documentar exceções.",
    "Confiar no nome de um processo sem validar caminho, parent, assinatura e comportamento.",
    "Ordenar logs de fontes diferentes sem conferir timezone, clock drift e NTP.",
    "Usar nível Debugging permanentemente como se mais volume significasse melhor detecção.",
    "Tratar air gap, VPN ou Zero Trust como soluções mágicas que eliminam a necessidade de monitoramento e least privilege.",
    "Confundir Authentication com Authorization ou contar senha + PIN como dois fatores distintos.",
    "Tratar OAuth como protocolo de autenticação e esquecer que OpenID Connect adiciona a camada de identidade.",
    "Confiar em token federado válido como prova de que o usuário real está agindo legitimamente.",
    "Confundir CA e RA ou esperar a expiração natural de um certificado cuja chave foi comprometida.",
    "Achar que TLS inspection só tem benefícios; o intermediário torna-se um ponto de alta sensibilidade e confiança.",
  ],
  flashcards: chapter02Flashcards,
  miniQuizIds: chapter02Questions.slice(0, 14).map((question) => question.id),
  questionIds: chapter02Questions.map((question) => question.id),
  practiceIds: chapter02Practices.map((practice) => practice.id),
};

export const chapterTwoCompleteLearningPath: ChapterLearningPath = {
  chapterId: "chapter-02-complete-v1",
  chapterNumber: 2,
  moduleId: "m2",
  title: "Capítulo 2 — Arquitetura de Sistemas e Redes",
  intro: "Curso autoral em português brasileiro baseado na cobertura integral do Capítulo 2 do Study Guide CS0-003. A trilha ensina infraestrutura, sistemas operacionais, logging, arquitetura de rede, IAM, federação, PKI e proteção de dados com visão de SOC e prática progressiva.",
  units,
  visuals,
  practices: chapter02Practices,
  labs: chapter02Labs,
  questions: chapter02Questions,
  checkpoint,
  coverage,
};
