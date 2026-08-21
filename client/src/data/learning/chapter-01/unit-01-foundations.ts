import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const ciaVisual = v(
  "v-cia-triad",
  "CIA Triad: três objetivos que se complementam",
  "cards",
  "Três cartões conectados: confidencialidade, integridade e disponibilidade",
  "Segurança não é apenas impedir vazamento. Um programa equilibrado protege acesso, correção dos dados e disponibilidade do serviço.",
  ["Confidentiality — quem pode ver?", "Integrity — o dado continua correto?", "Availability — o serviço está acessível?"],
);

export const unit01Foundations: LearningUnit = {
  id: "u1-foundations",
  title: "Unidade 1 — Objetivos de cibersegurança e privacidade",
  summary: "Constrói a linguagem-base do capítulo: defesa em profundidade, CIA Triad e diferença entre segurança e privacidade.",
  lessons: [
    lesson({
      id: "l01-analyst-role", number: 1, title: "O trabalho do analista e defesa em profundidade", duration: 12,
      objective: "Entender o que o analista protege e por que controles sobrepostos são necessários.",
      bridge: "Antes de analisar alertas, precisamos saber qual objetivo estamos tentando preservar e por que um único controle não é suficiente.",
      examFocus: ["defense in depth", "CIA"],
      topics: [topic({
        id: "t01-analyst-role", title: "Objetivos do analista", section: "Chapter 1 introduction; Cybersecurity Objectives", pages: "PDF 47–48",
        terms: [["Defense in Depth", "Defesa em profundidade"], ["Security Control", "Controle de segurança"], ["Cybersecurity Analyst", "Analista de cibersegurança"]],
        blocks: [
          b("s", "simple", "O que o analista realmente protege?", "O analista não protege apenas computadores. Ele protege a capacidade da organização de usar informações e serviços com segurança. Isso inclui impedir acesso indevido, evitar alterações não autorizadas e manter os serviços disponíveis para quem precisa deles."),
          b("a", "analogy", "Cinto, airbag e freio", "Um carro não depende de um único recurso de segurança. Freios, cinto, airbag e estrutura trabalham juntos. Em cibersegurança, firewall, controle de acesso, hardening, monitoramento e resposta também se sobrepõem. Se uma camada falhar, outra ainda pode limitar o dano."),
          b("t", "technical", "Defesa em profundidade", "Defesa em profundidade organiza múltiplos controles com objetivos complementares. O valor não está em empilhar ferramentas sem critério, mas em cobrir caminhos diferentes de falha: identidade, rede, endpoint, aplicação, dados, detecção e resposta."),
          b("soc", "soc", "Como isso aparece no SOC", "Um alerta isolado raramente conta a história completa. O analista cruza telemetria de várias camadas: autenticação, firewall, endpoint, aplicação e inventário. Essa correlação é a versão operacional da defesa em profundidade."),
          b("exam", "exam", "Como a CySA+ pensa", "A prova tende a cobrar a melhor decisão diante de um cenário. Procure o objetivo de segurança afetado, os controles já existentes e qual medida reduz risco sem criar impacto desnecessário."),
        ], practiceIds: ["p-analyst-role"],
      })],
    }),
    lesson({
      id: "l02-confidentiality", number: 2, title: "Confidentiality — Confidencialidade", duration: 13,
      objective: "Distinguir confidencialidade de outros objetivos e reconhecer controles e incidentes que a afetam.",
      bridge: "Agora separamos os três objetivos da CIA Triad, começando pela pergunta: quem está autorizado a ver a informação?",
      examFocus: ["CIA", "confidentiality"],
      topics: [topic({
        id: "t02-confidentiality", title: "Confidencialidade", section: "Cybersecurity Objectives", pages: "PDF 48–49",
        terms: [["Confidentiality", "Confidencialidade"], ["Unauthorized Disclosure", "Divulgação não autorizada"], ["Access Control List (ACL)", "Lista de controle de acesso"]],
        blocks: [
          b("s", "simple", "A pergunta-chave", "Confidencialidade responde: somente pessoas e sistemas autorizados conseguem acessar a informação? Um dado pode estar correto e disponível, mas ainda haver incidente se alguém sem permissão conseguir lê-lo."),
          b("t", "technical", "Como controles preservam o sigilo", "Controles de acesso, ACLs, autenticação, criptografia e regras de rede reduzem a possibilidade de divulgação indevida. O controle deve existir no ponto em que o dado é armazenado, processado ou transmitido."),
          b("scenario", "scenario", "Exemplo empresarial", "Uma planilha de salários está íntegra e o servidor está funcionando. Porém, um grupo de usuários sem necessidade de negócio recebeu permissão de leitura. O problema primário é de confidencialidade, não de disponibilidade."),
          b("soc", "soc", "No SOC", "Investigue quem acessou, de onde, com qual conta, se a permissão era esperada e se houve download ou transferência. Um acesso bem-sucedido pode ser legítimo ou pode representar exposição de dados."),
          b("exam", "exam", "Pegadinha comum", "Criptografia costuma estar associada à confidencialidade, mas nem todo problema de confidencialidade é resolvido apenas com criptografia. Permissões excessivas continuam sendo um problema mesmo em sistemas criptografados."),
        ],
        visual: ciaVisual, practiceIds: ["p-cia-conf"],
      })],
    }),
    lesson({
      id: "l03-integrity", number: 3, title: "Integrity — Integridade", duration: 13,
      objective: "Reconhecer alterações indevidas e compreender como hashing e monitoramento apoiam a integridade.",
      bridge: "Depois de controlar quem pode ver, precisamos garantir que dados e sistemas não sejam modificados indevidamente.",
      examFocus: ["CIA", "integrity"],
      topics: [topic({
        id: "t03-integrity", title: "Integridade", section: "Cybersecurity Objectives", pages: "PDF 49",
        terms: [["Integrity", "Integridade"], ["Hashing", "Resumo criptográfico para verificação"], ["Integrity Monitoring", "Monitoramento de integridade"]],
        blocks: [
          b("s", "simple", "O dado continua confiável?", "Integridade trata da confiança de que a informação permanece correta e não sofreu alteração não autorizada, seja por ação maliciosa, erro humano ou falha técnica."),
          b("t", "technical", "Detecção de mudança", "Hashing e monitoramento de integridade permitem comparar um estado esperado com o estado observado. Uma diferença indica mudança; a investigação deve descobrir se ela foi autorizada e qual foi o impacto."),
          b("scenario", "scenario", "Exemplo empresarial", "Um arquivo de configuração do servidor é alterado fora da janela de mudança. O serviço continua disponível, mas a configuração já não corresponde ao baseline. A preocupação primária é integridade."),
          b("e", "evidence", "Evidência sintética", "Compare o estado conhecido com o atual antes de concluir malícia.", undefined, ["baseline_sha256=5f73...a910", "current_sha256=89b2...ee31", "change_ticket=none"]),
          b("exam", "exam", "O que a prova pode explorar", "Hash diferente significa que o conteúdo mudou; não prova, sozinho, que houve malware. A CySA+ valoriza a próxima etapa de validação e correlação."),
        ], practiceIds: ["p-cia-integrity"],
      })],
    }),
    lesson({
      id: "l04-availability", number: 4, title: "Availability — Disponibilidade", duration: 12,
      objective: "Entender como redundância, tolerância a falhas e recuperação mantêm serviços acessíveis.",
      bridge: "Mesmo dados sigilosos e íntegros perdem valor se usuários legítimos não conseguem acessá-los quando precisam.",
      examFocus: ["CIA", "availability"],
      topics: [topic({
        id: "t04-availability", title: "Disponibilidade", section: "Cybersecurity Objectives", pages: "PDF 49",
        terms: [["Availability", "Disponibilidade"], ["Fault Tolerance", "Tolerância a falhas"], ["Clustering", "Agrupamento para continuidade"], ["Backup", "Cópia para recuperação"]],
        blocks: [
          b("s", "simple", "Serviço acessível quando necessário", "Disponibilidade significa que usuários autorizados conseguem usar dados e serviços no momento em que precisam. Falha de hardware, ataque de negação de serviço ou desastre podem afetar esse objetivo."),
          b("t", "technical", "Reduzindo pontos únicos de falha", "Tolerância a falhas, clustering, redundância e backups reduzem o impacto de componentes que falham. O desenho deve considerar não só a tecnologia, mas também energia, conectividade e capacidade de recuperação."),
          b("scenario", "scenario", "Exemplo", "Um banco de dados não foi alterado e não houve vazamento, mas o storage falhou e o sistema ficou indisponível por horas. O incidente está principalmente ligado à disponibilidade."),
          b("soc", "soc", "No SOC", "Nem toda indisponibilidade é ataque. Compare sinais de DoS, saúde de infraestrutura, manutenção, consumo de recursos e eventos ambientais antes de classificar a causa."),
          b("exam", "exam", "Como diferenciar", "A pergunta é: o problema impede uso legítimo? Se sim, disponibilidade é o primeiro objetivo a considerar, ainda que outros objetivos também possam ser afetados."),
        ], practiceIds: ["p-cia-availability"],
      })],
    }),
    lesson({
      id: "l05-privacy", number: 5, title: "Privacy vs. Security", duration: 15,
      objective: "Separar proteção técnica dos dados das regras sobre coleta, uso e compartilhamento de informações pessoais.",
      bridge: "Segurança protege informação. Privacidade pergunta também se a organização deveria coletar, usar ou compartilhar aquela informação daquela maneira.",
      examFocus: ["privacy", "PII"],
      topics: [topic({
        id: "t05-privacy", title: "Segurança e privacidade são relacionadas, mas não idênticas", section: "Privacy vs. Security", pages: "PDF 49–50",
        terms: [["Privacy", "Privacidade"], ["Security", "Segurança"], ["Personally Identifiable Information (PII)", "Informação pessoal identificável"]],
        blocks: [
          b("s", "simple", "A diferença em uma frase", "Segurança pergunta como proteger os dados; privacidade também pergunta por que esses dados foram coletados, para qual finalidade, quem pode usá-los e com quem podem ser compartilhados."),
          b("a", "analogy", "Cofre seguro, uso inadequado", "Imagine um cofre impossível de arrombar. Se a empresa guarda ali dados pessoais que nunca deveria ter coletado, o cofre resolve segurança, mas não resolve a questão de privacidade."),
          b("t", "technical", "PII e obrigações", "Informações capazes de identificar ou relacionar-se a uma pessoa exigem controles de segurança, mas também regras de finalidade, transparência, acesso, retenção, divulgação e fiscalização. Essas obrigações podem vir de políticas, ética e legislação aplicável."),
          b("soc", "soc", "No SOC", "Durante um incidente, o analista precisa saber se a evidência contém PII e quem pode recebê-la. Preservar evidência não significa distribuir dados pessoais indiscriminadamente."),
          b("exam", "exam", "Ponto essencial", "Privacidade e segurança se sobrepõem, mas têm objetivos diferentes. Uma organização pode ter dados tecnicamente protegidos e ainda assim violar princípios de privacidade pelo uso ou compartilhamento inadequado."),
        ], practiceIds: ["p-privacy-vs-security"],
      })],
    }),
    lesson({
      id: "l06-gapp", number: 6, title: "GAPP — os dez princípios de privacidade", duration: 20,
      objective: "Aprender cada princípio GAPP e aplicar a diferença entre transparência, consentimento, coleta, uso, acesso e fiscalização.",
      bridge: "Depois de separar privacidade de segurança, usamos os dez princípios apresentados no capítulo como um mapa de governança.",
      examFocus: ["GAPP", "privacy"],
      topics: [topic({
        id: "t06-gapp", title: "Dez princípios, dez perguntas de governança", section: "Privacy vs. Security — GAPP", pages: "PDF 50",
        terms: [["Management", "Gestão"], ["Notice", "Aviso/Transparência"], ["Choice and Consent", "Escolha e consentimento"], ["Collection", "Coleta"], ["Use, Retention and Disposal", "Uso, retenção e descarte"], ["Access", "Acesso"], ["Disclosure", "Divulgação"], ["Security", "Segurança"], ["Quality", "Qualidade"], ["Monitoring and Enforcement", "Monitoramento e aplicação"], ["General Data Protection Regulation (GDPR)", "Regulamento Geral de Proteção de Dados da União Europeia"]],
        blocks: [
          b("s", "simple", "Como memorizar sem decorar uma lista", "Pense no ciclo de vida da informação pessoal: a organização governa suas práticas, avisa a pessoa, obtém escolhas/consentimento, coleta somente o necessário, usa e retém de forma coerente, permite acesso, controla divulgação, protege, mantém qualidade e fiscaliza o próprio cumprimento."),
          b("steps", "steps", "Princípios 1 a 5", "Os cinco primeiros respondem como a organização inicia e conduz o tratamento de PII.", ["Management: documenta políticas e responsabilidades de privacidade.", "Notice: informa quais dados são coletados e como serão usados.", "Choice and Consent: obtém escolha ou consentimento apropriado para armazenar, usar ou compartilhar.", "Collection: limita a coleta às finalidades comunicadas e consentidas.", "Use, Retention and Disposal: usa para finalidade declarada, retém pelo tempo adequado e descarta de forma coerente."]),
          b("steps2", "steps", "Princípios 6 a 10", "Os cinco seguintes tratam de direitos, terceiros, proteção, qualidade e fiscalização.", ["Access: permite que a pessoa consulte informações mantidas sobre ela quando aplicável.", "Disclosure: condiciona compartilhamento com terceiros às regras de aviso e consentimento.", "Security: protege PII contra acesso não autorizado.", "Quality: busca manter dados corretos e completos.", "Monitoring and Enforcement: cria processos para verificar e fazer cumprir a política de privacidade."]),
          b("scenario", "scenario", "Cenário aplicado", "Um aplicativo coleta telefone para recuperação de conta, mas posteriormente usa o número em campanha de marketing que não foi informada. Mesmo que o banco de dados esteja criptografado, existe questão de finalidade/uso e possivelmente de consentimento."),
          b("note", "note", "Leis podem transformar boas práticas em obrigação", "O capítulo usa o GDPR como exemplo de regime em que organizações que tratam dados de residentes da União Europeia precisam cumprir requisitos de privacidade. A prova aqui é conceitual: entenda que política, ética e legislação podem convergir."),
          b("mistake", "mistake", "Erro comum", "Não confunda Notice com Consent. Avisar é tornar a prática conhecida; consentir é dar ao indivíduo uma escolha ou autorização quando requerida. Também não confunda Security com todo o programa de privacidade: é apenas um dos princípios."),
          b("exam", "exam", "Para a prova", "Quando o cenário descreve coleta, uso, retenção, divulgação ou direitos da pessoa, procure o princípio que corresponde exatamente à ação, em vez de escolher genericamente 'security'."),
        ], practiceIds: ["p-gapp-notice", "p-gapp-lifecycle"],
      })],
    }),
  ],
};
