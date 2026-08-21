import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const nacVisual = v("v-nac-8021x", "802.1X: quem fala com quem", "network", "Endpoint com supplicant conversa com authenticator em switch ou access point, que usa RADIUS para falar com servidor de autenticação", "Separe o papel de cada componente: o endpoint solicita, o switch/AP controla a porta e o servidor valida credenciais/política.", ["Endpoint / Supplicant", "802.1X", "Switch/AP / Authenticator", "RADIUS", "Authentication Server", "Allow / Deny / Quarantine"]);
const firewallVisual = v("v-firewall-dmz", "Perímetro com DMZ / screened subnet", "network", "Internet atravessa firewall para DMZ e rede interna, com políticas entre zonas", "Uma DMZ hospeda serviços expostos sem conceder acesso direto à rede interna. Todo trânsito entre zonas continua sujeito à política do firewall.", ["Internet", "Firewall", "DMZ / Screened Subnet", "Web / Mail", "Firewall policy", "Internal Network"]);
const firewallTypesVisual = v("v-firewall-types", "O que cada tipo de firewall observa", "cards", "Quatro cartões: packet filtering, stateful, NGFW e WAF", "A escolha depende do problema: pacote, estado de sessão, contexto de usuário/aplicação ou proteção de aplicação web.", ["Packet Filtering — cabeçalhos/regras", "Stateful — estado da conexão", "NGFW — usuário/aplicação/contexto", "WAF — requisições web"]);
const jumpVisual = v("v-jump-box", "Acesso administrativo por jump box", "network", "Rede corporativa acessa jump box com MFA antes de chegar ao datacenter", "O jump box cria um ponto controlado e observável de transição entre zonas com níveis de confiança diferentes.", ["Admin workstation", "MFA", "Jump Box", "SSH / RDP", "Datacenter", "Sensitive systems"]);
const sinkholeVisual = v("v-dns-sinkhole", "DNS sinkhole: redirecionar para observar", "flow", "Endpoint infectado consulta domínio de C2, DNS defensivo responde com sinkhole e SOC identifica o host", "O sinkhole não cura o endpoint sozinho; ele quebra/observa a comunicação e ajuda a localizar sistemas que precisam de investigação e remediação.", ["Compromised Endpoint", "DNS query for C2", "Defensive DNS", "Sinkhole IP", "Controlled connection", "SOC investigation"]);

