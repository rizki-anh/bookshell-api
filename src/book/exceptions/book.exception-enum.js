export const BookExceptionEnum = {
  NAME_REQUIRED: {
    code: 400,
    message: 'Nama buku harus diisi',
  },
  READ_PAGE_NOT_ACCEPTABLE: {
    code: 400,
    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
  },
  GENERIC_EXCEPTION: {
    code: 500,
    message: 'Buku gagal ditambahkan',
  },
  ID_NOT_FOUND: {
    code: 404,
    message: 'Buku tidak di temukan dengan id yang dimasukkan',
  },
};
