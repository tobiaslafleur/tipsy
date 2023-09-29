import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { tipsyFetch } from '~/lib/utils';

export default function GamePopover({ gameId }: { gameId: string }) {
  const queryClient = useQueryClient();

  const [popoverOpen, setPopoverOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async ({ name }: z.infer<typeof formSchema>) => {
      return await tipsyFetch('/teams', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game_id: gameId, name }),
      });
    },
    onSuccess: () => {
      setPopoverOpen(false);
      queryClient.invalidateQueries(['teams', gameId]);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button className="text-gray-200">Create new team</Button>
      </PopoverTrigger>
      <PopoverContent className="border-foreground bg-background">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ name }) => mutate({ name }))}
            className="text-gray-200 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Power Hour"
                      {...field}
                      className="placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormDescription>
                    This will be your teams name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4 w-full">Submit</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

const formSchema = z.object({
  name: z.string().min(6, {
    message: 'Team name must be at least 6 characters.',
  }),
});
