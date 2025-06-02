import { TransactionService } from '../../src/services/TransactionService';
import { Account } from '../../src/entities/Account';

const mockTransactionRepo = {
  save: jest.fn(),
  find: jest.fn(),
};

const mockAccountRepo = {
  findOneByOrFail: jest.fn(),
  save: jest.fn(),
};

jest.mock('../../src/database/data-source', () => ({
  AppDataSource: {
    getRepository: (entity: any) => {
      if (entity.name === 'Transaction') return mockTransactionRepo;
      if (entity.name === 'Account') return mockAccountRepo;
    },
  },
}));

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    service = new TransactionService();
    jest.clearAllMocks();
  });

  it('should create a debit transaction and decrease origin account balance', async () => {
    const originAccount: Account = { id: 1, name: 'Conta 1', type: 'Corrente', balance: 1000 } as Account;

    mockAccountRepo.findOneByOrFail.mockResolvedValue(originAccount);
    mockTransactionRepo.save.mockResolvedValue({ id: 1 });

    const result = await service.create({
      type: 'debito',
      value: 200,
      accountOriginId: 1,
    });

    expect(mockAccountRepo.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
    expect(originAccount.balance).toBe(800);
    expect(mockAccountRepo.save).toHaveBeenCalledWith(originAccount);
    expect(mockTransactionRepo.save).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  it('should throw error if debit transaction has no accountOriginId', async () => {
    await expect(service.create({ type: 'debito', value: 100 })).rejects.toThrow('Conta de origem obrigatória');
  });

});
