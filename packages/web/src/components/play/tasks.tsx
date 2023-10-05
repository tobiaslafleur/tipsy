'use client';

import { useQuery } from '@tanstack/react-query';

import TaskDialog from '~/components/play/taskDialog';
import { tipsyFetch } from '~/lib/utils';
import { useSession } from '~/providers/session';

export default function Tasks({ gameId }: { gameId: string }) {
  const { session } = useSession();

  const { data: tasks } = useQuery({
    queryKey: ['tasks', gameId],
    queryFn: async () => {
      return await tipsyFetch<Task[]>(
        `/games/${gameId}/teams/${session?.id}/tasks`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
    },
    refetchInterval: 1000 * 5,
  });

  const uncompletedTasks = tasks?.filter(task => !task.completed);

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {uncompletedTasks?.map(task => (
        <TaskDialog key={task.id} task={task} gameId={gameId} />
      ))}
    </div>
  );
}

export type Task = {
  id: string;
  title: string;
  description: string;
  type: string;
  weight: number;
  completed: boolean;
};
