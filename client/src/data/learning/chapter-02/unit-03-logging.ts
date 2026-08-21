import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const ntpVisual = v(
  "c2v-ntp-correlation",
  "Relógios alinhados, linha do tempo confiável",
  "timeline",
  "Três fontes de log sincronizadas por NTP formando uma linha do tempo coerente",
  "A correlação só faz sentido quando timestamps representam a mesma referência temporal. NTP reduz o risco de ordenar eventos de forma errada.",
  ["NTP source", "Firewall 10:01:05", "EDR 10:01:19", "Server 10:01:22", "SIEM correlation"],
);

const levelsVisual = v(
  "c2v-log-levels",
  "Níveis de logging: severidade x volume",
  "cards",
  "Cartões dos níveis Cisco 0 a 7 com severidade decrescente e detalhe crescente",
  "Nível numérico maior normalmente captura mais detalhe. Debugging pode ser útil por pouco tempo, mas gera muito volume para operação normal.",
  ["0 Emergencies", "1 Alerts", "2 Critical", "3 Errors", "4 Warning", "5 Notifications", "6 Information", "7 Debugging"],
);

const loggingPipeline = v(
  "c2v-log-pipeline",
  "Da fonte ao uso investigativo",
  "flow",
  "Fluxo de fonte, sincronização, coleta, proteção, centralização, retenção e análise",
  "Log útil precisa ter contexto, chegar ao destino, permanecer íntegro e estar disponível pelo período necessário.",
  ["Fonte", "Timestamp/NTP", "Ingestão", "Proteção", "Centralização", "Retenção", "Correlação/Alerta"],
);

