# Relatório Final — Capítulo 1 Completo

## Fonte e limite

Fonte principal: **CompTIA CySA+ Study Guide — Exam CS0-003 — Third Edition**, Capítulo 1, *Today's Cybersecurity Analyst*.

- intervalo no PDF anexado: páginas 47–80;
- página impressa: 3–36;
- o Capítulo 2 começa no PDF na página 81.

A leitura usada para a implementação incluiu texto principal, figuras, tabela de portas, *Exam Notes*, *Summary*, *Exam Essentials* e as quatro atividades de laboratório. O material do site é autoral e transformado em português brasileiro; não há tradução literal do capítulo nem reprodução das questões do livro.

## Estrutura final

| Recurso | Total |
|---|---:|
| Unidades | 7 |
| Aulas | 47 |
| Tópicos | 48 |
| Conceitos atômicos rastreados | 225 |
| Blocos pedagógicos | 251 |
| Práticas | 48 |
| Questões autorais | 53 |
| Flashcards | 78 |
| Laboratórios seguros | 6 |
| Visuais originais | 18 |
| Entradas de glossário | 147 |

Todas as 47 aulas possuem prática, questão e flashcard associado.

## Conteúdo aprofundado

A rota final cobre, em sequência didática:

1. **Objetivos e privacidade** — defense in depth, CIA Triad, PII e os dez princípios GAPP.
2. **Risco** — threat, vulnerability, risk, NIST SP 800-30, quatro categorias de ameaça, insider threat, likelihood, impact, matriz qualitativa, respostas ao risco e technical/operational controls.
3. **Rede** — NAC, 802.1X, supplicant/authenticator/RADIUS, modos de NAC, posture/quarantine, firewall/ACL/default deny, DMZ, tipos de firewall, portas, segmentação, jump box, honeypot e DNS sinkhole.
4. **Endpoint** — gerenciamento de endpoint, hardening, patching, compensating controls, GPO, software de endpoint e MAC vs DAC/SELinux.
5. **Pentest** — propósito, planning, timing/scope/authorization, discovery, attack phase, reporting e Red/Blue/White Team.
6. **Reverse engineering** — decomposition, sandboxing, code detonation, interpreted vs compiled, compiler/decompiler, hashing/SHA e hardware/source authenticity.
7. **Eficiência e automação** — standardization, streamlining, playbooks, SOAR, scripting/API/webhook/plugin, single pane of glass, automated enrichment, automated response e machine learning.

## Melhorias técnicas

- `LearningBlock.tsx` foi implementado de verdade e passou a renderizar blocos pedagógicos e visuais reutilizáveis.
- O Capítulo 1 foi separado em arquivos por unidade, evitando concentrar conteúdo em `Home.tsx` ou em um megaobjeto único.
- O leitor usa a nova rota por unidade/aula/tópico e o checkpoint passou a exibir justificativa individual para cada alternativa.
- A matriz `CHAPTER_01_COVERAGE.md` é gerada a partir dos destinos reais do conteúdo e contém 225 conceitos rastreados.
- O glossário foi ampliado e conectado ao módulo 1, incluindo termos de NAC, rede, privacidade, risco, reverse engineering e automação.
- O `dist/` antigo foi removido do pacote final por estar desatualizado.

## Validações reais executadas

- TypeScript isolado dos dados do capítulo: **OK**.
- Integridade de IDs/referências: **0 erros**.
- 47/47 aulas com prática, questão e flashcard: **OK**.
- 90 arquivos TS/TSX do client em transpile sintático: **0 erros**.
- Imports locais: **0 quebrados**.
- 6 CSS analisados por PostCSS: **0 erros**.
- Glossário: **147 entradas, 0 duplicatas**.
- Checklist de termos-chave do Capítulo 1: **nenhuma ausência detectada**.

## Limitação de ambiente

Não foi possível executar o build completo nesta entrega porque o registry npm não estava acessível (`EAI_AGAIN`) e o ZIP de origem não continha as dependências completas. Por isso, o relatório **não afirma** que `pnpm check` ou `pnpm build` atuais passaram.

No ambiente do usuário, execute:

```bash
pnpm install
pnpm check
pnpm build
pnpm dev
```

Depois, avalie a rota do Capítulo 1 em desktop e celular.

## Estado

**Capítulo 1 pronto para avaliação do usuário.** O Capítulo 2 não foi iniciado.
