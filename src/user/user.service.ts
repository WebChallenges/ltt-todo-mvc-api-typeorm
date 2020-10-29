import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInput, RegisterInput, UserRO } from './interfaces/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async login(data: LoginInput): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findByUsername(username);
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject({ showToken: true });
  }

  async register(data: RegisterInput): Promise<UserRO> {
    const { password, username } = data;

    const user = await this.userRepository.findByUsername(username);
    if (user)
      throw new HttpException('Username is existed', HttpStatus.BAD_REQUEST);

    const newUser = await this.userRepository.createUser({
      username,
      password,
    });
    return newUser.toResponseObject();
  }
}
