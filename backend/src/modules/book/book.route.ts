import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "./book.controller";

const bookRoutes = Router();

bookRoutes.post("/books", createBook);
bookRoutes.get("/books", getBooks);
bookRoutes.get("/books/:bookId", getBookById);
bookRoutes.put("/books/:bookId", updateBook);
bookRoutes.delete("/books/:bookId", deleteBook);

export default bookRoutes;
