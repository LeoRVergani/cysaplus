import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

export const chapter03Unit02NetworkAttacks: LearningUnit = {
  id: "c3u2-network-attacks",
  title: "Unidade 2 — Scans, negação de serviço e dispositivos rogue",
  summary: "Transforme tráfego inesperado em hipótese verificável: scans, DoS/DDoS, correlação de fontes e dispositivos não autorizados.",
  lessons: [
    lesson({
      id: "c3l07-scans-sweeps", number: 7, title: "Scans, sweeps e probes", duration: 13,
      objective: "Identificar padrões de varredura em logs e distinguir reconhecimento de exploração confirmada.",
      bridge: "Tráfego inesperado pode ser sistemático. A distribuição de destinos e portas revela quando alguém está mapeando a superfície.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t07-scans-sweeps", title: "Scans, sweeps e probes", section: "Detecting Scans and Sweeps", pages: "130–131",
        terms: [["Port Scan", "Varredura de portas"], ["Network Sweep", "Varredura de hosts"], ["Probe", "Sonda"], ["Sequential Access", "Acesso sequencial"], ["Stealth Scan", "Scan de baixa visibilidade"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Um port scan testa muitos serviços em um host; um sweep costuma tocar vários hosts. Probes buscam informação específica. Esses padrões podem preceder ataques, mas não provam exploração."),
          b("technical", "technical", "Como funciona tecnicamente", "Firewalls, IDS/IPS e SIEM detectam repetição por origem, destino, porta e tempo. Scans lentos ou distribuídos exigem janelas maiores e correlação entre fontes."),
          b("soc", "soc", "Visão de SOC", "Faça pivô pela origem: quantos destinos? quantas portas? houve conexão aceita depois? A prioridade sobe quando reconhecimento é seguido de autenticação, exploit ou acesso anômalo."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["src=10.10.8.22 dst=10.10.20.1-220 dport=445 action=drop count=220 window=90s"]),
          b("exam", "exam", "Importante para a CySA+", "A pegadinha é responder ao scan como se fosse comprometimento. A evidência do scan descreve reconhecimento; procure o que aconteceu depois."),
          b("remember", "remember", "Gatilho de decisão", "Port scan varia portas em um alvo; sweep tende a variar alvos para descobrir hosts/serviços.")
        ],
        practiceIds: ["c3p07-scans-sweeps"]
      })],
    }),
    lesson({
      id: "c3l08-dos", number: 8, title: "DoS: indisponibilidade por uma origem ou condição", duration: 14,
      objective: "Relacionar indisponibilidade a volume, vulnerabilidade ou dependência e escolher telemetria para cada hipótese.",
      bridge: "Depois de reconhecer varredura, avalie ataques cujo objetivo é impedir acesso ao serviço.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t08-dos", title: "DoS: indisponibilidade por uma origem ou condição", section: "Detecting Denial-of-Service Attacks", pages: "131–132",
        terms: [["Denial of Service (DoS)", "Negação de serviço"], ["Resource Exhaustion", "Esgotamento de recursos"], ["Service Vulnerability", "Vulnerabilidade de serviço"], ["Connection Monitoring", "Monitoramento de conexões"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "DoS descreve impacto de indisponibilidade. Pode vir de volume, exploração de uma falha que derruba o serviço ou ataque a um componente intermediário."),
          b("technical", "technical", "Como funciona tecnicamente", "Métricas de aplicação, conexões, CPU/memória, banda e IDS/IPS precisam ser alinhadas no tempo. Bloquear uma única origem só ajuda quando ela realmente concentra o ataque."),
          b("soc", "soc", "Visão de SOC", "Confirme se o problema é rede, host, aplicação ou dependência. Preservar esse diagnóstico evita bloquear endereços enquanto a causa real é uma falha de serviço."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["service=web01 status=crash request_pattern=/api/test?id=... bandwidth=normal"]),
          b("exam", "exam", "Importante para a CySA+", "Não associe automaticamente 'serviço lento' a DoS. O cenário precisa mostrar pressão ou comportamento compatível e excluir causas operacionais."),
          b("remember", "remember", "Gatilho de decisão", "Não. Pode explorar uma falha específica e derrubar serviço com pouco tráfego.")
        ],
        practiceIds: ["c3p08-dos"]
      })],
    }),
    lesson({
      id: "c3l09-ddos", number: 9, title: "DDoS: muitas origens, um mesmo impacto", duration: 15,
      objective: "Distinguir DDoS de DoS por distribuição de origem e compreender por que mitigação local pode ser insuficiente.",
      bridge: "Se uma origem é simples de bloquear, milhares de origens mudam completamente a estratégia.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t09-ddos", title: "DDoS: muitas origens, um mesmo impacto", section: "Distributed Denial-of-Service Attacks", pages: "131–132",
        terms: [["Distributed Denial of Service (DDoS)", "Negação de serviço distribuída"], ["Botnet", "Botnet"], ["Rate Limiting", "Limitação de taxa"], ["Upstream Mitigation", "Mitigação upstream"], ["Traffic Distribution", "Distribuição de tráfego"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "DDoS usa muitas fontes ao mesmo tempo, frequentemente dispositivos comprometidos. O volume agregado pode esgotar enlace ou serviço antes de controles locais conseguirem agir."),
          b("technical", "technical", "Como funciona tecnicamente", "A resposta depende do vetor: proteção do provedor/CDN/scrubbing, rate limiting, filtros específicos e capacidade adicional podem ser necessários. O SOC precisa preservar métricas e coordenar com rede/provedor."),
          b("soc", "soc", "Visão de SOC", "Observe distribuição por ASN/país/origem, PPS/BPS, tipo de requisição e saturação. Evite listas enormes de bloqueio por IP quando o vetor muda rapidamente."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["bps=9.8Gbps link_capacity=10Gbps unique_src=18432 service=https status=degraded"]),
          b("exam", "exam", "Importante para a CySA+", "Em cenário de DDoS que já satura o link, a mitigação precisa ocorrer antes do gargalo — normalmente upstream."),
          b("remember", "remember", "Gatilho de decisão", "Porque o enlace pode ser consumido antes de o firewall/servidor local conseguir filtrar.")
        ],
        practiceIds: ["c3p09-ddos"],
        visual: v("c3v-ddos", "DoS x DDoS e ponto de mitigação", "flow", "Fluxo de muitas origens até o link, mitigador e serviço", "Quando o gargalo é o enlace, a filtragem precisa acontecer antes dele.", ["Botnet", "Provedor / scrubbing", "Link da organização", "Firewall", "Serviço"])
      })],
    }),
    lesson({
      id: "c3l10-network-correlation", number: 10, title: "Outros ataques e correlação de rede", duration: 16,
      objective: "Combinar rede e endpoint para sair do alerta isolado e chegar a uma hipótese sustentada.",
      bridge: "Nenhuma fonte vê tudo. Ataques reais cruzam fronteiras entre rede, identidade, aplicação e endpoint.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t10-network-correlation", title: "Outros ataques e correlação de rede", section: "Detecting Other Network Attacks", pages: "132",
        terms: [["IDS", "Sistema de detecção de intrusão"], ["IPS", "Sistema de prevenção de intrusão"], ["Firewall Log", "Log de firewall"], ["EDR Network Telemetry", "Telemetria de rede do EDR"], ["Correlation", "Correlação"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "IDS/IPS traz detecção de padrão, firewall informa decisão de tráfego, flows mostram abrangência e EDR liga conexão ao processo. O SIEM ajuda a alinhar tudo."),
          b("technical", "technical", "Como funciona tecnicamente", "A evidência mais forte geralmente surge quando o mesmo host aparece em fontes independentes: domínio resolvido, conexão permitida, processo originador e alerta de comportamento."),
          b("soc", "soc", "Visão de SOC", "Construa uma linha do tempo curta e procure convergência. Uma assinatura IDS sem sessão correspondente pode ser falso positivo; conexão de processo suspeito reforça a hipótese."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["ids host=10.20.4.44 signature=possible-c2 dst=198.51.100.77", "edr host=10.20.4.44 process=unknown.exe parent=winword.exe dst=198.51.100.77"]),
          b("exam", "exam", "Importante para a CySA+", "O objetivo é escolher a fonte que responde à lacuna atual, e não acumular ferramentas sem uma pergunta."),
          b("remember", "remember", "Gatilho de decisão", "Contexto do endpoint: processo, usuário, árvore de execução e ações de resposta.")
        ],
        practiceIds: ["c3p10-network-correlation"]
      })],
    }),
    lesson({
      id: "c3l11-rogue-identification", number: 11, title: "Como identificar dispositivos rogue", duration: 17,
      objective: "Usar inventário, MAC/OUI, varredura autorizada, inspeção e tráfego para validar um dispositivo inesperado.",
      bridge: "Além do tráfego malicioso, a própria presença de um equipamento não autorizado pode ser o incidente.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t11-rogue-identification", title: "Como identificar dispositivos rogue", section: "Detecting and Finding Rogue Devices", pages: "132–133",
        terms: [["Rogue Device", "Dispositivo rogue"], ["MAC Address", "Endereço MAC"], ["OUI", "Prefixo de fabricante/OUI"], ["Site Survey", "Inspeção física"], ["Network Access Control (NAC)", "Controle de acesso à rede"], ["MAC Randomization", "Randomização de MAC"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "MAC e fabricante podem ajudar a reconhecer um ativo, mas MAC pode ser alterado ou randomizado. Inventário, porta de switch, autenticação NAC, DHCP, tráfego e inspeção física dão contexto adicional."),
          b("technical", "technical", "Como funciona tecnicamente", "Comece por localização lógica: VLAN, switch/porta, lease DHCP, usuário/802.1X. Em seguida confirme fisicamente quando necessário. Evite desligar um ativo crítico desconhecido sem avaliar impacto."),
          b("soc", "soc", "Visão de SOC", "Um OUI indica fabricante provável, não identidade nem legitimidade. A resposta correta usa múltiplos sinais."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["dhcp mac=02:11:22:33:44:55 ip=10.20.30.88 vlan=restricted asset_match=false"]),
          b("exam", "exam", "Importante para a CySA+", "A prova pode oferecer 'verificar o MAC' como pista, mas não como autenticação forte."),
          b("remember", "remember", "Gatilho de decisão", "Não. Ajuda a identificar fabricante/correlacionar, mas pode ser spoofado ou randomizado.")
        ],
        practiceIds: ["c3p11-rogue-identification"]
      })],
    }),
    lesson({
      id: "c3l12-wired-wireless-rogues", number: 12, title: "Rogues cabeados e sem fio", duration: 12,
      objective: "Escolher controles e técnicas de localização adequados para rogue cabeado e wireless.",
      bridge: "A mesma categoria de risco muda de investigação conforme o meio físico.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t12-wired-wireless-rogues", title: "Rogues cabeados e sem fio", section: "Wired Rogues; Wireless Rogues", pages: "133–134",
        terms: [["Port Security", "Segurança de porta"], ["802.1X", "802.1X"], ["Rogue Access Point", "Ponto de acesso rogue"], ["Signal Strength", "Intensidade de sinal"], ["Wireless Controller", "Controlador wireless"], ["Triangulation", "Triangulação"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Na rede cabeada, switch/porta, port security e NAC ajudam a impedir/localizar o dispositivo. No wireless, sinal, BSSID, controlador e inspeção de área ajudam a localizar APs ou clientes não autorizados."),
          b("technical", "technical", "Como funciona tecnicamente", "Rogue cabeado pode implicar acesso físico ou erro interno. Rogue AP pode imitar SSID legítimo e atrair usuários. Documente BSSID/canal/sinal e evite conectar ao dispositivo para 'testar'."),
          b("soc", "soc", "Visão de SOC", "Para localizar AP sem fio, sinal e mapa físico são mais úteis que tentar autenticar nele."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["wlc alert=rogue-ap bssid=aa:bb:cc:dd:ee:ff ssid=CORP-WIFI channel=6 rssi=-49"]),
          b("exam", "exam", "Importante para a CySA+", "Controle preventivo e técnica de investigação são diferentes: NAC/port security restringem acesso; análise RF ajuda a localizar."),
          b("remember", "remember", "Gatilho de decisão", "Cabeado: switch/porta/NAC. Wireless: BSSID/canal/intensidade/controlador e inspeção física.")
        ],
        practiceIds: ["c3p12-wired-wireless-rogues"]
      })],
    })
  ],
};
