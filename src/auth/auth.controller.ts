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

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
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
    if (request.xhr) {
      const refresh_token = this.jwtService.sign(rt_payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: 3600 * 24 * 7,
        algorithm: 'HS512',
      });
      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 1000 * 3600 * 24 * 7,
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
