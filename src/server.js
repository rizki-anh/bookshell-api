import Hapi from '@hapi/hapi';
import routes from './routes.js';
import { bookRoutes } from './book/book.routes.js';
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
    debug: { request: ['error'] },
  });

  server.route([...bookRoutes, ...routes]);
  server.log(['test', 'error']);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init();
