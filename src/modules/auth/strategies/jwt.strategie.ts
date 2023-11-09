import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { USER_REPOSITORY } from '../../../core/constants/index';
import { User } from '../../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadInterface } from '../interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface) {
    const { usr_id } = payload;
    const user = await this.userRepository.findOne({
      where: {
        usr_id,
      },
      attributes: {
        exclude: ['usr_password'],
      },
    });
    if (!user) throw new UnauthorizedException('Token invalido');
    if (!user.flag) throw new UnauthorizedException('Usuario inactivo');



    return user;
  }
}
