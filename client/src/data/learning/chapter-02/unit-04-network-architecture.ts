import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const networkModels = v(
  "c2v-network-models",
  "On-premises, cloud e hybrid",
  "comparison",
  "Comparação de três modelos de arquitetura de rede",
  "Os controles de segurança continuam existindo, mas a capacidade de administrar a infraestrutura e a fronteira de responsabilidade mudam entre modelos.",
  ["On-premises — maior controle da infraestrutura", "Cloud — mais abstração e dependência do provedor", "Hybrid — integra dois modelos e aumenta complexidade"],
);

const segmentationVisual = v(
  "c2v-segmentation",
  "Segmentação em camadas",
  "network",
  "Rede dividida em zonas por firewall, VLAN e jump box",
  "Segmentação reduz exposição e blast radius. Controles entre zonas devem refletir confiança, função e necessidade de negócio.",
  ["Internet", "Edge firewall", "Corporate VLAN", "Guest VLAN", "Jump box", "Protected segment", "Critical systems"],
);

const sdnVisual = v(
  "c2v-sdn",
  "SDN: controle programável",
  "flow",
  "Controlador SDN usando APIs para programar dispositivos e caminhos",
  "SDN separa a lógica de controle da configuração individual de dispositivos. Isso aumenta automação e flexibilidade, mas torna APIs, controladores e código elementos críticos de segurança.",
  ["Policy / code", "SDN Controller", "API / OpenFlow", "Switches / routers", "Traffic paths", "Monitoring"],
);

const zeroTrustVisual = v(
  "c2v-zero-trust",
  "Perímetro tradicional x Zero Trust",
  "comparison",
  "Comparação entre confiança implícita interna e verificação contínua de identidade, dispositivo e recurso",
  "Zero Trust não remove firewalls; muda a premissa: estar ‘dentro’ não basta para receber confiança.",
  ["Perimeter model — inside often trusted", "Zero Trust — verify user", "Verify device", "Verify resource/action", "Policy + telemetry", "Least privilege"],
);

const saseVisual = v(
  "c2v-sase",
  "SASE combina conectividade e segurança distribuída",
  "map",
  "Usuários e filiais conectados a serviços de segurança em nuvem com SD-WAN, CASB, Zero Trust e FWaaS",
  "SASE atende ambientes descentralizados em que usuários, endpoints e SaaS não passam necessariamente pelo datacenter tradicional.",
  ["Users / branches", "SD-WAN", "Zero Trust", "CASB", "FWaaS", "Anti-malware", "Cloud/SaaS/Internet"],
);

