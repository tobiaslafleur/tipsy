'use client';

import { useQuery } from '@tanstack/react-query';

import { tipsyFetch } from '~/lib/utils';
import Teams from '~/components/teams';
import GameForm from '~/components/gameForm';
import TeamForm from '~/components/teamForm';
import Tasks from '~/components/tasks';
import TaskForm from '~/components/taskForm';

export default function GamesPage() {
  const { data: games } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      return await tipsyFetch<
        {
          id: string;
          title: string;
          created_at: string;
          updated_at: string;
        }[]
      >('http://localhost:4000/api/v1/games', {
        method: 'GET',
      });
    },
  });

  async function handleClick(game_id: string) {
    await tipsyFetch(`http://localhost:4000/api/v1/games/${game_id}/start`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  return (
    <main>
      <h1 className="text-4xl text-gray-200 font-bold">Games</h1>
      <GameForm />
      <div className="flex flex-col w-full gap-8 py-8">
        {games?.map((game) => (
          <div key={game.id} className="border rounded-md">
            <div className="flex p-4 items-center justify-between">
              <a href={`/play/${game.id}`}>
                <h2 className="text-gray-200 font-bold">{game.title}</h2>
              </a>
              <button
                className="text-gray-200 px-4 py-2 bg-green-700 rounded-md"
                onClick={() => handleClick(game.id)}
              >
                START
              </button>
              <TeamForm gameId={game.id} />
            </div>
            <div className="flex flex-col gap-4 px-4 pb-4">
              <Teams gameId={game.id} />
              <TaskForm game_id={game.id} />
              <Tasks gameId={game.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
