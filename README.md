# 📌 Minimal Task

MinimalTask é um gerenciador de tarefas simples, mas extremamente focado em produtividade máxima. O projeto é open source e foi projetado para ser rápido, intuitivo e fácil de manter, com uma arquitetura escalável e boas práticas de desenvolvimento.

## 🚀 Tecnologias Utilizadas

- **NestJS** — Framework Node.js para construção de APIs robustas
- **Node.js 22** — Ambiente de execução JavaScript moderno e otimizado
- **npm** — Gerenciador de pacotes oficial do Node.js
- **Docker Compose** — Orquestração de serviços e dependências do projeto
- **CI/CD** — Pipeline automatizado de integração e entrega contínua

## 📦 Serviços no Docker Compose

O projeto utiliza Docker Compose para subir facilmente todos os serviços necessários (ex: banco de dados, cache, etc). O arquivo `docker-compose.yml` está configurado na raiz do projeto.

Para iniciar os serviços:

```bash
docker compose up -d
```

## 🛠 Como Rodar o Projeto Localmente

### Clone o repositório

```bash
git clone https://github.com/CastilhoBorges/minimal-task.git
cd minimal-task
```

### Instale as dependências

```bash
npm install
```

### Configure as variáveis de ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite os arquivos `.env` e `.env.test` com suas configurações locais.

### Suba os serviços com Docker

```bash
docker compose up -d
```

### Inicie o servidor

```bash
npm run start:dev
```

A API estará disponível em:

```
http://localhost:PORT
```

## 🤝 Contribuindo

Este é um projeto open source! Contribuições são sempre bem-vindas. Para mais detalhes sobre como contribuir, consulte o arquivo [CONTRIBUTING.md](CONTRIBUTING.md).

## 📜 Licença

Este projeto está licenciado sob a licença MIT.
