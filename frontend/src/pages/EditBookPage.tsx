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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetBookByIdQuery, useUpdateBookMutation } from '@/redux/api/libraryApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { bookSchema } from '@/validations/book';
import type { z } from 'zod';
import { toast } from 'sonner';

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetBookByIdQuery(id ?? '', { skip: !id });
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  // Infer form data type from schema
  type BookFormValues = z.infer<typeof bookSchema>;

  // Setup form with default values set later after fetching book data
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: 'FICTION',
      isbn: '',
      description: '',
      copies: 1,
      available: true,
    },
  });

  // When book data loads, reset form values
  useEffect(() => {
    if (data?.data) {
      const book = data.data;
      form.reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description ?? '',
        copies: book.copies,
        available: book.available,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: BookFormValues) => {
    if (!id) return;
    try {
      await updateBook({ id, data: values }).unwrap();
      toast.success('Book updated successfully!');
      navigate(`/books/${id}`);
    } catch (e) {
      console.error(e);
      toast.error('Failed to update book.');
    }
  };

  if (isLoading) return <div>Loading book data...</div>;
  if (error) return <div>Error loading book data.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Edit Book</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="ISBN number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Optional description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    id="available"
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormLabel htmlFor="available" className="cursor-pointer">
                  Available
                </FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Book'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditBookPage;
