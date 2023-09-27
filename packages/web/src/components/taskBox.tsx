'use client';

type Props = {
  task: Task;
};

export type Task = {
  id: string;
  game_id: string;
  type: string;
  title: string;
  description: string;
  weight: number;
  created_at: string;
  updated_at: string;
};

export default function TaskBox({ task }: Props) {
  return (
    <div className="border rounded-md p-2 flex gap-2">
      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-200">{task.title}</h3>
        <p className="text-gray-200 text-sm">{task.description}</p>
        <p className="text-gray-200 text-sm">{task.weight} Sips</p>
        <p className="text-gray-200 text-sm">{task.type}</p>
      </div>
    </div>
  );
}
