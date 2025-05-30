import assert from "assert";
import { AccountService } from "../src/services/AccountService";

interface Conta {
  id?: number;
  name: string;
  type: string;
  balance: number;
}

function criarRepoConta() {
  const bancoNovo: Conta[] = [];

  return {
    create(dados: Partial<Conta>): Conta {
      return { ...dados } as Conta;
    },

    async save(conta: Conta): Promise<Conta> {
      conta.id = bancoNovo.length + 1;
      bancoNovo.push(conta);
      return conta;
    }
  };
}

async function run() {
  console.log("Rodando teste");

  const repoNovo = criarRepoConta();
  const service = new AccountService() as any;
  service.accountRepo = repoNovo;

  const novaConta = await service.create({
    name: "Conta Teste",
    type: "Poupança",
    balance: 500,
  });

  assert.strictEqual(novaConta.name, "Conta Teste");
  assert.strictEqual(novaConta.type, "Poupança");
  assert.strictEqual(novaConta.balance, 500);
  assert.ok(novaConta.id, "Conta deve ter um ID gerado");

  console.log("Passou na criação!");
}

run().catch((err) => {
  console.error("Erro:", err);
});