export const unit03Network: LearningUnit = {
  id: "u3-network",
  title: "Unidade 3 — NAC, firewalls, segmentação e deception",
  summary: "Mostra como redes controlam admissão, perímetro, zonas de confiança e sinais de engano defensivo.",
  lessons: [
    lesson({
      id: "l15-nac-basics", number: 15, title: "NAC e o problema de admissão à rede", duration: 15,
      objective: "Entender os dois objetivos centrais do NAC: identidade autorizada e postura mínima do dispositivo.",
      bridge: "Controles de risco agora viram decisões concretas de quem e do que pode entrar na rede.",
      examFocus: ["NAC", "network admission"],
      topics: [topic({ id: "t15-nac-basics", title: "Network Access Control", section: "Network Access Control", pages: "PDF 56–58", terms: [["Network Access Control (NAC)", "Controle de acesso à rede"], ["Network Admission Control", "Nome também usado para tecnologia de admissão"], ["Network Admission", "Admissão à rede"], ["Security Posture", "Postura de segurança"]], blocks: [
        b("s", "simple", "NAC é o porteiro da rede", "O NAC decide se um usuário/dispositivo pode entrar e, em muitas implementações, se o dispositivo atende requisitos mínimos de segurança. Autenticar a pessoa e avaliar a saúde do equipamento são decisões relacionadas, mas distintas."),
        b("a", "analogy", "Crachá e inspeção do veículo", "Ter crachá válido comprova identidade, mas uma área de alta segurança pode exigir também inspeção do veículo. Da mesma forma, credencial válida pode não ser suficiente se o endpoint estiver sem patch ou com proteção desatualizada."),
        b("t", "technical", "Dois eixos de decisão", "NAC pode considerar identidade e atributos como horário, função, localização e saúde do sistema. O resultado não precisa ser apenas 'permitir' ou 'negar': o dispositivo pode receber acesso limitado para remediação. O capítulo observa ainda que Network Admission Control é um nome proprietário usado pela Cisco para sua abordagem de NAC, embora os termos sejam usados para a mesma família geral de tecnologia."),
        b("soc", "soc", "No SOC", "Eventos NAC ajudam a responder quem tentou entrar, de qual dispositivo, por qual ponto da rede, qual postura foi observada e qual política resultou em allow, deny ou quarantine."),
        b("exam", "exam", "O que saber para a CySA+", "O foco não é decorar uma tela de configuração de fabricante. É compreender o papel do controle para interpretar logs e recomendar remediação."),
      ], practiceIds: ["p-nac-purpose"] })],
    }),
    lesson({
      id: "l16-8021x", number: 16, title: "802.1X, Supplicant, Authenticator e RADIUS", duration: 20,
      objective: "Explicar passo a passo o fluxo 802.1X e o papel de cada componente.",
      bridge: "Depois de saber por que o NAC existe, vemos o fluxo mais importante apresentado no capítulo.",
      examFocus: ["802.1X", "RADIUS", "supplicant", "authenticator"],
      topics: [topic({ id: "t16-8021x", title: "Fluxo de autenticação 802.1X", section: "Network Access Control", pages: "PDF 57", terms: [["802.1X", "Padrão de controle de acesso à rede"], ["Supplicant", "Software no dispositivo solicitante"], ["Authenticator", "Switch/AP que controla a admissão"], ["RADIUS", "Protocolo usado entre authenticator e servidor de autenticação"], ["Authentication Server", "Servidor que valida a solicitação"]], blocks: [
        b("s", "simple", "Quem faz o quê", "O endpoint executa o supplicant. O switch ou access point funciona como authenticator. Ele não precisa conhecer sozinho as credenciais; encaminha a solicitação para o servidor de autenticação, normalmente usando RADIUS."),
        b("steps", "steps", "Fluxo completo", "Pense na sequência como uma conversa intermediada.", ["1. O dispositivo conecta a uma porta cabeada ou rede sem fio.", "2. O supplicant inicia/responde ao desafio 802.1X.", "3. O authenticator no switch/AP controla o acesso e encaminha a solicitação.", "4. O authenticator usa RADIUS para conversar com o authentication server.", "5. O servidor avalia identidade/autorização e retorna resultado.", "6. A infraestrutura libera, nega ou coloca o dispositivo em rede limitada/quarentena conforme a política."]),
        b("mistake", "mistake", "Não troque os papéis", "O authenticator não é sinônimo de servidor RADIUS. O switch/AP é o ponto que controla o acesso; o servidor de autenticação é quem possui o contexto necessário para validar a solicitação."),
        b("e", "evidence", "Evento sintético", "Observe identidade, dispositivo, ponto de acesso e resultado.", undefined, ["8021x supplicant=NB-204 user=ana", "authenticator=switch-4/port-18", "radius_server=10.0.5.12 result=accept", "policy=corp-managed-v2 action=allow"]),
        b("soc", "soc", "Investigação", "Se RADIUS aceita a identidade mas a rede ainda coloca o host em quarentena, isso pode indicar que outra política — por exemplo postura — restringiu o dispositivo. Não interprete um único campo como decisão final."),
        b("exam", "exam", "Pergunta típica", "Se o enunciado perguntar qual componente roda no endpoint, é supplicant. Se perguntar qual componente está no switch/AP e intermedeia a autenticação, é authenticator. Se perguntar o protocolo para o servidor, RADIUS."),
      ], visual: nacVisual, practiceIds: ["p-8021x-flow"] })],
    }),
    lesson({
      id: "l17-nac-modes", number: 17, title: "Agent-based, Agentless, In-band e Out-of-band", duration: 18,
      objective: "Comparar modos de implementação de NAC e reconhecer captive portal.",
      bridge: "O mesmo objetivo de admissão pode ser implementado por arquiteturas diferentes.",
      examFocus: ["agent-based", "agentless", "in-band", "out-of-band"],
      topics: [topic({ id: "t17-nac-modes", title: "Arquiteturas NAC", section: "Network Access Control", pages: "PDF 57", terms: [["Agent-Based NAC", "NAC com software no endpoint"], ["Agentless NAC", "NAC sem agente dedicado"], ["In-Band NAC", "NAC inline/no caminho do tráfego"], ["Out-of-Band NAC", "NAC que usa infraestrutura existente para reconfigurar acesso"], ["Captive Portal", "Portal cativo"]], blocks: [
        b("s", "simple", "Duas comparações diferentes", "Agent-based versus agentless pergunta se o endpoint precisa de software específico. In-band versus out-of-band pergunta onde o mecanismo de controle fica em relação ao tráfego."),
        b("comparison", "comparison", "Agent-based x Agentless", "O agente pode fornecer integração mais profunda com o endpoint; a abordagem sem agente reduz dependência de software instalado.", ["Agent-based: software especializado no dispositivo conversa com NAC.", "Agentless: autenticação pode ocorrer no navegador, sem agente dedicado."]),
        b("comparison2", "comparison", "In-band x Out-of-band", "A posição arquitetural muda como o acesso é imposto.", ["In-band/inline: appliance fica entre cliente e recursos, controlando diretamente o fluxo.", "Out-of-band: usa switch/AP e servidor para reconfigurar a rede conforme o resultado.", "Captive portal: exemplo intuitivo de in-band; solicita autenticação antes de liberar navegação."]),
        b("scenario", "scenario", "Hotel x ambiente corporativo", "Portal de hotel intercepta requisições até o hóspede informar dados: captive portal in-band. Em ambiente 802.1X, switch/AP conversa com servidor e altera o acesso: exemplo de out-of-band segundo o capítulo."),
        b("exam", "exam", "Como evitar confusão", "Não assuma que 'agent-based' significa automaticamente 'in-band'. São eixos diferentes de comparação."),
      ], practiceIds: ["p-nac-modes"] })],
    }),
    lesson({
      id: "l18-nac-policy", number: 18, title: "Política NAC: horário, função, localização e saúde", duration: 17,
      objective: "Tomar decisão NAC usando critérios contextuais e entender quarantine/remediation.",
      bridge: "Depois da arquitetura, o ponto decisivo é quais atributos a política usa para liberar ou limitar a rede.",
      examFocus: ["system health", "quarantine", "role-based access"],
      topics: [topic({ id: "t18-nac-policy", title: "Da autenticação à decisão de acesso", section: "Network Access Control", pages: "PDF 58", terms: [["Time of Day", "Horário"], ["Role", "Função"], ["Location", "Localização"], ["System Health", "Saúde do sistema"], ["Quarantine Network", "Rede de quarentena"], ["Remediation", "Remediação"]], blocks: [
        b("s", "simple", "Credencial válida não encerra a decisão", "A identidade pode estar correta e ainda assim o dispositivo receber acesso limitado. Políticas podem considerar horário, função do usuário, localização e saúde do endpoint."),
        b("technical", "technical", "Postura do endpoint", "System health pode incluir firewall local, definições antimalware e patches. Se o equipamento não atende baseline mínimo, a política pode negar ou direcionar para uma rede de quarentena com acesso apenas ao necessário para correção."),
        b("scenario", "scenario", "Exemplo", "Usuário financeiro autentica corretamente às 10h, mas notebook corporativo está sem patch crítico. O NAC envia o host a uma VLAN/rede de remediação. O problema é postura, não falha de identidade."),
        b("e", "evidence", "Log sintético", "Leia os campos em conjunto.", undefined, ["user=fin.julia radius=accept role=finance", "device=NB-771 patch_status=missing-critical", "host_firewall=enabled av_defs=current", "policy=corp-health action=quarantine"]),
        b("soc", "soc", "No SOC", "Quarentena pode ser controle preventivo/operacional de segurança, não necessariamente prova de comprometimento. Diferencie não conformidade de sinal malicioso e acompanhe a remediação."),
        b("exam", "exam", "Melhor resposta", "Se o enunciado descreve dispositivo legítimo mas fora do padrão e pede acesso mínimo para corrigir, quarantine/remediation network é resposta mais proporcional que liberar acesso completo."),
      ], practiceIds: ["p-nac-policy"] })],
    }),
    lesson({
      id: "l19-firewall", number: 19, title: "Firewall, ACL, DMZ e Default Deny", duration: 21,
      objective: "Entender zonas, rule base, ACL e o princípio default deny em um firewall de perímetro.",
      bridge: "NAC protege quem conecta diretamente à rede; firewall controla tráfego entre redes e zonas.",
      examFocus: ["firewall", "ACL", "DMZ", "default deny"],
      topics: [topic({ id: "t19-firewall", title: "Perímetro e rule base", section: "Firewalls and Network Perimeter Security", pages: "PDF 58–60", terms: [["Firewall", "Firewall"], ["Perimeter Security", "Segurança de perímetro"], ["Demilitarized Zone (DMZ)", "Zona desmilitarizada"], ["Screened Subnet", "Sub-rede protegida"], ["Triple-Homed Firewall", "Firewall conectado a três redes"], ["Access Control List (ACL)", "Lista de controle de acesso"], ["Default Deny", "Negação por padrão"]], blocks: [
        b("s", "simple", "O firewall controla fronteiras", "Quando tráfego tenta passar de uma zona para outra, o firewall compara a conexão com sua política. Uma DMZ/screened subnet hospeda serviços que precisam receber conexões externas sem colocar esses sistemas diretamente na rede interna."),
        b("technical", "technical", "Triple-homed e DMZ", "No desenho apresentado, o firewall conecta Internet, rede interna e DMZ. Servidores web/e-mail expostos podem ficar na DMZ; mesmo se comprometidos, o caminho para a rede interna continua sujeito à política do firewall."),
        b("steps", "steps", "Como a regra é avaliada", "A rule base/ACL descreve o tráfego permitido ou negado.", ["Identifique source IP/rede.", "Identifique destination IP/rede.", "Observe protocol e destination port/serviço.", "Aplique a regra correspondente e registre a decisão quando configurado.", "Se nenhuma regra permite explicitamente e a política é default deny, a conexão é negada."]),
        b("e", "evidence", "Regra e evento sintéticos", "Interprete o evento antes de concluir ataque.", undefined, ["rule=dmz-web allow tcp src=internet dst=172.20.10.20 dport=443", "event src=198.51.100.24 dst=172.20.10.20 dport=22 action=deny reason=default-deny"]),
        b("soc", "soc", "No SOC", "Uma negação é evidência de tentativa bloqueada, não de comprometimento. Correlacione volume, repetição, origem, alvo, porta e eventos posteriores no host."),
        b("exam", "exam", "Ponto essencial", "Default deny significa que o que não foi explicitamente permitido é negado. A CySA+ pode pedir interpretação de regra, log ou remediação baseada em segmentação."),
      ], visual: firewallVisual, practiceIds: ["p-firewall-log"] })],
    }),
    lesson({
      id: "l20-firewall-types", number: 20, title: "Packet Filtering, Stateful, NGFW e WAF", duration: 18,
      objective: "Escolher o tipo de firewall mais adequado ao nível de contexto necessário.",
      bridge: "Firewall é uma categoria ampla. Agora diferenciamos o que cada implementação consegue observar.",
      examFocus: ["packet filtering", "stateful", "NGFW", "WAF"],
      topics: [topic({ id: "t20-firewall-types", title: "Quatro tipos, quatro níveis de contexto", section: "Firewalls and Network Perimeter Security", pages: "PDF 60–61", terms: [["Packet Filtering Firewall", "Firewall de filtragem de pacotes"], ["Stateful Inspection Firewall", "Firewall com inspeção de estado"], ["Next-Generation Firewall (NGFW)", "Firewall de próxima geração"], ["Web Application Firewall (WAF)", "Firewall de aplicação web"]], blocks: [
        b("s", "simple", "Da regra simples ao contexto da aplicação", "Packet filtering olha características de pacotes. Stateful acompanha estado de conexões. NGFW acrescenta contexto como usuário e aplicação. WAF é especializado em tráfego de aplicação web."),
        b("comparison", "comparison", "O que muda", "Escolha pelo problema que precisa ser resolvido.", ["Packet filtering: cabeçalhos e regras básicas, comum em funções de roteadores.", "Stateful inspection: acompanha sessões/conexões em andamento.", "NGFW: usa contexto adicional de usuário, aplicação e processo de negócio.", "WAF: protege aplicações web contra padrões como SQL injection e cross-site scripting."]),
        b("scenario", "scenario", "Exemplo de escolha", "Se a necessidade é bloquear payloads de SQL injection contra uma aplicação HTTP, WAF é o controle especializado. Se a necessidade é permitir respostas de uma conexão TCP já estabelecida, stateful inspection usa o estado da sessão."),
        b("mistake", "mistake", "WAF não substitui todo firewall de rede", "Ele é especializado na aplicação web. Uma arquitetura madura pode usar WAF na camada web e firewall/NGFW para outras fronteiras e políticas."),
        b("exam", "exam", "Questão de melhor ferramenta", "Identifique a camada do problema. SQL injection/XSS → WAF. Estado de conexão → stateful. Contexto de usuário/aplicação → NGFW."),
      ], visual: firewallTypesVisual, practiceIds: ["p-firewall-types"] })],
    }),
    lesson({
      id: "l21-ports", number: 21, title: "Portas TCP do Capítulo 1", duration: 20,
      objective: "Reconhecer serviços comuns sem tratar porta como prova definitiva do protocolo ou de malícia.",
      bridge: "Regras de firewall costumam usar destination port, então precisamos reconhecer o vocabulário básico de serviços.",
      examFocus: ["common ports", "firewall logs"],
      topics: [topic({ id: "t21-ports", title: "Serviços e portas apresentados no capítulo", section: "Table 1.1 — Common TCP ports", pages: "PDF 60", terms: [["FTP", "20/21"], ["SSH", "22"], ["Telnet", "23"], ["SMTP", "25"], ["DNS", "53"], ["HTTP", "80"], ["POP3", "110"], ["NTP", "123"], ["IMAP", "143"], ["LDAP", "389"], ["HTTPS", "443"], ["LDAPS", "636"], ["SQL Server", "1433"], ["Oracle", "1521"], ["PPTP", "1723"], ["RDP", "3389"]], blocks: [
        b("s", "simple", "Porta é pista, não veredito", "Portas conhecidas ajudam a interpretar regras e logs, mas aplicações podem operar em portas diferentes. O número fornece contexto; conteúdo, processo, destino e comportamento confirmam o que realmente ocorre."),
        b("comparison", "comparison", "Agrupe para lembrar", "Memorize por famílias, não como uma sequência aleatória.", ["Administração: SSH 22, Telnet 23, RDP 3389.", "Web: HTTP 80, HTTPS 443.", "E-mail: SMTP 25, POP3 110, IMAP 143.", "Diretório: LDAP 389, LDAPS 636.", "Banco: SQL Server 1433, Oracle 1521.", "Infra/legados: FTP 20/21, DNS 53, NTP 123, PPTP 1723."]),
        b("soc", "soc", "No SOC", "Uma conexão para 3389 sugere RDP, mas confirme processo, host de destino, exposição permitida e horário. Uma porta inesperada pode ser configuração legítima ou tentativa de evasão."),
        b("e", "evidence", "Mini log", "Qual serviço você esperaria e o que ainda falta confirmar?", undefined, ["src=10.12.4.21 dst=10.12.8.15 proto=tcp dport=1433 action=allow", "asset=DB-PRD-02 role=database"]),
        b("exam", "exam", "Como estudar", "Para a prova, associe os pares mais comuns e use contexto. A pergunta costuma exigir reconhecer serviço provável, exposição inadequada ou regra necessária."),
      ], practiceIds: ["p-ports"] })],
    }),
    lesson({
      id: "l22-segmentation", number: 22, title: "Network Segmentation e Jump Box", duration: 20,
      objective: "Explicar como zonas de confiança e jump boxes reduzem acesso direto a ativos sensíveis.",
      bridge: "Firewall não serve apenas para separar Internet e rede interna; ele também pode separar áreas internas com níveis de confiança diferentes.",
      examFocus: ["segmentation", "jump box", "MFA"],
      topics: [topic({ id: "t22-segmentation", title: "Zonas internas de confiança", section: "Network Segmentation", pages: "PDF 61–62", terms: [["Network Segmentation", "Segmentação de rede"], ["Trust Zone", "Zona de confiança"], ["Datacenter", "Datacenter"], ["Jump Box", "Host intermediário de administração"], ["Secure Shell (SSH)", "Administração remota segura"], ["Remote Desktop Protocol (RDP)", "Protocolo de área de trabalho remota"], ["Multi-Factor Authentication (MFA)", "Autenticação multifator"]], blocks: [
        b("s", "simple", "Não dê caminho direto para tudo", "Segmentação separa redes com níveis de confiança diferentes. Um usuário da rede corporativa não precisa ter caminho direto para bancos e servidores de gerenciamento no datacenter."),
        b("technical", "technical", "Jump box como ponto de transição", "Administradores conectam primeiro ao jump box por protocolo seguro como SSH/RDP e autenticação forte. A partir dele, acessam a zona sensível. Isso reduz exposição direta e concentra logging/controle em um ponto conhecido."),
        b("scenario", "scenario", "Terceiros e BYOD", "Um notebook de contratado pode ser parcialmente confiável. Em vez de permitir conexão direta aos sistemas internos, a organização pode exigir acesso por jump box controlado."),
        b("soc", "soc", "No SOC", "Acesso ao datacenter que contorna o jump box é um sinal importante. Correlacione origem, MFA, conta administrativa, destino e sessão no host intermediário."),
        b("exam", "exam", "Melhor arquitetura", "Se o objetivo é restringir administração de zona sensível e criar trilha controlada, segmentação + jump box + MFA é mais apropriado que liberar RDP/SSH diretamente de qualquer estação."),
      ], visual: jumpVisual, practiceIds: ["p-jump-box"] })],
    }),
    lesson({
      id: "l23-deception", number: 23, title: "Honeypot e DNS Sinkhole", duration: 18,
      objective: "Diferenciar dois controles de deception e explicar como ajudam a detectar atividade maliciosa.",
      bridge: "Além de bloquear, defensores podem criar alvos ou respostas controladas que tornam a atividade do atacante mais observável.",
      examFocus: ["honeypot", "DNS sinkhole", "C2"],
      topics: [topic({ id: "t23-deception", title: "Defense Through Deception", section: "Defense Through Deception", pages: "PDF 62–63", terms: [["Honeypot", "Sistema-isca"], ["DNS Sinkhole", "Sumidouro DNS"], ["Command and Control (C2/C&C)", "Comando e controle"], ["Blocklist", "Lista de bloqueio"]], blocks: [
        b("s", "simple", "Atrair ou redirecionar", "Honeypot parece um alvo interessante para induzir interação e observar o atacante. DNS sinkhole responde de forma defensiva a consultas de domínios maliciosos, fazendo o host suspeito se conectar a um destino controlado em vez do C2 real."),
        b("comparison", "comparison", "Honeypot x Sinkhole", "Os dois aumentam observabilidade, mas atuam de modo diferente.", ["Honeypot: oferece serviço/sistema-isca e registra tentativas de comprometimento; seus sinais também podem alimentar blocklists defensivas quando a política permitir.", "DNS sinkhole: intercepta resolução de nome associada a malware/C2 e redireciona a comunicação."]),
        b("scenario", "scenario", "Exemplo sinkhole", "Endpoint consulta domínio conhecido de C2. O DNS defensivo devolve IP do sinkhole. A conexão ao sinkhole identifica qual host está tentando chegar ao C2 e permite priorizar remediação."),
        b("soc", "soc", "Investigação", "Interação com honeypot ou sinkhole é sinal forte porque usuários normais geralmente não precisam desses recursos. Mesmo assim, documente fonte, horário, processo/host e correlação antes de ampliar o escopo."),
        b("exam", "exam", "Diferença cobrável", "Se o cenário fala em sistema intencionalmente vulnerável para atrair atacante, pense honeypot. Se fala em resposta DNS falsa para domínio C2, pense DNS sinkhole."),
      ], visual: sinkholeVisual, practiceIds: ["p-deception"] })],
    }),
  ],
};
