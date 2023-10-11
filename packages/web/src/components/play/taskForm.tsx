'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { Team } from '~/components/join-game/teamDropdown';
import { Task } from '~/components/play/tasks';
import { tipsyFetch } from '~/lib/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useToast } from '~/components/ui/use-toast';

export default function TaskForm({
  task,
  gameId,
  form,
  setOpen,
}: {
  task: Task;
  gameId: string;
  form: UseFormReturn<
    {
      team: string;
      file?: any;
    },
    any,
    undefined
  >;
  setOpen: (val: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { data: teams } = useQuery({
    queryKey: ['teams_selector', gameId],
    queryFn: async () => {
      return await tipsyFetch<Team[]>(`/games/${gameId}/teams`, {
        method: 'GET',
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      taskId,
      selectedTeam,
      file,
    }: {
      taskId: string;
      selectedTeam: string;
      file: any;
    }) => {
      if (!file) throw new Error('No file provided');

      const formData = new FormData();

      formData.append('file', file);
      formData.append('selected_team', selectedTeam);

      return await tipsyFetch(`/games/${gameId}/tasks/${taskId}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['feed', gameId]);
      queryClient.invalidateQueries(['tasks', gameId]);
      setOpen(false);
    },
    onError: error => {
      if (error instanceof Error && error.message === 'No file provided') {
        toast({
          variant: 'destructive',
          title: 'Please select a file to upload!',
          className: 'text-gray-200',
        });
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ team, file }) =>
          mutate({ selectedTeam: team, file, taskId: task.id })
        )}
      >
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem className="text-gray-200">
              <FormLabel id="team">Select a team</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue="">
                  <SelectTrigger className="border-none bg-foreground">
                    <SelectValue placeholder="Select a team..." />
                  </SelectTrigger>
                  <SelectContent className="border-none bg-foreground text-gray-200">
                    {teams?.map(team => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <FormDescription>
                The team that is awarded the sips.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem className="text-gray-200">
              <FormLabel id="team">Upload a picture</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={value?.fileName}
                  onChange={event => {
                    if (!event.target.files) return;

                    onChange(event.target.files[0]);
                  }}
                  accept="image/*"
                  className="text-gray-200  file:text-gray-200"
                  type="file"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                The screenshot you wish to upload.
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
