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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQuery } from 'src/paginate';
import { PaginationResultRO } from 'src/paginate/pagination-result.dto';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';
import {
  CreateTodoInput,
  TodoRO,
  UpdateTodoInput,
} from './interfaces/todo.dto';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller('/api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Show all todos' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PaginationResultRO })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @Get()
  @UseGuards(AuthGuard)
  async showAllTodos(
    @User('id') id: string,
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginationResultRO<TodoRO>> {
    return await this.todoService.paginate(id, {
      limit: paginationQuery.limit ?? 10,
      page: paginationQuery.page ?? 1,
    });
  }

  @ApiOperation({ summary: 'Get todo' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TodoRO })
  @Get('/:todoId')
  @UseGuards(AuthGuard)
  async getTodo(
    @User('id') id: string,
    @Param('todoId') todoId: string,
  ): Promise<TodoRO> {
    return this.todoService.getOne(id, todoId);
  }

  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateTodoInput })
  @ApiResponse({ status: 200, type: TodoRO })
  @Post()
  @UseGuards(AuthGuard)
  async createTodo(
    @User('id') id: string,
    @Body() data: CreateTodoInput,
  ): Promise<TodoRO> {
    return this.todoService.create(id, data);
  }

  @ApiOperation({ summary: 'Update existed todo' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateTodoInput })
  @ApiResponse({ status: 200, type: TodoRO })
  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateTodo(
    @User('id') id: string,
    @Param('id') todoId: string,
    @Body() data: UpdateTodoInput,
  ): Promise<TodoRO> {
    return this.todoService.update(id, todoId, data);
  }

  @ApiOperation({ summary: 'Delete existed todo' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TodoRO })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteTodo(@User('id') id: string, @Param('id') todoId: string) {
    return this.todoService.delete(id, todoId);
  }
}
