import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRO } from '../../user/interfaces/user.dto';
import { TodoStatus } from '../todo.enum';

export class TodoRO {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: UserRO,
    nullable: true,
  })
  user?: UserRO;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  content?: string;

  @ApiProperty({
    enum: TodoStatus,
    nullable: true,
  })
  status?: TodoStatus;

  @ApiProperty({
    type: Date,
    nullable: true,
  })
  created_at?: Date;

  @ApiProperty({
    type: Date,
    nullable: true,
  })
  updated_at?: Date;
}

export class CreateTodoInput {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Missing content' })
  @IsString()
  content: string;
}

export class UpdateTodoInput {
  @ApiProperty({
    enum: TodoStatus,
    required: true,
  })
  @IsNotEmpty({ message: 'Missing status' })
  @IsEnum(TodoStatus, { message: 'Invalid status' })
  status: TodoStatus;
}
