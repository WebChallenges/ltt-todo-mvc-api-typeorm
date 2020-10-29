import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @IsString()
  @IsNotEmpty({ message: 'Missing username' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Missing password' })
  password: string;
}

export class RegisterInput {
  @IsNotEmpty({ message: 'Missing username' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Missing password' })
  @IsString()
  password: string;
}

export class UserRO {
  id: string;
  username: string;
  created_at: number;
  updated_at: number;
  token?: string;
}
