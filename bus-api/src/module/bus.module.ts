import { Module } from '@nestjs/common';

import { BusController } from '../controller/bus.controller';
@Module({
  imports: [],
  controllers: [BusController],
  providers: [],
  exports: [],
})
export class BusModule {}
