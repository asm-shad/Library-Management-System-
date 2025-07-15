import { useGetBooksQuery, useDeleteBookMutation } from '@/redux/api/libraryApi'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function AllBooksPage() {
  const navigate = useNavigate()
  const { data, isLoading } = useGetBooksQuery()
  const [deleteBook] = useDeleteBookMutation()

  const handleDelete = async (id: string) => {
    toast.warning('Are you sure you want to delete this book?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          try {
            await deleteBook(id).unwrap()
            toast.success('Book deleted successfully')
          } catch {
            toast.error('Failed to delete book')
          }
        },
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 bg-amber-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className='bg-amber-200 hover:bg-amber-300 cursor-pointer' onClick={() => navigate('/create-book')}>Add New Book</Button>
      </div>

      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">Genre</th>
              <th className="p-2 text-left">ISBN</th>
              <th className="p-2 text-center">Copies</th>
              <th className="p-2 text-center">Available</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((book) => (
              <tr key={book._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">{book.genre}</td>
                <td className="p-2">{book.isbn}</td>
                <td className="p-2 text-center">{book.copies}</td>
                <td className="p-2 text-center">
                  {book.available && book.copies > 0 ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="p-2 space-x-2 text-center">
                  <Button className='cursor-pointer hover:bg-green-100' size="sm" onClick={() => navigate(`/books/${book._id}`)}>
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className='cursor-pointer'
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:bg-red-100 cursor-pointer"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" className='cursor-pointer' onClick={() => navigate(`/borrow/${book._id}`)}>
                    Borrow
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
