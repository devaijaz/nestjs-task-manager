import { Exclude } from 'class-transformer';
import { User } from 'src/auth/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tasks {
  constructor(tasks: Partial<Tasks>) {
    Object.assign(this, tasks);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  done: boolean;

  @Exclude()
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
