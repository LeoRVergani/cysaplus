/**
 * Conteúdo autoral em português brasileiro.
 * Referência temática: guia CySA+ fornecido pelo usuário (CS0-003, 3ª edição).
 * Não reproduz questões, respostas ou trechos extensos da obra de referência.
 */

export type StudyModule = {
  id: string;
  chapter: number;
  domain: string;
  code: string;
  title: string;
  duration: number;
  difficulty: "Base" | "Intermediário" | "Avançado";
  overview: string;
  objectives: string[];
  keyConcepts: { term: string; definition: string; fieldNote: string }[];
  studyRoute: string[];
  labHint: string;
};

export type StudyQuestion = {
  id: string;
  moduleId: string;
  domain: string;
  difficulty: "Base" | "Intermediário" | "Avançado";
  format: "Múltipla escolha" | "Cenário";
  scenario?: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  trap: string;
  tags: string[];
  sourceType: "Autoral — revisada";
};

export type Flashcard = {
  id: string;
  moduleId: string;
  front: string;
  back: string;
  hint: string;
};

export type Lab = {
  id: string;
  title: string;
  moduleId: string;
  difficulty: "Base" | "Intermediário" | "Avançado";
  duration: number;
  scenario: string;
  evidence: string[];
  tasks: string[];
  expectedFindings: string[];
  solution: string;
};

export type LogScenario = {
  id: string;
  title: string;
  source: string;
  moduleId: string;
  severity: "Baixa" | "Média" | "Alta";
  objective: string;
  logs: string[];
  prompts: string[];
  analystNote: string;
};

