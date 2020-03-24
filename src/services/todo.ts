import { inject, named, injectable } from 'inversify';
import { AppLogger } from '@src/util/logger';
import { BadRequestError } from 'routing-controllers';
import { Todo } from '@src/models/todo';
import { TodoNewRequest } from '@src/entities/todo';

/**
 * service class for Todo operations
 */
@injectable()
export class TodoService {
  // sample storage
  private todoStorage: Todo[] = [];

  constructor(@inject(AppLogger) @named('TodoService') private logger: AppLogger) {}

  /**
   * add one todo to sample storage
   */
  public add(todoToAdd: TodoNewRequest) {
    this.logger.debug(`got a new todo to add`, { todo: todoToAdd });
    // check if same todo id exists
    const id = todoToAdd.id;
    const todoFound = this.getById(id);
    if (todoFound) {
      throw new BadRequestError(`duplicate todo id found ${id}`);
    }

    // create todo class from request
    const newTodo = Todo.create(todoToAdd);

    // add to sample db
    this.todoStorage.push(newTodo);

    return todoToAdd;
  }

  /**
   * get one todo by id
   */
  public getById(id: string): Todo | undefined {
    this.logger.debug(`looking up ${id} todo`);
    const todoRes = this.todoStorage.find((thisTodo) => thisTodo.id === id);
    this.logger.debug('found todo', { todo: todoRes });
    return todoRes;
  }

  /**
   * return all todo
   */
  public listAll(): Todo[] {
    return this.todoStorage;
  }
}
