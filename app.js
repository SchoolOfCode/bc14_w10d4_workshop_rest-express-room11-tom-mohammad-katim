import express from "express";
import morgan from "morgan";

import { bookRoutes } from "./routes/books.js";
import { authorRoutes } from "./routes/authors.js";

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
