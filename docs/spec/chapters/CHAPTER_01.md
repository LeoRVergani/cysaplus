# Capítulo 1 — Today's Cybersecurity Analyst

## Escopo auditado

| Metadado | Valor |
|---|---|
| Livro-fonte | CompTIA CySA+ Study Guide — Exam CS0-003, Third Edition |
| Capítulo | 1 — *Today's Cybersecurity Analyst* |
| Faixa do capítulo no livro | Páginas impressas 3–36, conforme o índice do guia |
| Domínios relacionados | Security Operations; Vulnerability Management |
| Módulo atual no site | `OPS-01 — O analista de cibersegurança de hoje` |
| Estado desta spec | Implementação profunda integrada; validação de desktop, mobile, práticas, rota e checkpoint concluída |

## Diagnóstico de lacuna

O `OPS-01` atual possui uma visão geral de risco, segmentação, hardening e automação. Isso é uma introdução válida, porém insuficiente para a extensão do capítulo. A estrutura proposta divide o capítulo em unidades curtas para evitar uma página única e difícil de revisar.

```text
Capítulo 1
├── Unidade A — Fundamentos, objetivos e risco
├── Unidade B — Controles, rede e endpoint
├── Unidade C — Pentest e validação de segurança
├── Unidade D — Engenharia reversa e isolamento
├── Unidade E — Eficiência, automação e resposta
└── Checkpoint do Capítulo 1
```

## Matriz de cobertura

