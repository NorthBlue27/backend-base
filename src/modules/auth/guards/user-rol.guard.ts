import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  META_ROLES,
  ROLES_TYPE_REPOSITORY,
} from '../../../core/constants/index';
import { User } from '../../../modules/user/user.entity';

@Injectable()
export class UserRolGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const user: User = req.user as User;

    if (!user) throw new BadRequestException('Usuario no encontrado');

    

    return true;
  }
}
