import { Schema, model } from "mongoose";
import { IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model"; // Adjust import path as needed

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
  }
);

// 🔁 Post-save middleware: update book copies and availability
borrowSchema.post("save", async function (doc, next) {
  const book = await Book.findById(doc.book);
  if (book) {
    book.copies -= doc.quantity;
    if (book.copies <= 0) {
      book.available = false;
    }
    await book.save();
  }
  next();
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
