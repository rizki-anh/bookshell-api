import { getallbooks, editbookbyidhandler, deletebookbyhandler } from './handler.js';

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getallbooks,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editbookbyidhandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deletebookbyhandler,
  },
];

export default routes;
