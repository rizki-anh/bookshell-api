import { nanoid } from 'nanoid';
import { BookRepository, RepositoryException } from '../book.repository.js';
import { BookException } from '../exceptions/book.exception.js';
import { BookExceptionEnum } from '../exceptions/book.exception-enum.js';

export class AddBookHandler {
  exception;
  repository;
  book;

  constructor() {
    this.exception = BookException;
    this.repository = BookRepository;
  }

  createEntity(payload) {
    const now = new Date().toISOString();
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = now;
    const updatedAt = now;

    const newBook = {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      id,
      insertedAt,
      updatedAt,
    };

    this.book = newBook;
  }

  validation() {
    if (!this.book.name) throw new this.exception(BookExceptionEnum.NAME_REQUIRED);
    if (this.book.readPage > this.book.pageCount) throw new this.exception(BookExceptionEnum.READ_PAGE_NOT_ACCEPTABLE);
  }

  static handler(request, server) {
    const instance = new AddBookHandler();

    // deklarasi default response bila berhasil
    let responseCode = 201;
    const responseBody = {
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: null,
    };

    try {
      instance.createEntity(request.payload);
      instance.validation();

      // meniru proses penyimpanan data di database
      instance.repository.save(instance.book.id, instance.book);

      // post save process checker apakah entity berhasil di simpan dengan baik
      const isExist = instance.repository.isExist(instance.book.id);
      if (!isExist) throw new instance.exception(BookExceptionEnum.GENERIC_EXCEPTION);

      // deklarasi response result
      responseBody.data = {
        bookId: instance.book.id,
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
