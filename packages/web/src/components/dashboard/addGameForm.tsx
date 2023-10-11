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
import { tipsyFetch } from '~/lib/utils';

export default function AddGameForm({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: { title: string }) => {
      await tipsyFetch('/games', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['games']);
      setOpen(false);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => mutate(data))}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="text-gray-200">
              <FormLabel id="team">Select a game name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                The name for the game to be created.
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
  title: z.string().min(1, 'Please enter a valid game name'),
});
