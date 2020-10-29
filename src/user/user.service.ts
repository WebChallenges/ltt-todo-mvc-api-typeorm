import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { User } from './dto/user.type';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(data: LoginInput): Promise<User> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject({ showToken: true });
  }

  async register(data: RegisterInput): Promise<User> {
    const { password, username } = data;

    const user = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });

    if (user)
      throw new HttpException('Username is existed', HttpStatus.BAD_REQUEST);

    const newUser = this.userRepository.create({
      username,
      password,
    });
    await this.userRepository.save(newUser);
    return newUser.toResponseObject();
  }
}
