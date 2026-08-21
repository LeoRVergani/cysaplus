# Especificação de Cobertura — CySA+ Estudo BR

> **Objetivo:** transformar o guia CySA+ fornecido em uma experiência de estudo autoral, didática e prática. Este documento descreve temas, lacunas e componentes recomendados; não reproduz textos extensos, questões ou respostas da obra de referência.

## 1. Base de referência e escopo

O guia enviado organiza a preparação em quatro domínios e treze capítulos: Operações de Segurança, Gerenciamento de Vulnerabilidades, Resposta e Gestão de Incidentes, e Relatórios e Comunicação. A plataforma atual já possui um módulo, conceitos-chave, duas questões autorais, flashcards e prática direcionada para cada capítulo. A próxima etapa deve aprofundar cada tópico em camadas curtas e conectadas: **entender → reconhecer em telemetria → decidir → registrar → revisar**.

| Camada pedagógica | O que já existe | O que será incluído |
|---|---|---|
| Entender | Visão geral, objetivos e três conceitos por módulo | Resumo expandido por tópico, mapa de relações e exemplos simples |
| Reconhecer | Quatro cenários de logs sintéticos | Mais coleções de logs, campos destacados e perguntas de leitura |
| Decidir | Questões de cenário e PBQ de ordem de resposta | Árvores de decisão, critérios de severidade e exercícios de priorização |
| Registrar | Conteúdo de relatório e cadeia de custódia | Modelos de ticket, linha do tempo, evidência e briefing executivo |
| Revisar | Flashcards e prática linear | Glossário pesquisável, checklist de competências e revisão por lacuna |

## 2. Matriz de capítulos: cobertura e lacunas

