# Referências para treinamento de logs e SOC

## Uso pedagógico

As fontes abaixo orientam o desenho de exercícios defensivos. A aplicação não copia conjuntos de eventos de clientes nem incorpora telemetria sensível; ela utiliza **logs sintéticos**, inspirados em formatos e campos comuns, para treinar correlação, triagem e comunicação.

| Fonte | Achado aplicado | Uso no curso |
| --- | --- | --- |
| NIST SP 800-61r3 | A resposta a incidentes deve ser apoiada por preparação, detecção, resposta, recuperação e melhoria contínua. | Fluxo de rotina de SOC, decisão de escalonamento, laboratório de triagem e ciclo pós-incidente. |
| MITRE ATT&CK Data Components | Componentes de dados descrevem propriedades e valores relevantes para detectar técnicas; conteúdo de logs de aplicação pode registrar atividade, erros, métricas e alertas operacionais. | Mapa de fontes de telemetria e exercícios que relacionam evidência a hipótese, sem alegar cobertura automática. |
| Microsoft Learn — eventos a monitorar | Eventos de segurança podem registrar mudanças de política de auditoria, limpeza de logs, adição de atributos de conta e outros sinais que exigem contexto. | Exercícios de identidade e diretório com foco em triagem, registro de hipótese e validação antes de classificar um incidente. |

## Princípios de construção dos exercícios

Os laboratórios serão organizados em uma sequência repetível: observar evento, normalizar horários e identidades, enriquecer com contexto de ativo e usuário, testar hipótese alternativa, estimar escopo, decidir o próximo passo e registrar a comunicação. A sequência foi escolhida para ensinar investigação defensiva sem incentivar exploração ou ações contra sistemas externos.

| Conjunto sintético | Campos de aprendizagem | Habilidade praticada |
| --- | --- | --- |
| Autenticação e identidade | horário, usuário, resultado, MFA, IP de origem, dispositivo, recurso | identificar padrões, validar contexto e estimar risco de conta comprometida |
| Endpoint | host, processo, pai, hash fictício, reputação, ação | separar sinal de hipótese e investigar execução ou persistência de modo seguro |
| DNS e proxy | consulta, domínio, categoria, destino, ação, volume | relacionar acesso externo a usuário, host e política, com foco em evidência |
| Rede | origem, destino, porta, protocolo, bytes e decisão | avaliar segmentação, exposição e movimento entre zonas |
| Nuvem e aplicativo | identidade, API, recurso, resultado, localização e tipo de operação | revisar acessos atípicos, permissões e uso de recursos sensíveis |

## Referências

[1] [NIST — Incident Response](https://csrc.nist.gov/projects/incident-response)

[2] [MITRE ATT&CK — Data Components](https://attack.mitre.org/datacomponents/)

[3] [Microsoft Learn — Appendix L: Events to Monitor](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor)
