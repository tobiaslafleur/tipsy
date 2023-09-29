import { Suspense } from 'react';
import UpcomingGames from '~/components/join-game/games';
import { tipsyFetch } from '~/lib/utils';

export default async function Page() {
  const initialGames = await getGames();

  return (
    <main className="min-h-full">
      <div className="pt-4">
        <h2 className="text-2xl font-semibold text-gray-200">Upcoming Games</h2>
        <UpcomingGames initialGames={initialGames} />
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
