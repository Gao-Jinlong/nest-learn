import { MyMiddlewareMiddleware } from './myMiddleware.middleware';

describe('MiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new MyMiddlewareMiddleware()).toBeDefined();
  });
});
