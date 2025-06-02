import { AccountService } from '../../src/services/AccountService';
import { Account } from '../../src/entities/Account';

const mockAccountRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../src/database/data-source', () => ({
  AppDataSource: {
    getRepository: () => mockAccountRepo,
  },
}));

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    service = new AccountService();
    jest.clearAllMocks();
  });

  it('should create and save a new account', async () => {
    const data = { name: 'Conta Teste', type: 'corrente', balance: 100 };
    const createdAccount = { ...data, id: 1 } as Account;

    mockAccountRepo.create.mockReturnValue(createdAccount);
    mockAccountRepo.save.mockResolvedValue(createdAccount);

    const result = await service.create(data);

    expect(mockAccountRepo.create).toHaveBeenCalledWith(data);
    expect(mockAccountRepo.save).toHaveBeenCalledWith(createdAccount);
    expect(result).toEqual(createdAccount);
  });

  it('should return a list of accounts', async () => {
    const accounts = [
      { id: 1, name: 'Conta 1', type: 'corrente', balance: 200 },
      { id: 2, name: 'Conta 2', type: 'poupança', balance: 500 },
    ] as Account[];

    mockAccountRepo.find.mockResolvedValue(accounts);

    const result = await service.list();

    expect(mockAccountRepo.find).toHaveBeenCalled();
    expect(result).toEqual(accounts);
  });

  it('should update an account and return the updated one', async () => {
    const id = 1;
    const updateData = { name: 'Conta Atualizada' };
    const updatedAccount = { id, ...updateData, type: 'corrente', balance: 300 } as Account;

    mockAccountRepo.update.mockResolvedValue({ affected: 1 });
    mockAccountRepo.findOneBy.mockResolvedValue(updatedAccount);

    const result = await service.update(id, updateData);

    expect(mockAccountRepo.update).toHaveBeenCalledWith(id, updateData);
    expect(mockAccountRepo.findOneBy).toHaveBeenCalledWith({ id });
    expect(result).toEqual(updatedAccount);
  });

  it('should delete an account', async () => {
    const id = 1;
    mockAccountRepo.delete.mockResolvedValue({ affected: 1 });

    const result = await service.delete(id);

    expect(mockAccountRepo.delete).toHaveBeenCalledWith(id);
    expect(result).toEqual({ affected: 1 });
  });
});
