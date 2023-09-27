'use client';

import Image from 'next/image';
import { tipsyFetch } from '~/lib/utils';
import { queryClient } from '~/providers/query';
import { useSession } from '~/providers/session';

type Props = {
  team: Team;
};

export type Team = {
  id: string;
  game_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  users: User[];
};

export type User = {
  id: string;
  discord_id: string;
  name: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};

export default function TeamBox({ team }: Props) {
  const { session } = useSession();

  const isMember = team.users.some((user) => user.id === session?.id);

  async function handleClick() {
    const endpoint = isMember ? 'leave' : 'join';
    const method = isMember ? 'DELETE' : 'POST';

    await tipsyFetch(
      `http://localhost:4000/api/v1/teams/${team.id}/${endpoint}`,
      {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: session?.id }),
      }
    );

    queryClient.invalidateQueries(['teams', team.game_id]);
  }

  return (
    <div className="border rounded-md p-2 flex flex-col gap-2 justify-between">
      <div className="flex justify-between w-full items-center">
        <h3 className="font-semibold text-gray-200">
          {team.name} ({team.users.length}{' '}
          {team.users.length === 1 ? 'Member' : 'Members'})
        </h3>
        {isMember ? (
          <button
            className="text-gray-200  px-4 py-2 bg-red-700 rounded-md"
            onClick={handleClick}
          >
            Leave team
          </button>
        ) : (
          <button
            className="text-gray-200 px-4 py-2 bg-green-700 rounded-md"
            onClick={handleClick}
          >
            Join team
          </button>
        )}
      </div>
      {team.users.map((user) => (
        <div className="flex items-center gap-2" key={user.id}>
          <Image
            src={
              user.avatar
                ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}`
                : 'https://cdn.discordapp.com/embed/avatars/1.png'
            }
            alt="avatar"
            width={40}
            height={40}
            className={'rounded-full shadow'}
          />
          <p className="font-semibold text-gray-200">{user.name}</p>
        </div>
      ))}
    </div>
  );
}
