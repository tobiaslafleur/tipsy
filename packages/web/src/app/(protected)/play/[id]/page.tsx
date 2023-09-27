'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { tipsyFetch } from '~/lib/utils';
import { queryClient } from '~/providers/query';
import { useSession } from '~/providers/session';

type Props = {
  params: {
    id: string;
  };
};

export default function Home({ params: { id } }: Props) {
  const { session } = useSession();

  const { data: tasks } = useQuery({
    queryKey: ['game_tasks'],
    queryFn: async () => {
      return await tipsyFetch<any[]>(
        `http://localhost:4000/api/v1/games/${id}/teams/${session?.id}/tasks`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
    },
  });

  const { data: feed } = useQuery({
    queryKey: ['feed'],
    queryFn: async () => {
      return await tipsyFetch<any[]>(
        `http://localhost:4000/api/v1/games/${id}/feed`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: { selected_team: string; task: string }) => {
      return await tipsyFetch<never>(
        `http://localhost:4000/api/v1/games/${id}/tasks/${data.task}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selected_team: data.selected_team,
            image:
              'https://wow.zamimg.com/uploads/screenshots/normal/63719-stitches.jpg',
          }),
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['game_tasks']);
    },
  });

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-2xl font-semibold text-gray-200 text-center">
            Bonus Objectives
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {tasks?.map((task) =>
              !task.completed ? (
                <div
                  className="bg-slate-700 rounded-md py-2 px-4"
                  key={task.id}
                >
                  <div
                    className="flex justify-between items-center"
                    key={task.id}
                  >
                    <div className="flex flex-col">
                      <h3 className="font-bold text-gray-200">{task.title}</h3>
                      <p className="text-sm text-gray-200">
                        {task.description}
                      </p>
                    </div>
                    <p className="font-bold text-gray-200">
                      {task.weight} Sips
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <input placeholder="selected team" />
                    <button
                      className="px-4 py-2 rounded-md bg-slate-200"
                      onClick={() =>
                        mutate({
                          selected_team: '703de4e3-6db9-4ad3-b011-d5a36adb4209',
                          task: task.id,
                        })
                      }
                    >
                      Complete task
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="flex w-1/3 items-center flex-col">
          <h3 className="text-2xl font-semibold text-gray-200">Tipsy Feed</h3>
          <div className="flex flex-col gap-4 w-full">
            {feed?.map((task) => (
              <div key={task.id} className="w-full flex flex-col">
                <div className="relative w-full h-64">
                  <Image
                    src={task.image}
                    alt={'asd'}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-gray-200">{task.selected_team}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
