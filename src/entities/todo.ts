import { IsString, Length } from 'class-validator';
import { Todo } from '@src/models/todo';
/**
 * New todo to add (expected request)
 * note: you can also use a generic `Partial<Todo>`, omit in this case is future-proof and type safe
 */
export class TodoNewRequest implements Omit<Todo, 'createdAt' | 'completed' | 'createdBy'> {
  @IsString()
  @Length(1, 1024)
  readonly content!: string;

  @IsString()
  @Length(1, 50)
  readonly id!: string;
}
