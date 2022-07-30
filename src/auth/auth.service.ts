import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignupSuccessDTO } from './dto/signup-success-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(signupDto: SignupDto) {
    try {
      const { email, fullname, password } = signupDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.userRepository.create({
        email,
        fullname,
        password: hashedPassword,
      });
      const userCreated = await this.userRepository.save(user);
      return SignupSuccessDTO.convert(userCreated);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async authenticate({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      throw new BadRequestException('Invalid username/password');
    }
    return {
      message: 'Login Success',
    };
  }
}
