import { pool } from "../db/index.js";

export async function getAuthors() {
  // Query the database and return all authors
  const response = await pool.query("SELECT * FROM authors;");
  return response.rows;
}

export async function searchAuthorsByName(searchTerm) {
  // Query the database and return all authors that have a name matching the searchTerm
  const response = await pool.query(
    "SELECT * FROM authors WHERE authors.first_name || ' ' || authors.last_name ILIKE $1;",
    [`%${searchTerm}%`]
  );
  return response.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the book with a matching id
  const response = await pool.query(
    "SELECT * FROM authors WHERE authors.id = $1;",
    [id]
  );
  return response.rows[0];
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author
  const response = await pool.query(
    "INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING *;",
    [author.firstName, author.lastName]
  );
  return response.rows[0];
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author
  const response = await pool.query(
    "UPDATE authors SET (first_name, last_name) = (COALESCE($1, first_name), COALESCE($2, last_name)) WHERE authors.id = $3 RETURNING *;",
    [updates.firstName, updates.lastName, id]
  );
  return response.rows[0];
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author
  const response = await pool.query(
    "DELETE FROM authors WHERE authors.id = $1 RETURNING *;",
    [id]
  );
  return response.rows[0];
}
