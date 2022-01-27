import {
  Column,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BudgetReport } from './budgetReport.entity';
import { TimeEntry } from './timeEntry.entity';
import { UserAssignment } from './userAssignment.entity';

@Entity()
export class Project {
  @Column()
  @Generated('increment')
  id: number;

  @PrimaryColumn()
  harvest_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  is_active: boolean;

  @OneToOne(
    () => BudgetReport,
    (budgetReport: BudgetReport) => budgetReport.project,
  )
  public budgetReport: BudgetReport;

  @OneToMany(
    () => UserAssignment,
    (userAssignments: UserAssignment) => userAssignments.project,
  )
  public userAssignments: UserAssignment[];

  @OneToMany(() => TimeEntry, (timeEntries: TimeEntry) => timeEntries.project)
  public timeEntries: TimeEntry[];
}
