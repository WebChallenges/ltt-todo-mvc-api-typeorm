import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { User } from './dto/user.type';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/auth/login')
  async login(@Body() data: LoginInput): Promise<User> {
    return await this.userService.login(data);
  }

  @Post('/auth/register')
  async register(@Body() data: RegisterInput): Promise<User> {
    return await this.userService.register(data);
  }
}
