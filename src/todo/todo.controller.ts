import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';
import { CreateTodoInput } from './dto/create-todo.input';
import { Todo } from './dto/todo.type';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard)
  async showAllTodos(@User('id') id: string): Promise<Todo[]> {
    return this.todoService.showAll(id);
  }

  @Get('/:todoId')
  @UseGuards(AuthGuard)
  async getTodo(
    @User('id') id: string,
    @Param('todoId') todoId: string,
  ): Promise<Todo> {
    return this.todoService.getOne(id, todoId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createTodo(
    @User('id') id: string,
    @Body() data: CreateTodoInput,
  ): Promise<Todo> {
    return this.todoService.create(id, data);
  }

  @Put('/:todoId')
  @UseGuards(AuthGuard)
  async updateTodo(
    @User('id') id: string,
    @Param('todoId') todoId: string,
    @Body() data: UpdateTodoInput,
  ): Promise<Todo> {
    return this.todoService.update(id, todoId, data);
  }

  @Delete('/:todoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteTodo(@User('id') id: string, @Param('todoId') todoId: string) {
    return this.todoService.delete(id, todoId);
  }
}
