import {SPARoute} from '@micra/spa-router';

export const FallbackRoute = new SPARoute({
  id: 'NOT FOUND',
  path: '(.*)',
  handler: async () => new Response(JSON.stringify({})),
  view: () => null,
});
