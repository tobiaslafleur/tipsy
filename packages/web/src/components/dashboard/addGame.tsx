'use client';

import { useState } from 'react';
import AddGameForm from '~/components/dashboard/addGameForm';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';

function AddGame() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-200">Games</h2>
      <Dialog onOpenChange={() => setOpen(!open)} open={open}>
        <DialogTrigger asChild>
          <Button className="text-gray-200">Create New Game</Button>
        </DialogTrigger>
        <DialogContent className="!w-96 border-2 border-gray-200/10 bg-background">
          <DialogHeader className="text-2xl font-semibold text-gray-200">
            Create New Game
          </DialogHeader>
          <AddGameForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddGame;
