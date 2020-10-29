import { User } from '../../user/dto/user.type';
import { TodoStatus } from '../todo.enum';

export class Todo {
  id: string;
  user?: User;
  content?: string;
  status?: TodoStatus;
  created_at?: number;
  updated_at?: number;
}
