import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity()
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  formula: string;

  @Column({ nullable: true })
  rule: string;

  @Column({ nullable: true })
  label: string;

  @Column('decimal')
  value: number;

  @ManyToOne(() => Report, (report: Report) => report.metrics)
  @JoinColumn({ name: 'report_id' })
  report_id: Report;
}
