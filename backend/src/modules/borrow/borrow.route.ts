import { Router } from "express";
import { borrowBook, getBorrowSummary } from "./borrow.controller";

const borrowRoutes = Router();

borrowRoutes.post("/borrow", borrowBook);
borrowRoutes.get("/borrow", getBorrowSummary);

export default borrowRoutes;
