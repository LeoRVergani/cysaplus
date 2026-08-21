# Release — Capítulo 1 padrão-ouro

Esta entrega transforma o **Capítulo 1 — Today's Cybersecurity Analyst** em uma rota de estudo profunda em português brasileiro.

## Conteúdo

- 7 unidades
- 47 aulas
- 48 tópicos
- 225 conceitos atômicos rastreados
- 48 práticas
- 53 questões autorais com justificativas individuais
- 78 flashcards
- 6 laboratórios seguros
- 18 visuais originais

## Fonte

A cobertura foi validada contra as páginas 47–80 do PDF fornecido pelo usuário, correspondentes às páginas impressas 3–36 do Capítulo 1. O conteúdo do site é transformado e autoral; não é uma tradução literal do livro.

## Validação

Consulte:

- `docs/spec/CHAPTER_01_COVERAGE.md`
- `docs/spec/PEDAGOGICAL_STANDARD.md`
- `docs/validation/CHAPTER_01_FINAL_VALIDATION.md`
- `docs/reports/REPORT_CHAPTER_01_COMPLETE.md`

## Como validar no seu ambiente

```bash
pnpm install
pnpm check
pnpm build
pnpm dev
```

O `dist/` não está incluído nesta entrega porque o build anterior ficou desatualizado após as mudanças e o ambiente de execução atual não conseguiu acessar o npm registry para regenerá-lo.
