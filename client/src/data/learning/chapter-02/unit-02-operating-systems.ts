import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

const hardeningVisual = v(
  "c2v-hardening",
  "Hardening reduz a superfície de ataque",
  "flow",
  "Fluxo de sistema padrão para baseline testado e sistema endurecido",
  "Hardening é um processo de redução de exposição: atualizar, remover o desnecessário, restringir administração, habilitar logs e proteger boot/dados sem quebrar a função do sistema.",
  ["Sistema padrão", "Benchmark / baseline", "Teste", "Aplicar controles", "Validar função", "Monitorar desvios"],
);

const registryVisual = v(
  "c2v-registry",
  "Windows Registry em camadas",
  "map",
  "Mapa de root keys, hives, keys e values do Windows Registry",
  "O Registry organiza configurações de sistema, software, usuários e hardware. Para o SOC, caminho e contexto da chave importam tanto quanto o valor alterado.",
  ["Root Key", "Hive", "Key / Subkey", "Value name", "Value type", "Value data", "ACL / Audit"],
);

const processVisual = v(
  "c2v-process-context",
  "Processo legítimo ou mascarado?",
  "decision-tree",
  "Árvore de decisão para validar processo por nome, caminho, pai, assinatura e comportamento",
  "Nome é só um atributo. Analistas reduzem falsos positivos verificando caminho, origem do processo, privilégios e comportamento observado.",
  ["Nome esperado?", "Caminho esperado?", "Parent coerente?", "Assinatura/arquivo esperado?", "Comportamento coerente?", "Investigar anomalias"],
);

