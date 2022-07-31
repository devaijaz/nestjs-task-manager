import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.entity';
import { GetUser } from 'src/decorators/get-user';
import { TaskDto } from './dto/task.dto';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(@GetUser() user: User) {
    return this.taskService.getAllTasks(user);
  }

  @Post()
  async createTask(@Body() taskDto: TaskDto, @GetUser() user: User) {
    const task = await this.taskService.createTask(taskDto, user);
    return new Tasks(task);
  }
}
