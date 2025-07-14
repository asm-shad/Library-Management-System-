import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Books', 'Borrows'],
  endpoints: (builder) => ({
    // Book Endpoints
    getBooks: builder.query<BookResponse, void>({
      query: () => '/books',
      providesTags: ['Books']
    }),
    addBook: builder.mutation<BookResponse, BookFormValues>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book
      }),
      invalidatesTags: ['Books']
    }),
    
    // Borrow Endpoints
    borrowBook: builder.mutation({
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
  useAddBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery
} = libraryApi;