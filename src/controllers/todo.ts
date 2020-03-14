import { JsonController, Get, Param, NotFoundError, Post, Body } from 'routing-controllers';
import { injectable, inject, named } from 'inversify';
import { AppLogger } from '@src/util/logger';
import { Todo, TodoService } from '@src/services/todo';

/**
 * todo example controller
 * it mantains a variable as a database
 */
@JsonController('/todo')
@injectable()
export class TodoController {
  constructor(
    @inject(AppLogger) @named('TodoController') private logger: AppLogger,
    @inject(TodoService) private service: TodoService,
  ) {}

  /**
   * Get one todo by id
   * @param id todo ID
   */
  @Get('/:id')
  getOne(@Param('id') id: string) {
    // search todo by id
    const foundTodo = this.service.getById(id);
    // check if todo was found
    if (!foundTodo) {
      throw new NotFoundError('todo provided not found');
    }
    // at this point todo is found
    return foundTodo;
  }

  /**
   * Allow to create one todo
   * body is automatically validated thanks to @Body decorator and
   * the Todo class
   * @param todoToAdd todo json body
   */
  @Post('/')
  post(@Body({ required: true }) todoToAdd: Todo) {
    return this.service.add(todoToAdd);
  }
}