| Capítulo | Temas tratados pelo guia, em síntese | Cobertura atual no site | Lacunas que devem virar recursos de estudo | Prioridade |
|---|---|---|---|---|
| 1. Analista de cibersegurança | Fundamentos do trabalho analítico, controles, ferramentas, automação, treinamento, melhoria de processo e análise futura | **Parcial.** Risco, segmentação, hardening e automação são introduzidos | Tipos de controle, ferramenta vs. processo, papel do analista, redução de falsos positivos, melhoria contínua e mapa de carreira SOC | Alta |
| 2. Arquitetura de sistemas e redes | Servidores, virtualização, contêineres, funções sem servidor, SO, registro, logs, tempo, redes, Zero Trust, IAM, criptografia e dados sensíveis | **Parcial.** Arquitetura, ingestão, IAM e proteção de dados já aparecem | Camadas de rede, fluxo de autenticação, níveis de log, registro do Windows, SASE, PKI, DLP, PII e CHD | Alta |
| 3. Atividade maliciosa | Indicadores, tráfego de rede, reputação, e-mail, análise de arquivo, sandbox e comportamento de usuário | **Parcial.** IoC, persistência e sandbox são abordados | Anomalias de rede, análise segura de phishing, reputação, comportamento de usuário, formatos de evidência e distinção entre sinal e confirmação | Alta |
| 4. Inteligência de ameaças | Fontes abertas e fechadas, avaliação, compartilhamento, ciclo de inteligência, atores, TTPs e caça a ameaças | **Parcial.** PIR, TLP, confiança e contexto já aparecem | STIX/TAXII em nível conceitual, ciclo de inteligência, qualidade de fonte, mapeamento TTP → hipótese → detecção e hunting documentado | Média |
| 5. Reconhecimento e coleta | Inventário, descoberta autorizada, topologia, serviços, descoberta passiva, DNS/WHOIS, configurações, pacotes e agregação | **Parcial.** Escopo, superfície e coleta passiva já existem | Inventário de ativos, topologia, DNS/WHOIS, captura de pacotes, diferença entre descoberta autorizada e prática insegura, registro de escopo | Média |
| 6. Programa de vulnerabilidades | Ciclo de gestão, inventário, descoberta, classificação, priorização, responsabilidades, acompanhamento e métricas | **Parcial.** Inventário, SLA e controles compensatórios existem | Fluxo completo de ticket, ownership, métricas de idade, exceções, risco por ativo e painel de cobertura de varredura | Alta |
| 7. Análise de varreduras | Varreduras autenticadas, qualidade de evidência, resultados conflitantes, tendências, CVSS e falhas comuns em servidores, endpoints, rede, OT e web | **Parcial.** Cobertura, falso positivo e varredura autenticada existem | Interpretação de CVSS, prova de achado, reconciliação de fontes, tendência, cobertura e casos por classe de ativo | Alta |
| 8. Resposta a vulnerabilidades | Cálculo e tratamento de risco, controles, modelagem, superfície, mudança, patching, SDLC, DevSecOps, políticas e exceções | **Parcial.** Priorização, exceção e verificação existem | BIA simplificada, opções de tratamento, gestão de mudança, segurança de software, práticas DevSecOps, política/standard/procedure/guideline | Alta |
| 9. Programa de resposta a incidentes | Fases da resposta, plano, playbooks, equipe, severidade, frameworks de ataque, testes e comunicação | **Parcial.** Playbooks, escalonamento e exercício de mesa existem | Matriz de severidade, papéis CSIRT, política vs. playbook, ATT&CK/Diamond/Kill Chain como modelos de análise e simulado de mesa | Alta |
| 10. Detecção e análise | IoCs, comportamento de rede, uso de recursos, identidade, arquivos, privilégios, DNS, combinação de evidências, preservação e integridade | **Parcial.** Triage, linha do tempo e escopo existem | Laboratórios por fonte de log, correlação de sinais, fórmula de severidade, cadeia de custódia, legal hold e validação de integridade | Alta |
| 11. Contenção, erradicação e recuperação | Segmentação, isolamento, remoção, evidência, identificação, remediação, reimage, patching, descarte, mudança e lições aprendidas | **Parcial.** Contenção, erradicação e recuperação existem | Matriz de decisão de contenção, critérios de retorno, opções de recuperação, fluxo de mudança, retenção de evidências e pós-incidente | Alta |
| 12. Relatórios e comunicação | Relatórios de vulnerabilidade, stakeholders, declaração/escalonamento de incidente, comunicação, lições, métricas e KPIs | **Parcial.** Público, evidência e recomendação existem | Templates de ticket, atualização executiva, relatório técnico, comunicação de crise, métricas operacionais e storytelling de risco | Média |
| 13. Forense e técnicas de resposta | Capacidade forense, kit, endpoint, processo e memória, rede, nuvem, VM, contêiner, preservação, imagens, análise e causa raiz | **Parcial.** Volatilidade, cadeia de custódia e hash existem | Fluxo de aquisição seguro, ordem de volatilidade, modelo de cadeia de custódia, artefatos de endpoint/rede/nuvem, relatório de causa raiz | Alta |

## 3. Módulos de aprofundamento recomendados

Cada capítulo deve receber quatro blocos adicionais. Eles serão escritos de forma **autoral**, com linguagem didática e exemplos fictícios.

| Bloco | Estrutura | Resultado esperado |
|---|---|---|
| Resumo de campo | 5 a 8 subtópicos, cada um com definição, por que importa e erro comum | Relembrar o núcleo do capítulo em menos de 12 minutos |
| Exemplo guiado | Contexto, evidência sintética, leitura de campos e decisão justificável | Conectar conceito a uma rotina de SOC |
| Autorrevisão | 6 perguntas curtas: reconhecer, comparar, priorizar, explicar, registrar e escalar | Identificar lacunas sem depender de memorização passiva |
| Prática defensiva | Checklist, tabela, linha do tempo, relatório ou correlação de logs | Produzir um artefato de trabalho do analista |

## 4. Recursos didáticos e ilustrações autorais

As ilustrações serão criadas em linguagem visual de central de operações e devem explicar uma decisão, não decorar a página.

