import { Controller } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SubscribeService } from '../service/subscribe.service';

@Controller('bus')
export class SubscribeController {}
