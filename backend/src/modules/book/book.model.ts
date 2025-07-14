import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"]
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema);
