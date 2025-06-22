export class BookException extends Error {
  code;
  message;

  constructor(opts) {
    super(opts.message);
    opts.message = `[BookException] ${opts.message.trim()}`;

    this.message = opts.message;
    this.code = opts.code;
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
