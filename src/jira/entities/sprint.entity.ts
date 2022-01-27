import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { Issue } from './issue.entity';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sprint: string;

  @Column()
  board: string;

  @OneToMany(() => Issue, (issue: Issue) => issue.sprint)
  issues: Issue[];

  @ManyToOne(() => Board, (board: Board) => board.sprints)
  @JoinColumn({ name: 'board_id' })
  board_id: Board;

  @Column({ nullable: true })
  label: string;
}
