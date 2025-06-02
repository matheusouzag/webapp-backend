import { AppDataSource } from '../database/data-source';
import { Transaction } from '../entities/Transaction';
import { Account } from '../entities/Account';

type TransactionType = 'credito' | 'debito' | 'transferencia';

interface TransactionInput {
  type: TransactionType;
  value: number;
  description?: string;
  accountOriginId?: number;
  accountDestinationId?: number;
}

export class TransactionService {
  private transactionRepo = AppDataSource.getRepository(Transaction);
  private accountRepo = AppDataSource.getRepository(Account);

  async create(data: TransactionInput) {
    const { type, value, description, accountOriginId, accountDestinationId } = data;

    const transaction = new Transaction();
    transaction.type = type;
    transaction.value = value;
    transaction.description = description || '';
    transaction.date = new Date();

    if (type === 'debito') {
      if (!accountOriginId) throw new Error('Conta de origem obrigatória');
      const origin = await this.accountRepo.findOneByOrFail({ id: accountOriginId });
      origin.balance -= value;
      transaction.accountOrigin = origin;
      transaction.accountOriginName = origin.name;
      await this.accountRepo.save(origin);
    }

    if (type === 'credito') {
      if (!accountDestinationId) throw new Error('Conta de destino obrigatória');
      const dest = await this.accountRepo.findOneByOrFail({ id: accountDestinationId });
      dest.balance += value;
      transaction.accountDestination = dest;
      transaction.accountDestinationName = dest.name;
      await this.accountRepo.save(dest);
    }

    if (type === 'transferencia') {
      if (!accountOriginId || !accountDestinationId) throw new Error('Contas obrigatórias para transferência');
      const origin = await this.accountRepo.findOneByOrFail({ id: accountOriginId });
      const dest = await this.accountRepo.findOneByOrFail({ id: accountDestinationId });

      origin.balance -= value;
      dest.balance += value;

      transaction.accountOrigin = origin;
      transaction.accountDestination = dest;
      transaction.accountOriginName = origin.name;
      transaction.accountDestinationName = dest.name;

      await this.accountRepo.save(origin);
      await this.accountRepo.save(dest);
    }

    return this.transactionRepo.save(transaction);
  }

  async list() {
    return this.transactionRepo.find({
      relations: ['accountOrigin', 'accountDestination'],
      order: { date: 'DESC' },
    });
  }
}