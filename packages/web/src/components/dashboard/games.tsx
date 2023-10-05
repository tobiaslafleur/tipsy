'use client';

import { Game } from '~/app/(protected)/join-game/page';
import Teams from '~/components/join-game/teams';

import GamePopover from '~/components/join-game/gamePopover';

export default function DashboardGames({
  initialGames,
}: {
  initialGames: Game[];
}) {
  return (
    <div className="mt-4 flex flex-col gap-8">
      {initialGames.length > 1 ? (
        initialGames?.map(game => (
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
              <GamePopover game={game} />
            </div>
            <Teams game={game} />
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
