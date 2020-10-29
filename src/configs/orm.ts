import { ConnectionOptions } from 'typeorm';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'todo_mvc',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};
