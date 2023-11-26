import * as bcrypt from 'bcrypt';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async delete(userId) {
    return await this.userRepository.destroy({ where: { id: userId } });
  }

  async update(data, userId) {
    const newUser = { ...data };

    if (data.password) {
      const hashedPassword = await bcrypt.hash(
        data.password,
        Number(process.env.BCRYPT_SALT_ROUNDS),
      );
      newUser.password = hashedPassword;
    }

    try {
      const [numberOfAffectedRows, [updatedUser]] =
        await this.userRepository.update(
          { ...newUser },
          {
            where: { id: userId },
            returning: true,
          },
        );

      return { numberOfAffectedRows, updatedUser };
    } catch (error) {
      throw new InternalServerErrorException(error.name);
    }
  }
}
