import { Request, Response, NextFunction } from "express";
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";

// POST /api/borrow
const borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    if (book.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
      return;
    }

    const borrow = new Borrow({ book: bookId, quantity, dueDate });
    const savedBorrow = await borrow.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: savedBorrow,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to borrow book",
      error: error.message,
    });
  }
};

const getBorrowSummary = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails"
        }
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          }
        }
      }
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get borrowed books summary",
      error: error.message
    });
  }
};

export { borrowBook, getBorrowSummary }
