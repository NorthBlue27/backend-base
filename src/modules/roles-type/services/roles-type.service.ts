import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ROLES_TYPE_REPOSITORY } from '../../../core/constants/index';
import { RolesType } from '../roles-type.entity';
import { handlerExceptions } from '../../../core/database/handlers/handler-exceptions';
import { PaginationDto } from '../../../core/dto/pagination.dto';
import { CreateRolesTypeDto, UpdateRolesTypeDto } from '../dto';

@Injectable()
export class RolesTypeService {
  constructor(
    @Inject(ROLES_TYPE_REPOSITORY)
    private readonly rolesTypeRepository: typeof RolesType,
  ) {}

  async createOne(createRolesTypeDto: CreateRolesTypeDto) {
    try {
      return await this.rolesTypeRepository.create(createRolesTypeDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const query = await this.rolesTypeRepository.findAll({
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
  }

  async findOne(rol: string) {
    const query = await this.rolesTypeRepository.findOne({
      where: {
        tip_rol_des: rol,
      },
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados para el tipo de rol ${rol}`,
      );
    return query;
  }

  async update(rol: string, updateRolesTypeDto: UpdateRolesTypeDto) {
    try {
      const [numberOfRowAffected, [updated]] =
        await this.rolesTypeRepository.update<RolesType>(updateRolesTypeDto, {
          where: {
            tip_rol_des: rol,
          },
          individualHooks: true,
          returning: true,
        });
      return { numberOfRowAffected, updated };
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async delete(rol: string) {
    const numberOfRowAffected = await this.rolesTypeRepository.destroy({
      where: {
        tip_rol_des: rol,
      },
    });
    return { numberOfRowAffected };
  }
}
