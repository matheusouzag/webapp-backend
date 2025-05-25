import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column({ type: 'float', default: 0 })
  balance!: number;

  @OneToMany(() => Transaction, transaction => transaction.accountOrigin)
  outgoingTransactions!: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.accountDestination)
  incomingTransactions!: Transaction[];
}