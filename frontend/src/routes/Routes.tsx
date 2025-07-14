import { Routes, Route, Navigate } from 'react-router-dom'
import AllBooksPage from '@/pages/AllBooksPage'
import CreateBookPage from '@/pages/CreateBookPage'
import MainLayout from '@/layouts/MainLayout'
import BookDetailsPage from '@/pages/BookDetailsPage'
import EditBookPage from '@/pages/EditBookPage'
import BorrowBookPage from '@/pages/BorrowBookPage'
import BorrowSummaryPage from '@/pages/BorrowSummaryPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<AllBooksPage />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/edit-book/:id" element={<EditBookPage />} />
        <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
        <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
      </Route>
    </Routes>
  )
}
