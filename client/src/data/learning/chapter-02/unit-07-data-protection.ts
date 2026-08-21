import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const pkiVisual = v(
  "c2v-pki",
  "PKI: pedido, validação e emissão",
  "flow",
  "Requerente gera CSR, RA valida identidade, CA assina e emite certificado, que passa a ser gerenciado e revogado quando necessário",
  "PKI cria confiança operacional por certificados. O certificado só é útil enquanto a chave, a política e o estado de revogação forem confiáveis.",
  ["Requester", "CSR", "Registration Authority", "Certificate Authority", "Signed Certificate", "Directory/Management", "CRL / Revocation"],
);

const tlsInspectionVisual = v(
  "c2v-tls-inspection",
  "TLS inspection no caminho",
  "network",
  "Cliente estabelece TLS com dispositivo de inspeção, que inspeciona e cria nova sessão TLS até o destino",
  "O intermediário precisa ser confiado pelos endpoints. A inspeção recupera visibilidade, mas cria um ponto sensível que vê tráfego em claro durante o processamento.",
  ["Client", "TLS session A", "Inspection system", "Decrypt / inspect", "IPS / DLP", "TLS session B", "Destination"],
);

const dlpVisual = v(
  "c2v-dlp",
  "DLP acompanha o ciclo do dado",
  "map",
  "Dado classificado protegido em movimento, em repouso e em uso, com controles de endpoint e rede",
  "DLP depende de saber qual dado é sensível e obter visibilidade suficiente para identificar tentativa de saída indevida.",
  ["Classify data", "Data at rest", "Data in use", "Data in motion", "Endpoint agent", "Network/cloud visibility", "Allow / alert / block"],
);

const dataTypesVisual = v(
  "c2v-sensitive-data",
  "Tipos de dados sensíveis",
  "comparison",
  "Comparação entre PII, CHD e PHI como conceito complementar",
  "As categorias podem se sobrepor. O ponto operacional é reconhecer qual dado está presente e qual obrigação/controle se aplica.",
  ["PII — identifica uma pessoa", "CHD — dados do cartão/pagamento", "Sensitive authentication data — CVV/PIN/track", "PHI — informação de saúde identificável (complemento)"],
);

