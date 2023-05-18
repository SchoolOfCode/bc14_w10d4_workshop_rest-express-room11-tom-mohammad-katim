# Connecting Our Library to a Database

## Existing Routes

| Method | Path             | Additional Info | Result                                         | Response                                  |
| ------ | ---------------- | --------------- | ---------------------------------------------- | ----------------------------------------- |
| GET    | /books           |                 | all books                                      | { success: Boolean, payload: Book Array } |
| GET    | /books           | ?search=potter  | all books with “potter” in the title           | { success: Boolean, payload: Book Array } |
| GET    | /books           | ?author=austen  | all books who have “austen” in the author name | { success: Boolean, payload: Book Array } |
| GET    | /books/<book_id> |                 | books with a particular id if it exists        | { success: Boolean, payload: Book }       |
| POST   | /books           | { body }        | create a new book                              | { success: Boolean, payload: Book }       |
| PUT    | /books/<book_id> | { body }        | updated book                                   | { success: Boolean, payload: Book }       |
| DELETE | /books/<book_id> |                 | book deleted                                   | { success: Boolean, payload: Book }       |

## Before you code:

Take time to thoroughly go through and explore the [node-postgres docs](https://node-postgres.com/) with your pair.

## Our Books

The data for our library is in the `libs/data.js` file. We want to serve this information in a RESTful API in this project. You already have a `models` folder with functions which retrieve and manage book data in the file `models/books.js`.

These functions are used in your books routes.

## Our Routes

Our routes live in the routes folder. All the books routes have been completed for you and are in `routes/books.js`.

## Our Database

We want you to refactor your code so that instead of interacting with data from the file, and manipulating in memory, we are interacting with a database. You will need to connect to a database, create a new table, populate it with the data from our file, and then change the functions so that they interact with the database instead. Our routes shouldn't need to be changed - the functions should hand back the same things as they did before.

Remember, read through and thoroughly interrogate the [node-postgres docs](https://node-postgres.com/)! Remember the [suggested project structure](https://node-postgres.com/guides/project-structure)

Pattern to follow:

- create a `db` folder
- create an `index.js` file which connects to our database, and exports functions which allow us to communicate with it

  - First we need to make sure we have a [local instance of a postgres database](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) running
  - Next we want to connect to it, referencing the docs over at node-postgres

- create a `scripts` folder with files which run our one-off scripts like creating a table and populating it initially with data
- create npm scripts in your package.json which run these files
- use the functions from `db/index.js` in our models functions to query our database instead of interacting with `libs/data.js`

## Bonus

Now create a dedicated route for authors following the same pattern we have for books. The table below outlines the desired functionality.

| Method | Path                 | Additional Info | Result                                    | Response                                    |
| ------ | -------------------- | --------------- | ----------------------------------------- | ------------------------------------------- |
| GET    | /authors             |                 | all authors                               | { success: Boolean, payload: Author Array } |
| GET    | /authors             | ?search=austen  | all authors with “austen” in their name   | { success: Boolean, payload: Author Array } |
| GET    | /authors/<author_id> |                 | authors with a particular id if it exists | { success: Boolean, payload: Author }       |
| POST   | /authors             | { body }        | create a new author                       | { success: Boolean, payload: Author }       |
| PUT    | /authors/<author_id> | { body }        | updated author                            | { success: Boolean, payload: Author }       |
| DELETE | /authors/<author_id> |                 | author deleted                            | { success: Boolean, payload: Author }       |

Bonus bonus:

| Method | Path                 | Additional Info | Result         |
| ------ | -------------------- | --------------- | -------------- |
| PATCH  | /authors/<author_id> | { body }        | updated author |
