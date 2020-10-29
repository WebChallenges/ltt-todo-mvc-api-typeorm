import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRO } from '../../user/interfaces/user.dto';
import { TodoStatus } from '../todo.enum';

export class TodoRO {
  id: string;
  user?: UserRO;
  content?: string;
  status?: TodoStatus;
  created_at?: number;
  updated_at?: number;
}

export class CreateTodoInput {
  @IsNotEmpty({ message: 'Missing content' })
  @IsString()
  content: string;
}

export class UpdateTodoInput {
  @IsNotEmpty({ message: 'Missing status' })
  @IsString({ message: 'Invalid status' })
  @IsEnum(TodoStatus, { message: 'Invalid status' })
  status: TodoStatus;
}