export const chapter02Unit04NetworkArchitecture: LearningUnit = {
  id: "c2u4-network",
  title: "Unidade 4 — Arquitetura de rede e segurança moderna",
  summary: "Compare on-premises, cloud e hybrid; aprofunde segmentação; entenda SDN, VPN, Zero Trust e SASE pelo impacto operacional.",
  lessons: [
    lesson({
      id: "c2l17-onprem", number: 17, title: "On-premises e controles de rede", duration: 18,
      objective: "Reconhecer os componentes de uma arquitetura física tradicional e o papel de cada controle.",
      bridge: "Com logs prontos para análise, voltamos ao caminho que o tráfego percorre.",
      examFocus: ["on-premises", "firewall", "IDS/IPS", "NAC", "UTM"],
      topics: [topic({
        id: "c2t17-onprem", title: "Rede tradicional não significa rede simples", section: "Network Architecture — On-Premises", pages: "91–92",
        terms: [["On-Premises", "Local"], ["Intrusion Detection System (IDS)", "Sistema de detecção de intrusão"], ["Intrusion Prevention System (IPS)", "Sistema de prevenção de intrusão"], ["Unified Threat Management (UTM)", "Gerenciamento unificado de ameaças"], ["Network Scanner", "Scanner de rede"]],
        blocks: [
          b("simple", "simple", "O que compõe o ambiente", "On-premises inclui roteadores, switches, cabos, dispositivos de segurança e sistemas administrados diretamente pela organização."),
          b("comparison", "comparison", "Controles e papéis", "Cada tecnologia responde a uma pergunta diferente.", ["Firewall: permite ou bloqueia fluxos entre zonas", "IDS: detecta e alerta", "IPS: detecta e pode interromper", "Content filtering/caching: controla conteúdo e otimiza acesso", "NAC: decide quem/dispositivo entra na rede", "Scanner: identifica ativos, serviços, patches e exposição", "UTM: combina múltiplas funções em um appliance"]),
          b("soc", "soc", "IDS x IPS em um alerta", "Se o registro diz action=alert, não conclua que o ataque foi bloqueado. Se o IPS registra action=drop/reset, ainda verifique se existiu outro caminho ou tentativa bem-sucedida."),
          b("evidence", "evidence", "Dois eventos, duas conclusões", "O primeiro indica detecção; o segundo indica tentativa de prevenção.", undefined, ["sensor=IDS-01 signature=web-exploit action=alert", "sensor=IPS-EDGE signature=web-exploit action=drop src=198.51.100.42 dst=10.0.20.9"]),
          b("exam", "exam", "CySA+", "Saiba distinguir IDS e IPS e reconhecer NAC/scanner/UTM por sua função básica em um desenho de rede."),
        ],
        practiceIds: ["c2p17-onprem"],
      })],
    }),
    lesson({
      id: "c2l18-cloud-models", number: 18, title: "SaaS, PaaS e IaaS para o analista", duration: 21,
      objective: "Distinguir modelos de serviço em nuvem e identificar como muda a capacidade de controle da organização.",
      bridge: "Na nuvem, parte da infraestrutura deixa de estar sob acesso direto do time local.",
      examFocus: ["cloud", "SaaS", "PaaS", "IaaS", "IAM"],
      topics: [topic({
        id: "c2t18-cloud-models", title: "Quem controla qual camada?", section: "Network Architecture — Cloud", pages: "92–93",
        terms: [["Software as a Service (SaaS)", "Software como serviço"], ["Platform as a Service (PaaS)", "Plataforma como serviço"], ["Infrastructure as a Service (IaaS)", "Infraestrutura como serviço"], ["Shared Responsibility", "Responsabilidade compartilhada"]],
        blocks: [
          b("simple", "simple", "A principal diferença", "Quanto mais alto o serviço, menos infraestrutura você administra diretamente. Em SaaS, você consome uma aplicação; em PaaS, entrega código/plataforma; em IaaS, ainda administra VMs, SO e aplicações."),
          b("comparison", "comparison", "Visão operacional", "Use esta comparação para decidir onde procurar um controle ou falha.", ["SaaS: foco em contrato, configuração, identidade e dados", "PaaS: foco em aplicação, IAM, configuração e serviços oferecidos", "IaaS: inclui SO, patching, serviços, aplicações, rede virtual e IAM"]),
          b("technical", "technical", "Perímetro mais poroso", "Cloud desloca recursos para ambientes do provedor e exige revisão de IAM, configuração, exposição e serviços de segurança específicos. Nem sempre o time pode tocar a infraestrutura subjacente."),
          b("soc", "soc", "Pergunta de triagem", "Antes de pedir ‘acesso ao servidor’, confirme o modelo. Em SaaS talvez não exista servidor administrável; sua evidência pode vir de audit logs, CASB, identidade e APIs do serviço."),
          b("mistake", "mistake", "Cloud não transfere toda segurança", "O provedor protege partes do serviço, mas a organização ainda decide identidades, permissões, dados, configurações e como consumir a plataforma."),
          b("exam", "exam", "CySA+", "Escolha o controle no nível que o cliente realmente administra. Evite recomendar patch de SO em SaaS quando o cenário não oferece essa responsabilidade."),
        ],
        visual: networkModels,
        practiceIds: ["c2p18-cloud-models"],
      })],
    }),
    lesson({
      id: "c2l19-cloud-assessment", number: 19, title: "Avaliação de fornecedor, auditoria e VPC", duration: 17,
      objective: "Entender como avaliar segurança de cloud quando a infraestrutura não está sob controle direto.",
      bridge: "Se você não administra a base do serviço, precisa obter confiança por evidência, contrato e controles expostos pelo provedor.",
      examFocus: ["cloud assessment", "audit reports", "VPC"],
      topics: [topic({
        id: "c2t19-cloud-assessment", title: "Evidência de segurança do provedor", section: "Network Architecture — Assessing the Cloud", pages: "92–93",
        terms: [["Security Assessment", "Avaliação de segurança"], ["Audit Report", "Relatório de auditoria"], ["SSAE-16 Type 1 / Type 2", "Exemplos de relatórios de auditoria citados no capítulo"], ["Virtual Private Cloud (VPC)", "Nuvem virtual privada"], ["Nondisclosure Agreement (NDA)", "Acordo de confidencialidade"]],
        blocks: [
          b("simple", "simple", "Como avaliar o que você não controla", "Solicite evidências de auditoria — o capítulo cita relatórios SSAE-16 Type 1/Type 2 como exemplos —, avalie práticas do fornecedor, verifique requisitos legais/regulatórios e confirme no contrato como riscos e responsabilidades são tratados."),
          b("technical", "technical", "VPC", "Uma VPC cria um ambiente lógico semi-isolado sob demanda, normalmente com sub-redes privadas e controles próprios de comunicação. Ela melhora organização e isolamento, mas ainda depende da infraestrutura cloud do provedor."),
          b("soc", "soc", "Contexto para incidentes", "Documente quais logs o provedor entrega, retenção, contatos de incidente, limites de resposta e quem pode alterar configurações. Isso reduz tempo perdido quando ocorre um evento real."),
          b("exam", "exam", "CySA+", "Em SaaS/PaaS, contratos e evidências de auditoria têm papel maior; em IaaS, controles técnicos do cliente aumentam."),
        ],
        practiceIds: ["c2p19-cloud-assessment"],
      })],
    }),
    lesson({
      id: "c2l20-hybrid", number: 20, title: "Hybrid: duas arquiteturas, um único risco operacional", duration: 14,
      objective: "Explicar por que integrar on-premises e cloud cria dependências e visibilidade distribuída.",
      bridge: "Poucas organizações migram tudo de uma vez; por isso, híbrido é comum e exige segurança coerente entre mundos diferentes.",
      examFocus: ["hybrid network", "complexity"],
      topics: [topic({
        id: "c2t20-hybrid", title: "Integração aumenta caminhos e responsabilidades", section: "Network Architecture — Hybrid", pages: "93",
        terms: [["Hybrid Architecture", "Arquitetura híbrida"], ["On-Premises", "Local"], ["Cloud Infrastructure", "Infraestrutura em nuvem"]],
        blocks: [
          b("simple", "simple", "O que é hybrid", "É a combinação de sistemas on-premises com serviços/infraestrutura cloud. O desafio não é apenas proteger cada lado, mas também identidade, conectividade, dados e logs que cruzam a fronteira."),
          b("soc", "soc", "Investigação distribuída", "Um login pode nascer no diretório local, autenticar em identidade federada e acessar SaaS. Um incidente exige correlacionar fontes que não estão no mesmo datacenter nem sob a mesma equipe."),
          b("evidence", "evidence", "Exemplo de correlação", "A mesma identidade aparece em ambientes diferentes; normalizar usuário e tempo é essencial.", undefined, ["AD user=ana auth=success ts=10:02:01", "cloud-idp user=ana@corp.example token=issued ts=10:02:05", "saas audit user=ana@corp.example file_download=1200 ts=10:04:21"]),
          b("exam", "exam", "CySA+", "Hybrid costuma ser a resposta quando o cenário explicitamente mantém infraestrutura local e cloud ao mesmo tempo; espere complexidade adicional de controles e visibilidade."),
        ],
        visual: networkModels,
        practiceIds: ["c2p20-hybrid"],
      })],
    }),
    lesson({
      id: "c2l21-segmentation-types", number: 21, title: "Segmentação física, virtual e air gap", duration: 19,
      objective: "Aprofundar segmentação distinguindo isolamento físico, virtual e air gap e seus limites.",
      bridge: "Você já viu segmentação no Capítulo 1. Aqui ela deixa de ser apenas firewall entre zonas e passa a ser uma decisão arquitetural ampla.",
      examFocus: ["physical segmentation", "virtual segmentation", "air gap", "attack surface"],
      topics: [topic({
        id: "c2t21-segmentation-types", title: "Separar reduz blast radius — mas não elimina risco", section: "Network Architecture — Network Segmentation", pages: "93–94",
        terms: [["Physical Segmentation", "Segmentação física"], ["Virtual Segmentation", "Segmentação virtual"], ["Air Gap", "Isolamento sem conexão"], ["Compartmentalization", "Compartimentalização"]],
        blocks: [
          b("simple", "simple", "Três graus de separação", "Você pode separar por infraestrutura física, por recursos lógicos/virtuais ou chegar ao extremo de não manter conexão de rede entre ambientes."),
          b("technical", "technical", "Benefícios citados", "Segmentação pode reduzir attack surface, limitar escopo de compliance, aumentar disponibilidade ao conter impacto e melhorar eficiência de rede."),
          b("scenario", "scenario", "Air gap não é campo de força", "Um ambiente sem conexão de rede ainda pode receber mídia removível, notebook de manutenção ou dados transportados por pessoas. O controle só é tão forte quanto a governança dos caminhos que atravessam a separação."),
          b("soc", "soc", "O que monitorar", "Documente transferências autorizadas entre zonas, mídia removível, jump boxes, gateways e exceções. Um ‘air-gapped’ com fluxo manual não é invisível ao risco; o fluxo apenas mudou de tecnologia."),
          b("exam", "exam", "CySA+", "Não escolha air gap como solução mágica. Ele reduz caminhos de rede, mas continua sujeito a bypass físico e humano."),
        ],
        practiceIds: ["c2p21-segmentation-types"],
      })],
    }),
    lesson({
      id: "c2l22-segmentation-controls", number: 22, title: "VLAN, firewall e jump box", duration: 18,
      objective: "Relacionar segmentação lógica a regras de tráfego e administração segura entre zonas.",
      bridge: "Depois de escolher separar, precisamos decidir como implementar e como permitir exceções controladas.",
      examFocus: ["VLAN", "firewall ruleset", "jump box"],
      topics: [topic({
        id: "c2t22-segmentation-controls", title: "Segmentos precisam de política entre si", section: "Network Architecture — Network Segmentation", pages: "94–95",
        terms: [["VLAN", "Rede local virtual"], ["Firewall Ruleset", "Conjunto de regras de firewall"], ["Jump Box", "Servidor de salto"], ["Trust Zone", "Zona de confiança"]],
        blocks: [
          b("simple", "simple", "Separação + controle", "VLANs e roteamento criam fronteiras lógicas; firewall adiciona política mais granular entre níveis de confiança; jump box oferece caminho administrativo controlado."),
          b("technical", "technical", "Escolha do mecanismo", "Quando zonas têm requisitos de confiança diferentes, firewall com ruleset cuidadosamente desenhado tende a ser mais apropriado. Em cenários simples, roteadores/switches e VLANs podem fornecer separação lógica."),
          b("soc", "soc", "Jump box é ponto de alta visibilidade", "Por atravessar duas zonas, deve ser fortemente protegido e monitorado. Sessões administrativas, MFA, origem, destino e comandos/ações disponíveis ajudam a explicar acessos ao segmento protegido."),
          b("evidence", "evidence", "Acesso via jump box", "O fluxo é esperado apenas quando identidade, origem e destino correspondem à política.", undefined, ["vpn_user=ana mfa=success", "jumpbox=JMP-01 src=10.20.4.22 dst=10.90.1.10 proto=RDP", "pam_session=PSM-8221 recording=enabled"]),
          b("exam", "exam", "CySA+", "Use VLAN/segmentation para reduzir exposição e jump box para administração controlada de zonas sensíveis; não transforme o jump box em bypass sem monitoramento."),
        ],
        visual: segmentationVisual,
        practiceIds: ["c2p22-segmentation-controls"],
      })],
    }),
    lesson({
      id: "c2l23-diversity-vpn", number: 23, title: "Product diversity e VPN", duration: 17,
      objective: "Avaliar benefícios e custos de diversidade de fornecedores e entender VPN como caminho seguro entre zonas/remotos.",
      bridge: "Arquitetura segura envolve escolhas que reduzem dependências, mas toda escolha adiciona custo operacional.",
      examFocus: ["product diversity", "VPN", "remote access"],
      topics: [topic({
        id: "c2t23-diversity-vpn", title: "Reduzir falha comum sem criar caos operacional", section: "Network Architecture — The Case for Product Diversity; VPN", pages: "94–95",
        terms: [["Product Diversity", "Diversidade de produtos/fornecedores"], ["Single Point of Failure", "Ponto único de falha"], ["Virtual Private Network (VPN)", "Rede privada virtual"]],
        blocks: [
          b("simple", "simple", "Diversidade", "Usar fornecedores diferentes pode impedir que uma única vulnerabilidade de produto comprometa todas as camadas. Porém aumenta treinamento, manutenção, integração e possibilidade de erro."),
          b("comparison", "comparison", "Benefício x custo", "A escolha correta depende da organização.", ["Benefício: reduz dependência de uma mesma falha de design", "Custo: mais consoles, competências, contratos e patches", "Risco novo: inconsistência e configuração incorreta entre plataformas"]),
          b("technical", "technical", "VPN", "VPN fornece conectividade lógica segura entre usuário/rede e outra zona, normalmente com criptografia. Pode levar um administrador a um jump box em vez de liberar acesso direto ao segmento protegido."),
          b("soc", "soc", "VPN não encerra a investigação", "Correlacione identidade, dispositivo, MFA, origem, horário, duração e recursos acessados após a conexão. A VPN protege o canal; não prova que a sessão é legítima."),
          b("exam", "exam", "CySA+", "Product diversity não é sempre melhor, e VPN não substitui segmentação/least privilege. Ambas são decisões com trade-offs."),
        ],
        practiceIds: ["c2p23-diversity-vpn"],
      })],
    }),
    lesson({
      id: "c2l24-sdn", number: 24, title: "SDN, APIs e SD-WAN", duration: 21,
      objective: "Entender networking programável e os riscos de controlador, API e orquestração.",
      bridge: "Depois de redes configuradas dispositivo a dispositivo, veja o que muda quando a política vira software.",
      examFocus: ["SDN", "OpenFlow", "API security", "SD-WAN"],
      topics: [topic({
        id: "c2t24-sdn", title: "Rede controlada por software", section: "Network Architecture — Software-Defined Networking", pages: "95–96",
        terms: [["Software-Defined Networking (SDN)", "Rede definida por software"], ["OpenFlow", "OpenFlow"], ["Application Programming Interface (API)", "Interface de programação"], ["Software-Defined WAN (SD-WAN)", "WAN definida por software"]],
        blocks: [
          b("simple", "simple", "O que muda", "SDN centraliza lógica e torna a rede programável. Em vez de configurar manualmente cada equipamento, políticas e controladores podem alterar caminhos e recursos por software."),
          b("technical", "technical", "APIs e OpenFlow", "Controladores expõem interfaces programáticas e podem usar protocolos como OpenFlow para controlar dispositivos. Isso facilita automação multivendor, mas torna API e controlador alvos de alto impacto."),
          b("soc", "soc", "Telemetria de SDN", "Monitore mudança de política, identidade/API token, origem da chamada, versão de configuração e impacto nos caminhos. Uma alteração no controlador pode afetar muitos dispositivos de uma vez."),
          b("evidence", "evidence", "Mudança sintética", "A alteração deve ser comparada a change ticket e identidade esperada.", undefined, ["controller=SDN-CTRL-01 action=policy.update", "api_client=automation-prod token_id=svc-netops", "change=route-segment-hr next_hop=10.2.0.1", "ticket=CHG-8821"]),
          b("mistake", "mistake", "Automação amplia acerto e erro", "Centralização reduz trabalho repetitivo, mas um token comprometido ou regra incorreta pode propagar impacto em larga escala."),
          b("exam", "exam", "CySA+", "SDN = programabilidade/controle central via APIs; SD-WAN aplica conceito semelhante à conectividade WAN e pode combinar múltiplos caminhos/provedores."),
        ],
        visual: sdnVisual,
        practiceIds: ["c2p24-sdn"],
      })],
    }),
    lesson({
      id: "c2l25-zero-trust", number: 25, title: "Zero Trust sem slogan", duration: 20,
      objective: "Explicar ausência de confiança implícita e validação por ação, identidade, dispositivo e recurso.",
      bridge: "Quando perímetros ficam difusos, ‘estar dentro da rede’ deixa de ser justificativa suficiente para confiar.",
      examFocus: ["zero trust", "verify and validate", "layered security"],
      topics: [topic({
        id: "c2t25-zero-trust", title: "Cada solicitação precisa ser validada", section: "Network Architecture — Zero Trust", pages: "96",
        terms: [["Zero Trust", "Confiança Zero"], ["Implicit Trust", "Confiança implícita"], ["Policy Decision", "Decisão de política"], ["Least Privilege", "Menor privilégio"]],
        blocks: [
          b("simple", "simple", "A ideia central", "Zero Trust remove a suposição de que usuário, dispositivo ou aplicação merece confiança apenas porque está dentro de uma fronteira. Cada ação deve ser verificada e autorizada conforme contexto."),
          b("comparison", "comparison", "Perímetro x Zero Trust", "O modelo muda a premissa, não elimina todas as tecnologias anteriores.", ["Perímetro: confiança tende a aumentar depois de entrar", "Zero Trust: identidade/dispositivo/recurso continuam sendo avaliados", "Perímetro: rede é o principal boundary", "Zero Trust: política acompanha usuário, dispositivo, aplicação e ação"]),
          b("technical", "technical", "Implementação é combinação", "Zero Trust depende de tecnologias, políticas, processos, identidade, telemetria e controle de acesso. Não existe um único ‘produto Zero Trust’ que resolva tudo."),
          b("soc", "soc", "Sinal operacional", "Um usuário autenticado pode ser bloqueado de ação sensível porque dispositivo não está conforme, localização mudou ou privilégio não é necessário. O analista deve observar a decisão de política e seus atributos."),
          b("mistake", "mistake", "Never trust ≠ bloquear tudo", "Zero Trust significa não conceder confiança implícita; o objetivo é permitir ações autorizadas com contexto e least privilege, não impedir produtividade por padrão."),
          b("exam", "exam", "CySA+", "Se o requisito diz que cada ação deve ser verificada e validada mesmo para usuários internos, a resposta é Zero Trust."),
        ],
        visual: zeroTrustVisual,
        practiceIds: ["c2p25-zero-trust"],
      })],
    }),
    lesson({
      id: "c2l26-sase", number: 26, title: "SASE: segurança para infraestrutura descentralizada", duration: 18,
      objective: "Entender SASE como arquitetura que combina SD-WAN e controles de segurança entregues de forma distribuída/cloud.",
      bridge: "Zero Trust muda a decisão de confiança; SASE reorganiza como conectividade e segurança chegam a usuários e filiais fora do datacenter.",
      examFocus: ["SASE", "SD-WAN", "CASB", "FWaaS"],
      topics: [topic({
        id: "c2t26-sase", title: "Security + edge para usuários distribuídos", section: "Network Architecture — Secure Access Service Edge", pages: "96–97",
        terms: [["Secure Access Service Edge (SASE)", "Secure Access Service Edge"], ["Firewall as a Service (FWaaS)", "Firewall como serviço"], ["Cloud Access Security Broker (CASB)", "Broker de segurança de acesso à nuvem"], ["SD-WAN", "WAN definida por software"]],
        blocks: [
          b("simple", "simple", "Por que SASE existe", "Usuários e aplicações não estão mais concentrados no datacenter. SASE leva conectividade e controles de segurança para uma arquitetura distribuída, normalmente entregue por serviços cloud."),
          b("technical", "technical", "Conjunto de capacidades", "O capítulo relaciona SASE a SD-WAN, CASB, Zero Trust, firewall as a service, antimalware e outros controles de endpoint/rede."),
          b("soc", "soc", "Onde investigar", "Um acesso SASE pode gerar logs de identidade, postura do endpoint, decisão Zero Trust, proxy/CASB, firewall cloud e SD-WAN. Normalize identidade e sessão para reconstruir o caminho."),
          b("note", "note", "Terminologia do objetivo", "O livro observa que os objetivos do exame podem usar a formulação ‘secure access secure edge’, enquanto o termo comum da indústria é Secure Access Service Edge. Reconheça ambos."),
          b("exam", "exam", "CySA+", "Se o cenário descreve organização descentralizada, SaaS, filiais e controles cloud próximos ao usuário, SASE é uma arquitetura candidata."),
        ],
        visual: saseVisual,
        practiceIds: ["c2p26-sase"],
      })],
    }),
  ],
};
