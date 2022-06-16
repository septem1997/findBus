import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false, comment: '数据是否可用，用于逻辑删除' })
  disabled: boolean;

  @CreateDateColumn({
    transformer: {
      from(value: Date): any {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
      },
      to(value: any): any {
        return value;
      },
    },
  })
  createTime: Date;
}
