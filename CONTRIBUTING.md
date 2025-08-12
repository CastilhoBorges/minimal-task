# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o MinimalTask! Este documento fornece diretrizes para ajudar a manter a qualidade e consistência do projeto.

## 📋 Índice

- [Código de Conduta](#-código-de-conduta)
- [Como Posso Contribuir?](#-como-posso-contribuir)
- [Configuração do Ambiente](#-configuração-do-ambiente)
- [Fluxo de Desenvolvimento](#-fluxo-de-desenvolvimento)
- [Padrões de Código](#-padrões-de-código)
- [Testes](#-testes)
- [Commits](#-commits)
- [Pull Requests](#-pull-requests)
- [Reportando Bugs](#-reportando-bugs)
- [Sugerindo Melhorias](#-sugerindo-melhorias)

## 📜 Código de Conduta

Este projeto segue um código de conduta para garantir um ambiente acolhedor para todos. Ao participar, você concorda em manter um comportamento respeitoso e profissional.

## 🎯 Como Posso Contribuir?

Existem várias maneiras de contribuir:

- **🐛 Reportar bugs** - Encontrou algo que não funciona? Nos ajude a corrigir!
- **💡 Sugerir melhorias** - Tem ideias para tornar o projeto melhor?
- **📝 Melhorar documentação** - Documentação clara é fundamental
- **🔧 Corrigir bugs** - Implemente correções para issues existentes
- **✨ Adicionar funcionalidades** - Desenvolva novas features
- **🧪 Escrever testes** - Ajude a melhorar a cobertura de testes

## 🛠 Configuração do Ambiente

Antes de começar, certifique-se de ter o ambiente configurado e instalado corretamente, o passo a passo esta em [README.md](README.md)

> 🎉 **Husky configurado!** Os hooks de pre-commit executam automaticamente:
> - **lint-staged** (formatação e lint)
> - **Testes unitários** (`npm run test`)
> - **Testes E2E** (`npm run test:e2e`)
> - **Build** (`npm run build`)
> - **Auditoria de segurança** (`npm audit --audit-level=high`)
>
> Seu código só será commitado se passar por todas essas verificações! 🔒

## 🔄 Fluxo de Desenvolvimento

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub primeiro
git clone https://github.com/CastilhoBorges/minimal-task.git
cd minimaltask
git remote add upstream https://github.com/CastilhoBorges/minimal-task.git
```

### 2. Crie uma Branch

Sempre trabalhe em uma branch separada:

```bash
git checkout -b tipo/descricao-curta
```

**Tipos de branch:**

- `feat/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Alterações na documentação
- `refactor/` - Refatoração de código
- `test/` - Adição ou correção de testes
- `chore/` - Tarefas de manutenção

**Exemplos:**

```bash
git checkout -b feat/add-task-priority
git checkout -b fix/authentication-bug
git checkout -b docs/update-api-documentation
```

### 3. Mantenha sua Branch Atualizada

```bash
git fetch upstream
git rebase upstream/master
```

## 📏 Padrões de Código

### ESLint e Prettier

O projeto utiliza ESLint e Prettier para manter consistência no código. Com **Husky** configurado, todas as verificações são executadas automaticamente antes de cada commit:

```bash
# Verificar problemas de lint manualmente (opcional)
npm run lint

# Corrigir problemas automáticamente (opcional)
npm run lint:fix

# Formatar código manualmente (opcional)
npm run format

# Executar testes manualmente (opcional)
npm run test
npm run test:e2e
```

> 📝 **Nota:** Os hooks do Husky executam automaticamente no pre-commit:
> - `lint-staged` (formatação e lint)
> - Testes unitários e E2E
> - Build da aplicação
> - Auditoria de segurança
> 
> Você não precisa executar esses comandos manualmente! Se alguma verificação falhar, o commit será rejeitado.

### Convenções de Nomenclatura

- **Variáveis e funções:** `camelCase`
- **Classes:** `PascalCase`
- **Constantes:** `UPPER_SNAKE_CASE`
- **Arquivos:** `kebab-case`

### Estrutura de Código

- Mantenha funções pequenas e focadas
- Use nomes descritivos para variáveis e funções
- Adicione comentários para lógicas complexas
- Evite aninhamento excessivo

## 🧪 Testes

### Testes Automatizados com Husky

Os testes são executados **automaticamente** em cada commit através dos hooks do Husky:

- **Testes unitários** (`npm run test`)
- **Testes E2E** (`npm run test:e2e`)
- **Build verification** (`npm run build`)
- **Security audit** (`npm audit --audit-level=high`)

### Executando Testes Manualmente

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:cov

# Build da aplicação
npm run build

# Auditoria de segurança
npm audit --audit-level=high
```

### Diretrizes para Testes

- Escreva testes claros e descritivos
- Use o padrão AAA (Arrange, Act, Assert)
- Teste casos de sucesso e falha
- Mantenha testes independentes

## 📝 Commits

### Conventional Commits

Utilizamos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Mudanças de formatação (não afetam o código)
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção
- `perf`: Melhorias de performance
- `ci`: Alterações no CI/CD

### Exemplos de Commits

```bash
feat(tasks): adiciona endpoint para criação de tarefas
fix(auth): corrige validação de token JWT
docs(readme): atualiza instruções de instalação
test(tasks): adiciona testes para controller de tarefas
refactor(database): melhora estrutura das migrations
```

### Regras para Commits

- Use o imperativo na descrição ("adiciona" não "adicionado")
- Primeira linha até 50 caracteres
- Deixe uma linha em branco antes do corpo
- Corpo com até 72 caracteres por linha
- Seja específico e claro

## 🔍 Pull Requests

### Antes de Abrir o PR

Com o Husky configurado, seu código já passou por todas as verificações necessárias durante os commits:

1. ✅ **Formatação e Lint** - Executados automaticamente pelo lint-staged
2. ✅ **Testes** - Unitários e E2E executados em cada commit  
3. ✅ **Build** - Garantia de que o código compila corretamente
4. ✅ **Segurança** - Auditoria de vulnerabilidades executada
5. ✅ **Documentação** - Atualize se necessário

> 💡 **Dica:** Se você conseguiu fazer o commit, significa que todas as verificações passaram! O Husky garante a qualidade automaticamente.

### Revisão do PR

- Mantenha PRs pequenos e focados
- Responda aos comentários construtivamente
- Faça as alterações solicitadas
- Seja paciente durante o processo de revisão

## 🐛 Reportando Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado
2. Teste com a versão mais recente
3. Verifique a documentação

## ❓ Dúvidas

Se tiver dúvidas sobre como contribuir:

1. 📖 Consulte a documentação
2. 🔍 Procure em issues existentes
3. 💬 Abra uma issue com a tag `question`
4. 📧 Entre em contato com os mantenedores

## 🙏 Agradecimentos

Toda contribuição é valiosa! Desde correções de typos até grandes funcionalidades, agradecemos seu tempo e esforço para melhorar o MinimalTask.

---

**Obrigado por contribuir! 🎉**