import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RolesTypeService } from '../services/roles-type.service';
import { CreateRolesTypeDto, UpdateRolesTypeDto } from '../dto';
import { PaginationDto } from '../../../core/dto/pagination.dto';

@Controller('roles-type')
export class RolesTypeController {
  constructor(private readonly rolesTypeService: RolesTypeService) {}

  @Post('create-one')
  create(@Body() createRolesTypeDto: CreateRolesTypeDto) {
    return this.rolesTypeService.createOne(createRolesTypeDto);
  }

  @Get('find-all')
  findAll(@Query() pagination: PaginationDto) {
    return this.rolesTypeService.findAll(pagination);
  }

  @Get('find-one/:rol')
  findOne(@Param('rol') rol: string) {
    return this.rolesTypeService.findOne(rol);
  }

  @Patch('update-one/:rol')
  update(
    @Param('rol') rol: string,
    @Body() updateRolesTypeDto: UpdateRolesTypeDto,
  ) {
    return this.rolesTypeService.update(rol, updateRolesTypeDto);
  }

  @Delete('delete-one/:rol')
  delete(@Param('rol') rol: string) {
    return this.rolesTypeService.delete(rol);
  }
}
