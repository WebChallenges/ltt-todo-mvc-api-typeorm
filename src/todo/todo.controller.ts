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
import {
  CreateTodoInput,
  TodoRO,
  UpdateTodoInput,
} from './interfaces/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard)
  async showAllTodos(@User('id') id: string): Promise<TodoRO[]> {
    return this.todoService.showAll(id);
  }

  @Get('/:todoId')
  @UseGuards(AuthGuard)
  async getTodo(
    @User('id') id: string,
    @Param('todoId') todoId: string,
  ): Promise<TodoRO> {
    return this.todoService.getOne(id, todoId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createTodo(
    @User('id') id: string,
    @Body() data: CreateTodoInput,
  ): Promise<TodoRO> {
    return this.todoService.create(id, data);
  }

  @Put('/:todoId')
  @UseGuards(AuthGuard)
  async updateTodo(
    @User('id') id: string,
    @Param('todoId') todoId: string,
    @Body() data: UpdateTodoInput,
  ): Promise<TodoRO> {
    return this.todoService.update(id, todoId, data);
  }

  @Delete('/:todoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteTodo(@User('id') id: string, @Param('todoId') todoId: string) {
    return this.todoService.delete(id, todoId);
  }
}
