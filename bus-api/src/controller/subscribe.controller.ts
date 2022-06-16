import { Controller } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SubscribeService } from '../service/subscribe.service';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}
}
