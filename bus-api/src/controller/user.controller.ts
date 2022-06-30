import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() userDto: UserDto) {
    if (userDto.email && userDto.password) {
      return this.userService.login(userDto);
    } else {
      throw new HttpException('请输入邮箱和密码', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('emailAvailable')
  async usernameAvailable(@Query('email') email: string) {
    const userDto = new UserDto();
    userDto.email = email;
    return (await this.userService.findOne(userDto)) == null;
  }

  @Get('info')
  @UseGuards(AuthGuard('userJwt'))
  info(@Req() request) {
    return request.user;
  }

  @Post('sendValidCode')
  sendValidCode(@Body() userDto: UserDto) {
    return this.userService.sendValidCode(userDto);
  }

  @Post('signup')
  signUp(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
}
