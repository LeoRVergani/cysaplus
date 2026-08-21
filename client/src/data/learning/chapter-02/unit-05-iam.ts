import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const aaaVisual = v(
  "c2v-aaa",
  "AAA: provar, permitir, registrar",
  "flow",
  "Fluxo de identidade para authentication, authorization e accounting",
  "AAA separa três perguntas que muitas vezes são confundidas: quem é você, o que pode fazer e o que foi feito.",
  ["Identity / attributes", "Authentication — quem é?", "Authorization — o que pode?", "Accounting — o que fez?"],
);

const mfaVisual = v(
  "c2v-mfa",
  "Fatores de autenticação",
  "cards",
  "Cartões de knowledge, possession, biometric e location",
  "MFA exige categorias distintas. Duas senhas continuam sendo dois segredos do mesmo fator de conhecimento.",
  ["Knowledge — algo que você sabe", "Possession — algo que você tem", "Biometric — algo que você é", "Location — onde você está"],
);

const ssoVisual = v(
  "c2v-sso",
  "SSO reduz logins repetidos",
  "flow",
  "Usuário autentica uma vez e acessa múltiplas aplicações por identidade central",
  "SSO melhora experiência e reduz password reuse, mas aumenta impacto caso a identidade central seja comprometida.",
  ["User", "Identity service", "App A", "App B", "App C", "Reauthentication/MFA for sensitive action"],
);

