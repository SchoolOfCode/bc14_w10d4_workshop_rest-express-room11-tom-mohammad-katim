import { pool } from "../db/index.js";

export async function getBooks() {
  // Query the database and return all books
  return [];
}

export async function searchBooksByTitle(searchTerm) {
  // Query the database and return all books that have a matching title matching the searchTerm
  return [];
}

export async function searchBooksByAuthor(searchTerm) {
  // Query the database and return all books that have an author name matching the searchTerm
  return [];
}

export async function getBookById(id) {
  // Query the database and return the book with a matching id
  return {};
}

export async function createBook(book) {
  // Query the database to create a book and return the newly created book
  return {};
}

export async function updateBookById(id, updates) {
  // Query the database to update a book and return the newly updated book
  return {};
}

export async function deleteBookById(id) {
  // Query the database to delete a book and return the deleted book
  return {};
}
