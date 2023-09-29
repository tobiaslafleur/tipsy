'use client';

import { useQuery } from '@tanstack/react-query';

import { tipsyFetch } from '~/lib/utils';
import TeamDropdown from '~/components/join-game/teamDropdown';

export default function Teams({ gameId }: { gameId: string }) {
  const { data: teams } = useQuery({
    queryKey: ['teams', gameId],
    queryFn: async () => {
      return await tipsyFetch<any[]>(`/games/${gameId}/teams`, {
        method: 'GET',
        cache: 'no-cache',
      });
    },
  });

  return (
    <div className="w-full pt-2">
      <TeamDropdown teams={teams} gameId={gameId} />
    </div>
  );
}
