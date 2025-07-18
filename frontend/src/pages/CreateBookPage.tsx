import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { BookFormValues } from '@/types/api'
import { useAddBookMutation } from '@/redux/api/libraryApi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { bookSchema } from '@/validations/book'

const CreateBookPage = () => {
  const navigate = useNavigate()
  const [addBook, { isLoading }] = useAddBookMutation()

  const form = useForm<z.infer<typeof bookSchema>>({
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
  })

  const onSubmit = async (data: BookFormValues) => {
    try {
      const preparedData = {
        ...data,
        copies: Number(data.copies), // 👈 ensure it's a number
      }

      await addBook(preparedData).unwrap()
      toast.success('Book created successfully!')
      navigate('/books')
    } catch (error) {
      console.error(error)
      toast.error('Failed to create book.')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-amber-100 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Add New Book</h1>

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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-amber-200'>
                    <SelectItem className='cursor-pointer border-1' value="FICTION">Fiction</SelectItem>
                    <SelectItem className='cursor-pointer border-1 border-t-0' value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem className='cursor-pointer border-1 border-t-0' value="SCIENCE">Science</SelectItem>
                    <SelectItem className='cursor-pointer border-1 border-t-0' value="HISTORY">History</SelectItem>
                    <SelectItem className='cursor-pointer border-1 border-t-0' value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem className='cursor-pointer border-1 border-t-0' value="FANTASY">Fantasy</SelectItem>
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
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-amber-300 hover:bg-amber-400 cursor-pointer" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Add Book'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateBookPage
