import UpcomingGames from '~/components/join-game/games';
import { tipsyFetch } from '~/lib/utils';

export default async function Page() {
  const initialGames = await getGames();

  const upcomingGames = initialGames.filter(game => !game.started);
  const currentGames = initialGames.filter(
    game => game.started && !game.finished
  );
  const previousGames = initialGames.filter(game => game.finished);

  return (
    <main className="min-h-full">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-200">
            Upcoming Games
          </h2>
          <UpcomingGames initialGames={upcomingGames} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-200">
            Current Games
          </h2>
          <UpcomingGames initialGames={currentGames} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-200">
            Previous Games
          </h2>
          <UpcomingGames initialGames={previousGames} />
        </div>
      </div>
    </main>
  );
}

export async function getGames() {
  return await tipsyFetch<Game[]>('/games?started=false&running=false', {
    method: 'GET',
    cache: 'no-cache',
  });
}

export type Game = {
  id: string;
  title: string;
  started: boolean;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
};
