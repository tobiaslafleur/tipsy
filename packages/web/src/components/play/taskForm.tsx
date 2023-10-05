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
    },
    any,
    undefined
  >;
  setOpen: (val: boolean) => void;
}) {
  const queryClient = useQueryClient();

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
    }: {
      taskId: string;
      selectedTeam: string;
    }) => {
      return await tipsyFetch(`/games/${gameId}/tasks/${taskId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_team: selectedTeam }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['feed', gameId]);
      queryClient.invalidateQueries(['tasks', gameId]);
      setOpen(false);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ team }) =>
          mutate({ selectedTeam: team, taskId: task.id })
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
        <Button type="submit" className="mt-4 w-full text-gray-200">
          Submit
        </Button>
      </form>
    </Form>
  );
}