export const chapter02Unit05Iam: LearningUnit = {
  id: "c2u5-iam",
  title: "Unidade 5 — Identity and Access Management",
  summary: "Construa um modelo mental de identidade, AAA, MFA, passwordless e SSO antes de entrar em federação.",
  lessons: [
    lesson({
      id: "c2l27-identity-aaa", number: 27, title: "Identity, attributes e AAA", duration: 20,
      objective: "Separar identidade, authentication, authorization e accounting e entender privilege management.",
      bridge: "Arquitetura de rede decide por onde o acesso passa; IAM decide quem ou qual serviço pode realizar a ação.",
      examFocus: ["identity", "AAA", "privilege management"],
      topics: [topic({
        id: "c2t27-identity-aaa", title: "Quem é, o que pode e o que fez", section: "Identity and Access Management", pages: "97",
        terms: [["Identity", "Identidade"], ["Attribute", "Atributo"], ["Authentication", "Autenticação"], ["Authorization", "Autorização"], ["Accounting", "Contabilização/auditoria"], ["Privilege Management", "Gestão de privilégios"]],
        blocks: [
          b("simple", "simple", "Identidade é um conjunto de afirmações", "Uma identidade representa um usuário, serviço ou outro subject e carrega atributos como nome, função, grupos e outras propriedades usadas por sistemas."),
          b("technical", "technical", "AAA", "Authentication prova a identidade por credenciais/fatores. Authorization aplica políticas e direitos à identidade autenticada. Accounting registra e monitora o uso para responder quem acessou o quê e quando."),
          b("comparison", "comparison", "Não misture as três etapas", "Um login bem-sucedido não significa autorização ilimitada.", ["Authentication: ‘sou realmente Ana?’", "Authorization: ‘Ana pode acessar Financeiro?’", "Accounting: ‘Ana acessou Financeiro às 10:42 e baixou qual arquivo?’"]),
          b("soc", "soc", "Investigar acesso", "Correlacione identidade, atributos/grupos, resultado de autenticação, decisão de autorização e logs de uso. Isso permite distinguir credencial válida de atividade autorizada."),
          b("evidence", "evidence", "Fluxo sintético", "O acesso falhou depois da autenticação porque a política negou o recurso.", undefined, ["auth user=ana result=success factor=password+token", "authorize user=ana resource=/payroll action=read result=deny reason=role-mismatch", "accounting session=9fe2 src=10.20.30.4"]),
          b("exam", "exam", "CySA+", "Questões de IAM frequentemente trocam authentication por authorization. Leia o verbo do cenário: provar identidade, permitir ação ou registrar uso."),
        ],
        visual: aaaVisual,
        practiceIds: ["c2p27-aaa"],
      })],
    }),
    lesson({
      id: "c2l28-mfa-factors", number: 28, title: "MFA e fatores distintos", duration: 19,
      objective: "Classificar knowledge, possession, biometric e location e verificar se um desenho realmente é multifator.",
      bridge: "AAA começa pela autenticação. MFA melhora a confiança ao exigir categorias independentes de prova.",
      examFocus: ["MFA", "authentication factors", "2FA"],
      topics: [topic({
        id: "c2t28-mfa-factors", title: "Duas credenciais só são MFA se forem fatores diferentes", section: "Identity and Access Management — Multifactor Authentication", pages: "98–99",
        terms: [["Multifactor Authentication (MFA)", "Autenticação multifator"], ["Knowledge Factor", "Fator de conhecimento"], ["Possession Factor", "Fator de posse"], ["Biometric Factor", "Fator biométrico"], ["Location Factor", "Fator de localização"]],
        blocks: [
          b("simple", "simple", "A regra", "MFA combina pelo menos dois fatores de categorias diferentes. Senha + PIN continua sendo knowledge + knowledge e, portanto, não cria dois fatores distintos."),
          b("comparison", "comparison", "Categorias", "Associe o método ao tipo de evidência.", ["Knowledge: senha, passphrase, PIN", "Possession: token, smartcard, authenticator app/dispositivo", "Biometric: impressão digital, voz, retina", "Location: posição/rede/local confiável quando usada como fator"]),
          b("scenario", "scenario", "Exemplo", "Senha + código gerado no celular = knowledge + possession. Senha + PIN = um único tipo de fator, apesar de haver duas entradas."),
          b("soc", "soc", "O que observar em um login MFA", "Registre método, dispositivo/token, origem, resultado, tentativa de recovery e mudança recente de fator. Ataques muitas vezes tentam contornar o fluxo forte usando helpdesk ou recuperação fraca."),
          b("exam", "exam", "CySA+", "Conte categorias, não campos. Passphrase e PIN pertencem ao mesmo fator de conhecimento."),
        ],
        visual: mfaVisual,
        practiceIds: ["c2p28-mfa-factors"],
      })],
    }),
    lesson({
      id: "c2l29-mfa-limitations", number: 29, title: "MFA falha quando o recovery é fraco", duration: 16,
      objective: "Entender limitações de MFA e por que suporte, backup e entrega do segundo fator fazem parte do desenho.",
      bridge: "Adicionar um segundo fator não ajuda se existir uma rota de recuperação que o ignora facilmente.",
      examFocus: ["MFA security", "recovery", "token loss"],
      topics: [topic({
        id: "c2t29-mfa-limitations", title: "A segurança do fator inclui o caminho alternativo", section: "Identity and Access Management — Multifactor Authentication", pages: "99",
        terms: [["Recovery Method", "Método de recuperação"], ["Backup Access", "Acesso de contingência"], ["Token Loss", "Perda de token"], ["Helpdesk Bypass", "Bypass via suporte"]],
        blocks: [
          b("simple", "simple", "MFA não é perfeito", "Telefone/token perdido, canal inseguro para o segundo fator e recuperação baseada em validação fraca podem reduzir o benefício do MFA."),
          b("scenario", "scenario", "Senha forte, reset fraco", "Uma conta exige senha + token, mas o helpdesk remove o token apenas com nome e data de nascimento. O atacante não precisa quebrar o MFA; precisa explorar o processo de recuperação."),
          b("soc", "soc", "Sinais de contorno", "Monitore troca de fator, reset de MFA, enrollment de novo dispositivo, recuperação de conta e sequência login falho → helpdesk/reset → login bem-sucedido."),
          b("exam", "exam", "CySA+", "Avalie o sistema completo. Um segundo fator forte pode ser neutralizado por processo alternativo fraco."),
        ],
        practiceIds: ["c2p29-mfa-limitations"],
      })],
    }),
    lesson({
      id: "c2l30-passwordless", number: 30, title: "Passwordless não é sinônimo de MFA", duration: 15,
      objective: "Diferenciar autenticação sem senha de autenticação multifator.",
      bridge: "Também é possível remover a senha da equação em vez de adicionar mais segredos.",
      examFocus: ["passwordless", "token", "authenticator"],
      topics: [topic({
        id: "c2t30-passwordless", title: "Autenticar sem senha", section: "Identity and Access Management — Passwordless", pages: "99",
        terms: [["Passwordless Authentication", "Autenticação sem senha"], ["Security Token", "Token de segurança"], ["Authenticator", "Autenticador"]],
        blocks: [
          b("simple", "simple", "O que muda", "Passwordless permite login sem senha, normalmente usando token, aplicativo autenticador ou outro dispositivo. O objetivo é remover o segredo reutilizável que usuários esquecem, repetem ou entregam em phishing."),
          b("comparison", "comparison", "Passwordless x MFA", "São ideias diferentes.", ["Passwordless: descreve ausência de senha", "MFA: descreve uso de múltiplas categorias de fator", "Um fluxo passwordless pode ter um único fator", "Um fluxo passwordless também pode ser multifator dependendo do desenho"]),
          b("soc", "soc", "Investigação", "Valide enrollment do autenticador, registro do dispositivo, origem, alterações de credencial e eventos de recuperação. A ausência de senha muda as evidências, não elimina account takeover."),
          b("exam", "exam", "CySA+", "Não marque MFA automaticamente só porque há token ou aplicativo. Pergunte quantos fatores distintos o fluxo realmente exige."),
        ],
        practiceIds: ["c2p30-passwordless"],
      })],
    }),
    lesson({
      id: "c2l31-sso", number: 31, title: "SSO, benefícios e concentração de risco", duration: 19,
      objective: "Explicar SSO e shared authentication, incluindo vantagens operacionais e impacto de credencial comprometida.",
      bridge: "Depois de provar identidade, organizações querem evitar que o usuário repita o processo em cada aplicação.",
      examFocus: ["SSO", "shared authentication", "password reuse"],
      topics: [topic({
        id: "c2t31-sso", title: "Uma autenticação, vários serviços", section: "Identity and Access Management — Single Sign-On", pages: "99–100",
        terms: [["Single Sign-On (SSO)", "Login único"], ["Shared Authentication", "Autenticação compartilhada"], ["Identity Provider", "Provedor de identidade"], ["Reauthentication", "Reautenticação"]],
        blocks: [
          b("simple", "simple", "O que SSO resolve", "O usuário autentica uma vez e consegue usar vários sistemas sem fornecer credenciais repetidamente. Isso reduz password fatigue, password reuse e chamadas de reset."),
          b("comparison", "comparison", "SSO x shared authentication", "No SSO, uma autenticação inicial pode valer para vários serviços. Em shared authentication, a mesma identidade pode ser reutilizada, mas o usuário pode ser solicitado a autenticar em cada site/serviço."),
          b("technical", "technical", "Risco concentrado", "Se a identidade central é comprometida, o atacante pode alcançar vários serviços. Reauthentication e MFA em operações sensíveis ajudam a reduzir esse impacto."),
          b("soc", "soc", "Sessão comprometida", "Correlacione token/session ID, aplicativos acessados, horário, browser/device e alterações de privilégio. Um único login suspeito pode gerar atividade em várias aplicações."),
          b("exam", "exam", "CySA+", "O benefício de SSO é usabilidade e redução de password reuse; o trade-off é ampliar o alcance de uma identidade comprometida."),
        ],
        visual: ssoVisual,
        practiceIds: ["c2p31-sso"],
      })],
    }),
    lesson({
      id: "c2l32-auth-tech", number: 32, title: "LDAP, CAS, OpenID, OAuth e OpenID Connect", duration: 21,
      objective: "Separar tecnologias de diretório, SSO, autenticação e autorização sem misturar seus papéis.",
      bridge: "SSO e identidade compartilhada usam tecnologias diferentes. O nome do protocolo importa menos que entender o papel que ele desempenha.",
      examFocus: ["LDAP", "CAS", "OpenID", "OAuth", "OpenID Connect"],
      topics: [topic({
        id: "c2t32-auth-tech", title: "Autenticar não é autorizar", section: "Identity and Access Management — Single Sign-On", pages: "100",
        terms: [["LDAP", "Lightweight Directory Access Protocol"], ["CAS", "Central Authentication Service"], ["OpenID", "Padrão de autenticação descentralizada"], ["OAuth", "Framework de autorização"], ["OpenID Connect", "Camada de autenticação sobre OAuth"], ["Facebook Connect", "Login with Facebook / autenticação compartilhada"]],
        blocks: [
          b("simple", "simple", "Organize por função", "LDAP/CAS aparecem como tecnologias comuns em SSO; OpenID compartilha identidade para autenticação; OAuth delega autorização; OpenID Connect adiciona identidade/autenticação ao ecossistema OAuth."),
          b("comparison", "comparison", "Pergunta que cada tecnologia responde", "Evite usar ‘login’ como sinônimo de qualquer protocolo.", ["LDAP: diretório/consulta e autenticação em muitos ambientes", "CAS: serviço central de autenticação/SSO", "OpenID: identidade/autenticação", "OAuth: posso autorizar este cliente a acessar determinado recurso?", "OpenID Connect: quem é o usuário autenticado, usando ID token sobre OAuth?", "Facebook Connect: exemplo de shared authentication usando a identidade do Facebook"]),
          b("soc", "soc", "Token e diretório geram evidências diferentes", "Logs LDAP podem mostrar bind/query; OAuth mostra authorization grant/access token; OIDC adiciona ID token e claims de identidade. Correlacione o artefato certo ao cenário."),
          b("mistake", "mistake", "OAuth não é ‘protocolo de login’ por definição", "Aplicações usam OAuth em fluxos que parecem login, mas seu papel central é autorização/delegação. OpenID Connect é a camada que formaliza autenticação/identidade."),
          b("exam", "exam", "CySA+", "Se a questão contrasta OAuth e OpenID Connect, procure authorization versus authentication."),
        ],
        practiceIds: ["c2p32-auth-tech"],
      })],
    }),
  ],
};
