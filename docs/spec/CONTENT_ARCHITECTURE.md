# Arquitetura de conteúdo incremental

## Regra de progressão

O curso não transforma um capítulo em um bloco único de texto. Uma unidade segue a sequência: **compreender → visualizar → observar → aplicar → analisar → revisar**. Conteúdo novo será armazenado em arquivos de dados tipados e renderizado por componentes reutilizáveis, preservando os modos já existentes de curso, prática, laboratório, revisão, simulado e glossário.

## Modelo de dados previsto para unidades aprofundadas

| Campo | Finalidade |
|---|---|
| `chapter`, `unitId`, `topic`, `subtopic` | Localização pedagógica e rastreabilidade da matriz. |
| `sourceCoverage` | Capítulo e seção de origem para auditoria interna. |
| `learningLayers` | Explicação simples, analogia, técnica, SOC e resumo. |
| `evidenceScenario` | Logs ou evidências sintéticas, sem dados reais. |
| `visualModel` | Diagrama, árvore, timeline ou comparativo original. |
| `practice` | Exercício de decisão, análise ou classificação. |
| `review` | Flashcards, mini quiz, erros comuns e termos-chave. |
| `questions` | Metadados de domínio, tópico, subtópico, dificuldade e formato. |

## Separação entre conteúdo do guia e complemento

Todo bloco deve identificar se é **Baseado no guia** ou **Complemento didático**. Exemplos de logs, ferramentas, cenários e analogias são complementares; títulos e conceitos mapeados do capítulo mantêm rastreabilidade no campo de cobertura.
