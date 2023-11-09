import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../core/constants/index';
import { User } from '../user.entity';
import { PaginationDto } from '../../../core/dto/pagination.dto';
import { UpdateUserDto } from '../dto';
import { handlerExceptions } from '../../../core/database/handlers/handler-exceptions';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async findAll(pagination: PaginationDto): Promise<User[]> {
    const { limit = 10, offset = 0 } = pagination;
    const query = await this.userRepository.findAll<User>({
      limit,
      offset,
      attributes: {
        exclude: ['usr_password'],
      },
    });
    if (!query) throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(email: string): Promise<User> {
    const query = await this.userRepository.findOne<User>({
      where: {
        usr_email: email,
      },
      attributes: {
        exclude: ['usr_password'],
      },
    });
    if (!query) throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    try {
      const [numberOfRowAffected, [updated]] =
        await this.userRepository.update<User>(updateUserDto, {
          where: {
            usr_email: email,
          },
          returning: true,
        });
      return { numberOfRowAffected, updated };
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async delete(email: string) {
    const numberOfRowAffected = await this.userRepository.destroy({
      where: { usr_email: email },
    });
    return { numberOfRowAffected };
  }
}
