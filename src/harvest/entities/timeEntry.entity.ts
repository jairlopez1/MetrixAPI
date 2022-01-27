import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
import { UserAssignment } from './userAssignment.entity';

@Entity()
export class TimeEntry {
  @Column()
  @Generated('increment')
  id: number;

  @PrimaryColumn()
  harvest_id: number;

  @Column({ nullable: true })
  spend_date: Date;

  @Column({ nullable: true })
  hours: number;

  @Column('json', { nullable: true })
  billable_rate: number;

  @Column({ type: 'real', nullable: true })
  cost_rate: number;

  @ManyToOne(() => User, (user: User) => user.timeEntries)
  public user: User;

  @ManyToOne(
    () => UserAssignment,
    (userAssignment: UserAssignment) => userAssignment.timeEntries,
  )
  public user_assignment: UserAssignment;

  @ManyToOne(() => Project, (project: Project) => project.timeEntries)
  public project: Project;
}
