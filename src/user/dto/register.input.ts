import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterInput {
  @IsNotEmpty({ message: 'Missing username' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Missing password' })
  @IsString()
  password: string;
}
