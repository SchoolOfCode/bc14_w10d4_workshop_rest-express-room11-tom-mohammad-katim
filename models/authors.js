import { pool } from "../db/index.js";

export async function getAuthors() {
  // Query the database and return all authors
  const { rows } = await pool.query("SELECT * FROM authors");
  console.table(rows);
  return rows;
}

export async function searchAuthorsByName(searchTerm) {
  // Query the database and return all authors that have a name matching the searchTerm
  const { rows } = await pool.query(
    "SELECT * FROM authors WHERE first_name || last_name ILIKE $1",
    [`%${searchTerm}%`]
  );
  return rows;
}

export async function getAuthorById(id) {
  // Query the database and return the book with a matching id
  const { rows } = await pool.query("SELECT * FROM authors WHERE id=$1", [id]);
  if (rows.length > 0) {
    console.log(`Matching row found for ID: ${id}`);
    return rows[0];
  } else {
    console.log(`No matching rows`);
    return null;
  }
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author
  const { name, bio } = author;
  const { rows } = await pool.query(
    "INSERT INTO authors (name, bio) VALUES ($1, $2) RETURNING *",
    [name, bio]
  );
  return rows[0];
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author
  const { name, bio } = updates;
  const { rows } = await pool.query(
    "UPDATE authors SET name=$1, bio=$2 WHERE id=$3 RETURNING *",
    [name, bio, id]
  );
  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author
  const { rows } = await pool.query(
    "DELETE FROM authors WHERE id=$1 RETURNING *",
    [id]
  );
  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
}
