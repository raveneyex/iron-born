import { ActiveExercise } from '@/types/exercise';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { AddExerciseForm } from './AddExerciseForm';

interface AddExerciseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddExercise: (exercise: ActiveExercise) => void;
}

export function AddExerciseDialog(props: AddExerciseDialogProps) {
  const { open, setOpen, onAddExercise } = props;

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
          <DialogDescription className="text-sm">Fields marked with (*) are mandatory.</DialogDescription>
        </DialogHeader>
        <AddExerciseForm onSubmit={onAddExercise} />
      </DialogContent>
    </Dialog>
  );
}
