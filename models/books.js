import { pool } from "../db/index.js";

export async function getBooks() {
  // Query the database and return all books
  const response = await pool.query("SELECT * FROM books;");
  return response.rows;
}

export async function searchBooksByTitle(searchTerm) {
  // Query the database and return all books that have a matching title matching the searchTerm
  const response = await pool.query(
    "SELECT * FROM books WHERE books.title ILIKE $1;",
    [`%${searchTerm}%`]
  );
  return response.rows;
}

export async function searchBooksByAuthor(searchTerm) {
  // Query the database and return all books that have an author name matching the searchTerm
  const response = await pool.query(
    "SELECT books.* FROM books INNER JOIN authors ON books.author_id = authors.id WHERE authors.first_name || ' ' || authors.last_name ILIKE $1;",
    [`%${searchTerm}%`]
  );
  return response.rows;
}

export async function getBookById(id) {
  // Query the database and return the book with a matching id
  const response = await pool.query(
    "SELECT * FROM books WHERE books.id = $1;",
    [id]
  );
  return response.rows[0];
}

export async function createBook(book) {
  // Query the database to create a book and return the newly created book
  const response = await pool.query(
    "INSERT INTO books (author_id, title, published_date) VALUES ($1, $2, $3) RETURNING *;",
    [book.authorId, book.title, book.publishedDate]
  );
  return response.rows[0];
}

export async function updateBookById(id, updates) {
  // Query the database to update a book and return the newly updated book
  const response = await pool.query(
    "UPDATE books SET (author_id, title, published_date) = (COALESCE($1, author_id), COALESCE($2, title), COALESCE($3, published_date)) WHERE books.id = $4 RETURNING *;",
    [updates.authorId, updates.title, updates.publishedDate, id]
  );
  return response.rows[0];
}

export async function deleteBookById(id) {
  // Query the database to delete a book and return the deleted book
  const response = await pool.query(
    "DELETE FROM books WHERE books.id = $1 RETURNING *",
    [id]
  );
  return response.rows[0];
}
