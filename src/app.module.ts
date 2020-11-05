import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ValidationPipe } from './shared/validation.pipe';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? {
            type: 'postgres',
            host: 'ec2-54-82-208-124.compute-1.amazonaws.com',
            port: 5432,
            username: 'rdargqofsuksac',
            password:
              '6dfcb866ee18f7159c340c44e9b2bffd6bb1d5f5fb1b898113e8f22ce91eb99c',
            database: 'dcblogopp8k04b',
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
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