export const courseModules: StudyModule[] = [
  {
    id: "m1",
    chapter: 1,
    domain: "Operações de Segurança",
    code: "OPS-01",
    title: "O analista de cibersegurança de hoje",
    duration: 55,
    difficulty: "Base",
    overview:
      "Comece pela lógica do trabalho defensivo: identificar o que pode dar errado, avaliar impacto e escolher controles que reduzam risco de forma mensurável. O analista não trabalha apenas com alertas; ele conecta ativos, exposição, processos e decisões.",
    objectives: [
      "Distinguir ameaça, vulnerabilidade, probabilidade, impacto e risco.",
      "Relacionar segmentação, hardening, patches e controles de endpoint a cenários reais.",
      "Reconhecer onde automação melhora a consistência sem substituir validação humana.",
    ],
    keyConcepts: [
      { term: "Risco", definition: "Combinação de probabilidade e impacto quando uma ameaça explora uma vulnerabilidade.", fieldNote: "Priorize contexto do ativo; a mesma falha não tem o mesmo risco em todos os sistemas." },
      { term: "Segmentação", definition: "Separação lógica ou física de fluxos para limitar movimento lateral e reduzir superfície exposta.", fieldNote: "Uma regra de firewall útil é específica: origem, destino, porta, protocolo e justificativa." },
      { term: "Hardening", definition: "Redução de exposição por meio de configurações seguras, remoção de serviços e controle de privilégios.", fieldNote: "Documente uma linha de base antes de alterar produção." },
    ],
    studyRoute: ["Mapeie ativo, ameaça e vulnerabilidade.", "Estime impacto operacional e exposição.", "Selecione controles preventivos, detectivos e corretivos.", "Defina o que será monitorado depois da mudança."],
    labHint: "Monte uma regra de acesso sintética que permita apenas o serviço indispensável entre duas zonas.",
  },
  {
    id: "m2",
    chapter: 2,
    domain: "Operações de Segurança",
    code: "OPS-02",
    title: "Arquitetura de sistemas e redes",
    duration: 70,
    difficulty: "Intermediário",
    overview:
      "Investigações confiáveis dependem de compreender onde workloads vivem, como identidades transitam e de onde chegam os logs. Este módulo conecta arquitetura on-premises, nuvem e híbrida com visibilidade, confiança e proteção de dados.",
    objectives: [
      "Comparar virtualização, contêineres e arquitetura sem servidor sob a perspectiva do monitoramento.",
      "Explicar por que sincronização de tempo e ingestão de logs sustentam investigações.",
      "Relacionar MFA, SSO, federação, PAM e CASB a controles de identidade modernos.",
    ],
    keyConcepts: [
      { term: "Sincronização de tempo", definition: "Alinhamento de relógios entre sistemas para que eventos possam ser correlacionados de forma confiável.", fieldNote: "Sem tempo consistente, uma linha do tempo de incidente pode inverter causa e efeito." },
      { term: "Zero Trust", definition: "Modelo que verifica explicitamente cada solicitação e reduz confiança implícita baseada apenas na localização de rede.", fieldNote: "Identidade, postura do dispositivo e contexto devem influenciar decisões de acesso." },
      { term: "PAM", definition: "Gestão de acesso privilegiado com controle, rastreabilidade e redução de privilégios permanentes.", fieldNote: "Contas administrativas devem ser tratadas como ativos de alto impacto." },
    ],
    studyRoute: ["Desenhe os limites de confiança.", "Liste fontes de log por camada.", "Marque caminhos de identidade e privilégios.", "Valide controles de dados sensíveis em trânsito e repouso."],
    labHint: "Correlacione três eventos sintéticos com fusos horários diferentes após normalizar o horário para UTC.",
  },
  {
    id: "m3",
    chapter: 3,
    domain: "Operações de Segurança",
    code: "OPS-03",
    title: "Atividade maliciosa",
    duration: 75,
    difficulty: "Intermediário",
    overview:
      "Detecção eficiente requer reconhecer comportamentos, não apenas nomes de malware. Este módulo trabalha persistência, execução suspeita, coleta de evidências e diferenças entre indicadores frágeis e sinais que sustentam uma hipótese.",
    objectives: [
      "Identificar sinais de execução, persistência e movimento lateral.",
      "Diferenciar IoCs de comportamentos e técnicas observáveis.",
      "Definir uma resposta inicial segura para um artefato suspeito.",
    ],
    keyConcepts: [
      { term: "IoC", definition: "Indicador observável associado a atividade suspeita, como hash, domínio ou endereço IP.", fieldNote: "Um IoC pode expirar; combine-o com comportamento e contexto." },
      { term: "Sandbox", definition: "Ambiente isolado para observar um arquivo ou URL sem expor a infraestrutura de produção.", fieldNote: "Use artefatos sintéticos ou adequadamente autorizados e registre a cadeia de análise." },
      { term: "Persistência", definition: "Mecanismo que tenta manter execução ou acesso após reinicialização, logoff ou alteração de sessão.", fieldNote: "Procure mudanças em inicialização, serviços, tarefas e mecanismos de login." },
    ],
    studyRoute: ["Classifique o sinal recebido.", "Preserve artefatos e metadados.", "Forme hipóteses por comportamento.", "Escale apenas com evidência suficiente e impacto conhecido."],
    labHint: "Analise uma sequência de criação de tarefa agendada e valide se ela corresponde a uma rotina esperada.",
  },
  {
    id: "m4",
    chapter: 4,
    domain: "Operações de Segurança",
    code: "OPS-04",
    title: "Inteligência de ameaças",
    duration: 60,
    difficulty: "Intermediário",
    overview:
      "Inteligência de ameaças é útil quando transforma informação externa em uma decisão local. Aprenda a avaliar relevância, confiabilidade, temporalidade e forma de compartilhamento antes de alterar regras, bloqueios ou prioridades.",
    objectives: [
      "Distinguir dados brutos, informação contextualizada e inteligência acionável.",
      "Avaliar fontes, confiança e validade temporal de indicadores.",
      "Converter uma descoberta externa em hipótese de detecção local.",
    ],
    keyConcepts: [
      { term: "Inteligência acionável", definition: "Conhecimento contextualizado que orienta uma decisão concreta, como priorizar monitoramento ou atualizar uma detecção.", fieldNote: "Pergunte sempre: qual ação muda se esta informação for verdadeira?" },
      { term: "PIR", definition: "Requisito prioritário de inteligência que delimita a pergunta que a coleta deve responder.", fieldNote: "Uma boa pergunta evita colecionar feeds sem finalidade." },
      { term: "TLP", definition: "Convenção de compartilhamento que indica como uma informação deve circular.", fieldNote: "Respeite a classificação ao repassar relatórios e indicadores." },
    ],
    studyRoute: ["Defina a pergunta de inteligência.", "Colete fontes com proveniência clara.", "Avalie confiança e relevância local.", "Produza uma ação, detecção ou decisão documentada."],
    labHint: "Receba um indicador externo sintético e decida se ele deve entrar em bloqueio, monitoramento ou fila de investigação.",
  },
  {
    id: "m5",
    chapter: 5,
    domain: "Operações de Segurança",
    code: "OPS-05",
    title: "Reconhecimento e coleta de inteligência",
    duration: 55,
    difficulty: "Intermediário",
    overview:
      "A coleta defensiva deve ser proporcional, autorizada e orientada a uma pergunta. Este módulo aborda reconhecimento passivo, exposição pública, inventário e validação de informações sem transformar análise em atividade invasiva.",
    objectives: [
      "Diferenciar reconhecimento passivo e ativo em um processo autorizado.",
      "Relacionar superfície externa a ativos, proprietários e risco.",
      "Documentar escopo, evidência e limitações de uma coleta.",
    ],
    keyConcepts: [
      { term: "Superfície de ataque", definition: "Conjunto de pontos por onde um ativo pode ser descoberto, acessado ou afetado.", fieldNote: "Ativos desconhecidos não podem ser protegidos adequadamente." },
      { term: "Reconhecimento passivo", definition: "Coleta que usa fontes publicamente disponíveis sem interagir diretamente com o alvo.", fieldNote: "Mesmo fontes públicas podem conter dados antigos; valide antes de agir." },
      { term: "Escopo", definition: "Limites autorizados de ativos, tempo, métodos e finalidade de uma atividade.", fieldNote: "Escopo explícito protege a organização e o analista." },
    ],
    studyRoute: ["Defina pergunta e autorização.", "Colete dados de fontes permitidas.", "Relacione achados ao inventário.", "Registre confiança, data e lacunas."],
    labHint: "Classifique uma lista fictícia de subdomínios por possível exposição e indique quem deve validar cada item.",
  },
  {
    id: "m6",
    chapter: 6,
    domain: "Gerenciamento de Vulnerabilidades",
    code: "VULN-01",
    title: "Desenhando um programa de vulnerabilidades",
    duration: 65,
    difficulty: "Base",
    overview:
      "Vulnerabilidade não é apenas uma lista de CVEs. Um programa eficaz começa por ativos e proprietários, define ciclos de descoberta e prioriza com contexto de negócio, exposição e possibilidade de exploração.",
    objectives: [
      "Descrever os componentes de um ciclo de gestão de vulnerabilidades.",
      "Associar inventário, propriedade e criticidade a priorização.",
      "Definir métricas úteis sem confundir volume com redução de risco.",
    ],
    keyConcepts: [
      { term: "Inventário de ativos", definition: "Registro de sistemas, aplicações, dados, proprietários e atributos relevantes para defesa.", fieldNote: "Sem proprietário definido, a remediação tende a estagnar." },
      { term: "SLA de remediação", definition: "Prazo acordado para tratar uma classe de risco ou vulnerabilidade.", fieldNote: "O prazo deve considerar criticidade, exposição e compensações disponíveis." },
      { term: "Controle compensatório", definition: "Medida que reduz risco quando a correção definitiva não pode ocorrer de imediato.", fieldNote: "Registre validade, dono e data de revisão do controle." },
    ],
    studyRoute: ["Descubra e valide ativos.", "Avalie exposição e criticidade.", "Atribua responsabilidade e prazo.", "Verifique correção e acompanhe exceções."],
    labHint: "Priorize cinco ativos fictícios usando exposição, dado tratado e facilidade de exploração, não somente a pontuação base.",
  },
  {
    id: "m7",
    chapter: 7,
    domain: "Gerenciamento de Vulnerabilidades",
    code: "VULN-02",
    title: "Analisando varreduras de vulnerabilidade",
    duration: 70,
    difficulty: "Intermediário",
    overview:
      "Resultados de scanner são ponto de partida. Este módulo ensina a separar descoberta de validação, interpretar cobertura, reconhecer falso positivo e cruzar achados com configuração, exposição e evidência técnica.",
    objectives: [
      "Comparar varredura autenticada e não autenticada.",
      "Identificar limitações de cobertura e qualidade de evidência.",
      "Organizar a validação de achados antes de escalar uma correção.",
    ],
    keyConcepts: [
      { term: "Varredura autenticada", definition: "Coleta que usa credenciais autorizadas para inspecionar configuração, patches e estado interno do ativo.", fieldNote: "Ela costuma fornecer maior profundidade, mas exige proteção de credenciais e escopo correto." },
      { term: "Falso positivo", definition: "Achado reportado que não representa uma condição vulnerável real no contexto avaliado.", fieldNote: "Não o descarte sem registrar por que a evidência foi invalidada." },
      { term: "Cobertura", definition: "Extensão em que ativos, portas, versões e configurações relevantes foram efetivamente avaliados.", fieldNote: "Uma ferramenta saudável pode produzir dados incompletos se o escopo for incompleto." },
    ],
    studyRoute: ["Verifique escopo e método da varredura.", "Leia a evidência do achado.", "Valide em conjunto com o dono do ativo.", "Classifique a ação: corrigir, mitigar, aceitar ou investigar."],
    labHint: "Compare dois resultados sintéticos e explique por que um host apresentou menos achados em uma varredura não autenticada.",
  },
  {
    id: "m8",
    chapter: 8,
    domain: "Gerenciamento de Vulnerabilidades",
    code: "VULN-03",
    title: "Respondendo a vulnerabilidades",
    duration: 60,
    difficulty: "Intermediário",
    overview:
      "Responder bem é escolher a intervenção certa no tempo certo, com validação posterior. O módulo aborda priorização baseada em risco, gestão de exceções, comunicação e comprovação de que a remediação realmente reduziu exposição.",
    objectives: [
      "Priorizar remediação com base em exploração, ativo e exposição.",
      "Diferenciar correção, mitigação, aceitação e transferência de risco.",
      "Planejar verificação pós-remediação e comunicação de exceções.",
    ],
    keyConcepts: [
      { term: "Prioridade contextual", definition: "Ordem de tratamento que combina severidade técnica com importância do ativo, exposição e evidência de exploração.", fieldNote: "Uma vulnerabilidade moderada em ativo exposto pode superar uma crítica isolada." },
      { term: "Exceção", definition: "Decisão formal e temporária de não aplicar a correção padrão, com justificativa e controles compensatórios.", fieldNote: "Exceções sem vencimento tornam-se dívida de segurança invisível." },
      { term: "Verificação", definition: "Confirmação independente de que a correção ou mitigação atingiu o resultado pretendido.", fieldNote: "Fechar ticket não prova redução de risco." },
    ],
    studyRoute: ["Ordene por risco observado.", "Escolha resposta e controles temporários.", "Coordene janela e comunicação.", "Reavalie e registre resultado."],
    labHint: "Defina um plano de 24 horas para uma falha explorada em serviço público com patch ainda indisponível.",
  },
  {
    id: "m9",
    chapter: 9,
    domain: "Resposta e Gestão de Incidentes",
    code: "IR-01",
    title: "Construindo um programa de resposta a incidentes",
    duration: 70,
    difficulty: "Base",
    overview:
      "Incidentes são tratados melhor antes de ocorrerem. Um programa maduro define papéis, contatos, limiares de escalonamento, procedimentos e exercícios para que a resposta seja coordenada quando o tempo é escasso.",
    objectives: [
      "Identificar componentes de um plano de resposta a incidentes.",
      "Relacionar preparação, playbooks e exercícios à redução de tempo de resposta.",
      "Definir uma cadeia de decisão e comunicação apropriada ao cenário.",
    ],
    keyConcepts: [
      { term: "Playbook", definition: "Procedimento orientado a cenário que reúne passos, decisões, evidências e contatos relevantes.", fieldNote: "Playbooks devem ser ensaiados e ajustados após incidentes reais ou simulados." },
      { term: "Escalonamento", definition: "Encaminhamento de uma decisão ou incidente para autoridade, especialidade ou nível de impacto adequado.", fieldNote: "Critérios claros evitam tanto atraso quanto ruído desnecessário." },
      { term: "Exercício de mesa", definition: "Simulação guiada em que pessoas discutem decisões e comunicação diante de um cenário.", fieldNote: "O valor está em revelar dependências e lacunas, não em ‘vencer’ a simulação." },
    ],
    studyRoute: ["Defina papéis e autoridade.", "Crie playbooks por cenário prioritário.", "Liste fontes de evidência e contatos.", "Exercite e transforme lições em melhorias."],
    labHint: "Organize uma tabela de papéis para um incidente de comprometimento de credencial administrativa.",
  },
  {
    id: "m10",
    chapter: 10,
    domain: "Resposta e Gestão de Incidentes",
    code: "IR-02",
    title: "Detecção e análise de incidentes",
    duration: 75,
    difficulty: "Avançado",
    overview:
      "Análise não é aceitar o alerta como verdade. O analista constrói uma linha do tempo, valida relevância, mede escopo e registra hipóteses alternativas antes de recomendar contenção que possa afetar o negócio.",
    objectives: [
      "Triagear alertas com base em evidência, contexto e impacto.",
      "Construir uma linha do tempo mínima para confirmar ou refutar hipótese.",
      "Diferenciar falso positivo, evento benigno e incidente confirmado.",
    ],
    keyConcepts: [
      { term: "Triage", definition: "Avaliação inicial para decidir prioridade, necessidade de investigação e próximo responsável.", fieldNote: "Triage eficiente reduz fila sem ignorar sinais de alto impacto." },
      { term: "Linha do tempo", definition: "Sequência temporal de eventos relevantes que ajuda a reconstruir o que ocorreu.", fieldNote: "Normalize tempo, fontes e identificadores antes de concluir causalidade." },
      { term: "Escopo", definition: "Extensão de usuários, ativos, dados e processos potencialmente afetados por um incidente.", fieldNote: "Escopo muda durante a investigação; mantenha o grau de confiança explícito." },
    ],
    studyRoute: ["Preserve o alerta original.", "Enriqueça com ativo, usuário e tempo.", "Teste hipóteses concorrentes.", "Atualize impacto, escopo e ação recomendada."],
    labHint: "Investigue uma sequência sintética de falhas de login e execução de processo sem assumir que há comprometimento antes da correlação.",
  },
  {
    id: "m11",
    chapter: 11,
    domain: "Resposta e Gestão de Incidentes",
    code: "IR-03",
    title: "Contenção, erradicação e recuperação",
    duration: 65,
    difficulty: "Avançado",
    overview:
      "A ação de conter precisa reduzir dano sem destruir evidências ou interromper mais serviços do que o necessário. Este módulo estrutura decisões de curto e longo prazo, erradicação da causa e retorno seguro à operação.",
    objectives: [
      "Comparar contenção de curto prazo e contenção estratégica.",
      "Diferenciar remoção de artefatos, correção da causa e recuperação validada.",
      "Definir critérios de retorno ao serviço e lições aprendidas.",
    ],
    keyConcepts: [
      { term: "Contenção", definition: "Ação para limitar propagação, acesso ou impacto enquanto a investigação prossegue.", fieldNote: "Isole com precisão sempre que possível e preserve requisitos de negócio críticos." },
      { term: "Erradicação", definition: "Remoção da causa e dos mecanismos que permitiram a atividade indesejada.", fieldNote: "Apagar um arquivo não basta se a credencial, configuração ou vetor persistir." },
      { term: "Recuperação", definition: "Retorno controlado à operação, com monitoramento reforçado e critérios de validação.", fieldNote: "Recuperar sem monitoramento pode reintroduzir o incidente sem percepção." },
    ],
    studyRoute: ["Defina risco imediato e evidência a preservar.", "Aplique contenção proporcional.", "Elimine causa e persistência.", "Restaure, monitore e revise o processo."],
    labHint: "Escolha entre isolar um endpoint ou bloquear uma conta em um cenário onde a disponibilidade é crítica.",
  },
  {
    id: "m12",
    chapter: 12,
    domain: "Relatórios e Comunicação",
    code: "REP-01",
    title: "Relatórios e comunicação",
    duration: 50,
    difficulty: "Base",
    overview:
      "Uma análise só gera valor quando é compreendida pelo público certo. Aprenda a estruturar relatórios que separam fatos, hipóteses, impacto, decisão solicitada e próximos passos sem mascarar incertezas.",
    objectives: [
      "Adaptar detalhe técnico à necessidade de cada público.",
      "Diferenciar fato observado, inferência e recomendação.",
      "Criar comunicação executiva que preserve precisão e urgência proporcional.",
    ],
    keyConcepts: [
      { term: "Público", definition: "Grupo que recebe a comunicação e precisa agir, decidir ou registrar o ocorrido.", fieldNote: "Executivos precisam de impacto e decisão; analistas precisam de evidência e método." },
      { term: "Evidência", definition: "Informação verificável que sustenta uma conclusão ou hipótese.", fieldNote: "Indique fonte, horário e nível de confiança em afirmações relevantes." },
      { term: "Recomendação", definition: "Ação sugerida com justificativa, dono e prazo proposto.", fieldNote: "Evite recomendações vagas como ‘melhorar segurança’." },
    ],
    studyRoute: ["Defina quem precisa decidir.", "Separe observações de interpretações.", "Resuma impacto e incerteza.", "Feche com responsáveis e próximo marco."],
    labHint: "Reescreva um alerta técnico em um briefing de cinco linhas para uma liderança não técnica.",
  },
  {
    id: "m13",
    chapter: 13,
    domain: "Relatórios e Comunicação",
    code: "REP-02",
    title: "Análise forense e técnicas para resposta",
    duration: 75,
    difficulty: "Avançado",
    overview:
      "Forense digital é disciplina de preservação, repetibilidade e contexto. O módulo introduz ordem de volatilidade, cadeia de custódia, aquisições e análise de artefatos para apoiar uma investigação sem contaminar evidência.",
    objectives: [
      "Explicar por que a ordem de coleta afeta evidências voláteis.",
      "Registrar cadeia de custódia de forma auditável.",
      "Diferenciar coleta, preservação, análise e apresentação de achados.",
    ],
    keyConcepts: [
      { term: "Ordem de volatilidade", definition: "Prioridade de coleta que busca preservar primeiro dados mais suscetíveis a desaparecer ou mudar.", fieldNote: "Planeje coleta antes de reiniciar, desligar ou alterar o sistema." },
      { term: "Cadeia de custódia", definition: "Registro de quem coletou, acessou, transferiu e armazenou uma evidência, quando e como.", fieldNote: "Ela protege integridade e explicabilidade da investigação." },
      { term: "Hash de integridade", definition: "Valor calculado para verificar se um arquivo ou imagem permanece inalterado.", fieldNote: "Documente algoritmo e valores antes e após transferências." },
    ],
    studyRoute: ["Preserve segurança e autorização.", "Colete dados voláteis quando necessário.", "Registre cada manuseio.", "Analise cópias de trabalho e reporte limitações."],
    labHint: "Monte uma cadeia de custódia sintética para uma imagem de disco e explique quais dados seriam coletados antes de desligar o host.",
  },
];

