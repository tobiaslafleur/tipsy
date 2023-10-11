'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Game } from '~/app/(protected)/join-game/page';
import { Team } from '~/components/join-game/teamDropdown';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { tipsyFetch } from '~/lib/utils';

export default function TeamDropdownDashboard({
  teams,
  game,
}: {
  teams: Team[];
  game: Game;
}) {
  const queryClient = useQueryClient();

  const [hidden, setHidden] = useState(true);

  const { mutate } = useMutation({
    mutationFn: async ({ teamId }: { teamId: string }) => {
      return await tipsyFetch(`/teams/${teamId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['teams', game.id]);
    },
  });

  const teamsAvailable = teams?.length > 0;

  return (
    <>
      <span
        className="relative inline-flex cursor-pointer items-center gap-2 text-right text-sm font-semibold text-gray-200"
        onClick={() => {
          if (!teamsAvailable) return;
          setHidden(prev => !prev);
        }}
      >
        {teamsAvailable ? (
          <ChevronDown
            strokeWidth={3}
            className={`h-5 w-5 ${
              hidden ? 'rotate-0' : '-rotate-180'
            }  transition`}
          />
        ) : null}
        {!teamsAvailable
          ? 'There are no teams signed up for this game.'
          : hidden
          ? 'Show teams'
          : 'Hide teams'}
      </span>
      <AnimatePresence>
        {!hidden ? (
          <motion.div
            key="dropdown"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="flex flex-col gap-4 overflow-clip"
          >
            {teams?.map(team => (
              <div
                key={team.id}
                className="rounded-md bg-foreground p-4 !pt-3 shadow"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h4 className="mb-2 font-semibold text-gray-200">
                      {team.name}
                    </h4>
                    <span className="text-sm text-gray-200">
                      {team.users.length}{' '}
                      {team.users.length === 1 ? 'Member' : 'Members'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-right">
                    <div className="flex items-center gap-8">
                      {team.users.length > 0 ? (
                        team.users.map((user: any) => (
                          <div
                            className="flex items-center gap-2"
                            key={user.id}
                          >
                            <Avatar className="h-12 w-12 border-2 border-purple-700/80">
                              <AvatarImage
                                src={
                                  user.avatar
                                    ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}`
                                    : undefined
                                }
                              />
                              <AvatarFallback className="select-none bg-purple-700 text-lg font-semibold uppercase text-gray-200 shadow-sm">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-200">
                              {user.name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-200">
                          There are currently no members in {team.name}.
                        </p>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      className="select-none text-gray-200 disabled:bg-gray-400/20"
                      onClick={() => mutate({ teamId: team.id })}
                      disabled={game.started || game.finished}
                    >
                      {game.started || game.finished
                        ? 'Unavailable'
                        : 'Delete team'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
