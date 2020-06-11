import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';


@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskById(id: string): Task {        
        return this.tasks.find(task => task.id === id);
    } 

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);      
    }

    patchTaskStatus(id: string, status: TaskStatus): Task {
        const taskToBePatched = this.getTaskById(id);     
        taskToBePatched.status = status;
        return taskToBePatched;
    }

    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;
        const newTask: Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(newTask);
        return newTask;
    }
}
