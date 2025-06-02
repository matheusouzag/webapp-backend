import { describe, it, beforeAll, afterAll, expect, jest } from '@jest/globals';

const BASE = 'http://localhost:3001';

let _server: any = null; // para guardar o servidor rodando
let createdAccount1: any, createdAccount2: any;
let createdTransaction: any = null;


describe('Backend financeiro', () => {
  beforeAll(async () => {
    const serverModule = await import('../src/server');
    _server = await serverModule.startServer(); 
  });

  afterAll(async () => {
    if (createdTransaction?.id) {
      await fetch(`${BASE}/transactions/${createdTransaction.id}`, {
        method: 'DELETE',
      });
    }

    if (createdAccount1?.id) {
      await fetch(`${BASE}/accounts/${createdAccount1.id}`, {
        method: 'DELETE',
      });
    }
    if (createdAccount2?.id) {
      await fetch(`${BASE}/accounts/${createdAccount2.id}`, {
        method: 'DELETE',
      });
    }

    if (_server) {
      await new Promise<void>((resolve, reject) => {
        _server.close((err: any) => (err ? reject(err) : resolve()));
      });
    }
  });

  it('Deve criar uma nova conta', async () => {
    const payload = {
      name: "Conta Teste 1",
      type: "Corrente",
      balance: 500,
    };

    const res = await fetch(`${BASE}/accounts`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.id).toBeDefined();
    createdAccount1 = json;
  });

  it('Deve criar uma segunda conta', async () => {
    const payload = {
      name: "Conta Teste 3",
      type: "Poupança",
      balance: 300,
    };

    const res = await fetch(`${BASE}/accounts`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(201);
    const json = await res.json();
    createdAccount2 = json;
    expect(json.id).toBeDefined();
  });

  it('Deve listar todas as contas', async () => {
    const res = await fetch(`${BASE}/accounts`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.some((c: any) => c.id === createdAccount1.id)).toBe(true);
  });

  it('Deve criar uma transação de crédito', async () => {
    const res = await fetch(`${BASE}/transactions`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'credito',
        accountDestinationId: createdAccount1.id,
        value: 200,
        description: 'Depósito de teste',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(201);
    const json = await res.json();
    createdTransaction = json;
    expect(json.type).toBe('credito');
    expect(json.value).toBe(200);
  });

  it('Deve criar uma transação de débito', async () => {
    const res = await fetch(`${BASE}/transactions`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'debito',
        accountOriginId: createdAccount1.id,
        value: 100,
        description: 'Pagamento de teste',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.type).toBe('debito');
    expect(json.value).toBe(100);
  });

  it('Deve criar uma transferência', async () => {
    const res = await fetch(`${BASE}/transactions`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'transferencia',
        accountOriginId: createdAccount1.id,
        accountDestinationId: createdAccount2.id,
        value: 50,
        description: 'Transferência de teste',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.type).toBe('transferencia');
    expect(json.value).toBe(50);
  });

  it('Deve listar as transações', async () => {
    const res = await fetch(`${BASE}/transactions`);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
    expect(json.some((t: any) => t.id === createdTransaction.id)).toBe(true);
  });

  it('Deve atualizar uma conta', async () => {
    const res = await fetch(`${BASE}/accounts/${createdAccount1.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: 'Conta Atualizada' }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.name).toBe('Conta Atualizada');
  });

  it('Deve deletar uma conta', async () => {
    const res = await fetch(`${BASE}/accounts/${createdAccount2.id}`, {
      method: 'DELETE',
    });

    expect(res.status).toBe(204);
  });
});
