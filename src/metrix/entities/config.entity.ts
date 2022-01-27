import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  statement: string;
}
