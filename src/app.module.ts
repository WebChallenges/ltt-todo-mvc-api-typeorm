import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ValidationPipe } from './shared/validation.pipe';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'todo_mvc',
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
          },
    ),
    UserModule,
    TodoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
