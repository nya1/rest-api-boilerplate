import { plainToClass } from 'class-transformer';
import { TodoNewRequest } from '@src/entities/todo';

/**
 * Todo model
 */
export class Todo {
  public content!: string;
  public id!: string;
  public createdBy!: string;
  public createdAt!: Date;
  public completed!: boolean;

  /**
   * factory class, will set default data
   */
  public static create(newRequest: TodoNewRequest) {
    const todoClass = plainToClass(Todo, newRequest);
    todoClass.createdAt = new Date();
    todoClass.completed = false;
    return todoClass;
  }
}