export const questions: StudyQuestion[] = [
  { id: "q1", moduleId: "m1", domain: "Operações de Segurança", difficulty: "Base", format: "Cenário", scenario: "Um servidor interno processa folhas de pagamento e possui um serviço de administração exposto apenas para a sub-rede de suporte.", prompt: "Qual ação reduz melhor o risco de movimento lateral sem interromper a operação prevista?", options: ["Permitir qualquer tráfego interno porque o servidor não é público.", "Criar uma regra específica de origem, destino, porta e protocolo para a sub-rede de suporte.", "Desativar todos os logs para melhorar desempenho.", "Compartilhar a conta administrativa com toda a equipe de TI."], answerIndex: 1, explanation: "Uma regra mínima e específica preserva o acesso necessário e reduz caminhos desnecessários. Segmentação eficaz usa limites claros e verificáveis.", trap: "O fato de o servidor ser interno não elimina risco; comprometimentos internos e credenciais abusadas ainda podem gerar movimento lateral.", tags: ["segmentação", "firewall", "menor privilégio"], sourceType: "Autoral — revisada" },
  { id: "q2", moduleId: "m1", domain: "Operações de Segurança", difficulty: "Base", format: "Múltipla escolha", prompt: "Qual sequência representa melhor uma avaliação de risco operacional?", options: ["Aplicar um patch e depois descobrir quais ativos existem.", "Identificar ameaça e vulnerabilidade, estimar probabilidade e impacto, selecionar controles e revisar o resultado.", "Bloquear todo tráfego e registrar exceções somente se houver reclamação.", "Usar apenas a pontuação de severidade técnica para decidir prioridade."], answerIndex: 1, explanation: "A avaliação conecta cenário de ameaça, fraqueza, chance, consequência e controle. O processo deve ser revisado após a mudança.", trap: "A severidade técnica é útil, mas não substitui criticidade do ativo, exposição e controles existentes.", tags: ["risco", "controles"], sourceType: "Autoral — revisada" },
  { id: "q3", moduleId: "m2", domain: "Operações de Segurança", difficulty: "Intermediário", format: "Cenário", scenario: "O SOC correlacionou um alerta de identidade às 09:03 e um log de endpoint às 06:03. O endpoint estava configurado em fuso horário diferente.", prompt: "Qual correção aumenta diretamente a confiabilidade da linha do tempo?", options: ["Excluir o log do endpoint por apresentar horário distinto.", "Normalizar os horários em uma referência comum e validar a sincronização de tempo das fontes.", "Usar apenas o horário mostrado na interface do SIEM.", "Assumir que o primeiro evento exibido é a causa do incidente."], answerIndex: 1, explanation: "Eventos de fontes diferentes precisam ser normalizados antes de estabelecer sequência. Sincronização e registro de fuso evitam conclusões erradas.", trap: "A ordem visual de uma ferramenta não garante causalidade quando há atraso de ingestão ou fusos diferentes.", tags: ["logs", "tempo", "correlação"], sourceType: "Autoral — revisada" },
  { id: "q4", moduleId: "m2", domain: "Operações de Segurança", difficulty: "Intermediário", format: "Múltipla escolha", prompt: "Qual prática melhor representa um princípio de Zero Trust?", options: ["Confiar em qualquer dispositivo conectado à rede corporativa.", "Conceder acesso permanente aos administradores para evitar interrupções.", "Verificar identidade, contexto e postura antes de liberar um recurso, mesmo para solicitações internas.", "Desativar MFA para serviços internos."], answerIndex: 2, explanation: "Zero Trust reduz confiança implícita e avalia cada solicitação com sinais apropriados, em vez de usar somente localização de rede.", trap: "Rede interna não é prova suficiente de identidade ou integridade de dispositivo.", tags: ["zero trust", "identidade", "MFA"], sourceType: "Autoral — revisada" },
  { id: "q5", moduleId: "m3", domain: "Operações de Segurança", difficulty: "Intermediário", format: "Cenário", scenario: "Após receber um alerta, o analista observa que um usuário executou uma tarefa agendada criada por uma conta que normalmente não administra servidores.", prompt: "Qual é a melhor próxima ação inicial?", options: ["Concluir imediatamente que houve ransomware e desligar todo o datacenter.", "Preservar detalhes da tarefa, enriquecer com contexto da conta e investigar persistência e execução relacionada.", "Remover o usuário do diretório sem registrar a evidência.", "Ignorar o alerta porque tarefas agendadas sempre são benignas."], answerIndex: 1, explanation: "A criação de tarefa é um sinal que pede investigação contextual. Preservar artefatos e verificar a legitimidade reduz a chance de resposta desproporcional.", trap: "Um único evento não confirma a família ou o impacto de uma ameaça; hipótese precisa de evidência.", tags: ["persistência", "triagem", "evidência"], sourceType: "Autoral — revisada" },
  { id: "q6", moduleId: "m3", domain: "Operações de Segurança", difficulty: "Intermediário", format: "Múltipla escolha", prompt: "Por que uma detecção baseada apenas em hash pode perder uma atividade maliciosa futura?", options: ["Porque hashes não podem ser armazenados em ferramentas de segurança.", "Porque um mesmo comportamento pode ser implementado em arquivos diferentes, com hashes diferentes.", "Porque hashes são sempre indicadores de alto nível e duráveis.", "Porque endpoint security não coleta telemetria de processo."], answerIndex: 1, explanation: "Hashes são indicadores específicos a um artefato. Comportamentos e técnicas podem oferecer cobertura mais resiliente quando o arquivo muda.", trap: "Indicadores são úteis, mas sua vida útil e abrangência variam.", tags: ["IoC", "detecção", "comportamento"], sourceType: "Autoral — revisada" },
  { id: "q7", moduleId: "m4", domain: "Operações de Segurança", difficulty: "Intermediário", format: "Múltipla escolha", prompt: "Qual característica torna uma informação de ameaça mais acionável para um SOC?", options: ["Ser longa e incluir todos os dados coletados pela fonte.", "Conter contexto suficiente para orientar uma decisão ou hipótese de detecção local.", "Ser enviada sem indicação de origem ou data.", "Ter muitos indicadores, independentemente do ambiente da organização."], answerIndex: 1, explanation: "Inteligência ganha valor quando tem contexto, relevância e caminho de ação. Volume de dados sem finalidade produz ruído.", trap: "Uma lista ampla de indicadores pode ser inadequada ou desatualizada para o ambiente local.", tags: ["threat intel", "PIR"], sourceType: "Autoral — revisada" },
  { id: "q8", moduleId: "m4", domain: "Operações de Segurança", difficulty: "Intermediário", format: "Cenário", scenario: "Um feed externo relata um domínio associado a uma campanha, mas a publicação tem oito meses e não explica a metodologia de coleta.", prompt: "Como o analista deve tratar o indicador antes de bloqueá-lo?", options: ["Bloquear automaticamente em todos os controles, pois qualquer feed é confiável.", "Avaliar proveniência, atualidade, confiança e relevância para o ambiente antes de definir uma ação.", "Ignorar qualquer inteligência externa para evitar falsos positivos.", "Compartilhar o domínio publicamente sem restrições."], answerIndex: 1, explanation: "A decisão deve considerar qualidade e adequação do dado. O resultado pode ser monitorar, investigar, bloquear ou descartar com justificativa.", trap: "Inteligência não é verdade absoluta; exige avaliação crítica e respeito à classificação de compartilhamento.", tags: ["confiança", "indicador", "TLP"], sourceType: "Autoral — revisada" },
  { id: "q9", moduleId: "m5", domain: "Operações de Segurança", difficulty: "Base", format: "Múltipla escolha", prompt: "Qual atividade é um exemplo de reconhecimento passivo autorizado?", options: ["Executar uma tentativa de login repetida contra um serviço externo.", "Consultar fontes públicas para relacionar domínios conhecidos à organização dentro do escopo aprovado.", "Explorar uma falha em um ativo de terceiros.", "Instalar um agente sem consentimento no endpoint de um fornecedor."], answerIndex: 1, explanation: "Reconhecimento passivo usa fontes acessíveis publicamente sem interação direta com o alvo. Ainda assim, deve respeitar escopo e finalidade.", trap: "Atividade ativa pode ser legítima quando autorizada, mas é diferente de coleta passiva.", tags: ["reconhecimento", "escopo"], sourceType: "Autoral — revisada" },
  { id: "q10", moduleId: "m5", domain: "Operações de Segurança", difficulty: "Intermediário", format: "Cenário", scenario: "Uma lista de subdomínios aparenta conter um ambiente de teste antigo. Não há proprietário nem confirmação de que ele pertence à organização.", prompt: "Qual é a resposta mais apropriada?", options: ["Publicar o nome do host em uma rede social para pedir ajuda.", "Relacionar o achado ao inventário, registrar a confiança e encaminhar para validação de propriedade antes de agir.", "Executar mudanças de DNS diretamente para remover o host.", "Considerar o ativo inexistente porque não está no inventário atual."], answerIndex: 1, explanation: "A exposição desconhecida exige validação de pertencimento, relevância e responsabilidade. Inventário incompleto é um risco, não uma justificativa para ignorar o achado.", trap: "Ações em ativos possivelmente de terceiros ou sem aprovação podem gerar impacto e violar escopo.", tags: ["inventário", "superfície de ataque"], sourceType: "Autoral — revisada" },
  { id: "q11", moduleId: "m6", domain: "Gerenciamento de Vulnerabilidades", difficulty: "Base", format: "Múltipla escolha", prompt: "Qual dado é mais importante para transformar uma lista de vulnerabilidades em plano de remediação?", options: ["Apenas o número de CVEs por host.", "O proprietário do ativo, sua criticidade, exposição e o prazo acordado de tratamento.", "A cor do painel de varredura.", "A quantidade de alertas gerados pela ferramenta no último mês."], answerIndex: 1, explanation: "Proprietário, valor do ativo e exposição conectam o achado à ação. Sem esses dados, o programa tende a acumular itens sem dono.", trap: "Volume de achados pode ser métrica de carga, mas não mede sozinho a redução de risco.", tags: ["inventário", "SLA", "priorização"], sourceType: "Autoral — revisada" },
  { id: "q12", moduleId: "m6", domain: "Gerenciamento de Vulnerabilidades", difficulty: "Intermediário", format: "Cenário", scenario: "Uma aplicação crítica não pode receber patch por trinta dias devido a uma janela de negócio, mas está acessível apenas por uma VPN corporativa com MFA.", prompt: "Qual medida é mais adequada até a correção definitiva?", options: ["Fechar o ticket porque o patch é inconveniente.", "Registrar uma exceção temporária, manter responsáveis e prazo, e avaliar controles compensatórios proporcionais.", "Desativar todos os controles da VPN para facilitar suporte.", "Aceitar o risco verbalmente, sem documentação."], answerIndex: 1, explanation: "Quando a correção é adiada, a decisão precisa ser explícita, temporária e acompanhada de controles e reavaliação.", trap: "Controles existentes reduzem risco, mas não eliminam a necessidade de governar a exceção.", tags: ["exceção", "controle compensatório"], sourceType: "Autoral — revisada" },
  { id: "q13", moduleId: "m7", domain: "Gerenciamento de Vulnerabilidades", difficulty: "Intermediário", format: "Múltipla escolha", prompt: "Qual é uma vantagem típica de uma varredura autenticada autorizada?", options: ["Ela elimina qualquer necessidade de validar achados.", "Ela pode inspecionar configurações e níveis de patch que uma observação externa não alcança.", "Ela evita a necessidade de proteger credenciais de varredura.", "Ela garante que todos os ativos da organização foram descobertos."], answerIndex: 1, explanation: "Credenciais controladas permitem visão mais profunda do estado interno. O resultado ainda depende de escopo, permissão e qualidade da evidência.", trap: "Autenticação não torna o scanner infalível nem substitui inventário e validação.", tags: ["scanner", "credenciais", "cobertura"], sourceType: "Autoral — revisada" },
  { id: "q14", moduleId: "m7", domain: "Gerenciamento de Vulnerabilidades", difficulty: "Intermediário", format: "Cenário", scenario: "Um scanner informa um pacote vulnerável, mas o responsável mostra que o fornecedor aplicou correção retroportada mantendo a mesma versão aparente.", prompt: "Como o analista deve registrar o resultado?", options: ["Manter como vulnerável sem consultar a evidência apresentada.", "Validar a correção aplicada, documentar a evidência e classificar o achado conforme o resultado da verificação.", "Excluir todos os resultados futuros desse scanner.", "Marcar como corrigido apenas porque o responsável solicitou."], answerIndex: 1, explanation: "A validação deve usar evidência técnica verificável. Se a condição não existir, o registro pode ser fechado como falso positivo ou exceção de detecção, com justificativa.", trap: "Aceitar uma declaração sem evidência enfraquece o programa; ignorar evidência também cria trabalho desnecessário.", tags: ["falso positivo", "validação"], sourceType: "Autoral — revisada" },
  { id: "q15", moduleId: "m8", domain: "Gerenciamento de Vulnerabilidades", difficulty: "Intermediário", format: "Cenário", scenario: "Há evidência pública de exploração para uma vulnerabilidade classificada como moderada em um aplicativo exposto à internet que processa dados de clientes.", prompt: "Qual abordagem de priorização é mais adequada?", options: ["Deixar para depois de todas as vulnerabilidades críticas, sem avaliar o contexto.", "Elevar a prioridade considerando exploração, exposição e valor do ativo, além da severidade técnica.", "Ignorar porque a pontuação base não é crítica.", "Remediar apenas quando houver incidente confirmado."], answerIndex: 1, explanation: "Prioridade deve ser contextual. Exploração conhecida e exposição podem elevar substancialmente o risco observado.", trap: "A pontuação técnica é um sinal importante, mas não é o único componente da decisão.", tags: ["priorização", "exploração", "exposição"], sourceType: "Autoral — revisada" },
  { id: "q16", moduleId: "m8", domain: "Gerenciamento de Vulnerabilidades", difficulty: "Base", format: "Múltipla escolha", prompt: "Qual atividade confirma melhor que uma vulnerabilidade foi realmente tratada?", options: ["Encerrar o ticket assim que uma equipe informa que aplicou o patch.", "Executar verificação apropriada após a mudança e registrar o resultado contra o ativo afetado.", "Remover o achado do painel manualmente.", "Esperar o próximo relatório mensal sem qualquer validação."], answerIndex: 1, explanation: "Verificação pós-remediação demonstra se a exposição foi reduzida. A atividade deve ser registrada e vinculada ao ativo e à mudança.", trap: "Conclusão administrativa não é evidência técnica de remediação.", tags: ["verificação", "remediação"], sourceType: "Autoral — revisada" },
  { id: "q17", moduleId: "m9", domain: "Resposta e Gestão de Incidentes", difficulty: "Base", format: "Múltipla escolha", prompt: "Qual elemento deve estar definido antes de um incidente para acelerar decisões de resposta?", options: ["Somente a ferramenta de tickets.", "Papéis, autoridade de escalonamento, contatos, critérios e playbooks para cenários prioritários.", "Uma única senha compartilhada para a equipe.", "A escolha de um culpado para cada tipo de alerta."], answerIndex: 1, explanation: "Preparação combina pessoas, processos e recursos. Playbooks e autoridade reduzem indecisão quando o incidente exige coordenação.", trap: "Ferramentas são úteis, mas não substituem responsabilidade e critérios acordados.", tags: ["IR", "playbook", "preparação"], sourceType: "Autoral — revisada" },
  { id: "q18", moduleId: "m9", domain: "Resposta e Gestão de Incidentes", difficulty: "Intermediário", format: "Cenário", scenario: "Durante um exercício de mesa, a equipe percebe que não sabe quem pode autorizar a interrupção de uma aplicação crítica.", prompt: "Qual resultado do exercício é mais valioso?", options: ["Encerrar o exercício porque não houve incidente real.", "Registrar a lacuna, definir autoridade e atualizar o plano e o playbook antes de uma ocorrência real.", "Atribuir a culpa à pessoa que levantou a dúvida.", "Ignorar a lacuna para não atrasar a simulação."], answerIndex: 1, explanation: "Exercícios existem para revelar dependências e melhorar o processo. Uma lacuna identificada deve virar ação com responsável e prazo.", trap: "A meta não é demonstrar perfeição; é reduzir incerteza operacional futura.", tags: ["exercício", "governança", "escalonamento"], sourceType: "Autoral — revisada" },
  { id: "q19", moduleId: "m10", domain: "Resposta e Gestão de Incidentes", difficulty: "Avançado", format: "Cenário", scenario: "Um alerta indica login fora do padrão. O usuário informa que estava viajando, e o endpoint associado apresenta telemetria normal. Ainda há tentativa de acesso a um recurso administrativo não usual.", prompt: "Qual ação de análise é mais adequada?", options: ["Declarar falso positivo apenas pela viagem informada.", "Enriquecer a investigação com histórico do usuário, recurso acessado, MFA, origem e sequência temporal antes de classificar o evento.", "Bloquear permanentemente todas as contas de viajantes.", "Excluir o alerta para reduzir a fila."], answerIndex: 1, explanation: "O alerta pode ter explicação legítima parcial, mas o acesso administrativo fora do padrão precisa ser correlacionado. Triage não deve se apoiar em um único sinal.", trap: "Contexto de viagem não confirma a legitimidade de todas as ações feitas na sessão.", tags: ["triagem", "identidade", "linha do tempo"], sourceType: "Autoral — revisada" },
  { id: "q20", moduleId: "m10", domain: "Resposta e Gestão de Incidentes", difficulty: "Avançado", format: "Múltipla escolha", prompt: "Por que registrar hipóteses alternativas durante uma investigação?", options: ["Para tornar o relatório mais longo.", "Para reduzir viés de confirmação e testar explicações concorrentes com evidência.", "Para evitar coletar logs.", "Para afirmar que todo alerta é malicioso."], answerIndex: 1, explanation: "Hipóteses explícitas ajudam a equipe a buscar evidências que confirmem ou refutem interpretações, evitando conclusões prematuras.", trap: "Uma boa investigação reconhece incerteza e atualiza conclusões à medida que surgem dados.", tags: ["análise", "viés", "evidência"], sourceType: "Autoral — revisada" },
  { id: "q21", moduleId: "m11", domain: "Resposta e Gestão de Incidentes", difficulty: "Avançado", format: "Cenário", scenario: "Um endpoint de finanças exibe execução suspeita, mas isolá-lo imediatamente impediria um fechamento mensal crítico. Há possibilidade de limitar credenciais e conexões específicas enquanto a coleta de evidências ocorre.", prompt: "Qual decisão reflete melhor contenção proporcional?", options: ["Desligar todos os sistemas financeiros sem avaliação.", "Aplicar controles temporários que reduzam alcance, preservar evidências e envolver o responsável pelo negócio na decisão de isolamento.", "Não fazer nada até haver confirmação absoluta.", "Apagar os arquivos suspeitos antes de coletar detalhes."], answerIndex: 1, explanation: "Contenção equilibra redução de risco, preservação de evidência e impacto operacional. A decisão deve ser registrada e revista conforme o escopo evolui.", trap: "Esperar certeza absoluta pode ampliar impacto; agir sem contexto pode causar dano operacional desnecessário.", tags: ["contenção", "negócio", "evidência"], sourceType: "Autoral — revisada" },
  { id: "q22", moduleId: "m11", domain: "Resposta e Gestão de Incidentes", difficulty: "Intermediário", format: "Múltipla escolha", prompt: "Qual afirmação diferencia melhor erradicação de recuperação?", options: ["Erradicação restaura backups; recuperação remove a causa.", "Erradicação remove a causa e mecanismos persistentes; recuperação devolve o serviço de modo controlado e monitorado.", "São sinônimos e podem ser executadas em qualquer ordem.", "Recuperação ocorre antes de contenção."], answerIndex: 1, explanation: "Erradicar trata o vetor e a persistência; recuperar retorna serviços com validação e monitoramento. As fases são relacionadas, mas possuem objetivos diferentes.", trap: "Restaurar um serviço antes de tratar a causa pode reintroduzir o problema.", tags: ["erradicação", "recuperação"], sourceType: "Autoral — revisada" },
  { id: "q23", moduleId: "m12", domain: "Relatórios e Comunicação", difficulty: "Base", format: "Múltipla escolha", prompt: "Qual estrutura é mais adequada para um briefing executivo sobre incidente em andamento?", options: ["Lista bruta de logs sem interpretação.", "Impacto atual, fatos confirmados, incertezas relevantes, decisão solicitada e próximo marco de atualização.", "Detalhes completos de todas as consultas executadas pelo analista.", "Apenas a afirmação de que a equipe está investigando."], answerIndex: 1, explanation: "Lideranças precisam entender impacto, confiança e decisão. Detalhes técnicos podem estar em anexo ou relatório operacional.", trap: "O briefing não deve mascarar incerteza, mas precisa orientar ação em vez de despejar telemetria.", tags: ["comunicação", "executivo", "relatório"], sourceType: "Autoral — revisada" },
  { id: "q24", moduleId: "m12", domain: "Relatórios e Comunicação", difficulty: "Intermediário", format: "Cenário", scenario: "O analista possui logs que comprovam acesso a um servidor, mas ainda não sabe se houve exfiltração de dados.", prompt: "Qual redação é mais precisa?", options: ["Dados foram exfiltrados com certeza.", "Foi observado acesso ao servidor; a investigação sobre possível exfiltração permanece em andamento.", "Nada aconteceu porque não há prova de exfiltração.", "O incidente está encerrado até que outro alerta apareça."], answerIndex: 1, explanation: "A comunicação deve separar fatos observados de hipóteses e trabalho pendente. Isso mantém credibilidade e permite decisão proporcional.", trap: "Ausência de confirmação não é prova de ausência, e inferência não deve ser apresentada como fato.", tags: ["fato", "hipótese", "confiança"], sourceType: "Autoral — revisada" },
  { id: "q25", moduleId: "m13", domain: "Relatórios e Comunicação", difficulty: "Avançado", format: "Cenário", scenario: "Um host suspeito ainda está ligado e a equipe considera reiniciá-lo para ‘limpar’ o ambiente antes de verificar memória e conexões ativas.", prompt: "Qual preocupação forense deve orientar a decisão?", options: ["Reiniciar sempre preserva todos os dados relevantes.", "Dados voláteis podem desaparecer; a equipe deve considerar preservação e coleta autorizada antes de alterar o estado do sistema.", "A cadeia de custódia só importa para arquivos em disco.", "Não é necessário registrar quem acessou o host."], answerIndex: 1, explanation: "Memória, conexões, processos e outros dados podem mudar ou desaparecer. A ordem de coleta e o registro de manuseio sustentam a análise posterior.", trap: "Ações de contenção podem ser necessárias, mas seus efeitos sobre evidências devem ser avaliados e documentados.", tags: ["forense", "volatilidade", "evidência"], sourceType: "Autoral — revisada" },
  { id: "q26", moduleId: "m13", domain: "Relatórios e Comunicação", difficulty: "Intermediário", format: "Múltipla escolha", prompt: "Qual prática fortalece a integridade de uma cópia forense?", options: ["Editar o arquivo original para remover dados irrelevantes.", "Calcular e registrar valores de integridade, guardar o original preservado e trabalhar em cópias controladas.", "Compartilhar a evidência por e-mail sem registro.", "Permitir acesso ilimitado à mídia para acelerar análise."], answerIndex: 1, explanation: "Cópias verificáveis, preservação do original e rastreabilidade reduzem risco de alteração não detectada e facilitam auditoria.", trap: "Conveniência não substitui controles de preservação e cadeia de custódia.", tags: ["hash", "cadeia de custódia", "integridade"], sourceType: "Autoral — revisada" },
];

