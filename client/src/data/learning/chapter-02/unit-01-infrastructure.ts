import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const infraMap = v(
  "c2v-infra-map",
  "Quatro formas de executar uma aplicação",
  "comparison",
  "Comparação entre bare metal, máquina virtual, container e serverless",
  "A decisão muda quem administra o sistema operacional, quanto isolamento existe e onde o analista precisa observar telemetria e configuração.",
  ["Bare metal — SO direto no hardware", "VM — SO convidado completo", "Container — aplicação + dependências, kernel compartilhado", "Serverless/FaaS — função executada sob demanda"],
);

const vmVisual = v(
  "c2v-virtualization",
  "Virtualização: host, hypervisor e guests",
  "flow",
  "Fluxo do hardware físico para hypervisor e múltiplas máquinas virtuais",
  "A virtualização permite vários sistemas independentes sobre o mesmo hardware; segurança precisa considerar o host e cada guest.",
  ["Hardware físico", "Hypervisor / plataforma de virtualização", "VM Windows", "VM Linux", "Virtual appliance"],
);

const containerVisual = v(
  "c2v-containers",
  "Containers compartilham o host",
  "network",
  "Host com runtime de containers e vários containers isolados",
  "Containers são leves porque não carregam um sistema operacional completo por aplicação. O ganho de portabilidade aumenta a importância de isolamento, imagens confiáveis e segurança do host.",
  ["Host OS", "Docker/Kubernetes runtime", "Container A", "Container B", "Container C", "Image registry / assinatura"],
);

