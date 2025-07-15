import { useGetBorrowSummaryQuery } from '@/redux/api/libraryApi';

const BorrowSummaryPage = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <div>Loading borrow summary...</div>;
  if (error) return <div>Failed to load borrow summary.</div>;

  return (
    <div className="mx-auto p-6 bg-amber-100 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Borrow Summary</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">ISBN</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Total Quantity Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No borrowed books found.
              </td>
            </tr>
          )}
          {data?.data.map((item) => (
            <tr key={item.book.isbn} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{item.book.isbn}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummaryPage;
