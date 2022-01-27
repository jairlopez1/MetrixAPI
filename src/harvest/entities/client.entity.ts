import { Column, Entity, Generated, ManyToMany, PrimaryColumn } from 'typeorm';
import { BudgetReport } from './budgetReport.entity';

@Entity()
export class Client {
  @Column()
  @Generated('increment')
  id: number;

  @PrimaryColumn()
  harvest_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  is_active: boolean;

  @ManyToMany(
    () => BudgetReport,
    (budgetReports: BudgetReport) => budgetReports.clients,
  )
  public budgetReports: BudgetReport[];
}