export const chapter02Unit01Infrastructure: LearningUnit = {
  id: "c2u1-infra",
  title: "Unidade 1 — Infraestrutura moderna e modelos de execução",
  summary: "Aprenda a distinguir serverless, virtualização e containers pelo que realmente muda para segurança, monitoramento e resposta.",
  lessons: [
    lesson({
      id: "c2l01-architecture-role", number: 1, title: "Por que arquitetura importa para o SOC", duration: 11,
      objective: "Entender por que o mesmo incidente exige investigação diferente em servidor físico, VM, container ou função serverless.",
      bridge: "No Capítulo 1 você aprendeu a identificar riscos e controles. Agora vamos localizar esses controles dentro da arquitetura real que gera os eventos do SOC.",
      examFocus: ["1.1 system and network architecture", "infrastructure concepts"],
      topics: [topic({
        id: "c2t01-architecture-role", title: "Arquitetura muda a superfície de investigação", section: "Chapter 2 introduction; Infrastructure Concepts and Design", pages: "81–82",
        terms: [["Infrastructure", "Infraestrutura"], ["Architecture", "Arquitetura"], ["Security Operations", "Operações de segurança"]],
        blocks: [
          b("simple", "simple", "Para que isso existe?", "Arquitetura descreve como sistemas, serviços, redes e identidades se conectam. Para o analista, ela responde perguntas básicas: onde o código roda, quem administra cada camada, quais logs existem e qual falha pode afetar vários serviços ao mesmo tempo."),
          b("analogy", "analogy", "O mapa do prédio", "Investigar sem conhecer a arquitetura é como procurar a origem de uma fumaça sem saber onde ficam salas, dutos e quadros elétricos. O alerta informa que algo aconteceu; a arquitetura mostra por onde investigar."),
          b("technical", "technical", "O que muda entre modelos", "Infraestrutura moderna mistura on-premises, cloud, virtualização, containers e serverless. Cada modelo desloca responsabilidades de configuração, patching, monitoramento e isolamento. O CySA+ espera que você reconheça essas diferenças para analisar evidências e recomendar controles."),
          b("soc", "soc", "Perguntas iniciais de triagem", "Antes de agir, identifique onde o workload roda e quem controla a camada afetada.", ["É host físico, VM, container ou função?", "O SO é administrado pela organização ou pelo provedor?", "Onde estão logs, identidade e configuração?", "Uma falha nesta camada afeta um serviço ou muitos?"]),
          b("exam", "exam", "Como a prova pode cobrar", "O cenário normalmente descreve portabilidade, overhead, isolamento ou responsabilidade operacional e pede o modelo mais adequado — não apenas uma definição decorada."),
        ],
        visual: infraMap,
        practiceIds: ["c2p01-architecture-choice"],
      })],
    }),
    lesson({
      id: "c2l02-serverless", number: 2, title: "Serverless e Function as a Service", duration: 16,
      objective: "Explicar FaaS, benefícios e responsabilidades de segurança sem cair na ideia de que não existem servidores.",
      bridge: "Começamos pelo modelo que mais esconde infraestrutura do desenvolvedor: serverless.",
      examFocus: ["serverless", "FaaS", "security controls"],
      topics: [topic({
        id: "c2t02-serverless", title: "Funções sob demanda", section: "Infrastructure Concepts and Design — Serverless", pages: "82–83",
        terms: [["Serverless Computing", "Computação serverless"], ["Function as a Service (FaaS)", "Função como serviço"], ["Function Call", "Chamada de função"]],
        blocks: [
          b("simple", "simple", "Serverless não significa sem servidor", "Os servidores continuam existindo, mas o provedor passa a operar a infraestrutura que executa o código. Você envia uma função; a plataforma a inicia quando necessária e disponibiliza os recursos para executá-la."),
          b("analogy", "analogy", "Táxi em vez de garagem", "Uma VM se parece com manter um carro disponível o tempo todo. FaaS se parece com chamar um táxi quando precisa: você paga e usa quando há demanda, mas não cuida do motor, garagem ou manutenção do veículo."),
          b("technical", "technical", "Modelo operacional", "Em FaaS, código é invocado por evento ou chamada. AWS Lambda, Azure Functions e serviços equivalentes ilustram esse modelo. Como a infraestrutura é abstraída, controles de desenvolvimento seguro, IAM, permissões, monitoramento e limites de recursos ganham destaque."),
          b("comparison", "comparison", "O que você deixa de administrar — e o que continua seu", "Você reduz manutenção tradicional de servidor, mas não terceiriza a segurança do código, das identidades, das permissões, dos dados, dos segredos ou da observabilidade.", ["Menos: patching e manutenção do servidor subjacente", "Continua: código seguro e dependências", "Continua: IAM e least privilege", "Continua: logs, monitoramento e tratamento de dados", "Continua: limites de execução e custos"]),
          b("soc", "soc", "Telemetria que interessa", "Em um incidente serverless, procure logs de invocação, identidade que chamou a função, origem do evento, permissões associadas, duração, erro, acesso a dados e alterações de configuração. Não espere encontrar a mesma telemetria de um servidor tradicional."),
          b("mistake", "mistake", "Erro comum", "Achar que serverless elimina responsabilidades de segurança. Ele muda a fronteira de responsabilidade; não elimina identidade, código, dados ou monitoramento."),
          b("exam", "exam", "CySA+", "Se o requisito enfatizar execução sob demanda, menor overhead de administração de servidores e cobrança por uso, FaaS é o candidato natural. Se precisar de um SO completo e persistente, pense em VM."),
        ],
        practiceIds: ["c2p02-serverless"],
      })],
    }),
    lesson({
      id: "c2l03-virtualization", number: 3, title: "Virtualização: host, guest e VDI", duration: 18,
      objective: "Entender como VMs usam hardware compartilhado e quais novos pontos de monitoramento surgem.",
      bridge: "Ao contrário de serverless, a virtualização mantém um sistema operacional completo por workload.",
      examFocus: ["virtualization", "VDI", "virtual appliances"],
      topics: [topic({
        id: "c2t03-virtualization", title: "Vários computadores lógicos em um hardware", section: "Infrastructure Concepts and Design — Virtualization", pages: "83",
        terms: [["Virtualization", "Virtualização"], ["Host", "Host físico/plataforma"], ["Guest", "Sistema convidado"], ["Virtual Machine (VM)", "Máquina virtual"], ["Virtual Desktop Infrastructure (VDI)", "Infraestrutura de desktop virtual"], ["Virtual Appliance", "Appliance virtual"]],
        blocks: [
          b("simple", "simple", "O que a virtualização resolve", "Ela permite executar vários computadores virtuais independentes sobre o mesmo hardware. Cada VM recebe CPU, memória, disco e dispositivos virtuais e normalmente possui seu próprio sistema operacional."),
          b("technical", "technical", "Recursos compartilhados", "O host e a camada de virtualização apresentam recursos aos guests e controlam sua alocação. Isso aumenta eficiência e flexibilidade, mas cria dependência do host e da plataforma de virtualização."),
          b("comparison", "comparison", "VDI, servidor virtual e appliance", "A tecnologia é a mesma, mas o objetivo muda.", ["VDI: desktops executados centralmente e entregues pela rede", "Servidor virtual: workload de servidor em VM", "Virtual appliance: produto de segurança/rede entregue como VM pronta"]),
          b("soc", "soc", "Investigando uma VM", "Correlacione telemetria do guest com a camada de virtualização. Um alerta de CPU na VM pode ser problema interno, contenção de recursos no host ou movimentação/migração da VM. Em resposta a incidente, saiba se snapshot, console e logs da plataforma existem."),
          b("mistake", "mistake", "Isolamento não é independência absoluta", "VMs são isoladas logicamente, mas compartilham hardware e plataforma. Compromisso ou falha da camada de virtualização pode ampliar impacto."),
          b("exam", "exam", "CySA+", "Reconheça virtualização quando o cenário pede múltiplos SOs completos, controle de recursos e consolidação de servidores ou desktops."),
        ],
        visual: vmVisual,
        practiceIds: ["c2p03-virtualization"],
      })],
    }),
    lesson({
      id: "c2l04-containerization", number: 4, title: "Containers, Docker e Kubernetes", duration: 22,
      objective: "Distinguir containers de VMs e entender isolamento, imagens, host compartilhado e segurança no ciclo de vida.",
      bridge: "Containers mantêm isolamento de aplicação, mas evitam carregar um sistema operacional completo para cada workload.",
      examFocus: ["containerization", "Docker", "Kubernetes", "image signing"],
      topics: [topic({
        id: "c2t04-containerization", title: "Virtualização no nível da aplicação", section: "Infrastructure Concepts and Design — Containerization", pages: "83–84",
        terms: [["Containerization", "Conteinerização"], ["Container", "Container"], ["Container Image", "Imagem de container"], ["Docker", "Docker"], ["Kubernetes", "Kubernetes"], ["Isolation", "Isolamento"], ["Image Signing", "Assinatura de imagem"]],
        blocks: [
          b("simple", "simple", "O que vai dentro do container", "O container empacota a aplicação com bibliotecas, arquivos de configuração e dependências necessárias. Ele continua usando recursos e kernel do host em vez de trazer um SO completo como uma VM."),
          b("analogy", "analogy", "Contêiner de carga", "Um contêiner marítimo padroniza como a carga é transportada. Um container de software padroniza como aplicação e dependências são executadas em ambientes diferentes."),
          b("technical", "technical", "Portabilidade e host compartilhado", "Docker fornece interfaces padronizadas para recursos do sistema; Kubernetes coordena muitos containers. A consistência facilita deslocar workloads, mas múltiplos serviços podem depender do mesmo host e runtime."),
          b("comparison", "comparison", "Pontos de segurança", "A segurança precisa existir no host, na imagem e no ciclo de entrega.", ["Isolamento entre containers", "Hardening e patching do host", "Imagens confiáveis e, quando aplicável, assinadas", "Monitoramento do runtime e da aplicação", "Patching/rebuild de imagens vulneráveis", "Segurança integrada ao SDLC e ao pipeline de implantação"]),
          b("soc", "soc", "Quando um container dispara alerta", "Identifique image/digest, container ID, namespace/pod quando houver, host, processo, identidade e comunicação de rede. Um alerta em um container pode ser efêmero; preserve contexto antes que o workload seja substituído."),
          b("mistake", "mistake", "Host comprometido pode afetar muitos serviços", "O isolamento lógico não muda o fato de que vários containers podem depender do mesmo host. A postura do host é parte do risco agregado."),
          b("exam", "exam", "CySA+", "Portabilidade com menor overhead que VM aponta para container. Se o cenário enfatiza pacote de aplicação + dependências e host compartilhado, não escolha VM por hábito."),
        ],
        visual: containerVisual,
        practiceIds: ["c2p04-containers"],
      })],
    }),
    lesson({
      id: "c2l05-model-comparison", number: 5, title: "Bare metal x VM x Container x Serverless", duration: 17,
      objective: "Escolher o modelo adequado a um cenário e explicar a consequência operacional para segurança.",
      bridge: "Agora juntamos os três conceitos do objetivo do exame em uma única decisão arquitetural.",
      examFocus: ["pros and cons", "best implementation"],
      topics: [topic({
        id: "c2t05-model-comparison", title: "Escolha pelo requisito, não pelo nome", section: "Infrastructure Concepts and Design; Exam Note", pages: "82–84",
        terms: [["Bare Metal", "Execução direta no hardware"], ["Virtual Machine", "Máquina virtual"], ["Container", "Container"], ["Serverless", "Serverless"]],
        blocks: [
          b("simple", "simple", "Quatro perguntas para decidir", "Pergunte: preciso de um SO completo? Preciso empacotar apenas a aplicação? O código pode executar como função sob demanda? Preciso controlar a infraestrutura física diretamente?"),
          b("comparison", "comparison", "Resumo operacional", "Cada modelo desloca a fronteira de responsabilidade.", ["Bare metal: máximo controle do hardware e máximo esforço operacional", "VM: SO completo por workload, bom isolamento e flexibilidade", "Container: aplicação portátil, menor overhead e kernel/host compartilhado", "Serverless: função sob demanda, infraestrutura mais abstraída"]),
          b("soc", "soc", "Impacto na investigação", "Quanto mais abstrata a infraestrutura, mais você depende de logs e controles expostos pela plataforma. Quanto mais infraestrutura você administra, mais fontes próprias precisa coletar e proteger."),
          b("exam", "exam", "Pegadinha legítima", "‘Mais moderno’ não significa ‘sempre melhor’. A resposta depende de persistência, portabilidade, overhead, controle e modelo de segurança descritos no cenário."),
          b("remember", "remember", "Leve para a prova", "VM virtualiza um computador completo; container virtualiza o ambiente da aplicação; FaaS executa funções sob demanda."),
        ],
        visual: infraMap,
        practiceIds: ["c2p05-model-comparison"],
      })],
    }),
  ],
};
