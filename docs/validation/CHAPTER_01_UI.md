> **Nota de histórico:** este arquivo registra validações visuais de versões anteriores da trilha. A versão final atual foi ampliada para 47 aulas e recebeu validação estática/integridade em `CHAPTER_01_FINAL_VALIDATION.md`. Como o ambiente final não conseguiu instalar as dependências completas, os números e testes visuais abaixo não devem ser interpretados como validação do build atual.

# Validação visual — Capítulo 1 aprofundado

## Primeira passagem

O leitor granular do Capítulo 1 foi aberto a partir de `OPS-01` no mapa de curso. A navegação lateral exibiu as cinco unidades e oito aulas. A primeira aula apresentou objetivo, pré-requisito, tópico, termos inglês–português, blocos didáticos, modelo visual, prática de decisão e controles de progresso.

| Verificação | Resultado |
|---|---|
| Abertura de `OPS-01` | Aprovada |
| Preservação dos demais capítulos no mapa | Aprovada |
| Estrutura unidade → aula → tópico | Visível e funcional |
| Blocos explicação, analogia, técnico, SOC e prova | Visíveis |
| Diagrama didático CSS | Visível e legível |
| Prática de decisão | Visível; interação a validar na próxima passagem |
| Responsividade | Pendente de teste específico em viewport móvel |

## Interação inicial

A primeira prática apresentou as quatro alternativas e o botão de confirmação no leitor. A seleção e a confirmação foram acionadas durante o teste; a próxima passagem de validação deve confirmar o estado visual de retorno e a persistência local usando o painel de desenvolvimento e uma nova abertura da trilha.

Uma inspeção do DOM após cliques automatizados não refletiu a classe de seleção. O controle permanece habilitado; a próxima verificação acionará o evento nativo do botão para separar uma possível limitação da automação de uma falha da interface.

O evento nativo foi disparado em alternativa de prática e o DOM permaneceu sem classe de seleção. A interação requer diagnóstico específico antes do aceite final.

O DOM confirma que cada alternativa possui `onClick` associado pelo React. Assim, o próximo diagnóstico deve verificar a referência de estado e o ciclo de renderização do painel, não a presença do manipulador.

Ao invocar o manipulador React, a alternativa correta recebeu a classe `selected`. O estado e o ciclo de renderização estão funcionais; a inconsistência ficou limitada ao método de clique automatizado usado nesta passagem.

Após o ciclo de renderização seguinte, o painel exibiu **Raciocínio registrado**, a explicação correta e o resultado esperado. A prática foi marcada no estado de progresso versionado. A validação do feedback pedagógico foi aprovada.

A ação de continuar marcou a primeira aula como concluída, atualizou o contador para `1/8 aulas` e abriu a Aula 2 com seus dois tópicos. A navegação entre aulas e o progresso local foram aprovados.

A última aula foi aberta diretamente pela rota lateral. Ela apresentou conteúdo de automação, diagrama de decisão, prática e laboratório associado; o controle **Abrir checkpoint** ficou disponível. A conexão entre aula, visual, prática e laboratório foi aprovada.

O checkpoint abriu corretamente e exibiu síntese operacional, termos essenciais, armadilhas, 20 flashcards, banco de 20 questões e os dois laboratórios do capítulo. A navegação de revisão final foi aprovada; a interação móvel ainda será validada em viewport dedicado.

## Mobile

O link `/?view=course&module=m1` abriu o Capítulo 1 diretamente em viewport de 375 × 812 px. A rota de unidades passou para fluxo vertical, a aula ficou em coluna única, os tópicos permaneceram acessíveis, os blocos mantiveram contraste e o painel de prática manteve alternativas e ações legíveis. A validação mobile foi aprovada.

## Revisão visual do Atlas

A trilha passou a exibir assinatura interna `CySA+ / Estudo BR`, retículo, coordenada, setor, estado local e contagem de evidências. Linhas tracejadas e nós conectam cabeçalho, rota e leitor; azul agora representa orientação e instrumentos de investigação, enquanto o verde-lima permanece reservado para avanço validado e ação primária. A revisão também foi conferida em tela de 375 × 812 px, mantendo leitura e ações em coluna única.

Após o reinício do servidor, o link direto do Capítulo 1 carregou corretamente e o console do cliente não apresentou erros.

## Fase 1C — expansão atômica

O leitor aprofundado abriu na rota `/?view=course&module=m1` após a expansão. A interface exibiu 22 aulas, 25 práticas, 4 laboratórios, 32 questões e 35 flashcards; os contadores são calculados a partir do caminho de aprendizagem e não permanecem fixos. A visualização desktop manteve contraste, hierarquia e índices navegáveis. A rota móvel já validada continua em coluna única, com ações legíveis e sem depender de visual externo adicional.
