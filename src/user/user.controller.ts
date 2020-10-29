import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput, RegisterInput, UserRO } from './interfaces/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/auth/login')
  async login(@Body() data: LoginInput): Promise<UserRO> {
    return await this.userService.login(data);
  }

  @Post('/auth/register')
  async register(@Body() data: RegisterInput): Promise<UserRO> {
    return await this.userService.register(data);
  }
}
