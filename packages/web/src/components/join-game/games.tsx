'use client';

import { useQuery } from '@tanstack/react-query';

import { Game, getGames } from '~/app/(protected)/join-game/page';
import Teams from '~/components/join-game/teams';

import GamePopover from '~/components/join-game/gamePopover';

export default function UpcomingGames({
  initialGames,
}: {
  initialGames: Game[];
}) {
  const { data: games } = useQuery({
    queryKey: ['upcoming-games'],
    queryFn: getGames,
    initialData: initialGames,
  });

  return (
    <div className="mt-4 flex flex-col gap-8">
      {games?.map(game => (
        <div key={game.id} className="w-full rounded-md bg-header p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-200">
                  {game.title}
                </h3>
                <span className="rounded-md bg-green-400/30 px-2 py-0.5 text-sm text-green-400">
                  Available
                </span>
              </div>
              <span className="text-sm text-gray-400">Hosted by Flowiesh</span>
            </div>
            <GamePopover gameId={game.id} />
          </div>
          <Teams gameId={game.id} />
        </div>
      ))}
    </div>
  );
}
