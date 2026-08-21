import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const tvrVisual = v("v-tvr", "Threat + Vulnerability = contexto de risco", "flow", "Fluxo que conecta ameaça, vulnerabilidade, ativo e risco", "A relação é conceitual: sem ameaça relevante ou sem vulnerabilidade correspondente, o cenário muda de risco.", ["Threat — força/evento", "Vulnerability — fraqueza", "Ativo exposto", "Risk — possibilidade de impacto"]);
const nistVisual = v("v-nist-risk", "NIST SP 800-30 — visão do processo", "flow", "Fluxo de preparação, avaliação, comunicação e manutenção", "O capítulo usa o NIST SP 800-30 como referência para organizar uma avaliação: preparar, conduzir, comunicar e manter.", ["Prepare", "Threat sources/events", "Vulnerabilities", "Likelihood", "Impact", "Risk", "Communicate", "Maintain"]);
const riskMatrix = v("v-risk-matrix", "Matriz qualitativa de risco", "matrix", "Matriz de probabilidade por impacto com resultados baixo, médio e alto", "A matriz ajuda a transformar julgamentos qualitativos de likelihood e impact em uma classificação de risco consistente.", ["Likelihood", "Impact", "Risk"]);

export const unit02Risk: LearningUnit = {
  id: "u2-risk",
  title: "Unidade 2 — Avaliação de riscos",
  summary: "Conecta ameaças e vulnerabilidades ao impacto de negócio e às decisões de tratamento do risco.",
  lessons: [
    lesson({
      id: "l07-tvr", number: 7, title: "Threat, Vulnerability e Risk", duration: 18,
      objective: "Separar ameaça, vulnerabilidade e risco sem transformar a relação em uma fórmula matemática literal.",
      bridge: "A CIA Triad diz o que queremos preservar; análise de risco explica o que pode impedir esses objetivos.",
      examFocus: ["threat", "vulnerability", "risk"],
      topics: [topic({ id: "t07-tvr", title: "Três conceitos que não podem ser confundidos", section: "Evaluating Security Risks", pages: "PDF 50–52", terms: [["Threat", "Ameaça"], ["Vulnerability", "Vulnerabilidade"], ["Risk", "Risco"]], blocks: [
        b("s", "simple", "Ameaça é diferente de fraqueza", "Uma vulnerabilidade é uma fraqueza interna ou condição que pode ser explorada. Uma ameaça é uma força, pessoa, evento ou condição capaz de explorar ou afetar essa fraqueza. Risco surge quando existe uma combinação relevante entre ameaça, vulnerabilidade e impacto possível sobre a organização."),
        b("a", "analogy", "Chuva, telhado e dano", "Chuva é uma ameaça ambiental. Uma telha quebrada é vulnerabilidade. Se a casa está em uma região sem chuva, a vulnerabilidade existe, mas o risco relacionado à chuva é pequeno. Se chove muito e há equipamentos caros sob o vazamento, o risco cresce."),
        b("t", "technical", "Relação conceitual, não cálculo", "O capítulo representa risco como combinação de ameaça e vulnerabilidade para ensinar dependência entre fatores. Não use essa expressão como fórmula numérica automática. Em avaliações reais entram exposição, controles, likelihood e magnitude do impacto."),
        b("scenario", "scenario", "Threat sem vulnerabilidade relevante", "Um ator tenta explorar uma falha Apache que já foi corrigida no servidor. A ameaça existe, mas aquela vulnerabilidade específica não está presente; portanto, o cenário de risco daquela exploração é substancialmente reduzido."),
        b("scenario2", "scenario", "Vulnerabilidade sem ameaça relevante", "Um datacenter pode não ser resistente a terremotos, mas estar em região onde esse evento é extremamente improvável. A vulnerabilidade física existe; a ameaça correspondente pode ter likelihood muito baixo."),
        b("soc", "soc", "No SOC", "Não trate um IOC, uma CVE ou um alerta isolado como risco completo. Pergunte: qual ativo está envolvido, a condição realmente existe, há exposição, quais controles estão presentes e qual seria o impacto?"),
        b("exam", "exam", "Como a CySA+ diferencia", "Se a questão descreve uma fraqueza do sistema, pense vulnerability. Se descreve agente/evento capaz de causar dano, pense threat. Se combina os dois e pede consequência/probabilidade, pense risk."),
      ], visual: tvrVisual, practiceIds: ["p-tvr"] })],
    }),
    lesson({
      id: "l08-nist", number: 8, title: "NIST SP 800-30 — processo de avaliação", duration: 17,
      objective: "Entender o fluxo de avaliação de risco apresentado no capítulo sem extrapolar para um curso completo de NIST.",
      bridge: "Agora organizamos ameaça e vulnerabilidade em um processo repetível de avaliação.",
      examFocus: ["NIST SP 800-30", "risk assessment"],
      topics: [topic({ id: "t08-nist", title: "Preparar, conduzir, comunicar e manter", section: "Evaluating Security Risks — NIST SP 800-30", pages: "PDF 52–54", terms: [["Prepare for Assessment", "Preparar a avaliação"], ["Conduct Assessment", "Conduzir a avaliação"], ["Communicate Results", "Comunicar resultados"], ["Maintain Assessment", "Manter a avaliação"], ["Threat Source", "Fonte de ameaça"], ["Predisposing Condition", "Condição predisponente"]], blocks: [
        b("s", "simple", "Por que ter um processo?", "Sem método, duas equipes podem olhar o mesmo ambiente e chegar a conclusões incompatíveis. O processo cria uma sequência comum: definir contexto, identificar ameaças e vulnerabilidades, avaliar probabilidade e impacto, comunicar e manter o resultado atualizado."),
        b("steps", "steps", "Etapas em linguagem de trabalho", "O fluxo apresentado pelo capítulo pode ser lido como uma cadeia de perguntas.", ["Prepare: qual ambiente, objetivo e escopo serão avaliados?", "Conduct: quais fontes/eventos de ameaça e vulnerabilidades existem?", "Determine likelihood: qual a chance de o cenário ocorrer e gerar efeito?", "Determine impact: quão grave seria para confidencialidade, integridade e disponibilidade?", "Determine risk: como a organização classifica a combinação?", "Communicate: quem precisa decidir ou agir com base no resultado?", "Maintain: o que mudou no ambiente, ameaças ou controles desde a última avaliação?"]),
        b("soc", "soc", "Aplicação no SOC", "Uma avaliação de risco não é o mesmo que triagem de alerta, mas fornece contexto para priorização: criticidade do ativo, exposição, controles e impactos ajudam o SOC a decidir o que investigar primeiro."),
        b("note", "note", "Limite de profundidade", "O próprio capítulo sinaliza que os detalhes completos do NIST SP 800-30 estão além do escopo desta certificação. Aqui o objetivo é dominar a lógica do processo apresentado, não decorar toda a publicação."),
        b("exam", "exam", "Na prova", "Se a questão estiver em fase de avaliação, diferencie identificar ameaça/vulnerabilidade de comunicar o resultado ou manter a avaliação. A sequência importa porque decisões posteriores dependem das anteriores."),
      ], visual: nistVisual, practiceIds: ["p-nist-order"] })],
    }),
    lesson({
      id: "l09-threat-types", number: 9, title: "Quatro categorias de ameaça", duration: 18,
      objective: "Classificar ameaças como adversarial, accidental, structural ou environmental.",
      bridge: "O processo de risco começa identificando que tipo de ameaça realmente faz sentido para a organização.",
      examFocus: ["adversarial", "accidental", "structural", "environmental"],
      topics: [topic({ id: "t09-threat-types", title: "Adversarial, Accidental, Structural e Environmental", section: "Identify Threats", pages: "PDF 53–54", terms: [["Adversarial Threat", "Ameaça adversarial"], ["Accidental Threat", "Ameaça acidental"], ["Structural Threat", "Ameaça estrutural"], ["Environmental Threat", "Ameaça ambiental"]], blocks: [
        b("s", "simple", "A intenção muda a categoria", "Ameaças adversariais envolvem intenção deliberada. Ameaças acidentais decorrem de erro. Estruturais surgem de falhas de equipamentos, software ou controles de suporte. Ambientais vêm de eventos externos ao controle direto da organização."),
        b("comparison", "comparison", "Compare pelas causas", "Use a causa predominante, não apenas o efeito final.", ["Adversarial: atacante, insider malicioso, concorrente ou estado-nação age de propósito.", "Accidental: administrador exclui volume por engano ou usuário compartilha informação incorretamente.", "Structural: storage falha, refrigeração deixa de operar, software entra em exaustão de recursos.", "Environmental: incêndio, inundação, tempestade, falha ampla de telecomunicações."]),
        b("scenario", "scenario", "Mesmo efeito, causas diferentes", "Indisponibilidade pode ser adversarial (DoS), acidental (configuração errada), estrutural (equipamento falhou) ou ambiental (enchente). Classificar corretamente orienta prevenção e resposta."),
        b("soc", "soc", "No SOC", "Evite viés de ataque. Um pico de erro pode vir de invasor, alteração mal executada ou falha de infraestrutura. Correlacione mudança, saúde do equipamento, clima/energia e telemetria de segurança."),
        b("exam", "exam", "Atalho de raciocínio", "Pergunte primeiro se houve intenção deliberada. Se não, separe erro humano, falha estrutural e evento ambiental pela origem do problema."),
      ], practiceIds: ["p-threat-types"] })],
    }),
    lesson({
      id: "l10-insider", number: 10, title: "Insider Threat — ameaça interna", duration: 13,
      objective: "Entender que ameaça interna inclui comportamento malicioso, insatisfação e incompetência, não apenas invasores externos.",
      bridge: "Nem toda ameaça começa do lado de fora da rede. O modelo precisa considerar quem já possui acesso legítimo.",
      examFocus: ["insider threat"],
      topics: [topic({ id: "t10-insider", title: "Ameaças internas e externas", section: "The Insider Threat", pages: "PDF 54", terms: [["Insider Threat", "Ameaça interna"], ["Rogue Employee", "Funcionário mal-intencionado"], ["Disgruntled Employee", "Funcionário insatisfeito"]], blocks: [
        b("s", "simple", "Acesso legítimo também pode gerar risco", "Uma pessoa interna pode já conhecer processos, sistemas e dados. O risco pode nascer de intenção maliciosa, insatisfação ou simplesmente administração incompetente/descuidada."),
        b("t", "technical", "Por que controles internos importam", "Privilégio mínimo, segregação de funções, logging, revisão de acesso e monitoramento ajudam a reduzir o risco de abuso ou erro interno. Controles devem considerar tanto fontes internas quanto externas."),
        b("scenario", "scenario", "Exemplo", "Um administrador com privilégio amplo copia dados para local não autorizado. A conta é legítima e a autenticação funciona; a investigação precisa avaliar autorização e comportamento, não apenas sucesso de login."),
        b("soc", "soc", "No SOC", "Procure desvios de baseline: horário, volume, recurso acessado, elevação de privilégio, origem e relação com mudança de função. Não rotule uma pessoa como maliciosa sem evidência suficiente."),
        b("exam", "exam", "Ponto de prova", "Insider threat é fonte de ameaça. Não confunda com vulnerability, que seria a fraqueza que permite abuso, como privilégios excessivos ou ausência de monitoramento."),
      ], practiceIds: ["p-insider"] })],
    }),
    lesson({
      id: "l11-vulnerability", number: 11, title: "Identificando vulnerabilidades", duration: 14,
      objective: "Reconhecer vulnerabilidade como condição interna explorável e relacioná-la à CIA Triad.",
      bridge: "Depois de mapear fontes de ameaça, a avaliação olha para dentro e pergunta quais fraquezas essas ameaças poderiam explorar.",
      examFocus: ["vulnerability identification"],
      topics: [topic({ id: "t11-vulnerability", title: "Fraquezas internas e condições predisponentes", section: "Identify Vulnerabilities", pages: "PDF 54", terms: [["Vulnerability", "Vulnerabilidade"], ["Predisposing Condition", "Condição predisponente"], ["Remediation", "Remediação"]], blocks: [
        b("s", "simple", "Vulnerabilidade é o ponto fraco", "Pode estar em dispositivo, sistema, aplicação ou processo. O importante é que existe uma condição que pode permitir impacto sobre confidencialidade, integridade ou disponibilidade."),
        b("t", "technical", "Vulnerabilidade não é sinônimo de CVE", "Uma CVE é uma forma comum de registrar falhas conhecidas de software, mas vulnerabilidades também podem ser configurações inseguras, permissões excessivas, processo frágil, ausência de patch ou condição física."),
        b("scenario", "scenario", "Exemplo", "Servidor Apache desatualizado possui falha conhecida. Atualizar para versão corrigida remove a condição específica. A existência de atacantes na Internet é uma ameaça; a versão vulnerável é a fraqueza interna."),
        b("soc", "soc", "No SOC", "Ao investigar tentativa de exploração, valide se o ativo realmente executa a versão vulnerável, se o serviço está exposto, se há controle compensatório e se houve sinais de sucesso."),
        b("exam", "exam", "Como escolher", "Quando a questão pergunta o que deve ser corrigido no ambiente, geralmente está apontando para vulnerabilidade ou controle. Ameaças externas muitas vezes não podem ser eliminadas diretamente."),
      ], practiceIds: ["p-vulnerability"] })],
    }),
    lesson({
      id: "l12-likelihood-impact", number: 12, title: "Likelihood, Impact e matriz qualitativa", duration: 20,
      objective: "Avaliar probabilidade e impacto separadamente e combiná-los em uma classificação qualitativa de risco.",
      bridge: "Identificar ameaça e vulnerabilidade ainda não diz qual cenário merece atenção primeiro; precisamos estimar chance e consequência.",
      examFocus: ["likelihood", "impact", "qualitative risk"],
      topics: [topic({ id: "t12-likelihood-impact", title: "Probabilidade, impacto e rating", section: "Determine Likelihood, Impact, and Risk", pages: "PDF 54–56", terms: [["Likelihood", "Probabilidade"], ["Impact", "Impacto"], ["Qualitative Risk Assessment", "Avaliação qualitativa de risco"], ["Risk Rating", "Classificação de risco"]], blocks: [
        b("s", "simple", "Duas perguntas diferentes", "Likelihood pergunta quão provável é o cenário. Impact pergunta quão grave seria se acontecesse. Misturar as duas perguntas cedo demais produz avaliações inconsistentes."),
        b("t", "technical", "Likelihood considera mais de um fator", "O capítulo orienta considerar a chance de a fonte de ameaça iniciar/ocorrer e a chance de o evento realmente produzir efeito adverso considerando os controles existentes. Impact avalia magnitude sobre confidencialidade, integridade e disponibilidade."),
        b("comparison", "comparison", "Qualitativo x quantitativo", "O capítulo trabalha com categorias como low, medium e high. Isso é avaliação qualitativa. Métodos quantitativos atribuem valores numéricos e estão além do foco desta parte da CySA+."),
        b("scenario", "scenario", "Exemplo", "Ataque com likelihood média e impacto alto pode resultar em classificação geral alta conforme a matriz organizacional. Uma enchente com likelihood média e impacto baixo pode receber risco baixo no exemplo do capítulo."),
        b("mistake", "mistake", "Erro comum", "Não trate a matriz como verdade universal. A organização define os critérios de cada célula. A matriz é um mecanismo de consistência, não uma substituição do julgamento contextual."),
        b("exam", "exam", "Na CySA+", "Leia separadamente as pistas de probabilidade e de gravidade. Criticidade do ativo costuma influenciar impacto; exposição, atividade do adversário e força dos controles influenciam likelihood."),
      ], visual: riskMatrix, practiceIds: ["p-risk-matrix"] })],
    }),
    lesson({
      id: "l13-risk-treatment", number: 13, title: "Acceptance, Avoidance, Mitigation e Transference", duration: 17,
      objective: "Escolher estratégia de tratamento adequada ao risco identificado.",
      bridge: "Depois de classificar risco, a organização precisa decidir o que fazer com ele.",
      examFocus: ["risk treatment", "controls"],
      topics: [topic({ id: "t13-risk-treatment", title: "Quatro respostas ao risco", section: "Reviewing Controls", pages: "PDF 56", terms: [["Risk Acceptance", "Aceitação do risco"], ["Risk Avoidance", "Evitação do risco"], ["Risk Mitigation", "Mitigação do risco"], ["Risk Transference", "Transferência do risco"]], blocks: [
        b("s", "simple", "Quatro verbos úteis", "Aceitar é conviver conscientemente com o risco. Evitar é eliminar a atividade que o cria. Mitigar é reduzir likelihood ou impact com controles. Transferir desloca parte da consequência ou responsabilidade financeira/contratual a outra parte, sem fazer o risco técnico desaparecer magicamente."),
        b("comparison", "comparison", "Exemplos práticos", "A melhor resposta depende do custo, impacto e tolerância da organização.", ["Acceptance: manter um serviço de baixo risco com aprovação documentada.", "Avoidance: encerrar uma funcionalidade porque o risco excede o benefício.", "Mitigation: aplicar patch, segmentação ou MFA para reduzir probabilidade/impacto.", "Transference: usar seguro ou contrato para transferir parte da consequência financeira/operacional."]),
        b("scenario", "scenario", "Cenário", "Uma aplicação antiga é essencial e não pode ser substituída imediatamente. A empresa aceita o risco residual formalmente e implanta segmentação e monitoramento enquanto planeja migração. Nesse caso coexistem mitigação e aceitação residual."),
        b("soc", "soc", "No SOC", "O analista deve conhecer exceções e decisões de risco para evitar tratar toda condição conhecida como emergência. Porém, aceitação não significa ignorar telemetria: o risco aceito ainda deve ser monitorado conforme a decisão documentada."),
        b("exam", "exam", "Pegadinha", "Transferência não é mitigação técnica. Se a medida reduz a chance de exploração, é mitigation. Se muda quem absorve parte da consequência, é transference."),
      ], practiceIds: ["p-risk-treatment"] })],
    }),
    lesson({
      id: "l14-controls", number: 14, title: "Technical e Operational Controls", duration: 15,
      objective: "Distinguir os dois grupos de controles apresentados nesta seção do capítulo e reconhecer conteúdo complementar.",
      bridge: "Tratamento de risco normalmente se concretiza por controles. O capítulo separa aqui controles técnicos de operacionais.",
      examFocus: ["technical controls", "operational controls"],
      topics: [topic({ id: "t14-controls", title: "Controles técnicos e operacionais", section: "Reviewing Controls; Building a Secure Network", pages: "PDF 56", terms: [["Technical Control", "Controle técnico"], ["Operational Control", "Controle operacional"], ["Security Control", "Controle de segurança"]], blocks: [
        b("s", "simple", "Tecnologia x prática", "Controles técnicos são sistemas, dispositivos, software ou configurações que aplicam requisitos de segurança. Controles operacionais são práticas e procedimentos executados para fortalecer a segurança."),
        b("comparison", "comparison", "Exemplos do próprio capítulo", "A separação ajuda a não pensar que segurança é apenas ferramenta.", ["Técnicos: construir rede segura, NAC, firewall, segmentação, hardening e software de endpoint.", "Operacionais: penetration testing e reverse engineering usados para avaliar e entender controles/sistemas."]),
        b("soc", "soc", "No SOC", "Uma detecção pode depender de controle técnico (SIEM, EDR, firewall) e de controle operacional (processo de triagem, playbook, revisão, escalonamento). Ferramenta sem processo consistente produz lacunas."),
        b("complement", "complement", "Classificações que aparecem depois no livro", "Preventive, detective, responsive, corrective e compensating são classificações úteis, mas a taxonomia detalhada de tipos de controle é aprofundada em capítulo posterior. Nesta aula, elas são tratadas apenas como complemento para não atribuir ao Capítulo 1 algo que ele não desenvolve aqui."),
        b("exam", "exam", "Fidelidade ao contexto", "Quando a pergunta citar esta seção do Capítulo 1, priorize technical versus operational. Se o cenário explicitamente pedir efeito do controle (preventivo, corretivo etc.), use a taxonomia apropriada ao contexto da questão."),
      ], practiceIds: ["p-control-category"] })],
    }),
  ],
};
