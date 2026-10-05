# Validação Final — Capítulo 3 — Malicious Activity

## Resultado

**APROVADO nas validações disponíveis desta execução.**

A implementação foi construída após leitura integral do intervalo do Capítulo 3 no PDF fornecido, cobrindo os objetivos **1.2** e **1.3** associados ao capítulo.

## Métricas

| Métrica | Resultado |
|---|---:|
| Unidades | 8 |
| Aulas | 51 |
| Tópicos | 51 |
| Conceitos atômicos | 286 |
| Práticas | 51 |
| Questões autorais | 53 |
| Flashcards | 76 |
| Labs | 6 |
| Visuais | 11 |

## Verificações executadas

- TypeScript `strict` isolado para `types.ts` + todos os arquivos do `chapter-03`: **APROVADO**.
- IDs de aulas, tópicos, práticas, questões e flashcards: **sem duplicação**.
- Uma prática associada a cada aula: **51/51**.
- Ao menos uma questão associada a cada aula: **51/51**, mais 2 questões integrativas.
- Ao menos um flashcard associado a cada aula: **51/51**; banco total de **76** cartões.
- `answerIndex` dentro do intervalo das opções: **53/53**.
- Explicações por alternativa: **53/53** questões com rationale principal e rationales alinhados às opções.
- Referências dos 6 labs para aulas existentes: **6/6**.
- Cobertura atômica gerada a partir dos termos dos tópicos: **286/286**.
- Integração planejada com `moduleId="m3"` e `chapterId="chapter-03-complete-v1"` para não reutilizar a chave de progresso dos capítulos anteriores.

## Cobertura temática conferida

- eventos, alertas e incidentes;
- flows, SNMP, monitoramento ativo e passivo;
- bandwidth, exfiltration, beaconing, baseline, scans/sweeps, DoS/DDoS e rogue devices;
- CPU, memória, disco, FIM, ferramentas Windows/Linux, software/processos não autorizados;
- acesso/mudança/privilégio, Registry, Scheduled Tasks/cron, social engineering e links ofuscados;
- aplicações e serviços: disponibilidade, performance, logs, novas contas, anomalias e outbound;
- correlação, Windows/Linux logs, firewall/WAF/proxy, IDS/IPS, SIEM, EDR e SOAR;
- Wireshark/tcpdump, Whois/AbuseIPDB, pattern recognition e C2;
- e-mail, headers, links, impersonation, SPF, DKIM e DMARC;
- hashing/strings, sandboxing, UEBA/impossible travel, Python, PowerShell, grep/regex, JSON e XML.

## Limitação

O ambiente desta execução possui `tsc`, mas não a árvore `node_modules` completa do projeto. Portanto, **não declaro `pnpm build:pages` completo como executado localmente**. A validação de tipos do domínio do capítulo e as verificações estruturais acima foram executadas de forma independente. O build final deve ser confirmado pela pipeline do Cloudflare Pages ou em clone com dependências instaladas.
