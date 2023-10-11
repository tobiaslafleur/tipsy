'use client';

import { useState } from 'react';
import AddTaskForm from '~/components/dashboard/addTaskForm';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';

function AddTask({ gameId }: { gameId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-gray-200 hover:text-gray-400">
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-96 border-2 border-gray-200/10 bg-background">
        <DialogHeader className="text-2xl font-semibold text-gray-200">
          Add new task
        </DialogHeader>
        <AddTaskForm setOpen={setOpen} gameId={gameId} />
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
