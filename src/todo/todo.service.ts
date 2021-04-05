import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serialize } from 'class-transformer';
import { PaginationQuery, PaginationResultRO } from 'src/paginate';
import { UserRepository } from '../user/user.repository';
import {
  CreateTodoInput,
  TodoRO,
  UpdateTodoInput,
} from './interfaces/todo.dto';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async paginate(
    userId: string,
    query: PaginationQuery,
  ): Promise<PaginationResultRO<TodoRO>> {
    const user = await this.userRepository.findById(userId);
    const skippedItems = (query.page - 1) * query.limit;
    const items = await this.todoRepository.find({
      where: { user },
      relations: ['user'],
      order: {
        created_at: 'DESC',
      },
      skip: skippedItems,
      take: query.limit,
    });
    return {
      items: items.map(item => JSON.parse(serialize(item))),
      page: +query.page,
      totalCount: items.length,
    };
  }

  async getOne(userId: string, todoId: string): Promise<TodoRO> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (!todo.isBelongsTo(userId))
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    return todo.toResponseObject();
  }

  async create(userId: string, data: CreateTodoInput): Promise<TodoRO> {
    const user = await this.userRepository.findById(userId);
    const todo = await this.todoRepository.createTodo({
      ...data,
      user,
    });
    return todo.toResponseObject();
  }

  async update(
    userId: string,
    todoId: string,
    data: UpdateTodoInput,
  ): Promise<TodoRO> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (!todo.isBelongsTo(userId))
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);

    const updatedTodo = await this.todoRepository.updateTodo(todoId, data);

    return {
      id: todoId,
      ...data,
      updated_at: updatedTodo.updated_at,
    };
  }

  async delete(userId: string, todoId: string) {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (!todo.isBelongsTo(userId))
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);

    await this.todoRepository.remove(todo);
    return;
  }
}
