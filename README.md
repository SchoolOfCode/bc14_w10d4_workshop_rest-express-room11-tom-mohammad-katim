# Connecting Our Library to a Database

## Create a Postgres database with ElephantSQL

Navigate to the [ElephantSQL website](https://www.elephantsql.com/) and create a new Postgres database.

Next, use the ElephantSQL browser tab to:

- Create two tables, books and authors and study the ERD below.
- Populate the tables with the data from the JSON files in the "data" folder.

![Entity Relationship Diagram](/readme-assets/erd.png "Entity Relationship Diagram")

<br>

## Create Environment variables

Create a `.env` file at the root of your project. It should contain the following name/value pairs: (Be sure to insert your actual values in this file!)

```
PORT=
DB_CONNECTION_STRING=
```

Your own `DB_CONNECTION_STRING` will be provided by ElephantSQL.

The API won't have a hardcoded PORT like you've done before in previous weeks.

<br>

## Using dot env

You can load environment variables using the [dotenv](https://www.npmjs.com/package/dotenv) package. It's already been installed for you and should appear in your `package.json` file as a dev dependency.

The following scripts have been added to your `package.json` file: (Notice the `start` script does not use dotenv, so your environment variables will not be loaded - unlike the `dev` script.)

```
"start": "node app.js",
"dev": "nodemon -r dotenv/config app.js"
```

Now, whenever you enter `npm run dev` the `dotenv` package will load your environment variables during runtime, and you'll be able to access them via `process.env`.

<br>

## The .env file and .gitignore

`.env` has been added to your `.gitignore` file. You don't want those sensitive database credentials being pushed up to GitHub!

```
node_modules
.env
```

<br>

### Using the `pg` package:

You can connect to the PostgreSQL database using the [`pg`](<(https://node-postgres.com/).>) package. It's already been added to your `package.json` file as a dependency.

The job of the `db/index.js` file is to export a `Pool` from the `pg` package enabling you to use the `pool.query()` method so you to execute SQL queries in your models.

Always use [parameterized queries](https://node-postgres.com/features/queries) with the `pool.query()` method to help protect against SQL injection attacks - this is important!

<br>

## Existing Routes

The routes are already set up and functioning. Take a look inside the `/routes` folder.

| Method | Path           | Additional Info | Result                                         | Response                                  |
| ------ | -------------- | --------------- | ---------------------------------------------- | ----------------------------------------- |
| GET    | /api/books     |                 | all books                                      | { success: Boolean, payload: Book Array } |
| GET    | /api/books     | ?title=potter   | all books with “potter” in the title           | { success: Boolean, payload: Book Array } |
| GET    | /api/books     | ?author=austen  | all books who have “austen” in the author name | { success: Boolean, payload: Book Array } |
| GET    | /api/books/:id |                 | books with a particular id if it exists        | { success: Boolean, payload: Book }       |
| POST   | /api/books     | { body }        | create a new book                              | { success: Boolean, payload: Book }       |
| PATCH  | /api/books/:id | { body }        | updated book                                   | { success: Boolean, payload: Book }       |
| DELETE | /api/books/:id |                 | book deleted                                   | { success: Boolean, payload: Book }       |

| Method | Path             | Additional Info | Result                                    | Response                                    |
| ------ | ---------------- | --------------- | ----------------------------------------- | ------------------------------------------- |
| GET    | /api/authors     |                 | all authors                               | { success: Boolean, payload: Author Array } |
| GET    | /api/authors     | ?search=austen  | all authors with “austen” in their name   | { success: Boolean, payload: Author Array } |
| GET    | /api/authors/:id |                 | authors with a particular id if it exists | { success: Boolean, payload: Author }       |
| POST   | /api/authors     | { body }        | create a new author                       | { success: Boolean, payload: Author }       |
| PATCH  | /api/authors/:id | { body }        | updated author                            | { success: Boolean, payload: Author }       |
| DELETE | /api/authors/:id |                 | author deleted                            | { success: Boolean, payload: Author }       |

<br>

## Code the model functions

Previously you've been using the filesystem to read and write data to JSON files.

Now you're going to use an SQL database, so there's no need to use the `fs` module anymore.

Complete the code for each function inside `models/books.js` and `models/authors.js`.

Write your queries using the `pool.query()` method using the `pool` imported at the top of each file.

The routes are already setup, so once you think you've completed each model, test the API with Postman/Thunder Client.

Remember, go step by step, make a plan and break each problem down!

<br>

## Bonus Tasks

Feel free to tackle these bonus tasks in any order!

- Implement the correct response status codes in your controllers.
- Research and implement API versioning in your Express API.
- Research and implement validation and sanitization for the information recieved in the requests. (User input)
- Research error handling and how to implement this in an Express API.
- Build out your front end. The front-end code lives in the public folder. You can interact with your API using `fetch`.