| Ilustração | Capítulos | Objetivo pedagógico | Exemplo associado |
|---|---:|---|---|
| Mapa de telemetria SOC | 2, 3 e 10 | Mostrar como identidade, endpoint, rede, DNS e nuvem se relacionam numa investigação | Correlacionar usuário, dispositivo e IP em uma linha do tempo |
| Ciclo de vulnerabilidades | 6, 7 e 8 | Explicar inventário → descoberta → validação → priorização → remediação → verificação | Priorizar uma falha explorável em aplicação exposta |
| Pirâmide de evidência | 3, 4 e 10 | Diferenciar indicador isolado, correlação, contexto e confirmação | Avaliar um domínio de baixa confiança sem bloqueio automático |
| Fluxo de resposta a incidentes | 9, 10 e 11 | Conectar preparação, detecção, análise, contenção, recuperação e lições | Ordenar ações iniciais sem destruir evidências |
| Cadeia de custódia | 10 e 13 | Mostrar coleta, hash, armazenamento, acesso e análise de cópias | Preservar uma imagem de disco sintética |
| Comunicação por público | 12 | Separar briefing executivo, ticket técnico e atualização operacional | Reescrever um alerta para três públicos diferentes |

## 5. Glossário SOC — especificação funcional

O Glossário SOC será uma área própria do site, acessível pelo menu lateral e por links dentro das aulas. A primeira versão deve conter pelo menos **120 termos autorais**, com busca por sigla, termo completo, categoria e módulo relacionado.

Cada entrada conterá os seguintes campos: **sigla/termo**, nome por extenso, categoria, definição curta, por que importa no SOC, exemplo defensivo, armadilha comum, capítulos relacionados e links para prática.

| Categoria | Escopo inicial de termos | Exemplos de entradas |
|---|---:|---|
| Redes, portas e protocolos | 28 | TCP, UDP, ICMP, DNS, DHCP, HTTP, HTTPS, TLS, SSH, RDP, SMB, LDAP, NTP, SNMP, VPN, NAT, CIDR, VLAN, proxy, firewall, WAF, SASE |
| Identidade e acesso | 20 | IAM, MFA, SSO, SAML, OAuth, OIDC, RBAC, ABAC, PAM, JIT, JEA, IdP, LDAP, Kerberos, FIDO2, CASB |
| SOC, logs e detecção | 24 | SOC, SIEM, SOAR, EDR, XDR, NDR, UEBA, IOC, TTP, ATT&CK, alert, evento, correlação, normalização, baseline, false positive, false negative, triage |
| Ameaças e malware | 15 | phishing, spoofing, ransomware, botnet, C2, beaconing, persistence, lateral movement, exfiltration, privilege escalation, sandbox |
| Vulnerabilidades e risco | 16 | CVE, CVSS, CWE, EPSS, scan autenticado, falso positivo, SLA, BIA, risco residual, controle compensatório, patch, hardening |
| Incidentes e forense | 21 | CSIRT, playbook, severidade, contenção, erradicação, recuperação, cadeia de custódia, legal hold, hash, imagem forense, memória volátil, root cause analysis |
| Governança e comunicação | 12 | política, padrão, procedimento, diretriz, KPI, KRI, RTO, RPO, PII, CHD, DLP, TLP |

### 5.1 Portas e protocolos: formato seguro de estudo

O glossário deve apresentar portas como **referências de monitoramento e diagnóstico**, nunca como convite à enumeração contra sistemas sem autorização. Cada item terá protocolo, porta comum, sinal de log relevante, risco de configuração e pergunta de revisão.

