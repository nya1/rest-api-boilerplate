import { app } from '@src/app'; // load app
import request from 'supertest';

describe('Todo', () => {
  const todoExample = {
    id: 'test',
    content: 'content test',
  };

  it('get one should fail with 404 not found', async () => {
    expect.assertions(1);

    const res = await request(app).get('/todo/' + todoExample.id);
    expect(res.status).toEqual(404);
  });

  it('get all should return empty array', async () => {
    expect.assertions(3);

    const res = await request(app).get('/todo/');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('count', 0);
    expect(res.body.result).toHaveLength(0);
  });

  it('create todo', async () => {
    expect.assertions(2);

    const res = await request(app)
      .post('/todo')
      .send(todoExample);

    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject(todoExample);
  });

  it('get one should return todo created before', async () => {
    expect.assertions(2);

    const res = await request(app).get('/todo/' + todoExample.id);

    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject(todoExample);
  });

  it('creation of todo with same id should fail with 400 bad error', async () => {
    expect.assertions(1);

    const res = await request(app)
      .post('/todo')
      .send(todoExample);

    expect(res.status).toEqual(400);
  });

  it('get all should return array with length of 1', async () => {
    expect.assertions(3);

    const res = await request(app).get('/todo/');
    expect(res.body).toHaveProperty('count', 1);
    expect(res.body.result).toHaveLength(1);

    expect(res.body.result[0]).toMatchObject(todoExample);
  });
});
