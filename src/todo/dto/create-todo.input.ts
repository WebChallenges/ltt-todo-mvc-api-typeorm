import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoInput {
  @IsNotEmpty({ message: 'Missing content' })
  @IsString()
  content: string;
}
