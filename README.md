# 💰 Gestor Financeiro Pessoal - Back-end

[Código Front-end](https://github.com/matheusouzag/webapp)

Este é o back-end da aplicação **Gestor Financeiro Pessoal**, desenvolvida como parte de um desafio técnico para avaliar habilidades em Node.js, Express, TypeORM, SQL, orientação a objetos, Clean Code e testes automatizados.

## 📌 Objetivo

A aplicação permite o gerenciamento de contas bancárias e o registro de transações financeiras (crédito, débito e transferência), com operações completas de CRUD (criação, leitura, atualização e exclusão).

---

## 🏗️ Arquitetura e Estrutura

O back-end segue princípios de **Clean Architecture**, com separação clara entre camadas:

```
├── src/
│   ├── controllers/         
│   │   ├── AccountController.ts
│   │   └── TransactionController.ts
│   │
│   ├── entities/            
│   │   ├── Account.ts
│   │   └── Transaction.ts
│   │
│   ├── repositories/        
│   │   ├── AccountRepository.ts
│   │   └── TransactionRepository.ts
│   │
│   ├── services/            
│   │   ├── AccountService.ts
│   │   └── TransactionService.ts
│   │
│   ├── routes/              
│   │   └── index.ts
│   │
│   ├── database/            
│   │   └── data-source.ts
│   │
│   ├── tests/               
│       ├── backend.test.ts
│       └── TransactionService.test.ts
```

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

---

## 💡 Decisões de Arquitetura

- **TypeORM**: Forte integração com TypeScript, tipagem estática e suporte direto a SQLite, além da facilidade de migrations e repositórios.
- **Camada de serviço (Service Layer)**: Centraliza toda a lógica de negócio, separando-a dos controladores. Isso facilita testes unitários e manutenção.
- **SQLite**: Ideal para projetos locais e fácil de configurar sem necessidade de instalação externa.
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
  - Toda operação de transação atualiza diretamente o saldo das contas envolvidas.

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

### ✅ Testes Unitários (AccountService.test.ts)
Cobrem:
- Criação e salvamento de contas utilizando mocks de repositório.
- Listagem completa de contas cadastradas.
- Atualização de conta com retorno da entidade atualizada.
- Remoção de conta existente.

### ✅ Testes Unitários (AccountController.test.ts)
Cobrem:
- Criação de conta via POST /accounts, com status 201 e JSON de retorno.
- Tratamento de erro na criação de conta.
- Listagem de contas com status 200.
- Atualização de conta com PUT /accounts/:id.
- Remoção de conta com DELETE /accounts/:id e retorno 204.

### ✅ Testes Unitários (TransactionController.test.ts)
Cobrem:
- Criação de transação via POST /transactions, com retorno 201.
- Tratamento de erro ao criar transação inválida.
- Listagem de transações cadastradas com retorno 200.

## ▶️ Instruções para Executar Localmente

1. Clone o repositório
```bash
git clone https://github.com/matheusouzag/webapp-backend.git
```
2. Acesse a pasta
```bash
cd webapp-backend
```
3. Instale as dependências
```bash
npm install
```
4. Rode as migrações e inicialize o banco SQLite
```bash
npm run dev
```
5. Para rodar os testes:
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

---

🌐 O back-end está rodando localmente em: [http://localhost:3001](http://localhost:3001)

