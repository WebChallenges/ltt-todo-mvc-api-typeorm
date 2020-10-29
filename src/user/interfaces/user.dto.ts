import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Missing username' })
  readonly username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Missing password' })
  readonly password: string;
}

export class RegisterInput {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Missing username' })
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Missing password' })
  @IsString()
  readonly password: string;
}

export class UserRO {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  username: string;

  @ApiProperty({
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    type: Date,
  })
  updated_at: Date;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  token?: string;
}
