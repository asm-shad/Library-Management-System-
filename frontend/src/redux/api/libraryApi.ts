import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  BookResponse, 
  BookListResponse,
  BookFormValues,
  BorrowResponse,
  BorrowSummaryResponse
} from '@/types/api';

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Books', 'Borrows'],
  endpoints: (builder) => ({
    // Book Endpoints
    getBooks: builder.query<BookListResponse, void>({
      query: () => '/books',
      providesTags: ['Books']
    }),
    
    getBookById: builder.query<BookResponse, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }]
    }),
    
    addBook: builder.mutation<BookResponse, BookFormValues>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book
      }),
      invalidatesTags: ['Books']
    }),
    
    updateBook: builder.mutation<BookResponse, { id: string; data: Partial<BookFormValues> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Books', id }]
    }),
    
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Books']
    }),
    
    // Borrow Endpoints
    borrowBook: builder.mutation<BorrowResponse, { book: string; quantity: number; dueDate: string }>({
      query: (borrowData) => ({
        url: '/borrow',
        method: 'POST',
        body: borrowData
      }),
      invalidatesTags: ['Books', 'Borrows']
    }),
    
    getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
      query: () => '/borrow',
      providesTags: ['Borrows']
    })
  })
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery
} = libraryApi;