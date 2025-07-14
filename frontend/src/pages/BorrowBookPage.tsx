import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery, useBorrowBookMutation } from '@/redux/api/libraryApi';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { z } from 'zod';

// Validation schema for borrow form
const borrowSchema = z.object({
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .positive('Quantity must be positive'),
  dueDate: z.string().min(1, 'Due date is required'),
});

type BorrowFormValues = z.infer<typeof borrowSchema>;

const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  // Fetch the book details
  const { data, isLoading, error } = useGetBookByIdQuery(bookId ?? '', {
    skip: !bookId,
  });

  // Mutation hook for borrowing book
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  // Setup form with react-hook-form and zod
  const form = useForm<BorrowFormValues>({
    resolver: zodResolver(borrowSchema),
    defaultValues: {
      quantity: 1,
      dueDate: '',
    },
  });

  // Auto-adjust max quantity based on available copies
  useEffect(() => {
    if (data?.data) {
      // If quantity is more than available copies, reset to max available copies
      const availableCopies = data.data.copies;
      if (form.getValues('quantity') > availableCopies) {
        form.setValue('quantity', availableCopies);
      }
    }
  }, [data, form]);

  const onSubmit = async (values: BorrowFormValues) => {
    if (!bookId) return;
    try {
      await borrowBook({
        book: bookId,
        quantity: values.quantity,
        dueDate: values.dueDate,
      }).unwrap();
      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (e) {
      console.error(e);
      toast.error('Failed to borrow book.');
    }
  };

  if (isLoading) return <div>Loading book data...</div>;
  if (error) return <div>Failed to load book data.</div>;

  const maxQuantity = data?.data.copies ?? 1;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Borrow Book</h1>

      <p className="mb-4">
        <strong>Book:</strong> {data?.data.title} by {data?.data.author}
      </p>
      <p className="mb-6">
        <strong>Available Copies:</strong> {maxQuantity}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={maxQuantity}
                    {...field}
                    onChange={(e) => {
                      let val = Number(e.target.value);
                      if (val > maxQuantity) val = maxQuantity;
                      if (val < 1) val = 1;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isBorrowing}>
            {isBorrowing ? 'Borrowing...' : 'Borrow Book'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BorrowBookPage;
