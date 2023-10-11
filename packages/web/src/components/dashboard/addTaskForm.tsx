import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { tipsyFetch } from '~/lib/utils';

export default function AddTaskForm({
  setOpen,
  gameId,
}: {
  setOpen: (val: boolean) => void;
  gameId: string;
}) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      weight: 0,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: { title: string }) => {
      await tipsyFetch('/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, type: 'quest', game_id: gameId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', gameId]);
      setOpen(false);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => mutate(data))}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="text-gray-200">
              <FormLabel id="team">Select a task title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                The title for the task to be created.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="text-gray-200">
              <FormLabel id="team">Select a task description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                The description for the task to be created.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem className="text-gray-200">
              <FormLabel id="team">Select a task weight</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                The weight for the task to be created.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 w-full text-gray-200">
          Submit
        </Button>
      </form>
    </Form>
  );
}

const formSchema = z.object({
  title: z.string().min(1, 'Please enter a valid title'),
  description: z.string().min(1, 'Please enter a description'),
  weight: z.number({ coerce: true }).min(1),
});
