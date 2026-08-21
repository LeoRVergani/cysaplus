import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const federationVisual = v(
  "c2v-federation",
  "Federação: confiança entre domínios",
  "flow",
  "Consumidor solicita serviço, é redirecionado ao identity provider e retorna com token/assertion ao service provider",
  "Federação desloca parte da confiança para um provedor de identidade. O service provider precisa decidir quais assertions e atributos aceita e com qual nível de confiança.",
  ["Consumer/User", "Service Provider / RP", "Redirect", "Identity Provider", "Authentication", "Token/Assertion", "Service access"],
);

const samlVisual = v(
  "c2v-saml",
  "SAML em alto nível",
  "flow",
  "Usuário acessa SP, autentica no IdP e retorna com SAML response para acesso",
  "SAML transporta assertions de autenticação, atributos e autorização entre IdP e SP, sendo comum em SSO corporativo.",
  ["Browser/User", "Service Provider", "Redirect to IdP", "Identity Provider", "SAML Response", "Verify assertion", "Session"],
);

const oauthVisual = v(
  "c2v-oauth",
  "OAuth 2.0: delegação de acesso",
  "flow",
  "Resource owner autoriza client via authorization server, que emite access token usado no resource server",
  "OAuth separa quem usa o aplicativo de quem guarda o recurso e de quem emite autorização. O access token representa permissão delegada, não identidade por si só.",
  ["Resource Owner", "Client", "Authorization Server", "Consent/Grant", "Access Token", "Resource Server", "Protected Resource"],
);

const pamVisual = v(
  "c2v-pam",
  "PAM controla o ciclo do privilégio",
  "flow",
  "Solicitação de privilégio passa por policy, aprovação, credencial/segredo, sessão monitorada e revogação",
  "PAM reduz privilégios permanentes, melhora rastreabilidade e ajuda a tratar contas administrativas, de serviço e break-glass como ativos de alto risco.",
  ["Request", "Policy/approval", "Least privilege", "Credential/session", "Monitoring", "Expiration/revoke", "Audit"],
);