export const chapter02Unit03Logging: LearningUnit = {
  id: "c2u3-logging",
  title: "Unidade 3 — Logging, timestamps e ingestão",
  summary: "Transforme logs de linhas isoladas em evidência correlacionável: tempo correto, nível adequado, centralização, integridade e retenção.",
  lessons: [
    lesson({
      id: "c2l13-log-ingestion", number: 13, title: "O que torna um log útil para o SOC", duration: 15,
      objective: "Entender log ingestion como cadeia de coleta e contexto, não apenas envio de texto ao SIEM.",
      bridge: "Depois de entender hosts e processos, precisamos garantir que suas ações deixem registros utilizáveis.",
      examFocus: ["log ingestion", "logging", "context"],
      topics: [topic({
        id: "c2t13-log-ingestion", title: "Registrar, transportar e interpretar", section: "Logging, Logs, and Log Ingestion", pages: "89–91",
        terms: [["Logging", "Registro de eventos"], ["Log Ingestion", "Ingestão de logs"], ["Log Source", "Fonte de log"], ["Context", "Contexto"]],
        blocks: [
          b("simple", "simple", "Log é uma peça de evidência, não a investigação inteira", "Um log registra algo que uma fonte observou. Para ser útil, precisa informar o que aconteceu, quando, em qual ativo/serviço e, quando possível, qual identidade ou origem esteve envolvida."),
          b("technical", "technical", "Ingestão", "Ingestão é o processo de receber registros de múltiplas fontes, transportá-los, armazená-los e torná-los pesquisáveis/correlacionáveis. Perdas no caminho, parsing ruim ou campos sem significado podem inutilizar a fonte mesmo que o arquivo original exista."),
          b("soc", "soc", "Perguntas de qualidade", "Ao integrar uma fonte, valide se os campos necessários realmente chegam.", ["Timestamp está correto e normalizado?", "Host e serviço são identificáveis?", "Usuário/origem/destino aparecem quando relevantes?", "Existe event/action/result?", "A fonte continua enviando eventos regularmente?"]),
          b("evidence", "evidence", "Mesmo evento, contextos diferentes", "A segunda linha é muito mais útil porque permite correlação e decisão.", undefined, ["login failed", "ts=2026-08-21T10:03:11-03:00 host=VPN-01 user=ana src=198.51.100.22 result=failed reason=bad-password"]),
          b("exam", "exam", "CySA+", "O capítulo enfatiza especialmente sincronização temporal e logging levels, mas boas práticas de coleta explicam por que esses elementos têm impacto operacional."),
        ],
        visual: loggingPipeline,
        practiceIds: ["c2p13-log-ingestion"],
      })],
    }),
    lesson({
      id: "c2l14-time-sync", number: 14, title: "NTP e correlação temporal", duration: 18,
      objective: "Explicar como relógios desalinhados distorcem linha do tempo e como NTP sustenta correlação.",
      bridge: "Antes de comparar fontes, precisamos garantir que ‘10:01’ signifique praticamente o mesmo instante em todas elas.",
      examFocus: ["time synchronization", "NTP", "correlation"],
      topics: [topic({
        id: "c2t14-time-sync", title: "Sem tempo confiável, causalidade vira suposição", section: "Logging, Logs, and Log Ingestion — Time Synchronization", pages: "89–90",
        terms: [["Time Synchronization", "Sincronização de tempo"], ["Network Time Protocol (NTP)", "Protocolo de tempo de rede"], ["Timestamp", "Marca de tempo"], ["Clock Drift", "Deriva do relógio"]],
        blocks: [
          b("simple", "simple", "O problema", "Se firewall, EDR e servidor discordam sobre o horário, um evento posterior pode parecer ter ocorrido antes da causa. Isso muda hipóteses, prioridade e até a conclusão de uma investigação."),
          b("analogy", "analogy", "Câmeras com relógios diferentes", "Três câmeras filmam o mesmo corredor, mas cada uma está alguns minutos adiantada ou atrasada. Sem corrigir os relógios, reconstruir quem passou primeiro pode ficar impossível."),
          b("technical", "technical", "NTP", "NTP e servidores de tempo mantêm relógios alinhados. O controle deve ser revisado antes de incidentes; descobrir somente durante uma investigação que metade dos ativos está fora de hora aumenta incerteza e retrabalho."),
          b("scenario", "scenario", "Exemplo", "Firewall mostra conexão às 10:01, EDR processo às 10:06 e servidor login às 10:04. Se o EDR estiver +5 minutos adiantado, o processo pode ter ocorrido perto de 10:01. A primeira tarefa é normalizar o tempo antes de ordenar os fatos."),
          b("soc", "soc", "O que registrar", "Além do timestamp, registre timezone/offset, fonte de tempo e qualquer desvio conhecido. Em SIEM, normalize para uma referência consistente, preservando o original quando possível."),
          b("exam", "exam", "CySA+", "Se a pergunta descreve eventos fora de ordem entre sistemas, sincronização/NTP deve aparecer cedo na hipótese."),
        ],
        visual: ntpVisual,
        practiceIds: ["c2p14-time-sync"],
      })],
    }),
    lesson({
      id: "c2l15-log-levels", number: 15, title: "Logging levels 0–7", duration: 17,
      objective: "Reconhecer os níveis Cisco-like e decidir o equilíbrio entre evidência e volume.",
      bridge: "Com relógios alinhados, a próxima pergunta é: estamos registrando detalhe suficiente — ou detalhe demais?",
      examFocus: ["logging levels", "0-7", "debugging"],
      topics: [topic({
        id: "c2t15-log-levels", title: "Severidade e quantidade de eventos", section: "Logging, Logs, and Log Ingestion — Logging Levels; Table 2.2", pages: "90",
        terms: [["0 Emergencies", "Emergências"], ["1 Alerts", "Alertas"], ["2 Critical", "Crítico"], ["3 Errors", "Erros"], ["4 Warning", "Aviso"], ["5 Notifications", "Notificações"], ["6 Information", "Informação"], ["7 Debugging", "Depuração"]],
        blocks: [
          b("simple", "simple", "Como ler a escala", "Na convenção mostrada no capítulo, 0 representa eventos extremamente graves; números maiores incluem mensagens progressivamente mais detalhadas até 7/Debugging."),
          b("comparison", "comparison", "A tabela que vale reconhecer", "Use os nomes como referência operacional.", ["0 — Emergencies: falha extrema/indisponibilidade", "1 — Alerts: condição que exige ação imediata", "2 — Critical: falha crítica", "3 — Errors: erro operacional", "4 — Warning: aviso", "5 — Notifications: evento relevante de estado", "6 — Information: informação operacional", "7 — Debugging: detalhe para diagnóstico"]),
          b("technical", "technical", "Por que nível 7 não é ‘melhor’", "Debugging pode aumentar drasticamente eventos, armazenamento e ruído. Durante troubleshooting, esse detalhe é útil; em operação contínua, pode esconder o que importa e elevar custo."),
          b("soc", "soc", "Decisão de configuração", "Defina logging level de acordo com risco, caso de uso e capacidade de retenção. Depois valide se alertas críticos realmente aparecem e se eventos de baixo valor não dominam a ingestão."),
          b("mistake", "mistake", "Mais logs ≠ mais visibilidade útil", "Visibilidade depende de qualidade, contexto e capacidade de análise. Um milhão de mensagens debug sem campos relevantes pode ser pior que um conjunto menor e bem estruturado."),
          b("exam", "exam", "CySA+", "Para troubleshooting detalhado, 7/Debugging é o nível da tabela. Para operação, procure equilíbrio e não assuma que máximo detalhe é sempre adequado."),
        ],
        visual: levelsVisual,
        practiceIds: ["c2p15-log-levels"],
      })],
    }),
    lesson({
      id: "c2l16-logging-best-practices", number: 16, title: "Integridade, centralização e retenção", duration: 19,
      objective: "Aplicar as considerações gerais do capítulo para construir uma fonte de log confiável.",
      bridge: "NTP e nível certo não resolvem nada se o log puder ser alterado, desaparecer ou nunca chegar ao ponto de análise.",
      examFocus: ["centralized logging", "integrity", "retention", "monitoring"],
      topics: [topic({
        id: "c2t16-logging-best-practices", title: "Log confiável precisa sobreviver ao incidente", section: "Logging, Logs, and Log Ingestion — General Logging Considerations", pages: "91",
        terms: [["Centralized Logging", "Logging centralizado"], ["Log Integrity", "Integridade do log"], ["Log Retention", "Retenção de logs"], ["Validation", "Validação"]],
        blocks: [
          b("simple", "simple", "O que um programa de logging precisa garantir", "Logs precisam ter significado, ser protegidos contra alteração, chegar a um local central, ser verificados e permanecer disponíveis pelo tempo apropriado."),
          b("technical", "technical", "Sete verificações úteis", "As práticas do capítulo viram um checklist operacional.", ["Conteúdo com significado e contexto", "Proteção contra alteração", "Centralização para análise", "Validação de que os campos necessários existem", "Monitorar fontes que deveriam enviar e pararam", "Evitar informação desnecessária", "Definir política de retenção adequada"]),
          b("scenario", "scenario", "Atacante apaga logs locais", "Se o host comprometido é a única cópia, a investigação perde evidência. Se eventos já foram enviados a um syslog/SIEM protegido, o apagamento local tem efeito menor sobre a reconstrução."),
          b("soc", "soc", "Alerta de ‘silêncio’ também é sinal", "Uma fonte crítica que para de enviar logs deve ser monitorada como problema operacional ou potencial tentativa de evasão. Ausência de telemetria é uma condição que merece tratamento."),
          b("exam", "exam", "CySA+", "Quando a pergunta pede controle compensatório para perda/apagamento de logs locais, centralização remota costuma ser mais relevante que apenas rotação local."),
        ],
        visual: loggingPipeline,
        practiceIds: ["c2p16-logging-best"],
      })],
    }),
  ],
};
