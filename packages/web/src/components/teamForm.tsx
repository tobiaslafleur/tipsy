'use client';

import { useForm } from 'react-hook-form';

import { tipsyFetch } from '~/lib/utils';
import { queryClient } from '~/providers/query';

type Props = {
  gameId: string;
};

type Input = {
  name: string;
};

export default function TeamForm({ gameId }: Props) {
  const { register, handleSubmit } = useForm<Input>({
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(data: Input & { game_id: string }) {
    try {
      await tipsyFetch('http://localhost:4000/api/v1/teams', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      queryClient.invalidateQueries(['teams', gameId]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="flex gap-4"
      onSubmit={handleSubmit(({ name }) => onSubmit({ name, game_id: gameId }))}
    >
      <input className="rounded-md px-2" {...register('name')} />
      <button className="text-indigo-400 font-semibold border-indigo-400 border-2 px-4 py-2 rounded-md">
        Create team
      </button>
    </form>
  );
}