export const flashcards: Flashcard[] = courseModules.flatMap((module) =>
  module.keyConcepts.slice(0, 2).map((concept, index) => ({
    id: `${module.id}-f${index + 1}`,
    moduleId: module.id,
    front: concept.term,
    back: concept.definition,
    hint: concept.fieldNote,
  })),
);

export const labs: Lab[] = [
  {
    id: "lab-login-01",
    title: "Triage de acesso fora do padrão",
    moduleId: "m10",
    difficulty: "Intermediário",
    duration: 25,
    scenario: "Um alerta sintético sinaliza login de uma conta financeira fora do padrão. Você deve determinar a prioridade da investigação sem assumir comprometimento.",
    evidence: [
      "08:57Z | idp | user=ana.s | result=success | mfa=pass | src=198.51.100.24",
      "09:02Z | vpn | user=ana.s | device=managed-lt-22 | country=BR | result=success",
      "09:04Z | app | user=ana.s | resource=finance-exports | action=read | result=denied",
      "09:06Z | edr | host=managed-lt-22 | process=browser.exe | reputation=known",
    ],
    tasks: ["Liste dois fatos confirmados.", "Formule uma hipótese legítima e uma hipótese de risco.", "Escolha a próxima fonte de evidência que mais reduz incerteza."],
    expectedFindings: ["MFA foi aprovado e o dispositivo é gerenciado.", "A tentativa de acesso a exportações foi negada.", "Ainda não há evidência suficiente para concluir exfiltração ou comprometimento."],
    solution: "Prioridade moderada para enriquecimento: validar padrão de viagem/horário, histórico da conta e tentativas relacionadas. Acesso negado é um sinal útil, mas não confirma comprometimento. Documente fatos, hipóteses e próximo passo.",
  },
  {
    id: "lab-vuln-02",
    title: "Priorização contextual de vulnerabilidades",
    moduleId: "m8",
    difficulty: "Intermediário",
    duration: 20,
    scenario: "Você recebeu quatro achados sintéticos. O objetivo é criar uma fila de tratamento que reflita risco observado, não apenas uma pontuação técnica.",
    evidence: [
      "A | Severidade alta | servidor de relatórios interno | sem exploração conhecida | dados internos",
      "B | Severidade moderada | portal público | exploração pública relatada | dados de clientes",
      "C | Severidade crítica | laboratório isolado | sem conectividade externa | ativo descartável",
      "D | Severidade alta | VPN corporativa | MFA ativo | acesso externo permitido",
    ],
    tasks: ["Escolha o primeiro item da fila e justifique.", "Indique um dado adicional necessário para os dois itens seguintes.", "Proponha um controle compensatório para a situação de patch adiado."],
    expectedFindings: ["O portal público com exploração relatada merece alta prioridade contextual.", "Criticidade, exposição e controles existentes alteram a ordem de tratamento.", "Qualquer exceção deve ter responsável, prazo e verificação."],
    solution: "Comece pelo item B, pois combina exposição pública, dados de clientes e exploração relatada. Para os demais, obtenha proprietário, conectividade real, caminho de ataque e controles. Use restrição de acesso, monitoramento e endurecimento como medidas temporárias quando aplicável.",
  },
  {
    id: "lab-forensics-03",
    title: "Preservação e cadeia de custódia",
    moduleId: "m13",
    difficulty: "Avançado",
    duration: 30,
    scenario: "Um endpoint pode ter executado um artefato suspeito. A equipe tem autorização para preservar evidências sintéticas antes de uma reinstalação planejada.",
    evidence: [
      "Host: ACCT-LT-17 | estado: ligado | usuário: desconectado",
      "Sinal: conexão incomum registrada há 12 minutos",
      "Mídia disponível: armazenamento criptografado para cópia controlada",
    ],
    tasks: ["Explique quais tipos de dados podem ser mais sensíveis à volatilidade.", "Defina três campos mínimos de cadeia de custódia.", "Indique por que a análise deve ocorrer sobre uma cópia controlada."],
    expectedFindings: ["Memória, processos, conexões e sessões podem mudar rapidamente.", "Coletor, horário, método, identificador e transferências precisam ser registrados.", "O original preservado reduz risco de alteração e mantém referência verificável."],
    solution: "Planeje a preservação antes de reiniciar ou alterar o host. Colete de forma autorizada, documente quem fez o quê e quando, registre valores de integridade e trabalhe em cópia controlada. O objetivo é manter explicabilidade e reduzir alteração não detectada.",
  },
];

