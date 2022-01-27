import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { TimeEntry } from './timeEntry.entity';
import { User } from './user.entity';

@Entity()
export class UserAssignment {
  @Column()
  @Generated('increment')
  id: number;

  @PrimaryColumn()
  harvest_id: number;

  @Column({ nullable: true })
  budget: number;

  @Column('real', { nullable: true })
  hourly_rate: number;

  @ManyToOne(() => User, (user: User) => user.userAssignments)
  public user: User;

  @ManyToOne(() => Project, (project: Project) => project.userAssignments)
  public project: Project;

  @OneToMany(
    () => TimeEntry,
    (timeEntries: TimeEntry) => timeEntries.user_assignment,
  )
  public timeEntries: TimeEntry[];
}
