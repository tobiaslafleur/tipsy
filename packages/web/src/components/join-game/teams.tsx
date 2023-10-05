'use client';

import { useQuery } from '@tanstack/react-query';

import { tipsyFetch } from '~/lib/utils';
import TeamDropdown, { Team } from '~/components/join-game/teamDropdown';
import { Game } from '~/app/(protected)/join-game/page';

export default function Teams({ game }: { game: Game }) {
  const { data: teams } = useQuery({
    queryKey: ['teams', game.id],
    queryFn: async () => {
      return await tipsyFetch<Team[]>(`/games/${game.id}/teams`, {
        method: 'GET',
        cache: 'no-cache',
      });
    },
  });

  return (
    <div className="w-full pt-2">
      {teams ? (
        <TeamDropdown teams={teams} game={game} />
      ) : (
        <p className="text-sm font-semibold text-gray-200">Loading...</p>
      )}
    </div>
  );
}
