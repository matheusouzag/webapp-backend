# 💰 Gestor Financeiro Pessoal - Backend

[Código Front-end](https://github.com/matheusouzag/webapp)

Este é o backend da aplicação **Gestor Financeiro Pessoal**, desenvolvida como parte de um desafio técnico para avaliar habilidades em Node.js, Express, TypeORM, SQL, orientação a objetos, Clean Code e testes automatizados.

## 📌 Objetivo

A aplicação permite o gerenciamento de contas bancárias e o registro de transações financeiras (crédito, débito e transferência), com operações completas de CRUD (criação, leitura, atualização e exclusão) via API RESTful.

---

## 🏗️ Arquitetura e Estrutura

O backend segue princípios de **Clean Architecture** e **SOLID**, com separação clara entre camadas:

src/
- controllers/ Controladores das rotas HTTP
- services/ Lógica de negócio central
- entities/ Entidades do TypeORM (modelos do banco)
- database/ Configuração do banco de dados
- routes/ Módulo de rotas agrupadas
- server.ts Inicialização do servidor

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia   | Finalidade                                      |
|--------------|--------------------------------------------------|
| Node.js      | Ambiente de execução do JavaScript              |
| Express      | Framework para criação da API                   |
| TypeORM      | ORM para manipulação do banco de dados SQLite  |
| SQLite       | Banco de dados leve para ambiente local         |
| Jest         | Framework de testes unitários e de integração   |
| TS-Node      | Execução do projeto TypeScript em tempo real    |

---

## 📌 Funcionalidades

### 📁 Contas Bancárias
- Criar nova conta com nome, tipo e saldo inicial.
- Listar todas as contas com saldo atualizado.
- Atualizar nome da conta.
- Excluir conta.

### 💸 Transações
- Criar transações do tipo:
  - **Crédito**: adiciona valor à conta de destino.
  - **Débito**: subtrai valor da conta de origem.
  - **Transferência**: subtrai de uma conta e adiciona à outra.
- Listar todas as transações registradas.
- (Opcional) Filtrar por conta ou período.

---

## 💡 Decisões de Arquitetura

- **TypeORM**: Escolhido por sua forte integração com TypeScript, tipagem estática e suporte direto a SQLite, além da facilidade de migrations e repositórios.
- **Camada de serviço (Service Layer)**: Centraliza toda a lógica de negócio, separando-a dos controladores. Isso facilita testes unitários e manutenção.
- **SQLite**: Ideal para desafios locais e fácil de configurar sem necessidade de instalação externa.
- **Jest + Mocks**: Para garantir testes rápidos e isolados de regras de negócio, sem dependência do banco de dados real.

---

## 🧠 Lógica de Desenvolvimento

- **Transferências**:
  - Verifica se ambas as contas existem.
  - Debita a conta de origem e credita a conta de destino.
  - Transação salva com descrição, data e valor.
- **Débitos**:
  - Exige conta de origem e verifica se há saldo suficiente.
- **Créditos**:
  - Apenas adiciona o valor na conta de destino.
- **Atualização de Saldo**:
  - Toda operação de transação atualiza diretamente o saldo da(s) conta(s) envolvidas.

---

## 🧪 Cobertura de Testes

### ✅ Testes Unitários (`TransactionService.test.ts`)
Cobrem:
- Criação de transações de débito, com redução de saldo.
- Erros esperados em operações inválidas (ex: débito sem conta).
- Utilização de **mock de repositórios** para simular o banco.

### ✅ Testes de Integração (`backend.test.ts`)
Testam o fluxo real:
- Criação, listagem, atualização e exclusão de contas.
- Criação e listagem de transações de todos os tipos.
- Integração entre contas via transferências.
- Testes usando `fetch` com o servidor Express real rodando.

## ▶️ Instruções para Executar Localmente

1. Clone o repositório
```bash
git clone https://github.com/matheusouzag/webapp-backend.git
```
2. Acesse a pasta
```bash
cd gestor-financeiro
```
3. Instale as dependências
```bash
npm install
```
4. Rode as migrações e inicialize o banco SQLite
```bash
npm run dev
```
Para rodar os testes:
```bash
npm test
```

## 📡 Endpoints da API

### 🏦 Contas (`/accounts`)

| Método | Rota            | Descrição                   |
|--------|------------------|-----------------------------|
| POST   | `/accounts`      | Cria nova conta             |
| GET    | `/accounts`      | Lista todas as contas       |
| PUT    | `/accounts/:id`  | Atualiza nome da conta      |
| DELETE | `/accounts/:id`  | Remove uma conta            |

### 💰 Transações (`/transactions`)

| Método | Rota                 | Descrição                                  |
|--------|----------------------|--------------------------------------------|
| POST   | `/transactions`      | Cria transação (crédito, débito, transferência) |
| GET    | `/transactions`      | Lista todas as transações                  |
| DELETE | `/transactions/:id`  | Remove uma transação                       |

---

## ✅ Critérios Atendidos

- ✅ Cadastro de contas e transações  
- ✅ Transferência entre contas com saldo atualizado  
- ✅ API RESTful com Express e TypeORM  
- ✅ Banco SQLite local funcional  
- ✅ Estrutura orientada a objetos e modular  
- ✅ Clean Code em todo o backend  
- ✅ Testes unitários e de integração com Jest  
- ✅ Documentação clara e completa  

