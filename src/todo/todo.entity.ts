import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from '../shared/base.entity';
import { UserEntity } from '../user/user.entity';
import { TodoRO } from './interfaces/todo.dto';
import { TodoStatus } from './todo.enum';

@Entity('todos')
export class TodoEntity extends BaseEntity {
  @Column()
  content: string;

  @Column({ type: 'enum', enum: TodoStatus })
  status: TodoStatus;

  @ManyToOne(
    () => UserEntity,
    user => user.todos,
  )
  user: UserEntity;

  toResponseObject(): TodoRO {
    const { id, user, content, status, created_at, updated_at } = this;

    return {
      id,
      user: user.toResponseObject(),
      content,
      status,
      created_at,
      updated_at,
    };
  }

  isBelongsTo(userId: string): boolean {
    return this.user.id === userId;
  }
}
