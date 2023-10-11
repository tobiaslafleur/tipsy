import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TaskForm from '~/components/play/taskForm';
import { Task } from '~/components/play/tasks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';

export default function TaskDialog({
  task,
  gameId,
}: {
  task: Task;
  gameId: string;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team: '',
      file: undefined,
    },
  });

  return (
    <Dialog
      key={task.id}
      onOpenChange={() => {
        form.reset();
        setOpen(prev => !prev);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <div
          key={task.id}
          className="cursor-pointer select-none rounded-md border-2 border-transparent bg-foreground/40 px-4 py-2 text-gray-200 shadow hover:border-primary hover:bg-primary/30"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm">{task.description}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="!w-96 border-2 border-gray-200/10 bg-background">
        <DialogHeader className="text-2xl font-semibold text-gray-200">
          {task.title}
        </DialogHeader>
        <DialogDescription className="text-sm text-gray-200">
          {task.description}
        </DialogDescription>
        <TaskForm task={task} gameId={gameId} form={form} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  team: z.string().min(1, 'Please select a team'),
  file: z.any(),
});
