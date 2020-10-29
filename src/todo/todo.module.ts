import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { TodoController } from './todo.controller';
import { TodoEntity } from './todo.entity';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TodoEntity,
      UserRepository,
      TodoRepository,
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
