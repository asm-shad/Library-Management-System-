import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery } from '@/redux/api/libraryApi';
import { Button } from '@/components/ui/button';

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetBookByIdQuery(id ?? '', {
    skip: !id,
  });

  if (isLoading) return <div>Loading book details...</div>;
  if (error) return <div>Error loading book details.</div>;
  if (!data?.data) return <div>Book not found.</div>;

  const book = data.data;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre.replace('_', ' ')}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Copies:</strong> {book.copies}</p>
      <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
      {book.description && (
        <>
          <h2 className="text-xl font-semibold mt-4">Description</h2>
          <p>{book.description}</p>
        </>
      )}

      <div className="flex space-x-3 mt-6">
        <Button onClick={() => navigate(`/edit-book/${book._id}`)}>Edit</Button>
        <Button variant="outline" onClick={() => navigate('/books')}>
          Back to List
        </Button>
      </div>
    </div>
  );
};

export default BookDetailsPage;
