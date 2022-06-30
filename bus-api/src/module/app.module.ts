import { CacheModule, Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { UserModule } from './user.module';
import { User } from '../entity/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BusModule } from './bus.module';
import { Subscribe } from '../entity/subscribe';
import { SubscribeModule } from './subscribe.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from '../service/task.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_PWD as string,
      database: 'where_is_bus',
      entities: [User, Subscribe],
      synchronize: true,
    }),
    UserModule,
    BusModule,
    SubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
