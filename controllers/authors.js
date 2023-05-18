import * as authorModel from "../models/authors.js";

export async function searchAuthorsByName(req, res, next) {
  if (req.query.search !== undefined) {
    const authors = await authorModel.searchAuthorsByName(req.query.search);
    return res.json({ success: true, payload: authors });
  }
  next();
}

export async function getAuthors(req, res) {
  const authors = await authorModel.getAuthors();
  res.json({ success: true, payload: authors });
}

export async function getAuthorById(req, res) {
  const author = await authorModel.getAuthorById(req.params.id);
  res.json({ success: true, payload: author });
}

export async function createAuthor(req, res) {
  const data = req.body;
  const author = await authorModel.createAuthor(data);
  res.json({ success: true, payload: author });
}

export async function updateAuthorById(req, res) {
  const data = req.body;
  const author = await authorModel.updateAuthorById(req.params.id, data);
  res.json({ success: true, payload: author });
}

export async function deleteAuthorById(req, res) {
  const author = await authorModel.deleteAuthorById(req.params.id);
  res.json({ success: true, payload: author });
}
