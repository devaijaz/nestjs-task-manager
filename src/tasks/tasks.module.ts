import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Tasks]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
