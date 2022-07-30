import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../types';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @Column({ default: UserRole.USER })
  role: UserRole;
}
