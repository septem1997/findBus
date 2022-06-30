import {
  Body,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { sendMail } from '../util/emailUtil';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private crypt(pass: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(pass, saltRounds);
  }

  sendValidCode(userDto: UserDto) {
    // random valid code
    const randomCode = (Math.random() * 1000000).toFixed(0).padStart(6, '0');
    this.cacheManager.set(userDto.email, randomCode, {
      ttl: 120,
    });
    const html = `<div style="width: 800px;height: 280px;
          align-items: center;justify-content: center;
          display: flex;flex-direction: column;">
        <h2>公交到哪了</h2>
        <div style="border: 1px solid #cad5e8;padding: 24px">
            您好！<br>
            您的验证码为<strong>${randomCode}</strong>。如非本人操作请忽略本邮件。
        </div>
      </div>`;
    sendMail({
      title: '【公交到哪了】邮件验证',
      content: html,
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
        return {
          token:
            'Bearer ' +
            this.jwtService.sign({
              email: userDto.email,
            }),
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
    const findUser = await this.repository.findOne({
      where: {
        email: userDto.email,
      },
    });
    if (findUser) {
      throw new HttpException('该用户名已存在', HttpStatus.CONFLICT);
    }
    const randomCode = await this.cacheManager.get(userDto.email);
    if (!randomCode || randomCode !== userDto.validCode) {
      throw new HttpException('验证码错误', HttpStatus.CONFLICT);
    }
    const user = new User();
    const encryptPwd = await this.crypt(userDto.password);
    user.email = userDto.email;
    user.password = encryptPwd;
    // user.createTime = new Date().toISOString()
    user.avatar = '';
    await this.repository.save(user);
    return {
      token:
        'Bearer ' +
        this.jwtService.sign({
          email: userDto.email,
        }),
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
