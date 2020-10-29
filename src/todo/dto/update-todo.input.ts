import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoStatus } from '../todo.enum';

export class UpdateTodoInput {
  @IsNotEmpty({ message: 'Missing status' })
  @IsString({ message: 'Invalid status' })
  @IsEnum(TodoStatus, { message: 'Invalid status' })
  status: TodoStatus;
}
