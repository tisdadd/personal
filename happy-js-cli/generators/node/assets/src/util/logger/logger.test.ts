import { describe, expect, it } from '@jest/globals';
import logger from './logger';

describe('logger', () => {
  it('Should contain a callable log, warn, error, and info function', () => {
    expect(() => { logger.log('Test'); }).not.toThrow();
    expect(() => { logger.warn('Test'); }).not.toThrow();
    expect(() => { logger.error('Test'); }).not.toThrow();
    expect(() => { logger.info('Test'); }).not.toThrow();
  });
});
