import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'debito' | 'credito' | 'transferencia';

  @Column({ type: 'float' })
  value: number;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => Account, account => account.outgoingTransactions, { nullable: true })
  accountOrigin: Account;

  @ManyToOne(() => Account, account => account.incomingTransactions, { nullable: true })
  accountDestination: Account;
}