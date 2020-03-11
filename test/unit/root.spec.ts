import { container } from '../main';
import { RootController } from '@src/controllers/root';

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
