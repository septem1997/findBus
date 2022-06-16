import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { User } from './user';

@Entity()
export class Subscribe extends BaseEntity {
  @ManyToOne(() => User, {})
  creator: User;

  @Column({ comment: '订阅的邮箱', length: 128 })
  email: string;

  @Column({ comment: '订阅的路线分段id', length: 32 })
  segmentid: number;

  @Column({ comment: '订阅的站名', length: 128 })
  stationname: string;

  @Column({ comment: '订阅的路线id', length: 32 })
  subrouteid: number;

  @Column({ comment: '提醒开始时间', length: 16 })
  clockStartTime: string;

  @Column({ comment: '提醒结束时间', length: 16 })
  clockEndTime: string;
}
