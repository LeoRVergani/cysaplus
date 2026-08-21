# Direção de Design — CySA+ Estudo BR

## Três abordagens consideradas

### 1. Atlas de Incidentes
**Very Brief Intro:** Uma central de aprendizado que traduz o universo SOC em um atlas operacional: camadas, rotas de investigação e sinais de prioridade. A estética é técnica, contida e orientada a tomada de decisão.

**Probability:** 0.07

### 2. Caderno Forense
**Very Brief Intro:** Uma experiência editorial clara inspirada em cadernos de evidências e relatórios de investigação. O foco seria reduzir a carga cognitiva por meio de espaços generosos e marcações discretas.

**Probability:** 0.03

### 3. Pulso de Rede
**Very Brief Intro:** Um ambiente escuro de alta densidade, com telemetria em movimento e acentos luminosos que sugerem tráfego de rede. A intenção é reproduzir a tensão controlada de uma sala de operações.

**Probability:** 0.09

## Abordagem escolhida: Atlas de Incidentes

### Design Movement

**Cartografia de informação aplicada a manuais técnicos contemporâneos.** A interface organiza o estudo como uma investigação: cada módulo é uma área do mapa; cada exercício, uma evidência; e cada métrica, um sinal de direcionamento.

### Core Principles

1. **Orientação antes de densidade:** toda tela começa deixando claro o próximo passo, a localização no curso e a razão da recomendação.
2. **Dados como narrativa:** barras, linhas de tempo e indicadores servem para explicar o progresso, não para decorar o painel.
3. **Rigor calmo:** contrastes controlados, linguagem objetiva e pouca ornamentação evitam fadiga visual durante sessões longas.
4. **Aprendizagem por investigação:** as aulas sempre conectam conceito, evidência, decisão e consequência operacional.

### Color Philosophy

O fundo de grafite-azulado representa a sala de análise, enquanto superfícies de papel frio criam áreas de descanso para leitura. O verde-lima de sinalização é reservado a avanço, confirmação e evidências confiáveis; o coral queimado comunica atenção e lacunas de domínio. A paleta evita o brilho neon excessivo e prioriza legibilidade em dados densos.

### Layout Paradigm

Uma **mesa de investigação assimétrica**: uma coluna lateral persistente funciona como índice de casos; o conteúdo principal se abre em painéis de leitura e prática; cartões de sinalização se agrupam nas bordas para indicar pendências. Em telas pequenas, a mesa se reorganiza em uma sequência de briefing, tarefa e evidência.

### Signature Elements

1. **Linhas de rota tracejadas** conectam módulos, recomendações e revisões pendentes.
2. **Etiquetas de evidência** em caixa alta identificam tipo de conteúdo, dificuldade e status de revisão.
3. **Marcadores topográficos** (pontos, retículos e coordenadas discretas) aparecem em gráficos, módulos e estados de progresso.

### Interaction Philosophy

Interações devem parecer instrumentos de trabalho: respostas recebem retorno explícito e contextual; opções selecionadas deixam uma marca de evidência; ações de estudo atualizam o mapa de progresso imediatamente. O sistema não usa promessas de aprovação, apenas indicadores de cobertura e domínio observado.

### Animation

Entradas utilizam opacidade e deslocamento vertical mínimo, com cascata de 40 a 60 ms entre blocos. Cartões respondem ao foco com sombra curta e leve translação; ações de confirmação usam uma transição de aproximadamente 160 ms. O cronômetro e as métricas permanecem estáveis, sem animações que prejudiquem a leitura. Todas as transições respeitam `prefers-reduced-motion`.

### Typography System

**Space Grotesk** é usada em títulos e métricas por sua geometria técnica e legível. **Source Sans 3** conduz aulas e explicações longas. **IBM Plex Mono** aparece exclusivamente em etiquetas, logs sintéticos, horários e identificadores. Títulos usam peso 600–700; texto de leitura, 400–500; microdados, caixa alta moderada e espaçamento ampliado.

### Brand Essence

**Uma central brasileira de preparação autoral para quem quer transformar conhecimento de defesa cibernética em decisões de analista.** Personalidade: **analítica, confiável e direta**.

### Brand Voice

Os títulos devem ser claros e orientados a ação; CTAs usam verbos objetivos; microcopy explica o motivo de cada recomendação sem exageros ou garantias. Exemplos: “Investigue o sinal antes que ele vire incidente.” e “Revise agora: autenticação ainda apresenta baixa confiança.”

### Wordmark & Logo

O símbolo é um **retículo de detecção**: quatro segmentos angulares desenham uma lente incompleta ao redor de um ponto de sinal. O logotipo combina a marca com “CySA+ / Estudo BR” em Space Grotesk, com a barra inclinada representando uma rota de investigação. O ícone deve permanecer reconhecível sem texto.

### Signature Brand Color

**Sinal Lúcido — #C7F36B.** Um verde-lima pálido e controlado que comunica avanço validado, sem se tornar visualmente agressivo.

## Governança de conteúdo

O curso usa o guia enviado como referência temática. Aulas, resumos, cenários, flashcards e questões são **autorais**, escritos em português brasileiro, e não reproduzem questões, respostas ou longos trechos do livro. As questões da interface recebem a etiqueta “Autoral — revisada” e não devem ser interpretadas como material oficial da CompTIA.

## Style Decisions

- A coluna lateral funciona como **índice operacional persistente**, com marca, setores, rota corrente, cobertura e estado local do caso.
- Linhas tracejadas, coordenadas, retículos e pontos de rota conectam hero, métricas, trilhas e cobertura de domínio, tornando a linguagem cartográfica uma regra global.
- **Sinal Lúcido (#C7F36B)** representa somente avanço validado, ações primárias e evidência confiável. Azul identifica orientação/investigação, coral identifica atenção e cinza identifica arquivo ou contexto neutro.
- A trilha aprofundada recebe uma assinatura interna com retículo, código de atlas, coordenada, setor, contagem de evidências e estado local; ela sustenta a marca mesmo fora da navegação fixa.
- Os instrumentos de rota do capítulo usam linha tracejada, nós de percurso e metadados de setor para conectar leitura, seleção, prática e checkpoint como uma investigação única.
