import express from "express";
const router = express.Router();

/** DO NOT CHANGE THIS ROUTE - it serves our front-end */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Books" });
});

export default router;
