'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Wine } from 'lucide-react';
import { useState } from 'react';
import { Game } from '~/app/(protected)/join-game/page';
import { Task } from '~/components/play/tasks';

import { Button } from '~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';
import { tipsyFetch } from '~/lib/utils';

export default function TaskDropdown({
  tasks,
  game,
}: {
  tasks: Task[];
  game: Game;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [hidden, setHidden] = useState(true);

  const { mutate } = useMutation({
    mutationFn: async ({ taskId }: { taskId: string }) => {
      return await tipsyFetch(`/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', game.id]);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'You can only join one team per game!',
        className: 'text-gray-200',
      });
    },
  });

  const tasksAvailable = tasks?.length > 0;

  return (
    <>
      <span
        className="relative inline-flex cursor-pointer items-center gap-2 text-right text-sm font-semibold text-gray-200"
        onClick={() => {
          if (!tasksAvailable) return;
          setHidden(prev => !prev);
        }}
      >
        {tasksAvailable ? (
          <ChevronDown
            strokeWidth={3}
            className={`h-5 w-5 ${
              hidden ? 'rotate-0' : '-rotate-180'
            }  transition`}
          />
        ) : null}
        {!tasksAvailable
          ? 'There are no tasks for this game.'
          : hidden
          ? 'Show tasks'
          : 'Hide tasks'}
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
            {tasks?.map(task => (
              <div
                key={task.id}
                className="rounded-md bg-foreground p-4 !pt-3 shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-semibold text-gray-200">
                      {task.title}
                    </h4>
                    <span className="text-sm text-gray-200">
                      {task.description}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-200">
                      {task.weight} <Wine className="h-4 w-4 stroke-red-600" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-right">
                    <div className="flex items-center gap-8"></div>
                    <Button
                      variant="destructive"
                      className="select-none text-gray-200 disabled:bg-gray-400/20"
                      onClick={() => mutate({ taskId: task.id })}
                      disabled={game.started || game.finished}
                    >
                      Delete task
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
