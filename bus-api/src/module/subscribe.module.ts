import { Module } from '@nestjs/common';

import { SubscribeController } from '../controller/subscribe.controller';
import { SubscribeService } from '../service/subscribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from '../entity/subscribe';
const SubscribeRepository = TypeOrmModule.forFeature([Subscribe]);

@Module({
  imports: [SubscribeRepository],
  controllers: [SubscribeController],
  providers: [SubscribeService],
  exports: [SubscribeService, SubscribeRepository],
})
export class SubscribeModule {}
