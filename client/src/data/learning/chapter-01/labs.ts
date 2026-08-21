import type { ChapterLab } from "../types";

export const chapter01Labs: ChapterLab[] = [
  {
    id: "lab-cia-risk", title: "Lab 1 — Classificação CIA e risco", unitId: "u2-risk", lessonId: "l12-likelihood-impact",
    objective: "Classificar eventos pela CIA Triad e justificar likelihood, impact e risk rating.", environment: "Cenários sintéticos em papel/tela; nenhum sistema real é alterado.",
    tools: ["Tabela CIA", "Matriz qualitativa do curso", "Ficha de evidências"], prerequisites: ["Aulas 2 a 13"],
    procedure: ["Leia cada cenário sem olhar a resposta.", "Marque o objetivo CIA primário e secundários quando houver.", "Identifique threat e vulnerability separadamente.", "Atribua likelihood e impact qualitativos com justificativa.", "Use a matriz para obter rating e escolha uma resposta ao risco."],
    evidence: ["scenario=A: storage failure / customer portal unavailable", "scenario=B: unauthorized payroll access / no modification", "scenario=C: config hash changed / no change ticket"],
    expectedOutcome: "O estudante separa fato, ameaça, vulnerabilidade, impacto e tratamento em vez de chamar tudo de 'risco alto'.",
    observe: ["Um mesmo evento pode afetar mais de um objetivo CIA.", "Likelihood e impact são avaliados separadamente.", "Risk rating precisa de justificativa contextual."],
    questions: ["Que controle reduziria likelihood?", "Que controle reduziria impact?", "Qual evidência faltante mudaria sua classificação?"],
    explanation: "O laboratório consolida a primeira metade conceitual do capítulo antes dos controles técnicos.", cysaRelation: "CIA, threat/vulnerability/risk, likelihood, impact e resposta ao risco."
  },
  {
    id: "lab-firewall", title: "Lab 2 — Regra inbound e leitura de logs", unitId: "u3-network", lessonId: "l19-firewall",
    objective: "Criar ou simular uma regra inbound segura e interpretar allow/deny sem confundir bloqueio com comprometimento.", environment: "Preferencialmente VM Windows/Linux de teste; alternativa: somente regras/logs sintéticos.",
    tools: ["Firewall local de VM ou simulador textual", "Logs sintéticos", "Tabela de portas"], prerequisites: ["Aulas 19 a 21"],
    procedure: ["Escolha um serviço de laboratório e identifique porta/protocolo.", "Defina origem autorizada e destino.", "Crie regra específica em ambiente de teste ou escreva a regra em papel se não houver VM.", "Teste uma conexão permitida e uma não permitida.", "Registre o evento e explique qual campo determinou a decisão."],
    evidence: ["allow tcp src=10.10.20.0/24 dst=10.10.30.15 dport=443", "deny tcp src=198.51.100.20 dst=10.10.30.15 dport=22 reason=default-deny"],
    expectedOutcome: "O estudante consegue explicar source, destination, port, action, ACL e default deny.",
    observe: ["Regra específica é preferível a exposição ampla.", "Deny prova que o controle atuou, não que o atacante obteve acesso.", "Logs devem preservar timestamp e contexto da regra."],
    questions: ["Por que a segunda conexão foi negada?", "Que risco surgiria com origem 0.0.0.0/0 para administração?", "Quando WAF seria mais adequado que regra de rede?"],
    explanation: "Transforma o objetivo dos labs de firewall do capítulo em prática segura e independente de versão específica de Windows.", cysaRelation: "Firewall, ACL, portas, default deny, logs e remediação."
  },
  {
    id: "lab-nac", title: "Lab 3 — Fluxo 802.1X e decisão de postura", unitId: "u3-network", lessonId: "l18-nac-policy",
    objective: "Montar o fluxo supplicant → authenticator → RADIUS e separar autenticação de postura.", environment: "Diagrama e eventos NAC/RADIUS sintéticos; sem alterar infraestrutura real.",
    tools: ["Diagrama 802.1X", "Tabela de política", "Eventos sintéticos"], prerequisites: ["Aulas 15 a 18"],
    procedure: ["Rotule endpoint, supplicant, switch/AP, authenticator e servidor de autenticação.", "Desenhe o caminho 802.1X e RADIUS.", "Leia três eventos: usuário inválido, usuário válido/host saudável, usuário válido/host não conforme.", "Escolha deny, allow ou quarantine para cada cenário.", "Registre qual evidência determinou a decisão."],
    evidence: ["radius user=ana result=accept", "posture patch=missing-critical host_firewall=enabled", "policy action=quarantine remediation_vlan=90"],
    expectedOutcome: "O estudante explica que credencial aceita não implica acesso completo quando a postura falha.",
    observe: ["Authenticator não é o mesmo que authentication server.", "Quarantine pode permitir apenas remediação.", "Agent-based/agentless e in-band/out-of-band são comparações diferentes."],
    questions: ["Quem roda no endpoint?", "Por qual protocolo o switch/AP consulta o servidor?", "Que atributo de postura causou quarentena?"],
    explanation: "O laboratório converte o diagrama do capítulo em raciocínio operacional de NAC.", cysaRelation: "NAC, 802.1X, RADIUS, postura e logs."
  },
  {
    id: "lab-gpo", title: "Lab 4 — Planejar uma GPO de segurança", unitId: "u4-endpoint", lessonId: "l28-gpo",
    objective: "Projetar uma GPO de segurança e, se houver domínio de laboratório, aplicá-la sem tocar em produção.", environment: "Preferencialmente Windows Server/AD de laboratório; alternativa: plano em papel.",
    tools: ["Group Policy Management em laboratório (opcional)", "Checklist de baseline"], prerequisites: ["Aulas 24 a 30"],
    procedure: ["Escolha um grupo de sistemas fictício.", "Defina duas configurações de segurança mensuráveis, como firewall local ativo e política de senha.", "Determine o escopo da GPO e como validar aplicação.", "Se houver AD de laboratório, crie GPO somente nesse domínio de teste.", "Registre rollback e evidência de aplicação."],
    evidence: ["gpo=Endpoint-Baseline-Lab scope=OU-Lab", "windows_firewall=enabled", "min_password_length=12"],
    expectedOutcome: "O estudante entende centralização, escopo e validação de política sem reproduzir comandos específicos do livro.",
    observe: ["GPO tem grande alcance: escopo incorreto pode gerar impacto amplo.", "Baseline deve ser verificável.", "Mudanças precisam de rollback/controle."],
    questions: ["Por que uma GPO é melhor que configurar 100 máquinas manualmente?", "Qual evidência confirma aplicação?", "Que risco existe ao vincular a OU errada?"],
    explanation: "Mantém o objetivo educacional do lab de GPO do capítulo, mas em formato transformado e seguro.", cysaRelation: "Group Policy, configuração centralizada e hardening."
  },
  {
    id: "lab-pentest-plan", title: "Lab 5 — Penetration Testing Plan em papel", unitId: "u5-pentest", lessonId: "l32-pentest-planning",
    objective: "Escrever rules of engagement para um ambiente fictício sem executar nenhuma atividade ofensiva.", environment: "Documento local; alvo totalmente fictício.",
    tools: ["Template de planejamento"], prerequisites: ["Aulas 31 a 35"],
    procedure: ["Crie organização fictícia e objetivo defensivo do teste.", "Defina timing e janela de mudança.", "Liste sistemas dentro e fora do scope.", "Identifique pessoa/cargo que fornece authorization.", "Defina critérios de parada e contato de emergência.", "Esboce o que será entregue no reporting."],
    evidence: ["scope=intranet-lab.example; out_of_scope=prod.example", "timing=Saturday 22:00-02:00", "authorization=written approval from fictional security owner"],
    expectedOutcome: "Um plano claro, escrito e limitado, sem executar scanning ou exploração.",
    observe: ["Authorization vem antes de qualquer técnica.", "Scope deve conter exclusões explícitas.", "Timing reduz impacto operacional."],
    questions: ["Quem pode autorizar?", "O que fazer se descobrir ativo fora do escopo?", "Como Reporting fecha o ciclo?"],
    explanation: "O capítulo enfatiza timing, scope e authorization; o lab pratica somente planejamento seguro.", cysaRelation: "Planning, rules of engagement, ethics e reporting."
  },
  {
    id: "lab-hash-soar", title: "Lab 6 — Hash, sandbox report e playbook SOAR", unitId: "u7-operations", lessonId: "l45-enrichment",
    objective: "Correlacionar fingerprint de arquivo, comportamento sintético e enriquecimento de incidente em um fluxo automatizável.", environment: "Arquivos de texto próprios e eventos sintéticos; nenhuma amostra maliciosa real necessária.",
    tools: ["sha256sum/Get-FileHash", "Relatório sandbox sintético", "Fluxo de playbook"], prerequisites: ["Aulas 36 a 47"],
    procedure: ["Crie dois arquivos de texto idênticos e calcule SHA-256; compare.", "Modifique um caractere de um arquivo e recalcule o hash.", "Leia relatório sintético de sandbox e extraia comportamento relevante.", "Desenhe enriquecimento automático: hash/reputação, IP/Geo, SIEM, ativo, vulnerabilidade.", "Marque quais ações seriam automáticas e quais exigiriam aprovação humana."],
    evidence: ["sample_sha256=91ab...f08c", "sandbox=spawn-process + dns_query + tcp_connect", "asset=WEB-09 criticality=high", "decision=human-approval-before-quarantine"],
    expectedOutcome: "O estudante entende hash como identidade de conteúdo, sandbox como análise comportamental e SOAR como orquestração de contexto/ações.",
    observe: ["Hash diferente prova diferença, não malícia.", "Comportamento precisa de contexto.", "Automação de enriquecimento tem risco menor que contenção disruptiva."],
    questions: ["Que informação o hash responde?", "Que comportamento da sandbox merece correlação?", "Qual passo pode ser automatizado com menor risco?", "Quando pausar para analista?"],
    explanation: "Integra os conceitos finais do capítulo em uma prática defensiva, reproduzível e sem malware real.", cysaRelation: "Hashing, sandboxing, SOAR, enrichment e julgamento humano."
  }
];
