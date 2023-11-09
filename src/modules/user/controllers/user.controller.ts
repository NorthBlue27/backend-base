import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginationDto } from '../../../core/dto/pagination.dto';
import { ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { User } from '../user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserRolGuard } from '../../auth/guards/user-rol.guard';
import { RoleProtected } from '../../../modules/auth/decorators/role-protected.decorator';
import { ValidRoles } from '../../../modules/auth/interfaces/valid-roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-all')
  @UseGuards(AuthGuard(), UserRolGuard)
  @RoleProtected(ValidRoles.admin)
  @ApiOkResponse({ type: [User] })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'offset', type: Number, required: false })
  findAll(@Query() pagination: PaginationDto) {
    return this.userService.findAll(pagination);
  }

  @Get(':email')
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'email', type: String, required: true })
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Patch(':id')
  @ApiParam({ name: 'email', type: String, required: true })
  @ApiOkResponse({ type: User })
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Delete(':email')
  @ApiParam({ name: 'email', type: String, required: true })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('email') email: string) {
    return this.userService.delete(email);
  }
}
