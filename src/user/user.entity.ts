import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import BaseEntity from '../shared/base.entity';
import { TodoEntity } from '../todo/todo.entity';
import { UserRO } from './interfaces/user.dto';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  private tempPassword: string;

  @OneToMany(
    () => TodoEntity,
    photo => photo.user,
  )
  todos: TodoEntity[];

  private get token(): string {
    const { id } = this;
    return jwt.sign(
      {
        id,
      },
      'SECRET_KEY',
      {
        expiresIn: '7d',
      },
    );
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.tempPassword !== this.password)
      this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(options: { showToken?: boolean } = {}): UserRO {
    const { id, username, created_at, updated_at, token } = this;
    const baseResponse = { id, username, created_at, updated_at };
    if (options?.showToken) {
      return {
        ...baseResponse,
        token,
      };
    } else return baseResponse;
  }
}
