import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInput, RegisterInput, UserRO } from './interfaces/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: UserRO })
  @Get('/api/users')
  async findAll(): Promise<UserRO[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: UserRO })
  @Post('/auth/login')
  async login(@Body() data: LoginInput): Promise<UserRO> {
    return await this.userService.login(data);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, type: UserRO })
  @Post('/auth/register')
  async register(@Body() data: RegisterInput): Promise<UserRO> {
    return await this.userService.register(data);
  }
}
