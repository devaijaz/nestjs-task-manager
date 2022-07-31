import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { trim } from 'src/transformer/trim.transfomer';

export class TaskDto {
  @IsNotEmpty()
  @Transform(trim)
  title: string;
}
