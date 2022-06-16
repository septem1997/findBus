import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { sendMail } from '../util/emailUtil';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  register(pass: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(pass, saltRounds);
  }

  sendValidCode(userDto: UserDto) {
    // todo random valid code
    // todo redis
    sendMail({
      title: '巴士到哪了-验证码',
      content: '4444',
      receiver: userDto.email,
    });
  }

  async findUserByToken(token: string): Promise<User> {
    if (!token || token === 'null') {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    const userDto = new UserDto();
    userDto.email = (<any>this.jwtService.decode(token.substr(7))).username;
    return await this.findOne(userDto);
  }

  async login(userDto: UserDto) {
    const findUser = await this.findOne(userDto);
    if (findUser) {
      const pwdIsCorrect = await bcrypt.compare(
        userDto.password,
        findUser.password,
      );
      if (pwdIsCorrect) {
        userDto.password = null;
        return {
          token: 'Bearer ' + this.jwtService.sign(userDto),
          username: findUser.email,
        };
      } else {
        throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('找不到该用户', HttpStatus.NOT_FOUND);
    }
  }

  async create(userDto: UserDto) {
    const findAdmin = await this.repository.findOne({
      where: {
        email: userDto.email,
      },
    });
    if (findAdmin) {
      throw new HttpException('该用户名已存在', HttpStatus.CONFLICT);
    }
    const user = new User();
    const newPass = await this.register(userDto.password);
    user.email = userDto.email;
    user.password = newPass;
    // user.createTime = new Date().toISOString()
    user.avatar = '';
    await this.repository.save(user);
    userDto.password = null;
    return {
      token: 'Bearer ' + this.jwtService.sign(userDto),
      username: user.email,
    };
  }

  async findOne(userDto: UserDto): Promise<User> {
    return await this.repository.findOne({
      where: {
        email: userDto.email,
      },
    });
  }
}
