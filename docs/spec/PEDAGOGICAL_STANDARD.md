# Padrão Pedagógico — CySA+ Estudo BR

## Objetivo

Transformar o conhecimento do Study Guide em ensino autoral em português brasileiro, sem tradução literal ou reprodução extensa do texto original.

## Progressão padrão

Para conceitos relevantes, o curso procura seguir esta sequência:

1. **Para que existe / explicação simples** — linguagem acessível e uma pergunta central.
2. **Analogia ou cenário** — quando ajuda a formar modelo mental.
3. **Explicação técnica** — termos em inglês e português, componentes, fluxo e limitações.
4. **Visão de SOC** — qual telemetria, contexto ou decisão aparece na operação.
5. **Importante para a CySA+** — diferença conceitual, cenário e pegadinhas legítimas.
6. **Prática** — classificação, decisão, log ou mini-PBQ.
7. **Revisão** — flashcard e banco de questões com explicação individual das alternativas.

Nem todo tópico precisa de todos os blocos. Conceitos pequenos devem ser ensinados de forma proporcional, sem paredes de texto nem fragmentação artificial.

## Fonte e rastreabilidade

Cada tópico possui:

- capítulo e seção de origem;
- intervalo de páginas do PDF usado para cobertura;
- indicação de conteúdo baseado no capítulo ou complemento didático;
- termos PT/EN;
- IDs estáveis de aula/tópico/prática.

A matriz em `CHAPTER_01_COVERAGE.md` registra conceitos atômicos e seus destinos.

## Conteúdo complementar

Conhecimento que ajuda a aprender, mas não é desenvolvido naquela seção do capítulo, deve aparecer como **Complemento didático**. Isso evita atribuir ao livro algo que ele não ensina naquele ponto.

## Questões

Questões são autorais e não reproduzem as Review Questions do livro. Cada questão deve informar:

- resposta correta;
- explicação da resposta;
- explicação individual de cada alternativa incorreta;
- dificuldade e tipo;
- aula/tópico e objetivo de exame.

Explicações genéricas como “não responde ao cenário” não são suficientes.

## Segurança dos laboratórios

Laboratórios devem usar VMs de teste, arquivos próprios, dados sintéticos ou planejamento em papel. Atividades de penetration testing são ensinadas conceitualmente e só podem ser executadas em ambiente explicitamente autorizado.

## UI/UX

- conteúdo em blocos curtos e legíveis;
- termos técnicos preservados em inglês com explicação em português;
- visuais originais e responsivos;
- evidências sintéticas em blocos monoespaçados;
- navegação capítulo → unidade → aula → tópico;
- progresso local sem exigir backend.