export const chapter02Unit02OperatingSystems: LearningUnit = {
  id: "c2u2-os",
  title: "Unidade 2 — Sistema operacional, hardening e contexto do host",
  summary: "Aprenda o que o SOC precisa reconhecer em configuração, Registry, arquivos, processos e arquitetura de CPU.",
  lessons: [
    lesson({
      id: "c2l06-hardening", number: 6, title: "System hardening e attack surface", duration: 19,
      objective: "Explicar hardening como processo mensurável de redução da superfície de ataque.",
      bridge: "A infraestrutura hospeda um sistema operacional; agora precisamos reduzir as formas pelas quais esse sistema pode ser comprometido.",
      examFocus: ["system hardening", "attack surface", "secure boot", "disk encryption"],
      topics: [topic({
        id: "c2t06-hardening", title: "Reduzir exposição sem remover a função necessária", section: "Operating System Concepts — System Hardening", pages: "85–86",
        terms: [["System Hardening", "Hardening de sistema"], ["Attack Surface", "Superfície de ataque"], ["Secure Boot", "Inicialização segura"], ["Disk Encryption", "Criptografia de disco"]],
        blocks: [
          b("simple", "simple", "O objetivo", "Hardening deixa o sistema resistente ao remover caminhos desnecessários para um atacante, mantendo somente aquilo que o negócio precisa."),
          b("technical", "technical", "Práticas centrais", "O capítulo destaca atualizar e corrigir o sistema, remover software/serviços desnecessários, restringir e registrar acesso administrativo, controlar criação de contas, habilitar logging/monitoramento e usar recursos como criptografia de disco e Secure Boot."),
          b("comparison", "comparison", "Hardening não é uma única configuração", "É um processo composto.", ["Patching reduz vulnerabilidades conhecidas", "Remoção de software/serviços reduz exposição", "Controle administrativo reduz abuso de privilégio", "Logging aumenta observabilidade", "Disk encryption protege dados armazenados", "Secure Boot ajuda a proteger a cadeia de inicialização"]),
          b("soc", "soc", "Como o analista reconhece desvio", "Compare o host com seu baseline: serviço novo, conta administrativa inesperada, logging desativado ou boot security alterada são sinais de mudança que precisam de contexto e autorização."),
          b("evidence", "evidence", "Exemplo sintético de postura", "Um único achado não define comprometimento; o conjunto aponta desvio do baseline.", undefined, ["host=WS-204 baseline=win11-cis-v2", "service=RemoteRegistry state=running expected=disabled", "local_admin=new-user change_ticket=none", "secure_boot=enabled disk_encryption=enabled"]),
          b("exam", "exam", "CySA+", "Se a alternativa propõe habilitar mais serviços para ‘facilitar administração’, desconfie: hardening tende a remover o que não é necessário e restringir o que precisa permanecer."),
        ],
        visual: hardeningVisual,
        practiceIds: ["c2p06-hardening"],
      })],
    }),
    lesson({
      id: "c2l07-benchmarks", number: 7, title: "CIS Benchmarks, baseline e validação", duration: 17,
      objective: "Distinguir benchmark, baseline, hardening e patching e entender por que padrões precisam ser testados.",
      bridge: "Hardening fica mais consistente quando deixa de depender da memória do administrador e passa a usar referências e baselines.",
      examFocus: ["CIS benchmarks", "configuration baseline", "testing"],
      topics: [topic({
        id: "c2t07-benchmarks", title: "Padrão de referência não é configuração cega", section: "Operating System Concepts — System Hardening", pages: "85–86",
        terms: [["Benchmark", "Referência de boas práticas"], ["Configuration Baseline", "Baseline de configuração"], ["Center for Internet Security (CIS)", "Center for Internet Security"], ["Deviation", "Desvio"]],
        blocks: [
          b("simple", "simple", "Benchmark x baseline", "Um benchmark sugere boas práticas. O baseline é a configuração que sua organização decidiu adotar e validar para um tipo de sistema. Hardening é o processo de aplicar e manter essas escolhas; patching é apenas uma parte disso."),
          b("analogy", "analogy", "Receita x prato aprovado", "O benchmark é uma receita recomendada. O baseline é a versão da receita que sua cozinha testou e aprovou. Aplicar a receita sem testar ingredientes e necessidades locais pode quebrar o serviço."),
          b("technical", "technical", "Por que testar", "CIS e outras referências são pontos de partida. Algumas configurações podem impedir funcionalidade crítica. A organização precisa testar, justificar exceções e avaliar o risco criado por qualquer desvio."),
          b("soc", "soc", "Drift de configuração", "O SOC pode receber sinais de configuração fora do baseline. Antes de classificar como incidente, confirme se existe exceção aprovada e se a mudança está associada a ticket, janela e responsável."),
          b("exam", "exam", "CySA+", "A melhor prática não é aplicar todo benchmark cegamente; é adaptar, testar, documentar e monitorar desvios."),
        ],
        practiceIds: ["c2p07-benchmark"],
      })],
    }),
    lesson({
      id: "c2l08-registry-basics", number: 8, title: "Windows Registry: por que o SOC olha para ele", duration: 20,
      objective: "Compreender a estrutura do Registry e sua relevância para configuração, persistência e auditoria.",
      bridge: "Em Windows, grande parte do estado de configuração não vive em arquivos de texto: vive no Registry.",
      examFocus: ["Windows Registry", "persistence", "regedit"],
      topics: [topic({
        id: "c2t08-registry-basics", title: "Banco de configurações do Windows", section: "Operating System Concepts — The Windows Registry", pages: "86–87",
        terms: [["Windows Registry", "Registro do Windows"], ["Registry Hive", "Hive do Registry"], ["Registry Key", "Chave"], ["Registry Value", "Valor"], ["regedit", "Editor do Registry"]],
        blocks: [
          b("simple", "simple", "O que é", "O Registry é um banco hierárquico de configurações usado pelo Windows, drivers, serviços e programas. Por isso, mudanças nele podem ser legítimas, administrativas ou maliciosas."),
          b("technical", "technical", "Estrutura", "Root keys organizam hives; hives contêm keys e subkeys; keys podem possuir values com nome, tipo e dados. ACLs do Windows podem permitir, negar e auditar acesso a chaves."),
          b("soc", "soc", "Por que malware gosta do Registry", "Ele oferece locais persistentes e carregados automaticamente pelo sistema ou por aplicações. O analista deve avaliar caminho, usuário, processo responsável, valor anterior/novo e contexto de mudança."),
          b("evidence", "evidence", "Evento sintético", "O caminho chama atenção porque executa conteúdo durante logon, mas ainda é preciso validar aplicação e origem da alteração.", undefined, ["event=registry_value_set", "key=HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", "value=Updater", "data=C:\\Users\\Public\\updater.exe", "process=powershell.exe user=ana"]),
          b("mistake", "mistake", "Registry ≠ malware", "Milhares de alterações legítimas acontecem diariamente. Persistence é uma hipótese quando o local e o comportamento são compatíveis, não uma conclusão automática."),
          b("exam", "exam", "CySA+", "Saiba o papel do Registry, a ferramenta regedit e que ele é uma fonte importante de configuração e persistência."),
        ],
        visual: registryVisual,
        practiceIds: ["c2p08-registry"],
      })],
    }),
    lesson({
      id: "c2l09-registry-roots", number: 9, title: "HKCR, HKLM, HKU, HKCU e HKCC", duration: 17,
      objective: "Reconhecer o foco das cinco root keys apresentadas no capítulo sem decorar definições isoladas.",
      bridge: "Depois de entender a estrutura, precisamos saber em qual área procurar uma configuração.",
      examFocus: ["Registry root keys"],
      topics: [topic({
        id: "c2t09-registry-roots", title: "Cinco raízes, cinco contextos", section: "Operating System Concepts — The Windows Registry; Table 2.1", pages: "86–87",
        terms: [["HKEY_CLASSES_ROOT (HKCR)", "Associação de tipos/COM"], ["HKEY_LOCAL_MACHINE (HKLM)", "Configuração do sistema"], ["HKEY_USERS (HKU)", "Perfis de usuários"], ["HKEY_CURRENT_USER (HKCU)", "Usuário atual"], ["HKEY_CURRENT_CONFIG (HKCC)", "Perfil de hardware atual"]],
        blocks: [
          b("simple", "simple", "Como formar o mapa mental", "Em vez de decorar siglas, associe cada raiz à pergunta que ela responde."),
          b("comparison", "comparison", "Mapa das root keys", "Use o contexto para decidir onde procurar.", ["HKCR: que programa/componente está associado a determinado tipo ou objeto?", "HKLM: que configuração vale para a máquina e seus serviços/tarefas?", "HKU: quais configurações pertencem aos perfis de usuários?", "HKCU: o que está configurado para o usuário atualmente logado?", "HKCC: qual perfil de hardware está ativo nesta configuração local?"]),
          b("soc", "soc", "Exemplo de triagem", "Persistência em HKCU pode afetar um usuário; mudança em HKLM tende a ser de escopo do sistema. Isso ajuda a estimar privilégio necessário e abrangência do efeito."),
          b("exam", "exam", "CySA+", "O livro apresenta as cinco root keys para que você reconheça seu contexto geral, não para memorizar todas as subchaves do Windows."),
        ],
        practiceIds: ["c2p09-registry-roots"],
      })],
    }),
    lesson({
      id: "c2l10-config-locations", number: 10, title: "Onde ficam arquivos e configurações", duration: 15,
      objective: "Reconhecer locais comuns de configuração em Windows, Linux e macOS e priorizar o que o exame destaca.",
      bridge: "Nem toda configuração fica no Registry; cada sistema operacional tem convenções próprias.",
      examFocus: ["configuration file locations", "Windows", "Linux"],
      topics: [topic({
        id: "c2t10-config-locations", title: "Windows, Linux e macOS", section: "Operating System Concepts — File Structure and File Locations", pages: "87–88",
        terms: [["C:\\ProgramData\\", "Dados/configuração compartilhados no Windows"], ["C:\\Program Files\\", "Arquivos de programas no Windows"], ["AppData", "Dados/configuração por usuário no Windows"], ["/etc/", "Configuração comum no Linux"], ["~/Library/Preferences", "Preferências por usuário no macOS"], ["/Library/Preferences", "Preferências de sistema no macOS"]],
        blocks: [
          b("simple", "simple", "Por que isso importa", "Durante investigação, saber onde uma aplicação costuma guardar configuração ajuda a localizar alteração, persistência, segredo exposto ou arquivo que deveria ser protegido."),
          b("comparison", "comparison", "Locais comuns", "O capítulo pede entendimento básico, especialmente Windows e Linux.", ["Windows: Registry + ProgramData + Program Files + AppData", "Linux: /etc é o ponto de partida clássico", "macOS: Library/Preferences em escopos de usuário e sistema"]),
          b("soc", "soc", "Caminho ajuda a validar hipótese", "Um arquivo com nome legítimo em diretório inesperado merece mais atenção do que o mesmo arquivo no local previsto. Ainda assim, verifique assinatura, proprietário, criação, parent process e baseline."),
          b("exam", "exam", "CySA+", "A Exam Note enfatiza locais de configuração em Windows e Linux; macOS é útil para contexto, mas tende a ter menor prioridade neste objetivo."),
        ],
        practiceIds: ["c2p10-config-locations"],
      })],
    }),
    lesson({
      id: "c2l11-system-processes", number: 11, title: "System processes e mascaramento", duration: 20,
      objective: "Entender processos essenciais e avaliar nomes parecidos com legítimos usando contexto de execução.",
      bridge: "Depois de configurações, passamos ao que está efetivamente executando no host.",
      examFocus: ["system processes", "masquerading", "privileged access"],
      topics: [topic({
        id: "c2t11-system-processes", title: "Nome do processo é apenas o começo", section: "Operating System Concepts — System Processes", pages: "88",
        terms: [["System Process", "Processo de sistema"], ["PID", "Identificador de processo"], ["Parent Process", "Processo pai"], ["Masquerading", "Mascaramento/imitação"]],
        blocks: [
          b("simple", "simple", "Processos do sistema", "São componentes fundamentais do sistema operacional. Alguns executam com privilégios elevados, o que os torna alvos valiosos e também nomes atraentes para malware tentar imitar."),
          b("technical", "technical", "Exemplos Windows citados", "O capítulo menciona kernel/NT, Registry process, smss.exe, csrss.exe, services.exe, winlogon.exe e wininit.exe como exemplos. O objetivo não é memorizar todos; é reconhecer que processos essenciais têm nome, caminho e relacionamento esperados."),
          b("soc", "soc", "Raciocínio de validação", "Compare pelo menos nome, caminho, parent process, usuário/privilégio, assinatura/hash e comportamento. ‘svch0st.exe’ ou um processo legítimo em diretório improvável pode ser sinal de masquerading."),
          b("evidence", "evidence", "Processo sintético suspeito", "O nome imita um binário conhecido, mas caminho e parent process não combinam com a expectativa.", undefined, ["pid=4312 name=svchost.exe", "path=C:\\Users\\Public\\svchost.exe", "parent=winword.exe", "user=CORP\\ana", "network=203.0.113.44:443"]),
          b("mistake", "mistake", "Não marque apenas pelo nome", "Atacantes copiam nomes legítimos; aplicações legítimas também podem ter nomes incomuns. O contexto do processo é o que dá valor investigativo."),
          b("exam", "exam", "CySA+", "Saiba o conceito de system process e por que nomes semelhantes aos legítimos podem esconder software malicioso."),
        ],
        visual: processVisual,
        practiceIds: ["c2p11-processes"],
      })],
    }),
    lesson({
      id: "c2l12-hardware-architecture", number: 12, title: "x86, ARM e arquitetura de hardware", duration: 14,
      objective: "Explicar por que arquitetura de CPU influencia compatibilidade de software e análise de malware.",
      bridge: "O sistema operacional também depende da arquitetura do hardware em que executa.",
      examFocus: ["hardware architecture", "x86", "ARM"],
      topics: [topic({
        id: "c2t12-hardware-architecture", title: "Código precisa ser compatível com a arquitetura", section: "Operating System Concepts — Hardware Architecture", pages: "89",
        terms: [["x86", "Arquitetura x86"], ["ARM", "Advanced RISC Machine"], ["Instruction Set", "Conjunto de instruções"], ["Emulation", "Emulação"]],
        blocks: [
          b("simple", "simple", "Por que um binário pode não rodar", "Programas compilados são produzidos para determinado conjunto de instruções. Um binário x86 não executa nativamente em qualquer CPU ARM, salvo quando existe compatibilidade ou emulação."),
          b("technical", "technical", "Impacto defensivo", "Arquitetura ajuda a decidir quais artefatos podem realmente executar em um ativo, qual ferramenta forense usar e como interpretar amostras. Apple Silicon é um exemplo moderno de ARM em computadores pessoais."),
          b("soc", "soc", "Triage de amostra", "Se a sandbox diz que um binário x86 falhou em host ARM, isso pode explicar ausência de comportamento. Não conclua que o arquivo é benigno; valide arquitetura e versões disponíveis."),
          b("mistake", "mistake", "ARM não é imunidade", "Atacantes compilam malware para múltiplas arquiteturas. Arquitetura diferente pode quebrar uma amostra específica, mas não é controle de segurança suficiente."),
          b("exam", "exam", "CySA+", "Entenda por que hardware architecture influencia o que pode rodar e, consequentemente, o que um defensor deve procurar."),
        ],
        practiceIds: ["c2p12-hardware"],
      })],
    }),
  ],
};
