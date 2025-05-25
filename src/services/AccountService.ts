import { AppDataSource } from '../database/data-source';
import { Account } from '../entities/Account';

export class AccountService {
  private accountRepo = AppDataSource.getRepository(Account);

  async create(data: Partial<Account>) {
    const account = this.accountRepo.create(data);
    return this.accountRepo.save(account);
  }

  async list() {
    return this.accountRepo.find();
  }

  async update(id: number, data: Partial<Account>) {
    await this.accountRepo.update(id, data);
    return this.accountRepo.findOneBy({ id });
  }

  async delete(id: number) {
    return this.accountRepo.delete(id);
  }
}