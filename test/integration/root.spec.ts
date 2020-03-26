import { request } from './setup';

describe('Root', () => {
  /**
   * make request to /ping and check the response
   */
  it('ping', async () => {
    expect.assertions(2);

    const res = await request.get('/ping');

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });
});
