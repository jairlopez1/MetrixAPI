import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Metric } from './metric.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @OneToMany(() => Metric, (metric: Metric) => metric.report_id)
  metrics: Array<Metric>;
}
