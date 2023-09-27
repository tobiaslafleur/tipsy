'use client';

import { useForm } from 'react-hook-form';

import { tipsyFetch } from '~/lib/utils';
import { queryClient } from '~/providers/query';

type Input = {
  title: string;
};

export default function GameForm() {
  const { register, handleSubmit } = useForm<Input>({
    defaultValues: {
      title: '',
    },
  });

  async function onSubmit(data: Input) {
    try {
      await tipsyFetch('http://localhost:4000/api/v1/games', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      queryClient.invalidateQueries(['games']);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <label className="text-gray-200">Game title</label>
      <input
        className="bg-gray-200 rounded-md px-2 py-2"
        {...register('title')}
      />
    </form>
  );
}
