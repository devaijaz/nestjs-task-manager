import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { trim } from 'src/transformer/trim.transfomer';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  @Transform(trim)
  fullname: string;
}
