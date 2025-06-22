import { BookRepository, RepositoryException } from '../book.repository.js';
import { BookException } from '../exceptions/book.exception.js';
import { BookExceptionEnum } from '../exceptions/book.exception-enum.js';

export class GetBookHandler {
  exception;
  repository;
  params;

  constructor() {
    this.exception = BookException;
    this.repository = BookRepository;
  }

  validation() {
    if (!isNaN(Number(this.params.bookId))) throw new this.exception(BookExceptionEnum.ID_NOT_FOUND);
    if (typeof this.params.bookId !== 'string') throw new this.exception(BookExceptionEnum.ID_NOT_FOUND);
  }

  static handler(request, server) {
    const instance = new GetBookHandler();
    instance.params = request.params;

    let responseCode = 200;
    const responseBody = {
      status: 'success',
      message: null,
      data: null,
    };

    try {
      const book = instance.repository.findById(instance.params.bookId);
      if (!book) throw new instance.exception(BookExceptionEnum.ID_NOT_FOUND);

      responseBody.data = {
        book,
      };
    } catch (error) {
      responseBody.status = 'fail';

      if (error instanceof BookException || error instanceof RepositoryException) {
        responseBody.message = error.message;
        responseCode = error.code;

        request.log('error', error.toLOG());
      } else {
        responseBody.message = error.message;
        responseCode = 500;

        request.log('error', JSON.stringify(error));
      }
    }

    // response
    return server.response(responseBody).code(responseCode);
  }
}
