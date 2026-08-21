import type { ChapterLab } from "../types";

export const chapter02Labs: ChapterLab[] = [
  {
    id: "c2lab01-vm-container", title: "Lab 2.1 — VM x Container sem risco", unitId: "c2u1-infra", lessonId: "c2l05-model-comparison",
    objective: "Comparar recursos, isolamento e telemetria de uma VM e de um container usando apenas workloads de teste.", environment: "PC pessoal/lab. Pode ser feito com VirtualBox/VMware e Docker/Podman; alternativa em papel caso ferramentas não estejam disponíveis.",
    tools: ["VirtualBox/VMware opcional", "Docker/Podman opcional", "Task Manager/top", "Ficha comparativa"], prerequisites: ["Aulas 1 a 5"],
    procedure: ["Escolha uma VM de laboratório e um container benigno, como um servidor web local.", "Anote processo, memória, armazenamento e sistema operacional percebido por cada workload.", "Identifique quais componentes pertencem ao host e quais ao guest/container.", "Pare e reinicie cada workload e observe persistência e tempo de inicialização.", "Liste pelo menos três fontes de telemetria que um SOC usaria em cada modelo.", "Se não houver ambiente, faça a mesma análise usando os diagramas e dados sintéticos do curso."],
    evidence: ["vm=Ubuntu-Lab guest_os=Ubuntu host=Windows", "container=nginx-lab image=nginx:stable host_kernel=shared", "telemetry=hypervisor + guest logs / runtime + app logs"],
    expectedOutcome: "O estudante explica por que VM e container têm fronteiras de isolamento e fontes de evidência diferentes.",
    observe: ["VM possui SO convidado completo.", "Container compartilha recursos do host e é mais leve.", "Falha no host pode afetar vários workloads.", "Imagem/container efêmero exige preservar contexto rapidamente."],
    questions: ["Qual modelo tem maior overhead?", "Qual fonte revela o image ID?", "Que evidência estaria disponível na camada de virtualização mas não dentro do guest?"],
    explanation: "Transforma a atividade de preparação de VMs do capítulo em comparação arquitetural segura e útil para análise.", cysaRelation: "Serverless, virtualization, containerization e implicações de segurança."
  },
  {
    id: "c2lab02-registry", title: "Lab 2.2 — Explorando o Windows Registry em modo leitura", unitId: "c2u2-os", lessonId: "c2l09-registry-roots",
    objective: "Reconhecer root keys, keys e values sem alterar configuração crítica.", environment: "Windows pessoal ou VM de teste. Não é necessário domínio.",
    tools: ["regedit", "PowerShell opcional", "Checklist do curso"], prerequisites: ["Aulas 8 e 9"],
    procedure: ["Abra regedit com autorização local adequada.", "Localize HKCR, HKLM, HKU, HKCU e HKCC.", "Expanda uma chave não sensível em cada raiz e identifique name/type/data de um value.", "Observe permissões de uma chave usando a interface, sem alterá-las.", "Procure uma chave de software instalada e compare contexto de usuário x máquina.", "Feche o editor sem fazer mudanças."],
    evidence: ["root=HKCU example=Software\\Vendor", "root=HKLM example=SOFTWARE\\Microsoft", "action=read-only no_changes=true"],
    expectedOutcome: "O estudante navega na estrutura e relaciona root keys ao escopo de configuração.",
    observe: ["HKCU é contexto do usuário atual.", "HKLM é escopo da máquina.", "Values possuem tipos diferentes.", "ACLs podem proteger chaves."],
    questions: ["Por que HKLM normalmente exige maior privilégio para alterar?", "Que evidência adicional você coletaria se uma Run key fosse criada?", "Qual diferença entre key e value?"],
    explanation: "Preserva o objetivo didático da atividade do livro, mas limita o laboratório a observação segura.", cysaRelation: "Windows Registry, configuration locations e persistence context."
  },
  {
    id: "c2lab03-cis", title: "Lab 2.3 — Avaliando um CIS Benchmark", unitId: "c2u2-os", lessonId: "c2l07-benchmarks",
    objective: "Aprender a ler uma recomendação de hardening e decidir se ela deve entrar no baseline.", environment: "Documento de benchmark público ou trecho de exemplo fornecido pelo instrutor; nenhuma mudança em produção.",
    tools: ["CIS Benchmark disponível legalmente", "Ficha de decisão", "Ambiente de teste opcional"], prerequisites: ["Aulas 6 e 7"],
    procedure: ["Escolha três recomendações do benchmark para um SO de laboratório.", "Para cada uma, registre objetivo, impacto operacional e método de verificação.", "Classifique como adotar, adaptar ou não adotar, justificando risco.", "Defina como testar a mudança antes de produção.", "Registre uma possível exceção e controle compensatório se necessário."],
    evidence: ["setting=disable-unused-service decision=adopt", "setting=account-lockout decision=adapt reason=availability/support", "validation=test-group-of-5-hosts"],
    expectedOutcome: "O estudante deixa de tratar benchmark como checklist cego e passa a transformá-lo em baseline testado.",
    observe: ["Recomendação pode ter impacto de negócio.", "Exceção precisa de justificativa.", "Validação deve ser mensurável."],
    questions: ["Qual configuração trouxe maior risco operacional?", "Como detectar configuration drift?", "Qual evidência provaria que a baseline foi aplicada?"],
    explanation: "Baseia-se no objetivo de revisão de guidelines do capítulo, sem reproduzir seus passos específicos.", cysaRelation: "System hardening, CIS Benchmarks e gestão de baseline."
  },
  {
    id: "c2lab04-log-correlation", title: "Lab 2.4 — Corrigindo uma linha do tempo desalinhada", unitId: "c2u3-logging", lessonId: "c2l14-time-sync",
    objective: "Normalizar timestamps de fontes com clock drift e reconstruir uma sequência com grau de confiança explícito.", environment: "Somente logs sintéticos do curso.",
    tools: ["Planilha/editor", "Calculadora de tempo", "Eventos sintéticos"], prerequisites: ["Aulas 13 a 16"],
    procedure: ["Copie os eventos sintéticos em uma tabela.", "Registre timezone e offset conhecido de cada fonte.", "Normalize todos para o mesmo horário.", "Ordene os eventos normalizados.", "Marque quais eventos ainda têm ordem incerta por falta de milissegundos/contexto.", "Escreva uma hipótese e uma evidência que poderia confirmá-la."],
    evidence: ["firewall raw=10:01:05 offset=0", "edr raw=10:06:19 offset=+00:05:00", "server raw=10:04:22 offset=+00:03:00", "normalized≈10:01:05 / 10:01:19 / 10:01:22"],
    expectedOutcome: "Linha do tempo corrigida e conclusão que diferencia ordem observada de causalidade comprovada.",
    observe: ["Clock drift pode inverter sequência aparente.", "NTP deve ser validado antes de incidentes.", "Normalização não cria evidência que não existia."],
    questions: ["Qual evento ocorreu primeiro após normalização?", "O que ainda não pode ser concluído?", "Como o SIEM deveria tratar timezone?"],
    explanation: "Converte o objetivo de time synchronization em prática de SOC imediatamente aplicável.", cysaRelation: "NTP, log ingestion, correlation e análise temporal."
  },
  {
    id: "c2lab05-federation", title: "Lab 2.5 — Mapeando SAML e OAuth sem credenciais reais", unitId: "c2u6-federation", lessonId: "c2l39-oidc",
    objective: "Montar visualmente os papéis de SAML e OAuth e distinguir authentication de authorization.", environment: "Papel/tela com cartões de papéis e tokens sintéticos; nenhum login real necessário.",
    tools: ["Cartões IDP/SP/Client/Resource Server", "Tokens sintéticos", "Fluxos do curso"], prerequisites: ["Aulas 33 a 39"],
    procedure: ["Monte o fluxo SAML com User, SP e IDP.", "Marque onde ocorre autenticação e onde o SP valida a assertion.", "Monte o fluxo OAuth com Resource Owner, Client, Authorization Server e Resource Server.", "Marque onde surge access token e o que ele autoriza.", "Adicione OpenID Connect e posicione o ID token.", "Liste três verificações de segurança de token/assertion."],
    evidence: ["saml issuer=idp.example audience=sp.example", "oauth scope=calendar.read audience=api.example", "oidc id_token sub=user-123 issuer=idp.example"],
    expectedOutcome: "O estudante separa claramente SAML, OAuth e OIDC e identifica os papéis em cenários de prova.",
    observe: ["IDP faz assertions em federação.", "OAuth é autorização delegada.", "OIDC adiciona identidade/autenticação.", "Audience, issuer, expiry e assinatura importam."],
    questions: ["Quem é o Resource Owner?", "Access token prova identidade?", "Qual artefato o SP SAML valida?"],
    explanation: "Prática conceitual reduz confusão de protocolos sem expor credenciais ou depender de provedores externos.", cysaRelation: "Federation, SAML, OAuth, OIDC e token validation."
  },
  {
    id: "c2lab06-pki-dlp", title: "Lab 2.6 — PKI, TLS inspection e decisão DLP", unitId: "c2u7-data", lessonId: "c2l46-dlp",
    objective: "Relacionar cadeia de confiança, inspeção TLS e proteção de dados em um cenário sintético.", environment: "Somente diagramas e logs sintéticos; nenhuma interceptação de tráfego real.",
    tools: ["Diagrama PKI", "Evento TLS sintético", "Alerta DLP sintético"], prerequisites: ["Aulas 42 a 47"],
    procedure: ["Ordene Requester → CSR → RA → CA → certificate.", "Marque em que situação o certificado deveria ser revogado.", "Desenhe cliente → TLS inspection → destino e identifique onde o conteúdo fica visível.", "Leia o alerta DLP e identifique classificação, usuário, destino e action.", "Decida se o caso exige bloqueio, investigação ou ambos e justifique."],
    evidence: ["cert issuer=Corp-CA status=valid", "inspection ca_trusted=true destination=files.example", "dlp classification=CHD destination=personal-drive.example action=blocked"],
    expectedOutcome: "O estudante entende que PKI estabelece confiança, TLS inspection recupera visibilidade e DLP aplica política ao dado classificado.",
    observe: ["RA e CA têm papéis diferentes.", "Inspection system é ativo sensível.", "DLP precisa de classificação e contexto.", "Canal cifrado não elimina risco de exfiltração."],
    questions: ["O que CRL resolve?", "Por que endpoint precisa confiar na CA da inspeção?", "Qual dado do alerta DLP justifica maior criticidade?"],
    explanation: "Integra os conceitos finais do capítulo em um exercício defensivo e não invasivo.", cysaRelation: "PKI, CRL, TLS inspection, DLP e sensitive data protection."
  }
];
