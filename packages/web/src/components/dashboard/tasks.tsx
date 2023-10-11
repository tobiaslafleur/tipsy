'use client';

import { useQuery } from '@tanstack/react-query';

import { tipsyFetch } from '~/lib/utils';
import { Game } from '~/app/(protected)/join-game/page';
import { Task } from '~/components/play/tasks';
import TaskDropdown from '~/components/dashboard/taskDropdown';

export default function TasksDashboard({ game }: { game: Game }) {
  const { data: tasks } = useQuery({
    queryKey: ['tasks', game.id],
    queryFn: async () => {
      return await tipsyFetch<Task[]>(`/games/${game.id}/tasks`, {
        method: 'GET',
        cache: 'no-cache',
      });
    },
  });

  return (
    <div className="w-full pt-2">
      {tasks ? (
        <TaskDropdown tasks={tasks} game={game} />
      ) : (
        <p className="text-sm font-semibold text-gray-200">Loading...</p>
      )}
    </div>
  );
}
