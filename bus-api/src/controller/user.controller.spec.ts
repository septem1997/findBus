import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserModule } from '../module/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { sendMail } from '../util/emailUtil';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(),
        ConfigModule.forRoot({
          envFilePath: ['.env.local', '.env'],
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root123456',
          database: 'where_is_bus',
          entities: [User],
          synchronize: true,
        }),
        UserModule,
      ],
    }).compile();
    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('测试邮件发送', async () => {
      userController.sendValidCode({
        email: '750627595@qq.com',
      });
    });
  });
});
