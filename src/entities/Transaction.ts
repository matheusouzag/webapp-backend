import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: 'debito' | 'credito' | 'transferencia';

  @Column({ type: 'float' })
  value!: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'datetime' })
  date!: Date;

  @Column({ nullable: true })
  accountOriginName?: string;

  @Column({ nullable: true })
  accountDestinationName?: string;

  @ManyToOne(() => Account, account => account.outgoingTransactions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  accountOrigin!: Account;

@ManyToOne(() => Account, account => account.incomingTransactions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  accountDestination!: Account;
}