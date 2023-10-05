'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Game } from '~/app/(protected)/join-game/page';
import { Button } from '~/components/ui/button';
import { tipsyFetch } from '~/lib/utils';

export default function MyGames() {
  const { data: games } = useQuery({
    queryKey: ['upcoming-games'],
    queryFn: async () => {
      return await tipsyFetch<Game[]>('/games/');
    },
  });

  return (
    <div className="mt-4 flex flex-col gap-8">
      {games?.length && games?.length > 0 ? (
        games?.map(game => (
          <div key={game.id} className="w-full rounded-md bg-header p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-200">
                    {game.title}
                  </h3>
                  <span
                    className={`rounded-md bg-green-400/30 px-2 py-0.5 text-sm ${
                      !game.started
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : game.finished
                        ? 'bg-red-400/20 text-red-400'
                        : 'bg-green-400/20 text-green-400'
                    } `}
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

              <Button
                disabled={!game.started || game.finished}
                className="select-none text-gray-200 disabled:bg-gray-400/20"
              >
                <Link href={`/play/${game.id}`}>
                  {!game.started || game.finished ? 'Unavailable' : 'Play now'}
                </Link>
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">
          You need to join a game to play!
        </p>
      )}
    </div>
  );
}
