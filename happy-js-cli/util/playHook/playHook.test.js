import { jest } from '@jest/globals';
import playHook from './playHook.js';

describe('playHook', () => {
  it('should call hook functions of all generators', async () => {
    const hook = 'hookFunction';
    const data = { someData: 'someValue' };
    const hookFunctionA = jest.fn();
    const hookFunctionB = jest.fn();
    const generators = [{ [hook]: hookFunctionA }, { [hook]: hookFunctionB }];

    await playHook({ generators, hook, data });

    expect(hookFunctionA).toHaveBeenCalledWith(data);
    expect(hookFunctionB).toHaveBeenCalledWith(data);
  });

  it("should skip generators that don't have the hook function", async () => {
    const hook = 'hookFunction';
    const data = { someData: 'someValue' };
    const hookFunctionA = jest.fn();
    const generators = [{ [hook]: hookFunctionA }, {}];

    await playHook({ generators, hook, data });

    expect(hookFunctionA).toHaveBeenCalledWith(data);
  });
});
