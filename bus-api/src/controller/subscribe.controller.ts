import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SubscribeService } from '../service/subscribe.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post('subscribe')
  @UseGuards(AuthGuard('userJwt'))
  subscribe(@Body() subscriptDto: SubscriptDto, @Req() request) {
    return this.subscribeService.subscribe(subscriptDto, request.user);
  }

  @Post('unsubscribe')
  @UseGuards(AuthGuard('userJwt'))
  unsubscribe(@Body('id') id: number, @Req() request) {
    return this.subscribeService.unsubscribe(id);
  }
}
