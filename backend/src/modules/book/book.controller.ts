import { Request, Response } from "express";
import { Book } from "./book.model";

// Create Book
const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    const result = await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error.message,
    });
  }
};

// Get All Books with filtering/sorting
const getBooks = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query: any = {};
    if (filter) query.genre = filter;

    const data = await Book.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error.message,
    });
  }
};

// Get one Book by ID
const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve book",
      error: error.message,
    });
  }
};

// Update Book
const updateBook = async (req: Request, res: Response) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updated,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// Delete Book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.bookId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

export {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}
