import { DeepPartial, EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { UpdateTodoInput } from './interfaces/todo.dto';
import { TodoEntity } from './todo.entity';
import { TodoStatus } from './todo.enum';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> {
  async findByUser(user: UserEntity) {
    const todos = await this.find({
      where: { user },
      relations: ['user'],
    });
    return todos;
  }

  async findById(id: string) {
    return await this.findOne(
      {
        id,
      },
      {
        relations: ['user'],
      },
    );
  }

  async createTodo(data: DeepPartial<TodoEntity>) {
    const todo = this.create({
      ...data,
      status: TodoStatus.ACTIVE,
    });
    return await this.save(todo);
  }

  async updateTodo(id: string, data: UpdateTodoInput) {
    const updatedData = new TodoEntity();
    updatedData.status = data.status;

    await this.update(
      {
        id,
      },
      updatedData,
    );

    return await this.findById(id);
  }
}
