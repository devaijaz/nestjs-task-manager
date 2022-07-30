import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Request, Response } from 'express';
import { JwtPayload } from '../types';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.entity';
import { GetUser } from 'src/decorators/get-user';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.createUser(signupDto);
  }

  @Post('/signin')
  async signIn(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { email, fullname } = await this.authService.authenticate(loginDto);

    const at_payload: JwtPayload = { email };
    const rt_payload: JwtPayload = { email, fullname };
    const access_token = this.jwtService.sign(at_payload, {});
    response.setHeader('access_token', access_token);
    if (true || request.xhr) {
      const refresh_token = this.jwtService.sign(rt_payload, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '30d',
        algorithm: 'HS512',
      });
      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30),
      });
    }
    response.status(200).send();
  }

  @UseGuards(AuthGuard())
  @Get('/me')
  profile(@GetUser() user: User) {
    return new User({ ...user });
  }
}
