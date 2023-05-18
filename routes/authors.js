import express from "express";

import * as authorController from "../controllers/authors.js";

export const authorRoutes = express.Router();

authorRoutes.get("/", authorController.searchAuthorsByName);

authorRoutes.get("/", authorController.getAuthors);

authorRoutes.get("/:id", authorController.getAuthorById);

authorRoutes.post("/", authorController.createAuthor);

authorRoutes.patch("/:id", authorController.updateAuthorById);

authorRoutes.delete("/:id", authorController.deleteAuthorById);
