import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  singUp(@Body() createUser: CreateUserDto) {
    return this.authService.signUp(createUser);
  }

  @Post('sign-in')
  signIn(@Body() loginUser: LoginUserDto) {
    return this.authService.signIn(loginUser);
  }
}
