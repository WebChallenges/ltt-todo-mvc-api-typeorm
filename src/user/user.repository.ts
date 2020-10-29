import { DeepPartial, EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(data: DeepPartial<UserEntity>) {
    const user = this.create(data);
    return await this.save(user);
  }

  async findByUsername(username: string) {
    return await this.findOne({
      where: {
        username,
      },
    });
  }

  async findById(id: string) {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}
