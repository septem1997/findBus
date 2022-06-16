import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class User extends BaseEntity {
  @Column({ comment: '邮箱', length: 32 })
  email: string;

  @Column()
  avatar: string;

  @Column()
  password: string;
}
