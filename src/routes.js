import {addBookHandler, getallbooks, getbookbyhandler, editbookbyidhandler, deletebookbyhandler} from "./handler.js"

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getallbooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getbookbyhandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editbookbyidhandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deletebookbyhandler,
  },
];

export default routes;
