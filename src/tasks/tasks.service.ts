import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/auth.entity';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private taskRepository: Repository<Tasks>,
  ) {}
  async getAllTasks(user: User) {
    const tasks = await this.taskRepository
      .createQueryBuilder('tasks')
      .where({ user })
      .getMany();
    //const tasks = await this.taskRepository.find({ where: { user } });
    return tasks;
  }

  createTask(taskDto: TaskDto, user: User): Promise<Tasks> {
    const task = this.taskRepository.create({
      title: taskDto.title,
      done: false,
      user,
    });
    return this.taskRepository.save(task);
  }
}
