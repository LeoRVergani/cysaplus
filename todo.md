# Pendências de expansão — Treinamento SOC

- [x] Pesquisar fontes públicas e confiáveis para formatos de logs defensivos e fluxo de triagem em SOC.
- [x] Produzir conjuntos sintéticos de logs de autenticação, endpoint, DNS, proxy, rede e nuvem, sem dados reais ou instruções ofensivas.
- [x] Criar laboratórios guiados de leitura, normalização, correlação e documentação de evidências.
- [x] Criar questões autorais de cenário associadas aos novos conjuntos de logs.
- [x] Incorporar fluxos de rotina de SOC: triagem, enriquecimento, escalonamento, contenção proporcional e comunicação.
- [x] Integrar os laboratórios e os exercícios de logs ao painel interativo com feedback e registro local de progresso.
- [x] Implementar navegação, cartões, questões, flashcards e simulados com comportamento mobile-first e alvos de toque acessíveis.
- [x] Validar os principais fluxos em viewport de celular antes da entrega.
- [x] Construir dashboard de estudo inspirado em ambiente SOC, com progresso concluído, pendências, prioridades, revisões, desempenho por domínio e atalhos para todos os modos de estudo.
- [x] Mostrar métricas pedagógicas sem promessas de aprovação: cobertura do curso, domínio observado, questões respondidas e próximos passos recomendados.
- [x] Remover referências a variáveis de analytics indisponíveis na execução local e em hospedagem estática externa.
- [x] Empacotar imagens e ícones no projeto, com caminhos compatíveis com Vite e Cloudflare Pages.
- [x] Extrair o mapa detalhado de capítulos e subtópicos do PDF para ampliar os resumos autorais do curso.
- [x] Acrescentar, em cada módulo, explicação resumida, pontos de atenção, perguntas de autorrevisão e prática guiada.
- [x] Testar `pnpm dev` e `pnpm build` sem avisos de URL malformada ou assets ausentes.
- [x] Criar orientação de implantação em Cloudflare Pages com diretório de saída correto.
- [x] Criar uma matriz capítulo a capítulo comparando o guia fornecido, os recursos atuais do site e as lacunas pedagógicas.
- [x] Produzir uma especificação priorizada de novos resumos, mapas mentais, roteiros de revisão, questões e laboratórios para cada capítulo.
- [x] Criar ilustrações autorais didáticas para fluxo de SOC, ciclo de vulnerabilidades, resposta a incidentes e cadeia de custódia.
- [x] Associar cada ilustração a exemplos sintéticos, perguntas de autorrevisão e uma atividade prática defensiva no site.
- [x] Criar Glossário SOC pesquisável com siglas, portas, protocolos, redes, identidade, vulnerabilidades, logs, forense e comunicação.
- [x] Relacionar os termos do glossário aos módulos, exemplos, questões e laboratórios correspondentes.
- [x] Criar checklist de competências de analista SOC baseado no escopo do livro, com estados estudado, praticar e revisar.
- [x] Extrair e validar todos os tópicos, subtópicos, exemplos, resumos e exercícios do Capítulo 1 do guia fornecido.
- [x] Criar matriz de cobertura do Capítulo 1 com aula, exercício, laboratório, questões, visual e estado de conclusão por assunto.
- [x] Produzir aulas autorais do Capítulo 1 em camadas: explicação simples, analogia, visão técnica, SOC, evidência, mitigação e revisão.
- [x] Criar cenários sintéticos, exercícios interativos, questões autorais e recursos visuais didáticos especificamente para o Capítulo 1.
- [x] Integrar e validar a primeira unidade aprofundada em desktop e celular antes de iniciar o Capítulo 2.
- [x] Ler integralmente o novo escopo e delimitar o Capítulo 1 entre os limites reais do PDF, incluindo tabelas, caixas, notas, laboratórios e revisão.
- [x] Criar `CHAPTER_01_COVERAGE.md` com uma linha por conceito verificável, páginas do PDF, destino no curso e estado MISSING, PARTIAL, COMPLETE ou NOT_APPLICABLE.
- [x] Auditar separadamente os princípios de privacidade, fluxo NIST SP 800-30, estratégias de risco, controles, NAC e demais lacunas apontadas no novo escopo.
- [x] Aprofundar somente o Capítulo 1, sem redesenhar a plataforma ou iniciar o Capítulo 2.
- [x] Validar cada conceito marcado COMPLETE com evidência de aula, prática, visual, questão ou componente e entregar relatório final de cobertura.
- [x] Inventariar arquivos, modelos de dados, componentes e fluxos de estudo existentes, identificando o que será preservado e reutilizado.
- [x] Comparar o conteúdo atual do módulo OPS-01 com a matriz do Capítulo 1 e documentar as lacunas sem considerar resumos como cobertura completa.
- [x] Propor e documentar tipos e arquivos separados para domínio, capítulo, unidade, aula, tópico, evidência, prática e revisão.
- [x] Definir componentes reutilizáveis para renderizar conteúdo profundo sem ampliar desnecessariamente `Home.tsx`, `course.ts` ou `study-extensions.ts`.


## Fase atual — Capítulo 1 padrão-ouro

- [x] Reimplementar o Capítulo 1 como rota profunda em 7 unidades e 47 aulas.
- [x] Corrigir o componente ausente `LearningBlock.tsx` com renderização real de blocos e visuais.
- [x] Separar conteúdo do capítulo de complementos didáticos.
- [x] Criar questões com justificativa individual de cada alternativa.
- [x] Criar matriz atômica de 225 conceitos rastreados por aula/tópico.
- [x] Criar 6 laboratórios seguros e transformados, sem copiar instruções do livro.
- [x] Garantir que todas as 47 aulas tenham ao menos uma prática, uma questão autoral e um flashcard associado.
- [x] Ampliar o Glossário do Capítulo 1 com NAC/802.1X, privacidade, SOAR e todas as portas/serviços explicitamente apresentados na tabela do capítulo.
- [x] Validar tipos dos dados do Capítulo 1 com TypeScript isolado.
- [ ] Executar `pnpm check` e `pnpm build` completos quando as dependências do projeto estiverem disponíveis; o ambiente atual não possui a árvore de dependências completa e o acesso ao npm registry falhou com `EAI_AGAIN`.
- [x] Validar sintaxe TS/TSX, imports locais, CSS e integridade dos dados do Capítulo 1 por verificações independentes do build.
- [ ] Iniciar Capítulo 2 somente após avaliação do Capítulo 1.
