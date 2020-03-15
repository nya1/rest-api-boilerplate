import { TodoController } from '@src/controllers/todo';
import { NotFoundError, BadRequestError } from 'routing-controllers';
import { container } from '../main';

describe('TodoController', () => {
  let todoController: TodoController;
  beforeAll(() => {
    todoController = container.get(TodoController);
  });

  const todoExample = {
    id: 'test',
    content: 'content test',
  };

  it('get one should fail with 404 not found', () => {
    expect.assertions(1);

    expect(() => todoController.getOne(todoExample.id)).toThrowError(NotFoundError);
  });

  it('get one should fail with 404 not found', () => {
    expect.assertions(1);

    expect(() => todoController.getOne('')).toThrowError(NotFoundError);
  });

  it('get all should return empty array', () => {
    expect.assertions(3);

    const res = todoController.getAll();
    expect(res).toHaveProperty('result');
    expect(res.result).toHaveLength(0);
    expect(res.count).toEqual(0);
  });

  it('create one todo', () => {
    expect.assertions(1);

    const todoExampleCopy: any = Object.assign({}, todoExample);
    const res = todoController.post(todoExampleCopy); // clone object
    expect(res).toMatchObject(todoExample);
  });

  it('get one should return todo created before', () => {
    expect.assertions(1);

    const todoRes = todoController.getOne(todoExample.id);

    expect(todoRes).toMatchObject(todoExample);
  });

  it('creation of todo with same id should fail with 400 bad error', () => {
    expect.assertions(1);

    const todoExampleCopy: any = Object.assign({}, todoExample);
    expect(() => todoController.post(todoExampleCopy)).toThrowError(BadRequestError);
  });

  it('get all should return array with length of 1', () => {
    expect.assertions(3);

    const res = todoController.getAll();
    expect(res.result).toHaveLength(1);
    expect(res.count).toEqual(1);

    expect(res.result[0]).toMatchObject(todoExample);
  });
});
