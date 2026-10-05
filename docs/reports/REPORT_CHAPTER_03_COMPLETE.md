# Relatório — Capítulo 3 Completo

## Entrega

O **Capítulo 3 — Atividade Maliciosa** foi convertido em uma trilha aprofundada do Atlas de Incidentes, seguindo o mesmo modelo de dados dos capítulos 1 e 2 e preservando o progresso local existente.

### Conteúdo implementado

- **8 unidades**
- **51 aulas**
- **51 tópicos**
- **286 conceitos atômicos rastreados**
- **51 práticas**
- **53 questões autorais**
- **76 flashcards**
- **6 laboratórios seguros**
- **11 visuais originais**

## Arquitetura pedagógica

A trilha parte de visibilidade e indicadores de rede, passa por host e aplicações, consolida correlação e ferramentas de SOC e termina com análise especializada de pacotes, reputação, e-mail, arquivos, comportamento e dados estruturados.

O conteúdo foi escrito para treinar o raciocínio **sinal → contexto → correlação → hipótese → validação → ação proporcional**. Aulas evitam afirmar comprometimento com base em um único IOC, score ou alerta.

## Labs

Os 6 labs usam telemetria sintética ou planejamento defensivo. O exercício de identificação de scan foi transformado para análise passiva, sem instruir geração de tráfego contra alvos.

## Integração

A nova rota usa `moduleId="m3"` e `chapterId="chapter-03-complete-v1"`. A chave de progresso do Atlas é derivada do `chapterId`; portanto, Capítulos 1 e 2 mantêm suas chaves anteriores.

## Próximo passo

Após confirmação do build/deploy do Capítulo 3, o próximo capítulo elegível é **Capítulo 4 — Threat Intelligence**.
