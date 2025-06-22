import { AddBookHandler } from './handler/add-book.handler.js';
import { GetBookHandler } from './handler/get-book.handler.js';

export const bookRoutes = [
  {
    method: 'POST',
    path: '/books',
    handler: AddBookHandler.handler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: GetBookHandler.handler,
    options: {
      log: {
        collect: true,
      },
    },
  },
];
