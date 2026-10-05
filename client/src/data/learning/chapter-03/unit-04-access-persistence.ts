import type { LearningUnit } from "../types";
import { b, lesson, topic, v } from "./helpers";

export const chapter03Unit04AccessPersistence: LearningUnit = {
  id: "c3u4-access-persistence",
  title: "Unidade 4 — Acesso, persistência e engenharia social",
  summary: "Investigue acesso e mudança não autorizados, persistência por Registry e tarefas agendadas e sinais humanos de engenharia social.",
  lessons: [
    lesson({
      id: "c3l19-unauthorized-access", number: 19, title: "Acesso, mudanças e privilégios não autorizados", duration: 13,
      objective: "Correlacionar autenticação, criação de conta, mudanças e uso de privilégios com expectativa e aprovação.",
      bridge: "Processos anômalos podem ser consequência de uma identidade abusada; agora investigue quem teve acesso e o que mudou.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t19-unauthorized-access", title: "Acesso, mudanças e privilégios não autorizados", section: "Unauthorized Access, Changes, and Privileges", pages: "141–142",
        terms: [["Unauthorized Access", "Acesso não autorizado"], ["Privilege Escalation", "Escalação de privilégio"], ["User Creation", "Criação de usuário"], ["Audit Log", "Log de auditoria"], ["Change Management", "Gestão de mudanças"], ["Least Privilege", "Menor privilégio"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Logs de autenticação e criação de usuário revelam acesso; FIM/config logs revelam mudanças; security/application logs mostram privilégio. O difícil é saber o que era esperado."),
          b("technical", "technical", "Como funciona tecnicamente", "Compare identidade, origem, horário, dispositivo, ação, role e ticket. Em ambientes complexos, centralização e PAM/identity governance tornam a auditoria mais confiável."),
          b("soc", "soc", "Visão de SOC", "Uma ação privilegiada legítima deve ter identidade, contexto e autorização rastreáveis."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["audit actor=svc-backup action=create-user target=ops-temp role=admin time=03:17 ticket=none"]),
          b("exam", "exam", "Importante para a CySA+", "A melhor resposta de prova normalmente correlaciona o evento com mudança/identidade, não presume intenção."),
          b("remember", "remember", "Gatilho de decisão", "Quem, de onde, quando, qual privilégio/ação e qual autorização ou mudança justificava o uso.")
        ],
        practiceIds: ["c3p19-unauthorized-access"]
      })],
    }),
    lesson({
      id: "c3l20-registry-persistence", number: 20, title: "Registry e persistência no Windows", duration: 14,
      objective: "Reconhecer alterações em áreas de inicialização como pista de persistência e validar contexto antes de remover.",
      bridge: "Uma identidade ou processo pode tentar sobreviver a reboot/logon alterando mecanismos de inicialização.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t20-registry-persistence", title: "Registry e persistência no Windows", section: "Registry Changes or Anomalies", pages: "142",
        terms: [["Windows Registry", "Registro do Windows"], ["Run Key", "Chave Run"], ["RunOnce", "RunOnce"], ["Persistence", "Persistência"], ["Autoruns", "Inicialização automática"], ["Registry Monitoring", "Monitoramento do Registry"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Áreas Run/RunOnce do usuário ou máquina são exemplos clássicos de inicialização automática. Elas também são usadas legitimamente por software, por isso data, writer process, caminho do executável e assinatura são essenciais."),
          b("technical", "technical", "Como funciona tecnicamente", "Colete valor anterior/novo, processo que escreveu, usuário e hash do binário apontado. Compare com instalação/patch aprovado antes de excluir a entrada."),
          b("soc", "soc", "Visão de SOC", "Persistência não é o mesmo que malware: é uma técnica que pode ser legítima ou abusada."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["registry path=HKCU\\...\\Run name=Update value=%TEMP%\\update.exe writer=winword.exe"]),
          b("exam", "exam", "Importante para a CySA+", "A questão forte combina Registry change com binário em caminho estranho ou processo originador suspeito."),
          b("remember", "remember", "Gatilho de decisão", "Porque software legítimo também usa inicialização automática; valide writer, caminho, assinatura e change context.")
        ],
        practiceIds: ["c3p20-registry-persistence"]
      })],
    }),
    lesson({
      id: "c3l21-scheduled-tasks", number: 21, title: "Scheduled Tasks como mecanismo de persistência", duration: 15,
      objective: "Analisar tarefa agendada por criador, trigger, conta, comando e histórico de execução.",
      bridge: "O Registry não é o único ponto de persistência: o agendador executa comandos em horários ou eventos definidos.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t21-scheduled-tasks", title: "Scheduled Tasks como mecanismo de persistência", section: "Unauthorized Scheduled Tasks", pages: "142–143",
        terms: [["Scheduled Task", "Tarefa agendada"], ["Task Scheduler", "Agendador de Tarefas"], ["schtasks", "schtasks"], ["Trigger", "Gatilho"], ["Principal", "Conta de execução"], ["Persistence", "Persistência"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Uma tarefa tem ação, trigger, principal/conta e configuração. Tarefas criadas por instaladores e administração são comuns; tarefas ocultas, elevadas ou apontando para caminhos incomuns merecem validação."),
          b("technical", "technical", "Como funciona tecnicamente", "Correlacione criação da tarefa com EDR/Event Log, hash do executável, owner da mudança e ticket. Não execute manualmente uma ação suspeita para 'ver o que faz'."),
          b("soc", "soc", "Visão de SOC", "A tarefa é evidência de persistência apenas quando o contexto mostra uso inesperado ou malicioso."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["task=SystemUpdate principal=SYSTEM trigger=5m action=C:\\ProgramData\\tmp\\svc.exe creator=user1"]),
          b("exam", "exam", "Importante para a CySA+", "Procure conta de alta permissão, caminho suspeito e criação fora do processo de mudança."),
          b("remember", "remember", "Gatilho de decisão", "Ação/comando, trigger, principal, criador, horário e histórico de execução.")
        ],
        practiceIds: ["c3p21-scheduled-tasks"]
      })],
    }),
    lesson({
      id: "c3l22-cron-context", number: 22, title: "Cron em Linux: continuidade do conceito", duration: 16,
      objective: "Transferir o raciocínio de tarefa agendada para Linux sem memorizar comandos como finalidade em si.",
      bridge: "O objetivo de segurança é o mesmo em Windows e Linux: descobrir execução persistente que não deveria existir.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t22-cron-context", title: "Cron em Linux: continuidade do conceito", section: "Unauthorized Scheduled Tasks — Linux cron (complementary cross-platform context)", pages: "143",
        terms: [["cron", "cron"], ["crontab", "crontab"], ["root cron", "cron do root"], ["Scheduled Execution", "Execução agendada"], ["Persistence", "Persistência"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Cron agenda comandos por usuário/sistema. Entradas inesperadas como root ou scripts em diretórios graváveis por usuários merecem revisão. O ponto é autoria, frequência, comando e contexto."),
          b("technical", "technical", "Como funciona tecnicamente", "Compare crontab e diretórios de cron com baseline de configuração; valide owner/permissões do script chamado e procure eventos correlatos no mesmo horário."),
          b("soc", "soc", "Visão de SOC", "Mesmo quando o objetivo usa o termo Windows 'scheduled task', entenda o equivalente operacional em Linux."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["cron user=root schedule=*/5 * * * * cmd=/tmp/.cache-sync change_record=none"]),
          b("exam", "exam", "Importante para a CySA+", "Não basta encontrar cron: jobs de backup, rotação e manutenção são normais."),
          b("remember", "remember", "Gatilho de decisão", "Privilégio, comando/caminho, autoria, frequência e divergência do baseline/mudança autorizada.")
        ],
        practiceIds: ["c3p22-cron-context"]
      })],
    }),
    lesson({
      id: "c3l23-social-engineering", number: 23, title: "Engenharia social e processo de reporte", duration: 17,
      objective: "Tratar relatos humanos como telemetria e estruturar resposta sem punir quem reporta cedo.",
      bridge: "Nem toda evidência nasce em log: uma ligação estranha ou pedido incomum pode ser o primeiro indicador.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t23-social-engineering", title: "Engenharia social e processo de reporte", section: "Social Engineering", pages: "143–144",
        terms: [["Social Engineering", "Engenharia social"], ["Awareness Training", "Treinamento de conscientização"], ["Reporting Process", "Processo de reporte"], ["Pretexting", "Pretexting"], ["Impersonation", "Impersonação"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Engenharia social explora confiança, urgência e autoridade. Treinamento ajuda a reconhecer; canais simples e não punitivos aumentam a chance de reporte rápido."),
          b("technical", "technical", "Como funciona tecnicamente", "Quando alguém reportar, preserve mensagem/número/horário, identifique ação tomada, verifique se credenciais foram fornecidas e procure eventos de autenticação correspondentes."),
          b("soc", "soc", "Visão de SOC", "O erro operacional é culpar o usuário e perder o tempo de resposta. Reporte rápido vale mais que silêncio por medo."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["report channel=security user=finance01 event=suspected-phish credentials_entered=true time=10:42"]),
          b("exam", "exam", "Importante para a CySA+", "A resposta correta integra processo humano e investigação técnica."),
          b("remember", "remember", "Gatilho de decisão", "Porque aumenta a chance de usuários relatarem cedo, reduzindo o tempo até contenção e investigação.")
        ],
        practiceIds: ["c3p23-social-engineering"]
      })],
    }),
    lesson({
      id: "c3l24-obfuscated-links", number: 24, title: "Links ofuscados e decisão segura", duration: 12,
      objective: "Comparar texto visível e destino real de links sem abrir conteúdo suspeito.",
      bridge: "Phishing frequentemente tenta fazer o olho humano validar uma coisa enquanto o navegador abriria outra.",
      examFocus: ["1.2 indicators of potentially malicious activity"],
      topics: [topic({
        id: "c3t24-obfuscated-links", title: "Links ofuscados e decisão segura", section: "Social Engineering — Obfuscated Links", pages: "144",
        terms: [["Obfuscated Link", "Link ofuscado"], ["Display Text", "Texto exibido"], ["Destination URL", "URL de destino"], ["Homograph", "Homógrafo"], ["URL Encoding", "Codificação de URL"], ["Phishing", "Phishing"]],
        blocks: [
          b("simple", "simple", "Modelo mental", "Texto do link, domínio real, subdomínio, codificação, redirecionadores e caracteres parecidos podem esconder o destino. A análise deve ocorrer por visualização segura, headers/gateway e ferramentas autorizadas."),
          b("technical", "technical", "Como funciona tecnicamente", "Nunca clique em link suspeito só para verificar. Extraia a URL como texto, normalize com cuidado e consulte telemetria/reputação em ambiente apropriado."),
          b("soc", "soc", "Visão de SOC", "Um link ofuscado é técnica de engano, não necessariamente malware por si só."),
          b("evidence", "evidence", "Evidência sintética", "Use estas linhas apenas como material de análise do laboratório; não representam ambiente real.", undefined, ["display=https://portal.empresa.example href=https://empresa.example.attacker.test/login"]),
          b("exam", "exam", "Importante para a CySA+", "Olhe o registrable domain e a cadeia de redirecionamento, não apenas palavras familiares na URL."),
          b("remember", "remember", "Gatilho de decisão", "Qual é o destino real/registrable domain, sem clicar?")
        ],
        practiceIds: ["c3p24-obfuscated-links"]
      })],
    })
  ],
};
