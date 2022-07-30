import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(signupDto: SignupDto) {
    const { email, fullname, password } = signupDto;
    const user = this.userRepository.create({
      email,
      fullname,
      password,
    });
    return await this.userRepository.save(user);
  }

  async authenticate(loginDto: LoginDto) {
    const found = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!found) {
      throw new BadRequestException('Invalid username/password');
    }
    return found;
  }
}
