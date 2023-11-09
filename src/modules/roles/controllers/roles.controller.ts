import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRolesDto, UpdateRolesDto } from '../dto';
import { PaginationDto } from '../../../core/dto/pagination.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create-one')
  create(@Body() createRoleDto: CreateRolesDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('find-all')
  findAll(@Query() pagination: PaginationDto) {
    return this.rolesService.findAll(pagination);
  }

  @Get('find-all-by/:email/:roles')
  findAllBy(@Param('email') email: string, @Param('roles') roles: string) {
    return this.rolesService.findAllBy(email, roles);
  }

  @Patch('update-one/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRolesDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.delete(id);
  }
}
