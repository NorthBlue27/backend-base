import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolesDto, UpdateRolesDto } from '../dto/';
import { ROLES_REPOSITORY } from '../../../core/constants/index';
import { Roles } from '../roles.entity';
import { PaginationDto } from '../../../core/dto/pagination.dto';
import { UserService } from '../../user/services/user.service';
import { RolesTypeService } from '../../roles-type/services/roles-type.service';
import { handlerExceptions } from '../../../core/database/handlers/handler-exceptions';
import { RolesI, UpdateRolesI } from '../interfaces';
import { User } from '../../user/user.entity';
import { RolesType } from '../../roles-type/roles-type.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLES_REPOSITORY) private readonly rolesRepository: typeof Roles,
    private readonly userService: UserService,
    private readonly rolesTypeService: RolesTypeService,
  ) {}

  async create(createRolesDto: CreateRolesDto) {
    const { usr_email, tip_rol_des } = createRolesDto;
    // USER
    const user = await this.userService.findOne(usr_email);
    // ROLES TYPE
    const rolesType = await this.rolesTypeService.findOne(tip_rol_des);

    try {
      return await this.rolesRepository.create({
        rol_usr_id: user.usr_id,
        rol_tip_id: rolesType.tip_rol_id,
      });
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto): Promise<RolesI[]> {
    const { limit = 10, offset = 0 } = pagination;
    const query = await this.rolesRepository.findAll({
      limit,
      offset,
      include: [User, RolesType],
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query.map((data) => this.mappingData(data));
  }

  async findAllBy(email: string, roles: string): Promise<RolesI[]> {
    let query: Roles[];

    if (email) {
      query = await this.rolesRepository.findAll({
        include: [{ model: User, where: { usr_email: email } }],
      });
    } else if (roles) {
      query = await this.rolesRepository.findAll({
        include: [{ model: RolesType, where: { tip_rol_des: roles } }],
      });
    } else {
      query = await this.rolesRepository.findAll({
        include: [
          { model: User, where: { usr_email: email } },
          { model: RolesType, where: { tip_rol_des: roles } },
        ],
      });
    }
    if (!query)
      throw new NotFoundException(`No se encontraron resultados para `);
    return query.map((data) => this.mappingData(data));
  }

  async update(id: number, updateRolesDto: UpdateRolesDto) {
    const { usr_email, tip_rol_des } = updateRolesDto;
    // USER
    const updateRoles: UpdateRolesI = {};
    if (usr_email) {
      const user = await this.userService.findOne(usr_email);
      updateRoles.rol_usr_id = user.usr_id;
    }
    if (tip_rol_des) {
      const rolesType = await this.rolesTypeService.findOne(tip_rol_des);
      updateRoles.rol_tip_id = rolesType.tip_rol_id;
    }

    try {
      const [numberOfRowAffected, [updated]] =
        await this.rolesRepository.update(updateRoles, {
          where: {
            rol_id: id,
          },
          returning: true,
        });
      return { numberOfRowAffected, updated };
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async delete(id: number) {
    try {
      const numberOfRowAffected = await this.rolesRepository.destroy({
        where: {
          rol_id: id,
        },
      });
      return { numberOfRowAffected };
    } catch (error) {
      handlerExceptions(error);
    }
  }

  private mappingData(roles: Roles): RolesI {
    return {
      rol_id: roles.rol_id,
      rol_usr_id: roles.user.usr_id,
      rol_usr_email: roles.user.usr_name,
      rol_tip_id: roles.rolesType.tip_rol_id,
      rol_tip_des: roles.rolesType.tip_rol_des,
      flag: roles.flag,
    };
  }
}
