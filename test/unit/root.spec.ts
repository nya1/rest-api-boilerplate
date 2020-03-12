import { RootController } from '@src/controllers/root';
import { container } from '../main';

describe('RootController', () => {
  let rootController: RootController;
  beforeAll(() => {
    rootController = container.get<RootController>(RootController);
  });

  it('ping', () => {
    const pingRes = rootController.ping();
    expect(pingRes).toHaveProperty('success', true);
  });
});
