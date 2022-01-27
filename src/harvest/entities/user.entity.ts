import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { TimeEntry } from './timeEntry.entity';
import { UserAssignment } from './userAssignment.entity';

@Entity()
export class User {
  @Column()
  @Generated('increment')
  id: number;

  @PrimaryColumn()
  harvest_id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: true })
  cost_rate: number;

  @Column('json', { nullable: true })
  roles: string[];

  @OneToMany(
    () => UserAssignment,
    (userAssignments: UserAssignment) => userAssignments.user,
  )
  public userAssignments: UserAssignment[];

  @OneToMany(() => TimeEntry, (timeEntries: TimeEntry) => timeEntries.user)
  public timeEntries: TimeEntry[];
}
