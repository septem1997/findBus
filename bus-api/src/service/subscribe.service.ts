import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { Subscribe } from '../entity/subscribe';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private repository: Repository<Subscribe>,
  ) {}

  unsubscribe() {

  }

  async subscribe(userDto: UserDto) {
    const user = new Subscribe();
    user.email = userDto.email;
    // user.createTime = new Date().toISOString()
    await this.repository.save(user);
  }
}