export const chapter02Unit07DataProtection: LearningUnit = {
  id: "c2u7-data",
  title: "Unidade 7 — Criptografia, PKI e proteção de dados sensíveis",
  summary: "Feche o capítulo entendendo confiança criptográfica, inspeção TLS, DLP e as categorias de dados que o analista precisa reconhecer.",
  lessons: [
    lesson({
      id: "c2l42-encryption-basics", number: 42, title: "Encryption, hashing e key management", duration: 19,
      objective: "Relacionar criptografia, hashing e gestão de chaves ao ciclo do dado sem repetir o conteúdo do Capítulo 1.",
      bridge: "No Capítulo 1 você usou hashing para fingerprint. Agora ampliamos o foco para proteção de dados, chaves e pontos onde a proteção pode desaparecer.",
      examFocus: ["encryption", "hashing", "key management", "data protection"],
      topics: [topic({
        id: "c2t42-encryption-basics", title: "Proteger dado e proteger a chave são o mesmo problema operacional", section: "Encryption and Sensitive Data Protection", pages: "109–110",
        terms: [["Encryption", "Criptografia"], ["Hashing", "Hashing"], ["Key Management", "Gestão de chaves"], ["Passphrase", "Frase secreta"], ["Data in Transit", "Dado em trânsito"]],
        blocks: [
          b("simple", "simple", "Dois objetivos diferentes", "Criptografia busca esconder o conteúdo de quem não possui a chave adequada. Hashing produz um digest para integridade/fingerprint e não é um mecanismo de ‘descriptografar depois’."),
          b("technical", "technical", "O elo mais fraco pode ser a chave", "Um desenho forte falha se chaves ou passphrases são armazenadas de forma insegura. O analista deve saber onde a criptografia é aplicada, quando o dado fica em claro e como as chaves são gerenciadas."),
          b("scenario", "scenario", "Protegido em trânsito, exposto no cache", "A aplicação recebe dado por TLS e o grava em cache local sem criptografia. O canal é seguro, mas o ciclo completo do dado não é. Segurança precisa cobrir o estado posterior ao trânsito."),
          b("soc", "soc", "Perguntas de investigação", "Em vazamento ou acesso indevido, determine se o dado estava criptografado, quem tinha acesso à chave, se o endpoint o descriptografou e se existiam cópias temporárias/cache."),
          b("exam", "exam", "CySA+", "Não confunda canal criptografado com dado sempre criptografado. A prova pode descrever uma proteção forte em trânsito e uma falha em armazenamento/uso."),
        ],
        practiceIds: ["c2p42-encryption"],
      })],
    }),
    lesson({
      id: "c2l43-pki-components", number: 43, title: "PKI: CA, RA, directory e policy", duration: 22,
      objective: "Explicar os componentes da Public Key Infrastructure e o papel de certificados em confiança e autenticação.",
      bridge: "Para usar criptografia assimétrica em escala, organizações precisam de uma infraestrutura que diga em quem confiar.",
      examFocus: ["PKI", "CA", "RA", "certificate policy"],
      topics: [topic({
        id: "c2t43-pki-components", title: "Infraestrutura de confiança por certificados", section: "Encryption and Sensitive Data Protection — Public Key Infrastructure", pages: "110",
        terms: [["Public Key Infrastructure (PKI)", "Infraestrutura de chave pública"], ["Certificate Authority (CA)", "Autoridade certificadora"], ["Registration Authority (RA)", "Autoridade de registro"], ["Certificate Policy", "Política de certificados"], ["Certificate Management System", "Sistema de gestão de certificados"], ["Directory", "Diretório"]],
        blocks: [
          b("simple", "simple", "O que PKI resolve", "Ela permite emitir certificados que vinculam uma chave pública a uma identidade/serviço de forma verificável. Isso sustenta TLS, autenticação, assinatura de código e outros usos."),
          b("comparison", "comparison", "Cinco componentes do capítulo", "Associe componente à responsabilidade.", ["CA: cria, armazena e assina certificados", "RA: verifica quem está pedindo o certificado", "Directory: armazena material/informações de chave/certificado", "Certificate management system: entrega e gerencia certificados", "Certificate policy: documenta práticas e regras de confiança da PKI"]),
          b("technical", "technical", "Assimetria e confiança", "PKI usa criptografia assimétrica para apoiar confidencialidade, integridade e autenticação de entidades. O valor vem da cadeia de confiança, não apenas do arquivo .cer/.pem isolado."),
          b("soc", "soc", "O que investigar em certificado", "Issuer, subject, SAN, validade, serial, algoritmo, fingerprint, chain e status de revogação ajudam a decidir se um certificado é esperado e confiável."),
          b("exam", "exam", "CySA+", "CA assina/emite; RA valida o requerente. Trocar esses papéis é uma pegadinha clássica."),
        ],
        visual: pkiVisual,
        practiceIds: ["c2p43-pki-components"],
      })],
    }),
    lesson({
      id: "c2l44-pki-flow-revocation", number: 44, title: "CSR, emissão e revogação de certificado", duration: 19,
      objective: "Entender o fluxo de solicitação e por que um certificado pode precisar ser invalidado antes do vencimento.",
      bridge: "Depois de conhecer os atores, siga a vida de um certificado desde a solicitação até uma possível revogação.",
      examFocus: ["CSR", "certificate issuance", "CRL", "revocation"],
      topics: [topic({
        id: "c2t44-pki-flow-revocation", title: "Certificado confiável hoje pode deixar de ser amanhã", section: "Encryption and Sensitive Data Protection — PKI; Certificate Revocation", pages: "110–111",
        terms: [["Certificate Signing Request (CSR)", "Solicitação de assinatura de certificado"], ["Certificate", "Certificado"], ["Certificate Revocation List (CRL)", "Lista de certificados revogados"], ["Revocation", "Revogação"], ["Expiration", "Expiração"]],
        blocks: [
          b("steps", "steps", "Fluxo simplificado", "A emissão possui uma cadeia de validação.", ["Requerente gera/fornece CSR", "RA valida identidade conforme política", "CA aprova/assina e emite o certificado", "Certificado é instalado/gerenciado", "Se a confiança for perdida antes do vencimento, o certificado pode ser revogado"]),
          b("simple", "simple", "Revogação ≠ expiração", "Expiração é o fim normal da validade. Revogação invalida antecipadamente um certificado comprometido, cancelado ou que não deve mais ser confiado."),
          b("technical", "technical", "CRL", "Uma CRL lista certificados que a CA invalidou antes da data de expiração. Clientes e sistemas de validação podem usar essa informação para rejeitar um certificado ainda ‘no prazo’, mas não mais confiável."),
          b("soc", "soc", "Certificado comprometido", "Se chave privada de um serviço foi exposta, trocar somente o arquivo local não basta. Revogue o certificado, emita novo material e procure uso indevido do certificado/chave anterior."),
          b("exam", "exam", "CySA+", "Se o certificado foi comprometido e ainda não expirou, a palavra-chave é revocation/CRL."),
        ],
        visual: pkiVisual,
        practiceIds: ["c2p44-pki-revocation"],
      })],
    }),
    lesson({
      id: "c2l45-tls-inspection", number: 45, title: "TLS inspection: recuperar visibilidade sem esquecer o risco", duration: 23,
      objective: "Explicar interceptação/inspeção TLS, requisitos de confiança e trade-offs de segurança, privacidade e desempenho.",
      bridge: "Criptografia protege o canal — e também esconde conteúdo de IDS, IPS e DLP. Inspeção TLS tenta equilibrar essas necessidades.",
      examFocus: ["SSL inspection", "TLS", "IPS", "DLP", "C2"],
      topics: [topic({
        id: "c2t45-tls-inspection", title: "O intermediário enxerga o tráfego em claro durante a inspeção", section: "Encryption and Sensitive Data Protection — Secure Sockets Layer (SSL) Inspection", pages: "111–112",
        terms: [["TLS Inspection", "Inspeção TLS"], ["SSL Inspection", "Nome legado/comum para inspeção TLS"], ["Certificate Trust", "Confiança em certificado"], ["TLS Termination", "Terminação TLS"], ["Command and Control (C2)", "Comando e controle"]],
        blocks: [
          b("simple", "simple", "Por que inspecionar", "Tráfego cifrado impede que controles de rede vejam conteúdo. Uma solução de inspeção pode terminar a sessão TLS, analisar o tráfego e abrir outra sessão criptografada até o destino."),
          b("technical", "technical", "Confiança do endpoint", "Como TLS depende de certificados, endpoints precisam confiar no certificado/CA usado pelo dispositivo de inspeção. Caso contrário, o cliente verá erro de confiança ou rejeitará a conexão."),
          b("comparison", "comparison", "Benefício x risco", "A inspeção recupera visibilidade, mas cria um ponto altamente sensível.", ["Benefício: permitir IPS/DLP analisar conteúdo cifrado", "Benefício: detectar C2 ou malware escondido em HTTPS", "Custo: processamento/bandwidth e complexidade", "Risco: o sistema de inspeção manipula conteúdo em claro", "Risco: acesso indevido ao appliance pode expor ou alterar tráfego", "Limite: dispositivos não gerenciados podem não confiar na CA interna"]),
          b("soc", "soc", "Como interpretar", "Separe o destino original, a sessão cliente→inspection e inspection→destino. Certificado apresentado ao cliente pode ser emitido dinamicamente pela CA corporativa; isso não significa automaticamente MITM malicioso."),
          b("mistake", "mistake", "SSL inspection geralmente significa TLS inspection", "O termo ‘SSL’ permanece no mercado, mesmo que versões antigas de SSL tenham sido substituídas por TLS e não sejam consideradas seguras."),
          b("exam", "exam", "CySA+", "Se DLP/IPS não consegue ver conteúdo HTTPS, TLS inspection pode ser necessária — mas a resposta correta também deve considerar trust e risco do intermediário."),
        ],
        visual: tlsInspectionVisual,
        practiceIds: ["c2p45-tls-inspection"],
      })],
    }),
    lesson({
      id: "c2l46-dlp", number: 46, title: "DLP: data at rest, in use e in motion", duration: 21,
      objective: "Entender como DLP identifica dados sensíveis e aplica políticas em endpoint, armazenamento e trânsito.",
      bridge: "Inspeção TLS aumenta visibilidade; DLP usa essa visibilidade para impedir que informação sensível saia do lugar previsto.",
      examFocus: ["DLP", "data in motion", "data at rest", "data in use"],
      topics: [topic({
        id: "c2t46-dlp", title: "Proteger o dado em todo o ciclo", section: "Encryption and Sensitive Data Protection — Data Loss Prevention", pages: "112",
        terms: [["Data Loss Prevention (DLP)", "Prevenção contra perda de dados"], ["Data in Motion", "Dado em trânsito"], ["Data at Rest", "Dado armazenado"], ["Data in Use", "Dado em uso"], ["Data Classification", "Classificação de dados"]],
        blocks: [
          b("simple", "simple", "O que DLP precisa saber", "Primeiro, qual dado deve ser protegido. Depois, onde ele aparece e qual ação caracteriza saída indevida. Sem classificação e contexto, DLP vira apenas um filtro ruidoso."),
          b("comparison", "comparison", "Três estados", "O controle muda conforme o dado se move.", ["At rest: armazenado em disco, banco ou cloud storage", "In use: aberto/processado por usuário ou aplicação", "In motion: atravessando rede, e-mail, upload ou API"]),
          b("technical", "technical", "Endpoint + rede", "Uma solução completa pode combinar agentes de endpoint e visibilidade de rede/cloud. Criptografia dificulta inspeção, razão pela qual DLP pode depender de controles no endpoint ou de TLS inspection em ambientes gerenciados."),
          b("soc", "soc", "Alerta DLP precisa de contexto", "Valide classificação, usuário, destino, canal, volume, justificativa de negócio e action (allow/alert/block). Um upload grande pode ser legítimo; um pequeno arquivo pode conter dado altamente sensível."),
          b("evidence", "evidence", "Evento sintético", "A política não reage só ao tamanho; reage à classificação e ao destino.", undefined, ["dlp user=ana file=clientes.csv classification=PII", "channel=https-upload destination=personal-drive.example", "records=4200 action=block policy=PII-unmanaged-cloud"]),
          b("exam", "exam", "CySA+", "DLP é a resposta específica quando o objetivo é impedir saída indevida de dados sensíveis nos estados at rest/in use/in motion."),
        ],
        visual: dlpVisual,
        practiceIds: ["c2p46-dlp"],
      })],
    }),
    lesson({
      id: "c2l47-pii-chd", number: 47, title: "PII, CHD e sensitive authentication data", duration: 20,
      objective: "Classificar dados pessoais e de cartão e entender por que categorias semelhantes têm obrigações diferentes.",
      bridge: "DLP precisa reconhecer o que é sensível. O capítulo fecha destacando PII e CHD.",
      examFocus: ["PII", "CHD", "PAN", "CVV", "PCI DSS"],
      topics: [topic({
        id: "c2t47-pii-chd", title: "Identidade pessoal x dados de pagamento", section: "Encryption and Sensitive Data Protection — PII; Cardholder Data", pages: "112–114",
        terms: [["Personally Identifiable Information (PII)", "Informação pessoal identificável"], ["Cardholder Data (CHD)", "Dados do titular do cartão"], ["Primary Account Number (PAN)", "Número primário da conta"], ["Sensitive Authentication Data", "Dados sensíveis de autenticação do cartão"], ["Card Verification Value (CVV)", "Código de verificação"], ["PCI DSS", "Padrão de segurança da indústria de cartões"]],
        blocks: [
          b("simple", "simple", "PII", "É informação que permite identificar razoavelmente uma pessoa de forma direta ou indireta, como documentos, endereço, telefone, registros financeiros ou médicos."),
          b("technical", "technical", "CHD", "Cardholder Data inclui PAN, nome do titular e data de expiração. O capítulo separa também sensitive authentication data, como CVV, dados de trilha/chip e PIN."),
          b("comparison", "comparison", "Categorias podem se sobrepor", "Um dado pode ser PII e também fazer parte de contexto de pagamento. O importante é reconhecer a categoria e aplicar controles/obrigações correspondentes.", ["PII: foco em identificação de pessoa", "CHD: dados centrais do cartão", "Sensitive authentication data: elementos usados para autenticar transação/cartão", "PHI: informação de saúde identificável — complemento frequente, não foco principal do objetivo aqui"]),
          b("soc", "soc", "Antes de abrir ou compartilhar evidência", "Classifique o conteúdo. Screenshots, logs e arquivos de incidente podem conter PAN, PII ou outros dados regulados. Preserve necessidade de acesso e evite ampliar exposição durante a investigação."),
          b("exam", "exam", "CySA+", "Saiba distinguir PII e CHD e reconhecer que CVV/PIN pertencem ao conjunto mais sensível de autenticação do cartão."),
        ],
        visual: dataTypesVisual,
        practiceIds: ["c2p47-pii-chd"],
      })],
    }),
  ],
};
