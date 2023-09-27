'use client';

import { useForm } from 'react-hook-form';

import { tipsyFetch } from '~/lib/utils';
import { queryClient } from '~/providers/query';

type Props = {
  game_id: string;
};

type Input = {
  type: 'QUEST' | 'PICTURE' | 'VENDOR' | 'NONE';
  title: string;
  description: string;
  weight: number;
};

export default function TaskForm({ game_id }: Props) {
  const { register, handleSubmit } = useForm<Input>({
    defaultValues: {
      type: 'NONE',
      title: '',
      description: '',
      weight: 0,
    },
  });

  async function onSubmit(data: Input & { game_id: string }) {
    try {
      await tipsyFetch('http://localhost:4000/api/v1/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      queryClient.invalidateQueries(['tasks', game_id]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="flex gap-4"
      onSubmit={handleSubmit((data) => onSubmit({ ...data, game_id }))}
    >
      <input
        className="rounded-md px-2"
        placeholder="type"
        {...register('type')}
      />
      <input
        className="rounded-md px-2"
        placeholder="title"
        {...register('title')}
      />
      <input
        className="rounded-md px-2"
        placeholder="description"
        {...register('description')}
      />
      <input
        className="rounded-md px-2"
        placeholder="weight"
        {...register('weight')}
      />
      <button className="text-indigo-400 font-semibold border-indigo-400 border-2 px-4 py-2 rounded-md">
        Create task
      </button>
    </form>
  );
}
