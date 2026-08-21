/**
 * Atlas de Incidentes — aprofundamentos autorais de leitura e revisão.
 * Cada bloco traduz temas do guia em decisões seguras e exemplos defensivos de SOC.
 */

export type ModuleExtension = {
  summary: string[];
  example: { title: string; context: string; steps: string[]; takeaway: string };
  selfCheck: string[];
  practiceOutput: string;
};

export const moduleExtensions: Record<string, ModuleExtension> = {
  m1: {
    summary: [
      "O trabalho do analista começa por contexto: ativo, serviço, dado, ameaça, vulnerabilidade e impacto não têm o mesmo peso em todos os casos.",
      "Controles preventivos reduzem oportunidade; detectivos tornam sinais visíveis; corretivos ajudam a restaurar ou reduzir dano após um evento.",
      "Automação é útil para normalizar, enriquecer e encaminhar, mas decisões com impacto operacional exigem critérios e validação humana.",
      "Melhoria contínua mede qualidade de processo: reduzir ruído, registrar exceções, revisar playbooks e corrigir lacunas recorrentes.",
    ],
    example: { title: "Exemplo — alerta em servidor interno", context: "Um servidor financeiro interno recebe uma tentativa de acesso administrativo fora da janela esperada.", steps: ["Identifique o ativo, o dono e o serviço afetado.", "Compare o evento com a linha de base e a janela de mudança.", "Preserve contexto de origem, conta, método e horário.", "Recomende a menor ação proporcional ao risco observado."], takeaway: "O primeiro alerta é um sinal de investigação; ele não comprova, sozinho, comprometimento." },
    selfCheck: ["Como ameaça, vulnerabilidade e impacto se combinam em risco?", "Qual controle seria detectivo neste cenário?", "Que decisão não deve ser automatizada sem critério de negócio?"],
    practiceOutput: "Produza uma matriz curta: ativo, risco, controle existente, evidência necessária e próximo responsável.",
  },
  m2: {
    summary: [
      "Arquitetura define visibilidade: servidores, contêineres, funções sem servidor e dispositivos de rede registram sinais diferentes e exigem fontes de log próprias.",
      "Uma linha do tempo confiável depende de tempo normalizado, fuso conhecido, origem identificável e atraso de ingestão documentado.",
      "Zero Trust reduz confiança implícita ao avaliar identidade, postura do dispositivo, contexto e recurso solicitado a cada acesso.",
      "Dados sensíveis precisam de classificação e controles em trânsito, em repouso e durante o uso; identidade privilegiada merece telemetria reforçada.",
    ],
    example: { title: "Exemplo — correlação híbrida", context: "Um alerta de identidade ocorre em nuvem enquanto o endpoint relacionado registra horário local diferente.", steps: ["Normalize os horários em UTC.", "Associe usuário, dispositivo e sessão aos identificadores comuns.", "Verifique se o recurso exigia MFA e postura gerenciada.", "Registre o que é confirmado e o que ainda depende de outra fonte."], takeaway: "Correlação é sobre relacionar fatos compatíveis, não apenas alinhar horários exibidos." },
    selfCheck: ["Por que NTP influencia uma investigação?", "Qual sinal de contexto Zero Trust pode mudar uma decisão?", "Qual a diferença entre SSO e federação?"],
    practiceOutput: "Desenhe um mapa de telemetria com identidade, endpoint, rede e nuvem, indicando a fonte de log de cada camada.",
  },
  m3: {
    summary: [
      "Atividade maliciosa é melhor entendida por comportamento e sequência do que por um indicador isolado e de vida curta.",
      "Sinais úteis incluem alteração de configuração, execução inesperada, persistência, acesso incomum, transferência atípica e desvio de linha de base.",
      "Análise de e-mail, URL ou arquivo deve ocorrer em ambiente autorizado e isolado; resultados devem preservar proveniência e limitações.",
      "Comportamento de usuário precisa de contexto: função, horário, dispositivo, mudança aprovada e recurso acessado podem explicar ou elevar um alerta.",
    ],
    example: { title: "Exemplo — persistência a validar", context: "Uma tarefa agendada é criada por uma conta que raramente administra servidores.", steps: ["Colete nome, comando, autor, horário e host.", "Compare com tarefas aprovadas e histórico da conta.", "Busque processos, conexões e mudanças correlatas.", "Escale somente depois de registrar hipótese e impacto."], takeaway: "A investigação protege a organização de respostas exageradas e de conclusões prematuras." },
    selfCheck: ["Por que um hash não cobre todo comportamento?", "Que artefatos ajudam a validar persistência?", "Quais fatos são necessários antes de rotular um arquivo como malicioso?"],
    practiceOutput: "Classifique cinco eventos sintéticos como benigno conhecido, investigar, falso positivo ou incidente confirmado, justificando a confiança.",
  },
  m4: {
    summary: [
      "Dados viram inteligência quando recebem contexto, avaliação de confiança, data de validade e uma ação possível para o ambiente local.",
      "O ciclo de inteligência começa por uma pergunta prioritária, orienta coleta e termina em decisão, detecção, relatório ou melhoria mensurável.",
      "TTPs são úteis para criar hipóteses de observação; indicadores isolados podem expirar e demandam avaliação contínua.",
      "Compartilhamento responsável respeita origem, restrição de circulação e necessidade de saber, evitando propagar informação sem propósito.",
    ],
    example: { title: "Exemplo — indicador externo", context: "Um feed cita um domínio associado a uma campanha há oito meses, sem metodologia de coleta.", steps: ["Avalie proveniência, idade e escopo da informação.", "Pesquise se existe telemetria interna relacionada.", "Escolha entre monitorar, investigar, bloquear ou descartar.", "Documente a decisão e o motivo."], takeaway: "Ação automática sem contexto pode introduzir bloqueios indevidos e ruído operacional." },
    selfCheck: ["O que torna uma informação acionável?", "Qual pergunta um PIR deve responder?", "Por que TLP importa para comunicação?"],
    practiceOutput: "Escreva uma hipótese de detecção baseada em TTP, fonte de dados, condição observável e possível falso positivo.",
  },
  m5: {
    summary: [
      "Coleta defensiva começa por autorização, objetivo e escopo. A melhor informação é inútil se não puder ser explicada ou usada com segurança.",
      "Inventário de ativos e topologia ajudam a relacionar um domínio, endereço, serviço ou registro de log ao seu proprietário e criticidade.",
      "Dados públicos e análise passiva podem envelhecer; cada achado precisa de data, fonte, confiança e validação do dono do ativo.",
      "DNS, configurações e captura de pacotes apoiam entendimento do ambiente quando analisados dentro de uma atividade autorizada.",
    ],
    example: { title: "Exemplo — ativo possivelmente esquecido", context: "Um subdomínio de teste aparece em fonte pública, mas não está no inventário atual.", steps: ["Registre a fonte e a data do achado.", "Relacione o nome a DNS, domínio e possíveis donos.", "Evite alterações antes da validação de propriedade.", "Crie encaminhamento para inventário e responsável."], takeaway: "Ativo desconhecido é um risco de inventário, não uma licença para agir fora do escopo." },
    selfCheck: ["O que diferencia coleta passiva de interação ativa?", "Quais campos documentam escopo?", "Como um inventário melhora a priorização?"],
    practiceOutput: "Monte um registro de achado com fonte, data, confiança, proprietário presumido e ação de validação.",
  },
  m6: {
    summary: [
      "Gestão de vulnerabilidades é um ciclo: descobrir ativos, avaliar exposição, priorizar, atribuir, remediar, verificar e aprender com exceções.",
      "A criticidade técnica só ganha significado quando combinada a ativo, dado, exposição, exploração conhecida, controles e dono responsável.",
      "SLA ajuda a coordenar tratamento, mas precisa permitir exceções formais, prazo de revisão e controles compensatórios mensuráveis.",
      "Métricas úteis mostram cobertura, idade, tendência, prazo e risco residual — não apenas quantidade de CVEs abertas.",
    ],
    example: { title: "Exemplo — duas falhas, prioridades diferentes", context: "Uma falha moderada existe em aplicação exposta; uma crítica está isolada em laboratório sem dados reais.", steps: ["Compare exposição, valor do ativo e probabilidade de exploração.", "Confirme a condição e o dono de cada ativo.", "Defina prazo, ação e controle temporário.", "Registre o risco residual até a verificação."], takeaway: "Prioridade contextual pode inverter a ordem baseada somente em pontuação técnica." },
    selfCheck: ["Qual informação falta se uma vulnerabilidade não tem dono?", "Como diferenciar métrica de volume e métrica de redução de risco?", "Quando usar controle compensatório?"],
    practiceOutput: "Priorize uma fila de cinco achados usando ativo, exposição, dado, exploração, controle e prazo.",
  },
  m7: {
    summary: [
      "Scanner é fonte de evidência, não árbitro final. Escopo, credencial, versão, alcance de rede e qualidade de assinatura influenciam cada resultado.",
      "Varredura autenticada tende a fornecer mais contexto de patch e configuração, mas exige credenciais protegidas e escopo aprovado.",
      "Falso positivo deve ser investigado e documentado com evidência verificável; não deve ser descartado por preferência ou pressão operacional.",
      "Tendência, cobertura e reconciliação com inventário evitam a falsa sensação de que ausência de alerta equivale a ausência de risco.",
    ],
    example: { title: "Exemplo — versão aparente vulnerável", context: "O scanner aponta pacote vulnerável, mas o fornecedor aplicou correção retroportada mantendo a versão exibida.", steps: ["Leia a evidência detalhada do scanner.", "Valide boletim e estado real do pacote.", "Registre a prova de correção ou a exceção de detecção.", "Ajuste o tratamento sem ocultar a decisão."], takeaway: "Validação técnica é diferente de aceitar ou rejeitar um resultado sem documentação." },
    selfCheck: ["O que uma varredura não autenticada pode deixar de ver?", "Como você provaria um falso positivo?", "Que tendência indicaria perda de cobertura?"],
    practiceOutput: "Explique a diferença entre cobertura, achado, evidência e prioridade em um relatório de varredura sintético.",
  },
  m8: {
    summary: [
      "Tratamento de risco pode mitigar, evitar, transferir ou aceitar. A escolha precisa ter justificativa, responsável, prazo e monitoramento.",
      "Gestão de mudança protege disponibilidade e rastreabilidade: mudança, janela, teste, reversão e verificação fazem parte da segurança.",
      "Segurança de software incorpora requisitos, revisão, testes e práticas de DevSecOps ao ciclo de entrega, não apenas ao final.",
      "Política define intenção; padrão define regra obrigatória; procedimento descreve como executar; diretriz orienta decisões não rígidas.",
    ],
    example: { title: "Exemplo — patch indisponível", context: "Há exploração conhecida em serviço público, mas não existe patch do fornecedor no prazo requerido.", steps: ["Meça impacto, exposição e controles existentes.", "Escolha mitigação temporária com dono e vencimento.", "Planeje mudança, teste e comunicação.", "Verifique eficácia e reavalie quando houver correção."], takeaway: "Exceção sem prazo e sem compensação é dívida de risco, não tratamento." },
    selfCheck: ["Quando evitar é diferente de mitigar?", "Qual documento descreve o passo a passo operacional?", "O que precisa constar em uma exceção?"],
    practiceOutput: "Monte uma decisão de risco com opção escolhida, impacto, controle temporário, dono, vencimento e critério de verificação.",
  },
  m9: {
    summary: [
      "Resposta madura começa antes do incidente: política, planos, playbooks, contatos, autoridade, fontes de evidência e exercícios devem existir antes da crise.",
      "Classificação de severidade combina impacto, escopo, urgência, criticidade e confiança; ela organiza atenção e escalonamento.",
      "Frameworks de ataque ajudam a estruturar hipótese e comunicação; não substituem fatos observados nem viram rótulo automático.",
      "Exercícios de mesa revelam dependências e pontos de decisão; o resultado deve virar melhoria de processo documentada.",
    ],
    example: { title: "Exemplo — possível conta privilegiada comprometida", context: "Um alerta confiável aponta uso fora do padrão de conta com privilégios administrativos.", steps: ["Classifique severidade inicial e responsável.", "Preserve alerta, escopo conhecido e contato de negócio.", "Aplique playbook de identidade com contenção proporcional.", "Atualize comunicação e registre decisões."], takeaway: "A escalada correta é uma decisão baseada em impacto e autoridade, não apenas em ansiedade diante do alerta." },
    selfCheck: ["Quais fases precisam existir no plano?", "Como severidade muda a comunicação?", "Como ATT&CK ajuda sem provar uma técnica?"],
    practiceOutput: "Crie uma matriz de severidade com critério, acionamento, público e objetivo de resposta para quatro níveis.",
  },
  m10: {
    summary: [
      "Detecção e análise combinam sinais de rede, endpoint, identidade, DNS, recursos e arquivos para testar hipóteses concorrentes.",
      "Uma investigação útil separa fato, inferência, lacuna e próximo dado necessário, registrando nível de confiança a cada etapa.",
      "Evidência precisa de preservação, integridade e origem compreensível; transformar dados em linha do tempo reduz inferências soltas.",
      "Anomalia não equivale a incidente. Uma rotina legítima pode ser incomum e uma atividade maliciosa pode parecer normal quando falta contexto.",
    ],
    example: { title: "Exemplo — login e DNS fora da linha de base", context: "Um usuário autenticou fora da rotina e o endpoint consultou domínio novo, mas o dispositivo é gerenciado.", steps: ["Normalize horário e identifique dispositivo, sessão e localização.", "Compare consultas DNS com processo e histórico.", "Busque mudança aprovada ou atividade de negócio relacionada.", "Defina escopo e ação apenas após enriquecimento."], takeaway: "Sinais combinados aumentam prioridade, mas a confirmação exige evidência e hipótese explícita." },
    selfCheck: ["Que fontes podem validar um login suspeito?", "Qual diferença entre evento e alerta?", "Por que cadeia de custódia pode ser necessária?"],
    practiceOutput: "Preencha uma linha do tempo com fatos, hipóteses, grau de confiança e fonte necessária para reduzir incerteza.",
  },
  m11: {
    summary: [
      "Contenção reduz propagação e impacto; ela deve considerar evidência, dependência de negócio, reversibilidade e autoridade para agir.",
      "Erradicação elimina causa, persistência e condições facilitadoras. Remover um arquivo não basta se credencial, regra ou configuração continuar exposta.",
      "Recuperação devolve serviço de forma controlada, com validação, monitoramento reforçado e critério de retorno conhecido.",
      "Pós-incidente deve registrar decisão, retenção de evidência, mudança aplicada, causa raiz e melhoria priorizada.",
    ],
    example: { title: "Exemplo — endpoint de alta criticidade", context: "Há telemetria suspeita em endpoint que suporta serviço operacional e não pode ser desligado sem plano.", steps: ["Preserve evidência de maior volatilidade.", "Avalie isolamento de rede, restrição de conta ou contenção por serviço.", "Coordene mudança e impacto com o dono.", "Defina recuperação e monitoramento pós-ação."], takeaway: "A melhor contenção reduz risco sem criar indisponibilidade maior que o próprio incidente." },
    selfCheck: ["Quando isolamento é melhor que remoção?", "O que distingue erradicação de recuperação?", "Qual evidência deve permanecer após encerramento?"],
    practiceOutput: "Compare três opções de contenção por impacto, reversibilidade, preservação de evidência e risco residual.",
  },
  m12: {
    summary: [
      "Relatório eficaz ajusta detalhe e ação ao público: liderança precisa de impacto e decisão; operação precisa de evidência, dono e passo seguinte.",
      "Fato, inferência e recomendação devem ser separados para que incerteza não pareça confirmação.",
      "Métricas e KPIs devem conectar trabalho a resultado: tempo de triagem, cobertura, idade de risco, tempo de contenção e qualidade de encerramento.",
      "Lições aprendidas tornam o incidente um insumo de melhoria quando são específicas, atribuídas e acompanhadas.",
    ],
    example: { title: "Exemplo — mesmo caso, três públicos", context: "Um acesso suspeito a relatório financeiro foi bloqueado por controle existente.", steps: ["Escreva ticket técnico com fonte, hora e artefatos.", "Escreva atualização executiva com impacto, decisão e confiança.", "Escreva nota operacional com próximo responsável e prazo.", "Verifique consistência entre as três versões."], takeaway: "Comunicação curta não é comunicação vaga: ela preserva fato, incerteza e ação." },
    selfCheck: ["Que informação não pode faltar no briefing executivo?", "Como diferenciar KPI e KRI?", "Qual recomendação é acionável?"],
    practiceOutput: "Transforme um mesmo alerta sintético em ticket, briefing executivo e atualização de plantão.",
  },
  m13: {
    summary: [
      "Forense é disciplina de preservação, repetibilidade e explicação. O objetivo é produzir achados defensáveis sem modificar indevidamente a fonte.",
      "Dados mais voláteis devem ser considerados antes de ações que mudem estado, como reinício, desligamento ou remoção de conta.",
      "Endpoint, rede, nuvem, máquinas virtuais e contêineres possuem artefatos diferentes; a coleta deve respeitar ambiente, autorização e limitação.",
      "Cadeia de custódia, hash, armazenamento e cópia de trabalho demonstram integridade e permitem explicar quem fez o quê, quando e como.",
    ],
    example: { title: "Exemplo — imagem e memória", context: "Um endpoint investigado pode precisar de aquisição antes de uma recuperação programada.", steps: ["Defina autorização e objetivo da coleta.", "Registre estado, operador, horário e mídia.", "Calcule e registre hash quando aplicável.", "Analise cópia de trabalho e preserve a evidência original."], takeaway: "Forense não é apenas ferramenta: método e documentação são parte da evidência." },
    selfCheck: ["Por que a ordem de volatilidade importa?", "O que uma cadeia de custódia registra?", "Por que analisar cópia de trabalho?"],
    practiceOutput: "Preencha um formulário sintético de cadeia de custódia com coleta, hash, transferência, armazenamento e acesso.",
  },
};
