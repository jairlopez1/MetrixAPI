import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Sprint } from './sprint.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sprint: string;

  @ManyToOne(() => Sprint, (sprint: Sprint) => sprint.issues)
  @JoinColumn({ name: 'sprint_id' })
  sprint_id: Sprint;

  @Column({ nullable: true })
  label: string;

  @Column()
  type: string;

  @Column()
  status: string;
}
