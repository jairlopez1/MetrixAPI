import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Project } from './project.entity';

@Entity()
export class BudgetReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: true })
  budget: number;

  @Column({ nullable: true })
  budget_spent: number;

  @Column({ nullable: true })
  budget_remaining: number;

  @OneToOne(() => Project, (project: Project) => project.budgetReport)
  @JoinColumn()
  public project: Project;

  @ManyToMany(() => Client, (clients: Client) => clients.budgetReports)
  @JoinTable()
  public clients: Client[];
}
