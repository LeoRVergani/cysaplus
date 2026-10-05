import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

export const chapter03Unit01NetworkVisibility: LearningUnit = {
  id: "c3u1-network-visibility",
  title: "Unidade 1 — Visibilidade de rede e sinais iniciais",
  summary: "Construa a base de observabilidade: diferencie evento, alerta e incidente; escolha entre flows, monitoramento ativo e passivo; e reconheça consumo, exfiltração e beaconing.",
  lessons: [
    lesson({
      id: "c3l01-event-alert-incident", number: 1, title: "Evento, alerta e incidente", duration: 13,
      objective: "Distinguir observação, notificação e incidente confirmado sem escalar conclusões cedo demais.",
      bridge: "O Capítulo 2 mostrou onde a telemetria nasce; agora você aprende a transformar essa telemetria em sinais investigáveis.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t01-event-alert-incident", title: "Evento, alerta e incidente", section: "Chapter 3 introduction; Analyzing Network Events", pages: "121–122",
        terms: [["Event", "Evento"], ["Alert", "Alerta"], ["Incident", "Incidente"], ["Indicator", "Indicador"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Evento é algo observável; alerta é uma notificação gerada por uma regra ou condição; incidente é uma ocorrência que viola política ou causa/ameaça causar dano."),
          b("technical", "technical", "Como funciona tecnicamente", "A taxonomia exata varia por organização. O ponto operacional é preservar o fato observado e registrar o critério que fez um evento virar alerta ou incidente."),
          b("soc", "soc", "Visão de SOC", "Ao triar, registre fonte, horário, ativo, usuário, ação e resultado. Depois declare explicitamente o estado: evento, alerta em investigação ou incidente confirmado."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["2026-10-05T13:00:02Z auth user=ana result=fail source=203.0.113.18", "2026-10-05T13:00:40Z siem rule=10-fails-5m severity=medium"]),
          b("exam", "exam", "Importante para a CySA+", "A prova tende a apresentar um sinal isolado e perguntar o que ele permite concluir. Prefira a resposta que preserva evidência e evita afirmar comprometimento sem correlação."),
          b("remember", "remember", "Gatilho de decisão", "Evento é observação; alerta é notificação sobre uma condição; incidente é uma ocorrência de segurança confirmada ou tratada como tal pela política.")
        ],
        practiceIds: ["c3p01-event-alert-incident"]
      })],
    }),
    lesson({
      id: "c3l02-flows-router", number: 2, title: "Flows e monitoramento por roteadores", duration: 14,
      objective: "Explicar o que flows resumem, o que SNMP mostra e por que ambos são úteis para uma visão ampla de rede.",
      bridge: "Antes de interpretar tráfego suspeito, você precisa saber qual tipo de evidência cada fonte realmente entrega.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t02-flows-router", title: "Flows e monitoramento por roteadores", section: "Capturing Network-Related Events — Router-Based Monitoring", pages: "123–125",
        terms: [["Network Flow", "Fluxo de rede"], ["NetFlow", "NetFlow"], ["sFlow", "sFlow"], ["J-Flow", "J-Flow"], ["Flow Collector", "Coletor de flows"], ["SNMP", "SNMP"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Flows funcionam como uma conta telefônica da rede: mostram quem falou com quem, por quanto tempo e quanto dado circulou, mas normalmente não carregam o conteúdo completo da conversa."),
          b("technical", "technical", "Como funciona tecnicamente", "NetFlow, sFlow e tecnologias equivalentes resumem comunicações por origem, destino, portas, protocolo, bytes e pacotes. SNMP complementa com estado e métricas do dispositivo. Amostragem pode reduzir volume e também perder detalhes."),
          b("soc", "soc", "Visão de SOC", "Use flows para responder rapidamente 'quais hosts falaram com este destino?' e 'houve aumento de bytes?'. Use SNMP para confirmar carga/interface/dispositivo, e então faça pivô para firewall, DNS, EDR ou PCAP."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["src=10.20.4.18 dst=198.51.100.40 proto=tcp dport=443 bytes=82455120 packets=65120", "router=core01 if=wan1 utilization=87% source=snmp"]),
          b("exam", "exam", "Importante para a CySA+", "Flows são ótimos para abrangência; packet capture é melhor para detalhe. Não confunda telemetria de fluxo com conteúdo de pacote."),
          b("remember", "remember", "Gatilho de decisão", "Quem se comunicou com quem, usando qual protocolo/porta e com qual volume aproximado.")
        ],
        practiceIds: ["c3p02-flows-router"],
        visual: v("c3v-flows", "Flows x packet capture", "comparison", "Comparação entre metadados de flow e conteúdo de pacotes", "Flows dão escala e direção; PCAP dá profundidade quando a captura e a criptografia permitem.", ["Flow: src/dst/porta/bytes", "PCAP: headers + payload quando visível", "SNMP: estado do dispositivo"])
      })],
    }),
    lesson({
      id: "c3l03-active-monitoring", number: 3, title: "Monitoramento ativo", duration: 15,
      objective: "Reconhecer quando ping, iPerf e sondas ativas ajudam e quais limitações introduzem.",
      bridge: "Flows observam tráfego que já passa. O monitoramento ativo cria tráfego para medir disponibilidade e desempenho.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t03-active-monitoring", title: "Monitoramento ativo", section: "Capturing Network-Related Events — Active Monitoring", pages: "125–126",
        terms: [["Active Monitoring", "Monitoramento ativo"], ["ICMP", "ICMP"], ["Ping", "Ping"], ["iPerf", "iPerf"], ["Latency", "Latência"], ["Packet Loss", "Perda de pacotes"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Monitoramento ativo pergunta diretamente ao ambiente: 'você está acessível?', 'qual a latência?' ou 'quanto este enlace suporta?'."),
          b("technical", "technical", "Como funciona tecnicamente", "ICMP/ping oferece sinal simples de alcance, enquanto ferramentas de teste de desempenho podem medir banda, atraso e perda. O teste adiciona carga e pode sofrer justamente quando a rede está congestionada."),
          b("soc", "soc", "Visão de SOC", "Antes de chamar indisponibilidade de ataque, compare sonda ativa, telemetria do dispositivo e experiência do usuário. ICMP bloqueado também pode parecer indisponibilidade sem que o serviço esteja fora."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["monitor=icmp target=10.20.8.9 result=timeout", "synthetic=https target=10.20.8.9:443 result=200 latency_ms=42"]),
          b("exam", "exam", "Importante para a CySA+", "A resposta correta costuma reconhecer o trade-off: é útil para disponibilidade/desempenho, mas não demonstra por si só atividade maliciosa."),
          b("remember", "remember", "Gatilho de decisão", "Ele gera sondas/tráfego para medir o alvo, em vez de apenas observar o que já passa.")
        ],
        practiceIds: ["c3p03-active-monitoring"]
      })],
    }),
    lesson({
      id: "c3l04-passive-monitoring", number: 4, title: "Monitoramento passivo e TAP", duration: 16,
      objective: "Explicar por que monitoramento passivo preserva a rede observada e quais limitações de posicionamento possui.",
      bridge: "Depois de sondas ativas, compare uma técnica que escuta sem gerar consultas adicionais ao alvo.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t04-passive-monitoring", title: "Monitoramento passivo e TAP", section: "Capturing Network-Related Events — Passive Monitoring", pages: "126",
        terms: [["Passive Monitoring", "Monitoramento passivo"], ["Network TAP", "TAP de rede"], ["SPAN", "Port mirroring/SPAN"], ["Packet Capture", "Captura de pacotes"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Um sensor passivo recebe uma cópia do tráfego e observa o que ocorreu sem precisar perguntar nada aos endpoints."),
          b("technical", "technical", "Como funciona tecnicamente", "TAPs e espelhamento de porta podem alimentar sensores e ferramentas de captura. A qualidade da análise depende do ponto de observação, perda de pacotes, capacidade do sensor e visibilidade sobre tráfego criptografado."),
          b("soc", "soc", "Visão de SOC", "Use captura passiva quando precisar reconstruir protocolo, sequência e metadados detalhados. Antes, confirme se o sensor realmente enxerga o caminho do tráfego investigado."),
          b("exam", "exam", "Importante para a CySA+", "Passivo não significa onisciente: estar no segmento errado ou capturar apenas um lado da conversa produz uma visão incompleta."),
          b("remember", "remember", "Gatilho de decisão", "O sensor estava no ponto certo para ver esta conversa?")
        ],
        practiceIds: ["c3p04-passive-monitoring"],
        visual: v("c3v-passive", "Onde observar?", "network", "Rede com endpoints, switch, TAP e sensor", "A posição do sensor define o que pode ser visto e o que fica fora da captura.", ["Endpoint A", "Switch/TAP", "Sensor passivo", "Firewall", "Endpoint B"])
      })],
    }),
    lesson({
      id: "c3l05-bandwidth-exfiltration", number: 5, title: "Consumo de banda e exfiltração", duration: 17,
      objective: "Separar saturação operacional de possível exfiltração e combinar volume, ativo, destino e classificação dos dados.",
      bridge: "Um pico de tráfego é um sintoma. Agora você aprende a decidir se ele é rotina, falha ou risco de saída de dados.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t05-bandwidth-exfiltration", title: "Consumo de banda e exfiltração", section: "Detecting Common Network Issues — Bandwidth Consumption; Data Exfiltration", pages: "127–128",
        terms: [["Bandwidth Consumption", "Consumo de banda"], ["Data Exfiltration", "Exfiltração de dados"], ["Threshold", "Limite de alerta"], ["DLP", "Prevenção contra perda de dados"], ["Anomaly Detection", "Detecção de anomalia"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Banda alta pode ser backup, atualização, replicação, erro ou ataque. Exfiltração é saída não autorizada de dados e exige contexto adicional."),
          b("technical", "technical", "Como funciona tecnicamente", "Tendência de flows, thresholds, DLP, proxy, DNS e comportamento do host ajudam a compor a hipótese. Criptografia pode ocultar conteúdo, então volume, destino e processo continuam importantes."),
          b("soc", "soc", "Visão de SOC", "Priorize servidores sensíveis que raramente iniciam tráfego externo, transferências grandes fora do padrão e destinos recém-observados. Confirme janela de backup/mudança antes de conter."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["host=files01 dst=backup.example bytes=19327352832 tls=true job=nightly-backup ticket=CHG-4217"]),
          b("exam", "exam", "Importante para a CySA+", "O exame favorece correlação: 'muitos bytes' sozinho não prova exfiltração."),
          b("remember", "remember", "Gatilho de decisão", "Não. Volume é indicador; baseline, origem, destino, processo, autorização e tipo de dado determinam a hipótese.")
        ],
        practiceIds: ["c3p05-bandwidth-exfiltration"]
      })],
    }),
    lesson({
      id: "c3l06-beaconing-baseline", number: 6, title: "Beaconing, spikes e tráfego inesperado", duration: 12,
      objective: "Reconhecer periodicidade e desvios de baseline como pistas de C2 sem tratar toda repetição como malware.",
      bridge: "Depois de volume, observe ritmo e padrão: alguns comportamentos maliciosos se destacam mais pela regularidade do que pelo tamanho.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t06-beaconing-baseline", title: "Beaconing, spikes e tráfego inesperado", section: "Detecting Common Network Issues — Beaconing; Unexpected Traffic Spikes", pages: "128–130",
        terms: [["Beaconing", "Beaconing"], ["Command and Control (C2)", "Comando e controle"], ["Baseline", "Linha de base"], ["Heuristic Detection", "Detecção heurística"], ["Protocol Analysis", "Análise de protocolo"], ["Unexpected Port", "Porta inesperada"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Beaconing é comunicação recorrente com infraestrutura de comando e controle. Pode usar HTTPS e parecer navegação comum; periodicidade e combinação com destino/processo ajudam a diferenciá-lo."),
          b("technical", "technical", "Como funciona tecnicamente", "Baselines detectam desvio do normal; heurísticas procuram padrões conhecidos; análise de protocolo verifica se o tráfego faz sentido para a porta/protocolo. Spikes e portas novas são sinais, não conclusões."),
          b("soc", "soc", "Visão de SOC", "Meça intervalos, jitter, duração, bytes e processo originador. Compare com agentes legítimos de atualização/monitoramento antes de classificar como C2."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["12:00:00 host=ws44 proc=updater-test dst=198.51.100.77 bytes=612", "12:00:30 host=ws44 proc=updater-test dst=198.51.100.77 bytes=608", "12:01:00 host=ws44 proc=updater-test dst=198.51.100.77 bytes=615"]),
          b("exam", "exam", "Importante para a CySA+", "Tráfego periódico de baixo volume é uma pista clássica, mas o melhor item de prova geralmente inclui outra evidência: destino suspeito, processo incomum ou horário/contexto anômalo."),
          b("remember", "remember", "Gatilho de decisão", "Ritmo/periodicidade, destino/reputação e processo/contexto do host.")
        ],
        practiceIds: ["c3p06-beaconing-baseline"],
        visual: v("c3v-beacon", "Periodicidade de beacon", "timeline", "Eventos repetidos a intervalos regulares", "Regularidade é pista útil quando combinada com contexto de processo e destino.", ["12:00:00", "12:00:30", "12:01:00", "12:01:30"])
      })],
    })
  ],
};
