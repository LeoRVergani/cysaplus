# Release Notes — Capítulo 3

## CySA+ Estudo BR — Malicious Activity

Esta entrega adiciona ao projeto Cloudflare Pages/PWA o **Capítulo 3 — Atividade Maliciosa**, mantendo os Capítulos 1 e 2 e suas chaves de progresso sem alteração.

### Escopo implementado

- **8 unidades**
- **51 aulas**
- **51 tópicos**
- **286 conceitos atômicos rastreados**
- **51 práticas**
- **53 questões autorais**
- **76 flashcards**
- **6 laboratórios seguros**
- **11 visuais originais**

### Conteúdo

A cobertura inclui análise de eventos de rede; flows, SNMP e monitoramento ativo/passivo; bandwidth, exfiltração, beaconing, scans/sweeps, DoS/DDoS e rogue devices; recursos e integridade de hosts; processos/software não autorizados; Registry e Scheduled Tasks; social engineering; aplicações/serviços; análise e correlação de logs; firewall/WAF/proxy/IDS/IPS; SIEM, EDR e SOAR; Wireshark/tcpdump; Whois/AbuseIPDB; e-mail e SPF/DKIM/DMARC; hashing, sandboxing, UEBA, scripts, regex, JSON e XML.

### Segurança dos labs

As atividades foram transformadas em exercícios defensivos com dados sintéticos. Nenhum lab depende de ataque contra sistema externo. A análise de scan usa logs/PCAP previamente gerados e o laboratório de phishing usa mensagem sintética.

### Integração e PWA

- `learningPaths` passa a registrar `m1`, `m2` e `m3`.
- O Capítulo 3 usa `chapterId="chapter-03-complete-v1"`, preservando as chaves de progresso dos capítulos anteriores.
- O cache PWA é incrementado para forçar atualização da shell no novo deploy.
- O build permanece estático com `pnpm build:pages` e saída `dist/public`.

### Validações executadas

- TypeScript `strict` isolado do domínio do Chapter 3: **APROVADO**.
- Cobertura atômica: **286/286** conceitos mapeados.
- IDs duplicados: **0**.
- Prática por aula: **51/51**.
- Questão por aula: **51/51**, com **2 integrativas** adicionais.
- Flashcard por aula: **51/51**, banco total **76**.
- Questões com `answerIndex` válido e explicações por alternativa: **53/53**.
- Labs com referências válidas: **6/6**.

### Limitação de build nesta execução

O ambiente possui compilador TypeScript, mas não `node_modules` completo do projeto. Por isso, `pnpm build:pages` completo não é declarado como aprovado localmente nesta etapa. A pipeline do Cloudflare Pages ou um clone com dependências deve confirmar o bundle final.

### Próximo capítulo

**Capítulo 4 — Threat Intelligence** permanece pendente.
