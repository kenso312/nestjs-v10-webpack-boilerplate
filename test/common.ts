import type { InjectOptions } from 'fastify';

/**
 * Wrapper function for showing request URL and method in the description
 */
export const des = (
  config: InjectOptions,
  action: (config: InjectOptions) => Promise<void> | void
) => {
  describe(`${config.url}  (${config.method || 'GET'})`, () => {
    action(config);
  });
};
