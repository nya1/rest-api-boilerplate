import { plainToClass } from 'class-transformer';
import { TodoNewRequest } from '@src/entities/todo';
import { IsString } from 'class-validator';

/**
 * Todo model
 */
export class Todo {
  @IsString()
  public content!: string;

  @IsString()
  public id!: string;

  @IsString()
  public createdBy!: string;

  public createdAt!: Date;
  public completed!: boolean;

  /**
   * factory function, will create new instance with default data
   */
  public static create(newRequest: TodoNewRequest) {
    const todoClass = plainToClass(Todo, newRequest);
    todoClass.createdAt = new Date();
    todoClass.completed = false;
    return todoClass;
  }
}
