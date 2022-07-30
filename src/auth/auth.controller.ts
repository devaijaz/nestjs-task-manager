import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.createUser(signupDto);
  }

  @Post('/signin')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.authenticate(loginDto);
  }

  @UseGuards(AuthGuard())
  @Get('/me')
  profile(@Req() req) {
    return req.user;
  }
}