| Serviço | Porta comum | O que observar no SOC | Pergunta de revisão |
|---|---:|---|---|
| DNS | 53 TCP/UDP | Consultas incomuns, falhas, volume atípico e domínios recém-observados | Qual fonte adicional reduz a incerteza sobre uma consulta suspeita? |
| HTTP/HTTPS | 80/443 TCP | Método, host, status, user agent, origem, destino e volume | Um status de erro é evidência de ataque ou precisa de contexto? |
| SSH | 22 TCP | Falhas repetidas, origem, conta, horário, sucesso posterior e escopo autorizado | Que correlação deve ocorrer antes de declarar comprometimento? |
| RDP | 3389 TCP | Tentativas de login, dispositivo, geolocalização, privilégios e sessão | Qual ação preserva serviço e reduz risco diante de acesso anômalo? |
| SMB | 445 TCP | Acesso lateral, falhas, compartilhamentos, conta e endpoint de origem | Como distinguir administração prevista de atividade fora do padrão? |
| LDAP/LDAPS | 389/636 TCP | Consultas anômalas, bind, mudança de grupo e conta privilegiada | Que alteração de identidade exige escopo e escalonamento? |
| NTP | 123 UDP | Sincronização, desvio de horário e impacto sobre a linha do tempo | Por que a normalização temporal é pré-requisito de correlação? |
| SMTP | 25/465/587 TCP | Remetente, reputação, anexos, falha SPF/DKIM/DMARC e volume | Qual evidência torna uma mensagem mais suspeita? |

## 6. Checklist de competências do analista SOC

O site deve expor um checklist que indique **Estudado**, **Praticar** ou **Revisar**, sem sugerir certificação ou prontidão profissional automática.

| Competência | Evidência de domínio no site | Estado inicial |
|---|---|---|
| Ler logs de identidade e autenticação | Resolver dois cenários com explicação de evidência e contexto | Praticar |
| Correlacionar tempo, usuário, ativo e origem | Montar linha do tempo sintética corretamente | Praticar |
| Explicar superfície de ataque e segmentação | Completar mapa de ativo e regra mínima de acesso | Estudado |
| Priorizar vulnerabilidades por contexto | Justificar prioridade com ativo, exposição e exploração | Praticar |
| Distinguir alerta, falso positivo e incidente | Completar triage de logs com hipótese alternativa | Praticar |
| Aplicar contenção proporcional | Ordenar PBQ e justificar impacto operacional | Estudado |
| Preservar evidência e cadeia de custódia | Preencher registro sintético de coleta e hash | Praticar |
| Comunicar para público técnico e executivo | Transformar o mesmo caso em ticket e briefing | Revisar |
| Usar glossário de forma aplicada | Acertar autorrevisão por contexto, não só definição | Praticar |

## 7. Roteiro de implementação recomendado

| Fase | Entrega | Valor de estudo |
|---|---|---|
| 1 | Corrigir execução local, remover analytics externo e substituir imagens externas por visuais portáveis | A plataforma funciona no ZIP e em hospedagem estática |
| 2 | Criar Glossário SOC, seção de portas e checklist de competências | Melhora consulta rápida e orientação do estudo diário |
| 3 | Acrescentar resumo expandido e autorrevisão aos capítulos 2, 3, 6, 7, 9, 10, 11 e 13 | Fecha as lacunas com maior impacto em SOC prático |
| 4 | Integrar ilustrações didáticas e laboratórios adicionais de logs sintéticos | Conecta conceitos a telemetria e decisão defensiva |
| 5 | Expandir os demais capítulos e adicionar relatórios, templates e revisão adaptativa | Consolida comunicação, governança e retenção de conteúdo |

## 8. Critérios de aceite para a próxima versão

1. A aplicação deve executar com `pnpm dev` sem referências a variáveis inexistentes ou erros de URI.
2. Nenhuma imagem crítica pode depender de caminhos específicos da plataforma de desenvolvimento.
3. Cada um dos treze capítulos deve oferecer: resumo expandido, exemplo, seis perguntas de autorrevisão e prática defensiva.
4. O Glossário SOC deve ter busca, filtro por categoria e ligações para conteúdos relacionados.
5. Todos os exemplos devem ser sintéticos, defensivos, anonimizados e contextualizados; o material não deve reproduzir questões oficiais ou longos trechos do guia.

## Referência de origem

Guia **CompTIA CySA+ Study Guide — Exam CS0-003, 3ª edição**, PDF fornecido pelo usuário. A especificação usa o sumário e os tópicos do material como mapa temático; as descrições e itens pedagógicos propostos são autorais.
