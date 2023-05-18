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
    "SELECT * FROM authors WHERE first_name || ' ' || last_name ILIKE $1",
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
  const { first_name, last_name } = author;
  const { rows } = await pool.query(
    "INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING *",
    [first_name, last_name]
  );
  return rows[0];
}
export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author
  const { first_name, last_name } = updates;
  const { rows } = await pool.query(
    "UPDATE authors SET first_name=$1, last_name=$2 WHERE id=$3 RETURNING *",
    [first_name, last_name, id]
  );
  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
}
rr