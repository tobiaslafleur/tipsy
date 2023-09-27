'use client';

import { useQuery } from '@tanstack/react-query';
import TaskBox, { Task } from '~/components/taskBox';
import { tipsyFetch } from '~/lib/utils';

type Props = {
  gameId: string;
};

export default function Tasks({ gameId }: Props) {
  const { data: tasks } = useQuery({
    queryKey: ['tasks', gameId],
    queryFn: async () => {
      return await tipsyFetch<Task[]>(
        `http://localhost:4000/api/v1/games/${gameId}/tasks`
      );
    },
  });

  return (
    <div className="w-full shadow-sm bg-[#292929] flex flex-col gap-2">
      <h2 className="text-gray-200 font-semibold">Tasks</h2>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => <TaskBox task={task} key={task.id} />)
      ) : (
        <p className="text-gray-200">There are no tasks for this game.</p>
      )}
    </div>
  );
}
