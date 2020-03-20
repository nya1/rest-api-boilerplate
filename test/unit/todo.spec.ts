import { TodoService } from '@src/services/todo';
import { container } from './setup';

describe('Todo', () => {
  let todoService: TodoService;
  beforeAll(() => {
    todoService = container.get(TodoService);
  });

  it('should not find empty id', () => {
    expect.assertions(1);

    const res = todoService.getById('');
    expect(res).toBeUndefined();
  });
});
