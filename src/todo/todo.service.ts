import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { Todo } from './dto/todo.type';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoEntity } from './todo.entity';
import { TodoStatus } from './todo.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async showAll(userId: string): Promise<Todo[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const todos = await this.todoRepository.find({
      where: { user },
      relations: ['user'],
    });
    return todos.map(todo => todo.toResponseObject());
  }

  async getOne(userId: string, todoId: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(
      {
        id: todoId,
      },
      {
        relations: ['user'],
      },
    );
    if (!todo) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (!todo.isBelongsTo(userId))
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    return todo.toResponseObject();
  }

  async create(userId: string, data: CreateTodoInput): Promise<Todo> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const todo = this.todoRepository.create({
      ...data,
      user,
      status: TodoStatus.ACTIVE,
    });
    await this.todoRepository.save(todo);
    return todo.toResponseObject();
  }

  async update(
    userId: string,
    todoId: string,
    data: UpdateTodoInput,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
      },
      relations: ['user'],
    });
    if (!todo) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (!todo.isBelongsTo(userId))
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);

    const updatedData = new TodoEntity();
    updatedData.status = data.status;

    const { generatedMaps } = await this.todoRepository.update(
      {
        id: todoId,
      },
      updatedData,
    );

    const updatedTodo = await this.todoRepository.findOne({
      where: {
        id: todoId,
      },
    });

    return {
      id: todoId,
      ...data,
      updated_at: updatedTodo.updated_at,
    };
  }

  async delete(userId: string, todoId: string) {
    const todo = await this.todoRepository.findOne(
      {
        id: todoId,
      },
      {
        relations: ['user'],
      },
    );
    if (!todo) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (!todo.isBelongsTo(userId))
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);

    await this.todoRepository.remove(todo);
    return;
  }
}
