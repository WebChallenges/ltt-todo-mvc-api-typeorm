import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @IsString()
  @IsNotEmpty({ message: 'Missing username' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Missing password' })
  password: string;
}
