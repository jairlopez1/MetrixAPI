import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Sprint } from './sprint.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  board: string;

  @OneToMany(() => Sprint, (sprint: Sprint) => sprint.board_id)
  sprints: Array<Sprint>;

  @Column({ nullable: true })
  label: string;
}
