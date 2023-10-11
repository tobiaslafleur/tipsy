'use client';

import { Game, getGames } from '~/app/(protected)/join-game/page';

import { Button } from '~/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tipsyFetch } from '~/lib/utils';
import AddTask from '~/components/dashboard/addTask';
import TasksDashboard from '~/components/dashboard/tasks';
import TeamsDashboard from '~/components/dashboard/teams';

export default function DashboardGames({
  initialGames,
}: {
  initialGames: Game[];
}) {
  const queryClient = useQueryClient();

  const { data: games } = useQuery({
    queryKey: ['games'],
    queryFn: getGames,
    initialData: initialGames,
  });

  const { mutate } = useMutation({
    mutationFn: async (gameId: string) => {
      await tipsyFetch(`/games/${gameId}/start`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['games']);
    },
  });

  const { mutate: stopMutation } = useMutation({
    mutationFn: async (gameId: string) => {
      await tipsyFetch(`/games/${gameId}/stop`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['games']);
    },
  });

  return (
    <div className="mt-4 flex flex-col gap-8">
      {games.length > 1 ? (
        games?.map(game => (
          <div key={game.id} className="w-full rounded-md bg-header p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-200">
                    {game.title}
                  </h3>
                  <span
                    className={`rounded-md px-2 py-0.5 text-sm ${
                      !game.started
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : game.finished
                        ? 'bg-red-400/20 text-red-400'
                        : 'bg-green-400/20 text-green-400'
                    }`}
                  >
                    {!game.started
                      ? 'Waiting for game to start'
                      : game.finished
                      ? 'Game is finished'
                      : 'Game is running'}
                  </span>
                </div>
                <span className="text-sm text-gray-400">Hosted by Helyxia</span>
              </div>

              {!game.started ? (
                <div className="flex items-center gap-4">
                  <AddTask gameId={game.id} />
                  <Button
                    className="bg-green-700 text-gray-200 hover:bg-green-800"
                    onClick={() => mutate(game.id)}
                  >
                    Start game
                  </Button>
                </div>
              ) : (
                <Button
                  disabled={game.finished}
                  variant="destructive"
                  className="select-none text-gray-200 disabled:bg-gray-400/20"
                  onClick={() => stopMutation(game.id)}
                >
                  {game.finished ? 'Unavailable' : 'Stop game'}
                </Button>
              )}
            </div>
            <TasksDashboard game={game} />
            <TeamsDashboard game={game} />
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">
          No games found, please check in again later!
        </p>
      )}
    </div>
  );
}
