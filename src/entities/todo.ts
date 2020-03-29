import { Length, IsString } from 'class-validator';
import { Todo } from '@src/models/todo';
/**
 * New todo to add (expected request)
 * note: you can also use a generic `Partial<Todo>`
 */
export class TodoNewRequest implements Pick<Todo, 'content' | 'id'> {
  @Length(1, 1024)
  @IsString()
  readonly content!: string;

  @Length(1, 50)
  @IsString()
  readonly id!: string;
}
