# Connecting Our Library to a Database

## Environment variables

Environment variables are an essential part of building Node.js apps. You use them wherever you need to configure your app.

Without environment variables, getting your app to run in different environments (e.g. your local machine vs on a cloud platform) would be a difficult challenge. Not having to keep changing the code or configuration every time your app runs in a different environment is a significant advantage.

In this workshop, we'll use environment variables to:

- Tell express which port to listen on - Port 3000 may be ok for your machine, but what if it's already in use on your partner's machine? What if when you deploy to a cloud platform, it's required to listen on a different port?
- To hold our database connection details - The database configuration may need to change based on the environment. Also, we would not want to push these sensitive values to a Github repo, so hard coding them in our app wouldn't make sense and should be avoided!

As you'll see below, environment variables are key-value pairs and are usually stored in a .env file. Take the time to read more about them on the [nodejs.dev](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs) website and [this article](https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/).

Don't forget to add your .env file to your .gitignore so that it won't be committed up to GitHub.

## Creating an .env File

Create an .env file in the root directory with the following values:

```
PORT=3000
```

## Installing dotenv

Next you'll need to install the dotenv package using npm. Look at the docs for dotenv [here](https://www.npmjs.com/package/dotenv) before you install it as a dev dependency.

```
npm install dotenv --save-dev
```

## Using dot env

Adjust your dev script in `package.json` to look like the following:

```
  "dev": "nodemon -r dotenv/config ./bin/www.js"
```

Now, whenever you enter `npm run dev` the dotenv package will load your environment variables during runtime and you'll be able to access them via the `process.env` property.

## Add the .env file to your .gitignore file

We don't want to commit our .env file so you should add it to your .gitignore file:

```
node_modules
.env
```

## Books

At the moment, the data for our library lives in the `libs/data.js` file.

## Models

You already have a `models` folder with functions that retrieve and manage book data in the `models/books.js` file.

These functions are used in your routes.

## Routes

All the books routes have been completed for you and live in the `routes/books.js` file.

Look through the models and routes and familiarize yourself with how the server is working at the moment.

## Our Database

Your job is to refactor the code so that instead of interacting with data from the `libs/data.js` file, the app will interact with a postgreSQL database hosted on Heroku instead.

You'll need to:

- Connect to the database
- Create a new table
- Populate it with the data from our `libs/data.js` file
- Change the functions in `models/books.js`so that they interact with the database instead.

Our routes shouldn't need to be changed - the functions should return the same responses as they did before.

Remember to plan and break down each step until you can't break it down any further, and tackle it bit by bit!

### Using the `pg` package:

We can connect to a postgres database using the `pg` package. Go ahead and install it now:

```
npm install pg
```

Make sure to to read through the node-postgres [docs](https://node-postgres.com/) with your pair to get your bearings before continuing.

### Pool vs Client

Our app will be making frequent queries to the database, so we'll want to use a connection pool.
A Pool is a collection of multiple clients. You can read more about pooling [here](https://node-postgres.com/features/pooling).

If we were writing a script with only a single transaction or sequential transactions on the same connection, a single client would be suitable choice.

### Set up your database config

Add your database configuration to the .env file:

```
PGHOST=
PGUSER=
PGDATABASE=
PGPASSWORD=
PGPORT=
```

### Suggested Project Structure

- Create a `db` folder in the root directory.
- Create an `db/index.js` file. The job of this file is to connect to our database, and export a `query` function which allow us to communicate with it.
- Don't forget to add `ssl: { rejectUnauthorized: false }` to your pool configuration. Here's a reminder for [why](https://node-postgres.com/announcements#2020-02-25) from the docs and an [article](https://levelup.gitconnected.com/how-to-resolve-certificate-errors-in-nodejs-app-involving-ssl-calls-781ce48daded) with more info. We're choosing to use this method for now in our development environment to be able to quickly connect to our Heroku databases, but there are other options you'll encounter in production environments in the future.
- Create a `scripts` folder with files which will run one-off scripts for creating a table and populating it with our initial books data
- Create npm scripts in your package.json which will run these files
- Use the query method on the pool exported in `db/index.js` in your models to query the database instead of interacting with `libs/data.js`.

Your `db/index.js` file should look like this:

```js
import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false },
});

```

See the suggested project structure in the [docs page](https://node-postgres.com/guides/async-express) for more details.

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

## Bonus

Now create a dedicated route for authors following the same pattern we have for books. The table below outlines the desired functionality.

You'll need to create models, routes, and another table in the database (with appropriate scripts) for the authors data!

| Method | Path                 | Additional Info | Result                                    | Response                                    |
| ------ | -------------------- | --------------- | ----------------------------------------- | ------------------------------------------- |
| GET    | /authors             |                 | all authors                               | { success: Boolean, payload: Author Array } |
| GET    | /authors             | ?search=austen  | all authors with “austen” in their name   | { success: Boolean, payload: Author Array } |
| GET    | /authors/<author_id> |                 | authors with a particular id if it exists | { success: Boolean, payload: Author }       |
| POST   | /authors             | { body }        | create a new author                       | { success: Boolean, payload: Author }       |
| PUT    | /authors/<author_id> | { body }        | updated author                            | { success: Boolean, payload: Author }       |
| DELETE | /authors/<author_id> |                 | author deleted                            | { success: Boolean, payload: Author }       |

#### Bonus bonus:

| Method | Path                 | Additional Info | Result         |
| ------ | -------------------- | --------------- | -------------- |
| PATCH  | /authors/<author_id> | { body }        | updated author |
