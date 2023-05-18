import express from "express";
const router = express.Router();

import {
  getBooks,
  searchBooksByTitle,
  searchBooksByAuthor,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} from "../models/books.js";

/* books endpoints go here */

router.get("/", function (req, res) {
  if (req.query.search !== undefined) {
    const result = searchBooksByTitle(req.query.search);
    return res.json({ success: true, payload: result });
  }

  if (req.query.author !== undefined) {
    const result = searchBooksByAuthor(req.query.author);
    return res.json({ success: true, payload: result });
  }

  const result = getBooks();
  res.json({ success: true, payload: result });
});

router.get("/:id", function (req, res) {
  const id = Number(req.params.id);
  const book = getBookById(id);
  res.json({ success: true, payload: book });
});

router.post("/", function (req, res) {
  const newBook = req.body;
  const result = createBook(newBook);
  res.json({ success: true, payload: result });
});

router.put("/:id", function (req, res) {
  const id = Number(req.params.id);
  const data = req.body;
  const result = updateBookById(id, data);
  res.json({ success: true, payload: result });
});

router.delete("/:id", function (req, res) {
  const id = Number(req.params.id);
  const result = deleteBookById(id);
  res.json({ success: true, payload: result });
});

export default router;
