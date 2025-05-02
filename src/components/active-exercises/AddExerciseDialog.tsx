import { IExercise } from '@/types/exercise';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ExerciseForm } from './ExerciseForm';

interface AddExerciseDialogProps {
  onAddExercise: (exercise: IExercise) => void;
}

export function AddExerciseDialog(props: AddExerciseDialogProps) {
  const { onAddExercise } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <Button onClick={() => setOpen(true)}>Add Exercise</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new exercise</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm">Fields marked with (*) are mandatory.</DialogDescription>

        <ExerciseForm onSubmit={onAddExercise} />
      </DialogContent>
    </Dialog>
  );
}
