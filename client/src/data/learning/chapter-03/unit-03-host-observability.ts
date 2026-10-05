import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

export const chapter03Unit03HostObservability: LearningUnit = {
  id: "c3u3-host-observability",
  title: "Unidade 3 — Host: recursos, integridade e processos",
  summary: "Use CPU, memória, disco, integridade de arquivos e comportamento de processos como evidência, sem confundir sintoma operacional com comprometimento.",
  lessons: [
    lesson({
      id: "c3l13-cpu-processes", number: 13, title: "CPU e processos: sintoma versus causa", duration: 13,
      objective: "Usar consumo de CPU como gatilho de investigação, correlacionando processo, horário e baseline.",
      bridge: "A rede mostrou sinais externos; agora entre no host e pergunte qual processo está consumindo recursos e por quê.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t13-cpu-processes", title: "CPU e processos: sintoma versus causa", section: "System Resources — Processor Consumption and Monitoring", pages: "135",
        terms: [["CPU Utilization", "Utilização de CPU"], ["Process", "Processo"], ["Baseline", "Linha de base"], ["Spike", "Pico"], ["Resource Exhaustion", "Esgotamento de recursos"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "CPU alta não é sinônimo de malware. Pode ser workload legítimo, bug, atualização, mineração indevida, loop ou DoS. O processo e o contexto transformam a métrica em evidência."),
          b("technical", "technical", "Como funciona tecnicamente", "Compare utilização atual com baseline, identifique PID/processo, parent, usuário, command line, assinatura e conexões. Um pico curto durante tarefa conhecida é diferente de consumo sustentado por processo inesperado."),
          b("soc", "soc", "Visão de SOC", "No SOC, preserve um snapshot dos processos e horário antes de matar a tarefa. Encerrar primeiro pode remover contexto importante."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["host=app01 cpu=96% pid=4312 process=java.exe user=svc-app baseline_cpu=28%"]),
          b("exam", "exam", "Importante para a CySA+", "A prova costuma cobrar o melhor próximo dado, não a conclusão mais dramática."),
          b("remember", "remember", "Gatilho de decisão", "Não. É um indicador operacional; processo, baseline e contexto determinam a hipótese.")
        ],
        practiceIds: ["c3p13-cpu-processes"]
      })],
    }),
    lesson({
      id: "c3l14-memory-thresholds", number: 14, title: "Memória, thresholds e falsos sinais", duration: 14,
      objective: "Interpretar consumo de memória e thresholds sem confundir mensagens operacionais com exploração.",
      bridge: "Assim como CPU, memória exige baseline e entendimento do que o sistema operacional está reportando.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t14-memory-thresholds", title: "Memória, thresholds e falsos sinais", section: "System Resources — Memory Consumption and Monitoring", pages: "135",
        terms: [["Memory Utilization", "Utilização de memória"], ["Threshold", "Limite de alerta"], ["Out of Memory", "Esgotamento de memória"], ["Buffer Overflow", "Buffer overflow"], ["Alert Level", "Nível de alerta"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Thresholds transformam consumo em alertas graduais: por exemplo, aviso antes do estado crítico. Um rótulo 'buffer overflow' em determinado contexto operacional pode significar espaço insuficiente e não necessariamente exploração."),
          b("technical", "technical", "Como funciona tecnicamente", "Observe processo, working set/resident memory, tendência, swap/pagefile e eventos do sistema. Crescimento contínuo pode indicar leak; pico súbito pode acompanhar workload ou execução anômala."),
          b("soc", "soc", "Visão de SOC", "Use thresholds diferentes para aviso e emergência e documente o baseline por tipo de servidor."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["host=db01 mem=82% threshold_warning=80% threshold_critical=92% process=postgres"]),
          b("exam", "exam", "Importante para a CySA+", "O nome de um erro não basta. O contexto do log e o comportamento do processo importam."),
          b("remember", "remember", "Gatilho de decisão", "Alertar antes de degradação/esgotamento com base no comportamento esperado do sistema.")
        ],
        practiceIds: ["c3p14-memory-thresholds"]
      })],
    }),
    lesson({
      id: "c3l15-disk-fim", number: 15, title: "Disco e File Integrity Monitoring", duration: 15,
      objective: "Combinar monitoramento de capacidade e mudanças de arquivo para detectar indisponibilidade e alteração inesperada.",
      bridge: "Depois de CPU e memória, examine o estado persistente: espaço em disco e arquivos alterados.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t15-disk-fim", title: "Disco e File Integrity Monitoring", section: "Drive Capacity Consumption and Monitoring; Filesystem Changes and Anomalies", pages: "136",
        terms: [["Disk Capacity", "Capacidade de disco"], ["File Integrity Monitoring (FIM)", "Monitoramento de integridade de arquivos"], ["Checksum", "Checksum"], ["Wazuh", "Wazuh"], ["Tripwire", "Tripwire"], ["AIDE", "AIDE"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Disco cheio pode derrubar serviços, impedir logging e corromper operações. FIM observa criação, alteração, exclusão, permissões, owner e hash para detectar mudanças relevantes."),
          b("technical", "technical", "Como funciona tecnicamente", "Ferramentas como Wazuh, Tripwire e AIDE geram muitos eventos se o baseline não considerar patching e arquivos voláteis. O valor vem de escopo, criticidade do caminho e correlação com change management."),
          b("soc", "soc", "Visão de SOC", "Priorize arquivos executáveis, configurações e áreas sensíveis. Confirme janela de mudança antes de classificar um hash alterado como incidente."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["fim host=linux01 path=/etc/ssh/sshd_config action=modified old_sha256=aaa new_sha256=bbb ticket=CHG-991"]),
          b("exam", "exam", "Importante para a CySA+", "Uma mudança de arquivo é um indicador; known-good e ticket de mudança são os principais pivôs."),
          b("remember", "remember", "Gatilho de decisão", "Qual arquivo, quando, como (hash/atributos), em qual host e se havia mudança autorizada.")
        ],
        practiceIds: ["c3p15-disk-fim"]
      })],
    }),
    lesson({
      id: "c3l16-windows-monitoring", number: 16, title: "Windows: resmon, perfmon e Sysinternals", duration: 16,
      objective: "Escolher entre visão rápida de recursos e coleta detalhada de contadores no Windows.",
      bridge: "Agora transforme métricas abstratas em ferramentas concretas de investigação no endpoint Windows.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t16-windows-monitoring", title: "Windows: resmon, perfmon e Sysinternals", section: "System Resource Monitoring Tools — Windows", pages: "136–138",
        terms: [["Resource Monitor", "Monitor de Recursos"], ["resmon", "resmon"], ["Performance Monitor", "Monitor de Desempenho"], ["perfmon", "perfmon"], ["Sysinternals", "Sysinternals"], ["Counter", "Contador"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Resource Monitor/resmon é ótimo para visão rápida de CPU, memória, disco e rede, inclusive processos com atividade de rede. Perfmon coleta contadores detalhados e históricos. Sysinternals amplia a visibilidade sobre processos, conexões e autoruns."),
          b("technical", "technical", "Como funciona tecnicamente", "Use resmon para triagem rápida; perfmon para tendência/diagnóstico; ferramentas Sysinternals conforme a pergunta investigativa. Preserve evidência e evite executar utilitários desconhecidos em produção sem procedimento."),
          b("soc", "soc", "Visão de SOC", "Escolha a ferramenta pela granularidade e duração da pergunta."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["tool=perfmon counters=Processor:%ProcessorTime,PhysicalDisk:AvgDiskQueueLength interval=5s"]),
          b("exam", "exam", "Importante para a CySA+", "Se o cenário pede histórico de contadores detalhados, perfmon é mais adequado que resmon."),
          b("remember", "remember", "Gatilho de decisão", "resmon = visão rápida por recurso/processo; perfmon = contadores detalhados e acompanhamento.")
        ],
        practiceIds: ["c3p16-windows-monitoring"]
      })],
    }),
    lesson({
      id: "c3l17-linux-monitoring", number: 17, title: "Linux: ps, top, df e w", duration: 17,
      objective: "Relacionar cada comando Linux à pergunta operacional correta.",
      bridge: "No Linux, ferramentas simples e quase universais resolvem grande parte da triagem inicial.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t17-linux-monitoring", title: "Linux: ps, top, df e w", section: "System Resource Monitoring Tools — Linux", pages: "138–139",
        terms: [["ps", "ps"], ["top", "top"], ["df", "df"], ["w", "w"], ["Process Table", "Tabela de processos"], ["Filesystem Usage", "Uso de filesystem"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "`ps` mostra processos e atributos; `top` oferece visão interativa de CPU/memória; `df` mostra uso de filesystem; `w` mostra usuários logados e atividade básica."),
          b("technical", "technical", "Como funciona tecnicamente", "Comece com a pergunta: 'quem está consumindo?', 'o disco encheu?' ou 'quem está conectado?'. Depois aprofunde com logs e ferramentas do ambiente."),
          b("soc", "soc", "Visão de SOC", "Em incidentes, capture saída com timestamp e hostname para preservar contexto."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["$ df -h /var", "/dev/sda2  50G  47G  3G  95% /var", "$ w", "20:14  up 19 days,  2 users"]),
          b("exam", "exam", "Importante para a CySA+", "Questões de prova costumam mapear uma necessidade simples ao comando certo."),
          b("remember", "remember", "Gatilho de decisão", "Mostrar usuários logados e informações da sessão/atividade, ajudando a contextualizar processos e horários.")
        ],
        practiceIds: ["c3p17-linux-monitoring"]
      })],
    }),
    lesson({
      id: "c3l18-unauthorized-software-process", number: 18, title: "Software não autorizado, processos e exfiltração", duration: 12,
      objective: "Investigar software/processos suspeitos usando origem, assinatura, caminho, árvore de processos e rede.",
      bridge: "Nem todo binário perigoso tem nome estranho; atacantes também abusam de ferramentas legítimas e nomes parecidos com processos do sistema.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t18-unauthorized-software-process", title: "Software não autorizado, processos e exfiltração", section: "Malware, Malicious Processes, and Unauthorized Software; Data Exfiltration", pages: "139–141",
        terms: [["Unauthorized Software", "Software não autorizado"], ["EDR", "Endpoint Detection and Response"], ["Application Allowlist", "Lista de aplicações permitidas"], ["Blocklist", "Lista de bloqueio"], ["Masquerading", "Mascaramento"], ["Living off the Land", "Uso abusivo de ferramentas legítimas"], ["Exfiltration", "Exfiltração"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "AV/antimalware busca ameaças conhecidas, EDR correlaciona comportamento, allowlisting restringe execução ao permitido e gestão central mostra software instalado. Processo legítimo em caminho errado, parent incomum ou conexão inesperada merece atenção."),
          b("technical", "technical", "Como funciona tecnicamente", "Valide hash/assinatura, caminho, command line, parent/children, usuário e conexões. Para exfiltração, conecte o processo a volume, destino e classificação do dado."),
          b("soc", "soc", "Visão de SOC", "Não bloqueie utilitário administrativo apenas pelo nome. O mesmo executável pode ser legítimo ou abusado."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["edr host=ws22 process=powershell.exe parent=winword.exe user=lucas dst=198.51.100.19 action=connect"]),
          b("exam", "exam", "Importante para a CySA+", "O contexto do processo é mais forte que o nome isolado."),
          b("remember", "remember", "Gatilho de decisão", "Caminho/assinatura, árvore de processos e comportamento de rede/ações.")
        ],
        practiceIds: ["c3p18-unauthorized-software-process"]
      })],
    })
  ],
};
