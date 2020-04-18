import {
  JsonController,
  Get,
  Param,
  NotFoundError,
  Post,
  Body,
  Authorized,
} from 'routing-controllers';
import { injectable, inject, named } from 'inversify';
import { AppLogger } from '@src/util/logger';
import { TodoService } from '@src/services/todo';
import { TodoNewRequest } from '@src/requests/todo';
import { ResponseSchema } from 'routing-controllers-openapi';
import { Todo } from '@src/models/todo';

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
  @ResponseSchema(Todo, { statusCode: 200 })
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
   * List all todo
   */
  @Get('/')
  getAll() {
    const todoList = this.service.listAll();
    return {
      result: todoList,
      count: todoList.length,
    };
  }

  /**
   * Allow to create one todo
   * body is automatically validated thanks to @Body decorator and
   * the Todo class
   * requires authentication
   * @param todoToAdd todo json body
   */
  @Post('/')
  @Authorized()
  post(@Body({ required: true }) todoToAdd: TodoNewRequest) {
    return this.service.add(todoToAdd);
  }
}