export const logScenarios: LogScenario[] = [
  {
    id: "log-identity-01",
    title: "Identidade — acesso fora do padrão",
    source: "IdP + VPN + aplicativo financeiro",
    moduleId: "m10",
    severity: "Média",
    objective: "Correlacionar identidade, dispositivo e recurso antes de classificar um alerta.",
    logs: [
      "2026-08-18T08:57:11Z idp auth user=ana.s result=success mfa=pass src=198.51.100.24 device=managed-lt-22",
      "2026-08-18T09:02:34Z vpn session user=ana.s result=success country=BR device=managed-lt-22",
      "2026-08-18T09:04:09Z app access user=ana.s resource=finance-exports action=read result=denied",
      "2026-08-18T09:06:12Z edr telemetry host=managed-lt-22 process=browser.exe reputation=known",
    ],
    prompts: ["Quais fatos estão confirmados?", "Que hipótese legítima e que hipótese de risco ainda precisam de validação?", "Qual fonte reduziria mais a incerteza agora?"],
    analystNote: "A MFA aprovada e o dispositivo gerenciado reduzem incerteza, mas a tentativa de acesso fora do padrão merece enriquecimento. Não há evidência suficiente para afirmar comprometimento ou exfiltração.",
  },
  {
    id: "log-endpoint-02",
    title: "Endpoint — persistência a validar",
    source: "EDR + Windows Security (sintético)",
    moduleId: "m3",
    severity: "Alta",
    objective: "Distinguir um sinal de persistência de uma conclusão definitiva sobre malware.",
    logs: [
      "2026-08-19T14:17:03Z edr process host=ENG-LT-07 parent=explorer.exe image=updater-helper.exe signer=unknown",
      "2026-08-19T14:17:21Z winsec event=4698 host=ENG-LT-07 task=UpdateTelemetry owner=eng-user",
      "2026-08-19T14:18:05Z edr network host=ENG-LT-07 dst=203.0.113.42 port=443 action=allowed",
      "2026-08-19T14:19:40Z cmdb host=ENG-LT-07 owner=engineering classification=internal",
    ],
    prompts: ["Que artefatos precisam ser preservados?", "Quais detalhes ajudam a validar se a tarefa é legítima?", "Como você escalaria sem afirmar uma causa ainda não comprovada?"],
    analystNote: "A tarefa agendada e o executável sem assinante conhecido justificam prioridade de investigação. Preserve metadados, valide a origem da instalação e compare com inventário de software autorizado antes de concluir atividade maliciosa.",
  },
  {
    id: "log-network-03",
    title: "Rede — consulta DNS e transferência incomum",
    source: "DNS + proxy + firewall (sintético)",
    moduleId: "m2",
    severity: "Média",
    objective: "Conectar uma consulta DNS ao fluxo de rede, ao host e à política de saída.",
    logs: [
      "2026-08-20T11:03:10Z dns query host=SALES-LT-11 user=marcos.r qname=cdn-example-storage.test result=NOERROR",
      "2026-08-20T11:03:14Z proxy request host=SALES-LT-11 url=https://cdn-example-storage.test/upload action=allowed category=uncategorized",
      "2026-08-20T11:03:37Z firewall flow src=SALES-LT-11 dst=192.0.2.88 proto=tcp port=443 bytes_out=8423310 action=allow",
      "2026-08-20T11:05:02Z dlp event host=SALES-LT-11 policy=customer-data result=not-triggered",
    ],
    prompts: ["Quais dados de contexto você pediria antes de elevar a severidade?", "Que relação existe entre DNS, proxy e firewall neste recorte?", "Qual melhoria de telemetria ou política pode ser recomendada?"],
    analystNote: "O volume e a categoria desconhecida justificam triagem, mas não comprovam exfiltração. Correlacione histórico, proprietário do host, tipo de arquivo e inspeção permitida pela política antes de decidir contenção.",
  },
  {
    id: "log-cloud-04",
    title: "Nuvem — alteração de permissão sensível",
    source: "Auditoria de API em nuvem (sintética)",
    moduleId: "m4",
    severity: "Alta",
    objective: "Avaliar uma mudança de privilégio usando identidade, recurso, resultado e contexto de aprovação.",
    logs: [
      "2026-08-20T16:22:09Z cloud api user=ops-admin action=role.assign resource=storage-prod role=storage-admin result=success source=198.51.100.91",
      "2026-08-20T16:22:13Z cloud audit user=ops-admin ticket=missing change_window=closed",
      "2026-08-20T16:22:31Z cloud storage user=ops-admin action=list-objects resource=storage-prod result=success",
      "2026-08-20T16:24:42Z idp auth user=ops-admin result=success mfa=pass device=unmanaged",
    ],
    prompts: ["Quais elementos elevam a prioridade desta alteração?", "Quais contatos e fontes de validação devem ser acionados?", "Que contenção proporcional pode limitar impacto enquanto a análise avança?"],
    analystNote: "A concessão de privilégio em recurso de produção fora de janela e sem ticket deve ser tratada como alta prioridade. A MFA aprovada é relevante, mas não elimina a necessidade de validar o dispositivo, a autorização e o escopo da mudança.",
  },
];

export const pbq = {
  id: "pbq-ir-flow",
  title: "PBQ — Ordene a resposta inicial",
  moduleId: "m9",
  scenario: "Um alerta confiável indica que uma conta privilegiada pode ter sido usada fora do padrão. Organize as decisões iniciais de resposta sem destruir evidências nem ignorar impacto operacional.",
  correctOrder: ["Preservar o alerta e registrar o contexto inicial", "Enriquecer evidências e estimar escopo", "Escalonar conforme o playbook e a autoridade definida", "Aplicar contenção proporcional", "Documentar decisão, impacto e próximos passos"],
};

export const dailyPlan = [
  { id: "learn", label: "Aprender", description: "Uma aula curta com rota de estudo e conceitos-chave.", minutes: 25 },
  { id: "practice", label: "Praticar", description: "Questões autorais com explicações e registro de confiança.", minutes: 20 },
  { id: "review", label: "Revisar", description: "Flashcards e itens de baixa confiança em repetição espaçada.", minutes: 15 },
];
