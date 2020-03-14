import { RootController } from '@src/controllers/root';
import { container } from '../main';

describe('RootController', () => {
  let rootController: RootController;
  beforeAll(() => {
    rootController = container.get(RootController);
  });

  it('ping', () => {
    expect.assertions(1);

    const pingRes = rootController.ping();
    expect(pingRes).toHaveProperty('success', true);
  });
});
