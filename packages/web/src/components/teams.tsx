'use client';

import { useQuery } from '@tanstack/react-query';
import TeamBox, { Team } from '~/components/teamBox';
import { tipsyFetch } from '~/lib/utils';

type Props = {
  gameId: string;
};

export default function Teams({ gameId }: Props) {
  const { data: teams } = useQuery({
    queryKey: ['teams', gameId],
    queryFn: async () => {
      return await tipsyFetch<Team[]>(
        `http://localhost:4000/api/v1/games/${gameId}/teams`
      );
    },
  });

  console.log(teams);

  return (
    <div className="w-full shadow-sm bg-[#292929] flex flex-col gap-2">
      <h2 className="text-gray-200 font-semibold">Teams</h2>
      {teams && teams.length > 0 ? (
        teams.map((team) => <TeamBox team={team} key={team.id} />)
      ) : (
        <p className="text-gray-200">
          There are no teams signed up for this game.
        </p>
      )}
    </div>
  );
}