| Seção localizada no guia | Conceitos/subseções ensinados | Unidade da trilha | Prática aplicada | Visual didático | Estado de implementação |
|---|---|---|---|---|---|
| Cybersecurity Objectives | confidencialidade, integridade, disponibilidade; defesa em profundidade | A1 | classificar impacto em CIA | comparativo CIA | Implementado |
| Privacy vs. Security | finalidade, acesso, divulgação, segurança, qualidade, monitoramento; PII | A1 | cenário de privacidade | contraste de objetivos | Implementado |
| Evaluating Security Risks | ameaça, vulnerabilidade, risco; relação entre conceitos; avaliação | A2 | priorizar cenário de risco | fluxo de risco | Implementado |
| Identify Threats | fontes adversariais, acidentais, estruturais e ambientais | A2 | classificar fonte de ameaça | categorias de ameaça | Implementado |
| The Insider Threat | origem interna, abuso, erro, administração inadequada | A2 | triagem contextual de acesso | decisão por contexto | Implementado |
| Identify Vulnerabilities | fraquezas em processo, sistema, aplicação e configuração | A2 | priorizar exposição contextual | fluxo de risco | Implementado |
| Likelihood, Impact and Risk | probabilidade, impacto, controles existentes, avaliação qualitativa | A2 | priorizar cenário de risco | fluxo de risco | Implementado |
| Reviewing Controls | preventivo, detectivo, corretivo; avaliação de eficácia | B1 | associar controle a objetivo | camadas de controle | Implementado |
| Building a Secure Network | defesa em profundidade, perímetro e administração de rede segura | B1 | associar controle a objetivo | camadas de controle | Implementado |
| Network Access Control | suplicante, autenticador, servidor de autenticação; postura | B2 | decidir acesso NAC | fluxo NAC | Implementado |
| Firewalls and Network Perimeter Security | regra, origem, destino, porta, protocolo, allow/deny, logging | B2 | analisar regra e log | mapa da regra | Implementado |
| Network Segmentation | zonas, menor privilégio de rede, limitação de lateralidade | B2 | criar regra mínima | mapa da regra | Implementado |
| Defense Through Deception | honeypot, dados/ativos de engano e observação | B2 | priorizar sinal de deception | mapa da regra | Implementado |
| Secure Endpoint Management | linha de base, privilégios, softwares de proteção e estado do host | B3 | revisar postura do endpoint | fluxo de endpoint | Implementado |
| Hardening System Configurations | redução de serviços, configuração segura e baseline | B3 | revisar postura do endpoint | fluxo de endpoint | Implementado |
| Patch Management | ciclo de atualização, verificação e risco residual | B3 | tratar patch adiado | fluxo de endpoint | Implementado |
| Compensating Controls | mitigação temporária, responsabilidade e data de revisão | B3 | tratar patch adiado | fluxo de endpoint | Implementado |
| Group Policies | aplicação centralizada de configuração em ambiente Windows | B3 | comparar GPO e MAC | fluxo de endpoint | Implementado |
| Endpoint Security Software | prevenção, monitoramento e resposta no endpoint | B3 | revisar postura do endpoint | fluxo de endpoint | Implementado |
| Mandatory Access Controls | política obrigatória e rótulos/classificação | B3 | comparar GPO e MAC | fluxo de endpoint | Implementado |
| Penetration Testing | propósito, autorização e escopo de avaliação | C1 | ordenar pentest autorizado | ciclo de pentest | Implementado |
| Planning a Penetration Test | escopo, regras de engajamento, janela e comunicação | C1 | verificar escopo | ciclo de pentest | Implementado |
| Conducting Discovery | descoberta autorizada e coleta de evidência | C1 | validar descoberta | ciclo de pentest | Implementado |
| Executing a Penetration Test | etapas, evidências e limites de execução | C1 | ordenar pentest autorizado | ciclo de pentest | Implementado |
| Communicating Pentest Results | relatório, impacto, evidência e recomendações | C1 | explicar achado | ciclo de pentest | Implementado |
| Training and Exercises | treinamento, simulação, aprendizado e melhoria | C1 | exercício de mesa | ciclo de pentest | Implementado |
| Reverse Engineering | propósito, limites e relação com análise de ameaça | D1 | classificar análise | fluxo de análise | Implementado |
| Isolation and Sandboxing | isolamento, ambiente controlado e observação segura | D1 | registrar evidência de sandbox | fluxo de análise | Implementado |
| Reverse Engineering Software | análise de artefato, fingerprinting e evidência | D1 | registrar evidência de sandbox | fluxo de análise | Implementado |
| Reverse Engineering Hardware | análise de equipamento e implicações de segurança | D1 | preservar metadados de hardware | fluxo de análise | Implementado |
| Efficiency and Process Improvement | padronização, processo, medição e redução de ruído | E1 | escolher limite de automação | árvore de automação | Implementado |
| Standardize Processes and Streamline Operations | consistência, runbook e operação repetível | E1 | criar runbook de triagem | árvore de automação | Implementado |
| Cybersecurity Automation | limites, validação e automação proporcional | E1 | escolher limite de automação | árvore de automação | Implementado |
| Technology and Tool Integration | integração, contexto e visão unificada | E1 | enriquecer alerta | árvore de automação | Implementado |
| Bringing Efficiency to Incident Response | enriquecimento e automação de playbooks | E1 | laboratório de runbook | árvore de automação | Implementado |
| The Future of Cybersecurity Analytics | evolução da análise e necessidade de julgamento | E1 | validar priorização analítica | árvore de automação | Implementado |
| Summary / Exam Essentials / Labs / Review material | revisão acumulada, termos e aplicação | Checkpoint | 20 questões, PBQ, 2 labs e 20 flashcards | checkpoint visual | Implementado |

## Estrutura educacional de implementação

Cada aula criada deverá conter: objetivo, pré-requisito, explicação simples, analogia quando útil, aprofundamento técnico, termos inglês–português, aplicação empresarial, visão SOC, evidência sintética quando aplicável, mitigação, erros comuns, pegadinhas de prova, o que memorizar, o que compreender e mini revisão.

## Critérios de auditoria antes de marcar completo

1. Todas as linhas da matriz devem possuir um destino de aprendizagem no site.
2. Todo conceito que altera decisão de SOC deve ter exemplo e atividade de aplicação.
3. O checkpoint deve trazer flashcards, mini quiz, questões de cenário, PBQ e laboratório seguro.
4. A validação deve testar leitura em desktop e celular, interação de exercícios, tipagem e build.
5. A documentação deve ser revisada contra os títulos, subtítulos, resumo, *Exam Essentials* e exercícios do capítulo antes de atribuir o estado **Completo**.
