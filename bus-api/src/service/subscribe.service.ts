import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { LessThanOrEqual, Repository, MoreThanOrEqual } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { Subscribe } from '../entity/subscribe';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private repository: Repository<Subscribe>,
  ) {}

  async getSubscribesByNow() {
    const time = new Date().toTimeString().substring(0, 5);
    const list = await this.repository.find({
      where: {
        disabled: false,
        clockStartTime: LessThanOrEqual(time),
        clockEndTime: MoreThanOrEqual(time),
      },
    });
    return list;
  }

  async unsubscribe(id: number) {
    const one = await this.repository.findOneBy({
      id,
    });
    if (one) {
      one.disabled = true;
      await this.repository.save(one);
    }
  }

  async subscribe(subDto: SubscriptDto, user: User) {
    const sub = new Subscribe();
    sub.email = user.email;
    sub.creator = user;
    sub.clockEndTime = subDto.clockEndTime;
    sub.clockStartTime = subDto.clockStartTime;
    sub.segmentid = subDto.segmentid;
    sub.stationname = subDto.stationname;
    sub.subrouteid = subDto.subrouteid;
    sub.createTime = new Date();
    await this.repository.save(sub);
  }
}