export const chapter02Unit06FederationPrivileged: LearningUnit = {
  id: "c2u6-federation",
  title: "Unidade 6 — Federação, tokens e acesso privilegiado",
  summary: "Entenda relações de confiança entre IdP e SP, diferencie SAML/OAuth/OIDC e trate contas privilegiadas e cloud access com controles apropriados.",
  lessons: [
    lesson({
      id: "c2l33-federation-basics", number: 33, title: "Federação: IdP, RP/SP e consumidor", duration: 21,
      objective: "Explicar como identidade atravessa domínios e quais partes participam do fluxo.",
      bridge: "SSO pode funcionar dentro de uma organização; federação permite levar confiança de identidade entre sistemas e organizações diferentes.",
      examFocus: ["federation", "IDP", "RP", "SP", "attributes"],
      topics: [topic({
        id: "c2t33-federation-basics", title: "Levar identidade além do domínio original", section: "Identity and Access Management — Federation; Federated Identity Security Considerations", pages: "100–102",
        terms: [["Federation", "Federação de identidade"], ["Identity Provider (IDP)", "Provedor de identidade"], ["Relying Party (RP)", "Parte que confia"], ["Service Provider (SP)", "Provedor de serviço"], ["Assertion", "Afirmação sobre a identidade"], ["Attribute", "Atributo"]],
        blocks: [
          b("simple", "simple", "O problema que federação resolve", "Um serviço pode confiar na autenticação feita por outro domínio em vez de criar credencial própria para cada usuário. A confiança é transferida por tokens/assertions e atributos."),
          b("technical", "technical", "Papéis", "O IDP autentica e faz assertions. O SP/RP recebe essas informações e decide se concede o serviço. O usuário/consumer inicia o acesso e pode participar de decisões sobre quais atributos serão liberados."),
          b("comparison", "comparison", "Quem precisa proteger o quê", "Cada parte possui responsabilidades diferentes.", ["IDP: credenciais, identidade, assertions e incident coordination", "SP/RP: validação de token/assertion, autorização e proteção dos dados recebidos", "User/consumer: proteção do autenticador e decisões de consentimento/attribute release"]),
          b("soc", "soc", "Correlacionando login federado", "Use subject/ID, issuer/IdP, audience/SP, timestamp, device, IP e claims para ligar o evento de autenticação ao acesso no serviço."),
          b("exam", "exam", "CySA+", "Se a pergunta pede quem faz assertions sobre identidades para o serviço, pense no IDP."),
        ],
        visual: federationVisual,
        practiceIds: ["c2p33-federation-basics"],
      })],
    }),
    lesson({
      id: "c2l34-federation-security", number: 34, title: "Segurança federada e o membro mais fraco", duration: 18,
      objective: "Avaliar riscos quando a confiança atravessa organizações e credenciais comprometidas ganham alcance.",
      bridge: "Federação reduz overhead, mas também amplia a consequência de uma identidade aceita por muitos serviços.",
      examFocus: ["federated identity security", "trust boundary", "credential compromise"],
      topics: [topic({
        id: "c2t34-federation-security", title: "A federação é tão forte quanto a confiança que aceita", section: "Identity and Access Management — Federated Identity Security Considerations", pages: "101–102",
        terms: [["Trust Boundary", "Fronteira de confiança"], ["Credential Compromise", "Comprometimento de credencial"], ["Privilege Escalation", "Escalada de privilégio"], ["Weakest Member", "Membro mais fraco"]],
        blocks: [
          b("simple", "simple", "Risco herdado", "Ao aceitar identidade externa, você passa a depender de como o outro membro protege credenciais, valida usuários e responde a incidentes."),
          b("scenario", "scenario", "Conta federada comprometida", "Imagine credencial de pesquisador aceita por vários parceiros. O invasor usa acesso legítimo inicial, encontra uma falha local para elevar privilégio e passa a coletar novas credenciais. O problema atravessa a federação porque a identidade inicial tinha alcance interorganizacional."),
          b("soc", "soc", "O que observar", "Monitore uso da mesma identidade em múltiplos membros, mudanças de localização, acesso local pós-login, privilege escalation e padrões impossíveis de viagem/tempo quando aplicável."),
          b("mistake", "mistake", "Token válido não significa atividade segura", "O SP pode validar perfeitamente um token emitido pelo IdP e ainda assim receber uma identidade já comprometida. Autenticidade do token e legitimidade da atividade são perguntas diferentes."),
          b("exam", "exam", "CySA+", "Federação move trust boundaries. A resposta pode envolver reduzir direitos federados, monitorar ações e avaliar a segurança dos parceiros — não apenas trocar protocolo."),
        ],
        practiceIds: ["c2p34-federation-security"],
      })],
    }),
    lesson({
      id: "c2l35-federation-design", number: 35, title: "Trust model, provisioning e attribute release", duration: 21,
      objective: "Projetar federação pensando em garantia de identidade, lifecycle e minimização de atributos.",
      bridge: "Depois de reconhecer o risco, precisamos decidir quanta confiança e informação cada relação realmente exige.",
      examFocus: ["identity assurance", "provisioning", "deprovisioning", "attribute release"],
      topics: [topic({
        id: "c2t35-federation-design", title: "Confiança suficiente, não confiança ilimitada", section: "Identity and Access Management — Federated Identity Design Choices", pages: "103–105",
        terms: [["Identity Assurance", "Garantia de identidade"], ["Bring Your Own Identity (BYOI)", "Trazer a própria identidade"], ["Loosely Bound Federation", "Federação com nível de confiança mais baixo"], ["Identity Vetting", "Validação/verificação de identidade"], ["Provisioning", "Provisionamento"], ["Deprovisioning", "Desprovisionamento"], ["Attribute Release", "Liberação de atributos"], ["Self-Service Password Reset", "Redefinição de senha pelo usuário"]],
        blocks: [
          b("simple", "simple", "Primeira decisão: o que você precisa acreditar?", "Alguns serviços só precisam saber que o usuário controla uma conta do provedor. Outros exigem identidade verificada com maior assurance. O nível de confiança deve seguir o risco do recurso."),
          b("comparison", "comparison", "Manual x automático", "Provisionamento automático melhora velocidade e escala; manual adiciona revisão humana, mas aumenta atraso. Deprovisioning é tão importante quanto criação: conta federada que não deveria mais existir vira dívida de acesso."),
          b("technical", "technical", "Attribute release", "O SP precisa de alguns atributos para autorizar e contatar o usuário, mas liberar tudo por padrão aumenta exposição. Prefira o mínimo necessário para a função."),
          b("mistake", "mistake", "Self-service também precisa de assurance", "Reset de senha e outras opções self-service reduzem carga de suporte, mas perguntas fracas ou validação insuficiente podem permitir que um atacante altere credenciais sem o usuário legítimo."),
          b("soc", "soc", "Lifecycle como evidência", "Investigue criação automática de conta, alterações de grupo/claim e falha de deprovisioning após desligamento. O mesmo evento de login pode ser legítimo, mas a conta talvez não devesse mais ter sido provisionada."),
          b("exam", "exam", "CySA+", "Quando o cenário compara velocidade e controle no onboarding, pense no trade-off entre automatic provisioning e manual oversight."),
        ],
        practiceIds: ["c2p35-federation-design"],
      })],
    }),
    lesson({
      id: "c2l36-saml", number: 36, title: "SAML: assertions para SSO corporativo", duration: 21,
      objective: "Entender o fluxo SAML entre browser, SP e IdP sem depender de XML decorado.",
      bridge: "Agora aplicamos os papéis da federação a tecnologias concretas.",
      examFocus: ["SAML", "authentication", "authorization", "SSO"],
      topics: [topic({
        id: "c2t36-saml", title: "Browser redirecionado, identidade validada, assertion verificada", section: "Identity and Access Management — Federated Identity Technologies; SAML", pages: "105–106",
        terms: [["Security Assertion Markup Language (SAML)", "Linguagem de assertions de segurança"], ["SAML Assertion", "Assertion SAML"], ["SAML Response", "Resposta SAML"], ["Principal", "Principal/identidade"]],
        blocks: [
          b("simple", "simple", "O que SAML faz", "SAML transporta informações de autenticação e autorização entre um IdP e um SP. É muito usado para SSO web em ambientes empresariais."),
          b("steps", "steps", "Fluxo de alto nível", "Você não precisa decorar XML para entender a lógica.", ["Usuário tenta acessar o SP", "SP redireciona o browser ao IdP", "IdP autentica o usuário", "IdP retorna uma SAML response/assertion", "SP valida a resposta", "SP cria sessão e aplica autorização"]),
          b("soc", "soc", "Falhas investigáveis", "Observe issuer, audience, subject, tempo de validade, resultado da assinatura/validação e mapping de atributos. Replay, manipulação e confiança incorreta podem transformar um fluxo legítimo em risco."),
          b("mistake", "mistake", "Assertion não é ‘senha em XML’", "O SP confia na assertion assinada/validada emitida pelo IdP; a credencial do usuário pode nunca ser entregue ao SP."),
          b("exam", "exam", "CySA+", "SAML é forte candidato quando o cenário fala em SSO corporativo e assertions entre IdP e SP."),
        ],
        visual: samlVisual,
        practiceIds: ["c2p36-saml"],
      })],
    }),
    lesson({
      id: "c2l37-adfs", number: 37, title: "AD FS e claims", duration: 15,
      objective: "Reconhecer AD FS como tecnologia Microsoft de federação baseada em claims e trust.",
      bridge: "SAML é uma linguagem/protocolo de assertions; AD FS é uma implementação Microsoft de federação que trabalha com claims e políticas de confiança.",
      examFocus: ["AD FS", "claims", "trust policy"],
      topics: [topic({
        id: "c2t37-adfs", title: "Federação Microsoft orientada a claims", section: "Identity and Access Management — AD FS", pages: "106–107",
        terms: [["Active Directory Federation Services (AD FS)", "Serviços de Federação do Active Directory"], ["Claim", "Claim/afirmação"], ["Trust Policy", "Política de confiança"], ["Home Realm Discovery", "Descoberta do domínio de origem"]],
        blocks: [
          b("simple", "simple", "Para que serve", "AD FS permite que parceiros usem identidade e claims para tomar decisões de acesso sem compartilhar diretamente a base de credenciais."),
          b("technical", "technical", "Claims e trust", "O serviço recebe claims do parceiro de conta, aplica trust/mapping e gera informações que a aplicação do recurso entende. Home realm discovery ajuda a descobrir qual federação deve autenticar o usuário."),
          b("soc", "soc", "Logs relevantes", "Valide parceiro, claim emitido, regra de transformação, usuário, aplicação e resultado. Mudança de trust policy pode alterar o acesso de muitos usuários."),
          b("exam", "exam", "CySA+", "Reconheça AD FS como solução Microsoft de federação e SSO; não é necessário memorizar a sequência operacional detalhada do console."),
        ],
        practiceIds: ["c2p37-adfs"],
      })],
    }),
    lesson({
      id: "c2l38-oauth", number: 38, title: "OAuth 2.0: autorização delegada", duration: 23,
      objective: "Identificar Client, Resource Owner, Resource Server e Authorization Server e interpretar access token corretamente.",
      bridge: "Agora trocamos assertions corporativas por delegação de acesso a recursos e APIs.",
      examFocus: ["OAuth 2.0", "authorization", "access token"],
      topics: [topic({
        id: "c2t38-oauth", title: "Autorizar um aplicativo sem entregar sua senha", section: "Identity and Access Management — OAuth", pages: "107–108",
        terms: [["OAuth 2.0", "Framework de autorização OAuth"], ["Client", "Cliente/aplicação"], ["Resource Owner", "Dono do recurso"], ["Resource Server", "Servidor de recurso"], ["Authorization Server", "Servidor de autorização"], ["Access Token", "Token de acesso"]],
        blocks: [
          b("simple", "simple", "O problema", "Você quer permitir que um aplicativo use parte de um serviço em seu nome sem entregar sua senha ao aplicativo. OAuth cria um fluxo de autorização e emite um token com escopo/tempo controlados."),
          b("steps", "steps", "Quatro papéis", "Identifique cada papel antes de analisar o fluxo.", ["Resource Owner: usuário que possui/autoriza o recurso", "Client: aplicativo que quer agir", "Authorization Server: autentica/obtém consentimento e emite token", "Resource Server: API/serviço que aceita o token e entrega o recurso"]),
          b("technical", "technical", "Access token não é identidade por si só", "O token representa autorização delegada. Dependendo do desenho, o resource server valida escopo, audience e validade para permitir a ação solicitada."),
          b("soc", "soc", "Token comprometido", "Investigue client_id, scopes, issuer, audience, validade, origem, consentimento e uso posterior. Um token roubado pode permitir acesso mesmo sem reutilizar a senha do usuário."),
          b("evidence", "evidence", "Evento sintético", "O scope mostra o que o cliente recebeu permissão para fazer.", undefined, ["oauth client_id=calendar-app user=ana", "scope=calendar.read", "token_id=at_7821 exp=2026-08-21T14:00:00Z", "resource=/api/calendar action=GET result=200"]),
          b("exam", "exam", "CySA+", "OAuth = autorização/delegação. Se a pergunta exige autenticação/identidade do usuário, procure OpenID Connect ou outro mecanismo apropriado."),
        ],
        visual: oauthVisual,
        practiceIds: ["c2p38-oauth"],
      })],
    }),
    lesson({
      id: "c2l39-oidc", number: 39, title: "OpenID Connect: identidade sobre OAuth", duration: 17,
      objective: "Explicar por que OIDC adiciona ID token e autenticação ao ecossistema OAuth.",
      bridge: "OAuth responde ‘o cliente pode acessar?’. OpenID Connect acrescenta ‘quem foi autenticado?’. ",
      examFocus: ["OpenID Connect", "ID token", "authentication"],
      topics: [topic({
        id: "c2t39-oidc", title: "Access token e ID token têm papéis diferentes", section: "Identity and Access Management — OpenID Connect", pages: "108",
        terms: [["OpenID Connect (OIDC)", "OpenID Connect"], ["ID Token", "Token de identidade"], ["Access Token", "Token de acesso"], ["Authentication Layer", "Camada de autenticação"], ["Federated Technology Comparison", "Comparação de tecnologias federadas"]],
        blocks: [
          b("simple", "simple", "A diferença-chave", "OIDC usa a base do OAuth para fornecer autenticação/identidade. O authorization server pode emitir um ID token que descreve a autenticação e o usuário, além de tokens usados para acesso a recursos."),
          b("comparison", "comparison", "OAuth x OIDC", "Não confunda o que cada artefato prova.", ["OAuth access token: autorização para acessar recurso", "OIDC ID token: informações/claims sobre a identidade autenticada", "OAuth sozinho não foi criado como protocolo de autenticação", "OIDC formaliza a camada de identidade"]),
          b("soc", "soc", "Validação de token", "Verifique issuer, audience, assinatura, expiração e claims coerentes. Um token válido para outra audience não deve ser aceito simplesmente porque a assinatura está correta."),
          b("comparison", "comparison", "SAML, OpenID, OAuth2 e AD FS no quadro do capítulo", "O livro compara autenticação, autorização, uso típico e riscos. Use a tabela como mapa, não como substituto do entendimento dos fluxos.", ["SAML: autenticação e autorização em SSO/federação empresarial; cuide de confidencialidade e processamento das mensagens", "OpenID: foco em autenticação; atenção a redirects, replay, phishing e ataques web", "OAuth2: foco em autorização de API/serviço; proteja tokens, redirect URIs, resource/authorization servers", "AD FS: autenticação e autorização em federação Microsoft; claims e trust são centrais"]),
          b("exam", "exam", "CySA+", "Quando a prova pergunta qual tecnologia adiciona autenticação/ID token sobre OAuth, escolha OpenID Connect."),
        ],
        practiceIds: ["c2p39-oidc"],
      })],
    }),
    lesson({
      id: "c2l40-pam", number: 40, title: "PAM, least privilege e privilege creep", duration: 22,
      objective: "Entender PAM como gestão de contas, sessões e privilégios de alto impacto ao longo do ciclo de vida.",
      bridge: "Federação gerencia confiança de identidade; PAM entra quando a identidade possui poderes que podem alterar sistemas, dados ou políticas.",
      examFocus: ["PAM", "least privilege", "privilege creep", "break glass"],
      topics: [topic({
        id: "c2t40-pam", title: "Privilégio é um recurso que precisa expirar e ser auditado", section: "Identity and Access Management — Privileged Access Management", pages: "108–109",
        terms: [["Privileged Access Management (PAM)", "Gestão de acesso privilegiado"], ["Least Privilege", "Menor privilégio"], ["Privilege Creep", "Acúmulo de privilégios"], ["Break-Glass Account", "Conta de emergência"], ["Service Account", "Conta de serviço"]],
        blocks: [
          b("simple", "simple", "PAM vai além de guardar senha de admin", "Ele organiza como contas e permissões privilegiadas são concedidas, usadas, monitoradas, rotacionadas e removidas ao longo do tempo."),
          b("comparison", "comparison", "Quem pode ser privilegiado", "Não pense apenas em root/Administrator.", ["Local/domain admins", "Service accounts", "Application accounts", "Helpdesk com poder de reset", "Emergency/break-glass accounts", "Usuário comum com permissão elevada temporária"]),
          b("technical", "technical", "Problemas que PAM reduz", "Over-provisioning, privilege creep, credenciais hard-coded, segredos compartilhados e contas que permanecem poderosas depois de mudança de função."),
          b("soc", "soc", "Sessão privilegiada", "Correlacione quem solicitou privilégio, aprovação, credencial/sessão, alvo, comandos/ações, horário e expiração. Um login admin sem workflow ou fora da janela pode merecer investigação."),
          b("evidence", "evidence", "Elevação temporária", "A trilha mostra o privilégio como evento, não como propriedade permanente.", undefined, ["pam_request user=ana role=db-admin duration=30m ticket=CHG-9031", "approval=manager result=approved", "session=PSM-9922 target=DB-01 recording=on", "privilege_revoked=10:30:00"]),
          b("exam", "exam", "CySA+", "Se o requisito é impedir uso indevido de credenciais administrativas e controlar lifecycle de privilégios, PAM é mais específico que SSO, SAML ou PKI."),
        ],
        visual: pamVisual,
        practiceIds: ["c2p40-pam"],
      })],
    }),
    lesson({
      id: "c2l41-casb", number: 41, title: "CASB e políticas de uso da nuvem", duration: 17,
      objective: "Reconhecer CASB como ponto de enforcement/visibilidade para uso de cloud e SaaS.",
      bridge: "PAM protege privilégios; CASB ajuda a controlar como identidades e dados usam serviços cloud.",
      examFocus: ["CASB", "cloud policy", "visibility", "data security"],
      topics: [topic({
        id: "c2t41-casb", title: "Policy enforcement entre usuário e cloud", section: "Identity and Access Management — Cloud Access Security Broker", pages: "109",
        terms: [["Cloud Access Security Broker (CASB)", "Broker de segurança de acesso à nuvem"], ["Policy Enforcement Point", "Ponto de aplicação de política"], ["Cloud Visibility", "Visibilidade de cloud"], ["Data Security", "Segurança de dados"]],
        blocks: [
          b("simple", "simple", "O que CASB faz", "CASB aplica políticas e aumenta visibilidade quando usuários acessam recursos e serviços cloud. Pode ajudar com data security, antimalware, uso de serviços e risk management."),
          b("technical", "technical", "Onde pode existir", "Pode operar localmente ou na nuvem, dependendo da arquitetura. Como qualquer controle poderoso, precisa de configuração e manutenção contínuas para não bloquear uso legítimo nem criar lacunas."),
          b("soc", "soc", "Exemplo", "Um CASB pode registrar upload de arquivo sensível para SaaS pessoal, classificar o serviço, aplicar política e gerar alerta com usuário, arquivo, destino e decisão."),
          b("evidence", "evidence", "Alerta sintético", "O contexto combina identidade, classificação de dado e serviço cloud.", undefined, ["casb user=ana app=personal-drive.example", "action=upload file=clientes.csv classification=PII", "policy=block-unmanaged-cloud result=blocked"]),
          b("exam", "exam", "CySA+", "Se o problema é visibilidade e policy enforcement no uso de cloud/SaaS, CASB é um candidato forte."),
        ],
        practiceIds: ["c2p41-casb"],
      })],
    }),
  ],
};
