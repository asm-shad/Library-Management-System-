// Base API response structure
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Book related types
export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type BookResponse = ApiResponse<IBook>;
export type BookListResponse = ApiResponse<IBook[]>;

// Form values type (without _id and timestamps)
export type BookFormValues = Omit<IBook, '_id' | 'createdAt' | 'updatedAt'>;

// Borrow related types
export interface IBorrow {
  _id: string;
  book: string | IBook; // Can be reference or populated
  quantity: number;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export type BorrowResponse = ApiResponse<IBorrow>;
export type BorrowSummaryResponse = ApiResponse<BorrowSummaryItem[]>;