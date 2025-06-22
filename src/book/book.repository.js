/**
 *  Singleton Repository
 */
export class RepositoryException extends Error {
  code;
  message;

  constructor(code, message) {
    super(message);
    message = `[RepositoryException] ${message.trim()}`;

    this.message = message;
    this.code = code;
    this.stack = this.stack?.split('\n    ')[1] ?? null;
  }

  toLOG() {
    return JSON.stringify({
      code: this.code,
      message: this.message,
      stack: this.stack,
    });
  }
}

export class BookRepository {
  static _instance;
  repo;

  constructor() {
    this.repo = new Map(); // JS Map
  }

  static getInstance() {
    return BookRepository._instance ? BookRepository._instance : (BookRepository._instance = new BookRepository());
  }

  static save(key, payload) {
    const instance = BookRepository.getInstance();
    instance.repo.set(key, payload);
  }

  static isExist(key) {
    const instance = BookRepository.getInstance();
    return instance.repo.has(key);
  }

  static findById(key) {
    const instance = BookRepository.getInstance();
    if (!instance.repo.has(key)) throw new RepositoryException(404, `Cannot find book entity by id: ${key}`);
    return instance.repo.get(key);
  }

  static remove(key) {
    const instance = BookRepository.getInstance();
    if (!instance.repo.has(key)) throw new RepositoryException(404, `Cannot find book entity by id: ${key}`);
    return instance.repo.delete(key);
  }
}
