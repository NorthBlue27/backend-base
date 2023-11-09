import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../../../core/constants/index';
import { User } from 'src/modules/user/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import * as bycript from 'bcrypt';
import { JwtPayloadInterface } from '../interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';
import { handlerExceptions } from '../../../core/database/handlers/handler-exceptions';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUser: CreateUserDto) {
    try {
      const { usr_password, ...userData } = createUser;
      const user = await this.userRepository.create<User>({
        ...userData,
        usr_password: bycript.hashSync(usr_password, 10),
      });

      return {
        ...user.dataValues,
        token: this.getJwt({ usr_id: user.usr_id }),
      };
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async signIn(loginUser: LoginUserDto) {
    const { usr_email, usr_password } = loginUser;
    const user = await this.findOne(usr_email);
    if (!bycript.compare(usr_password, user.usr_password))
      throw new UnauthorizedException('Contraseña incorrecta');
    return {
      ...user.dataValues,
      token: this.getJwt({ usr_id: user.usr_id }),
    };
  }

  private async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne<User>({
      where: {
        usr_email: email,
      },
    });
    if (!user)
      throw new NotFoundException(`No existe el usuario con email ${email}`);
    return user;
  }

  private getJwt(payload: JwtPayloadInterface) {
    return this.jwtService.sign(payload);
  }
}
