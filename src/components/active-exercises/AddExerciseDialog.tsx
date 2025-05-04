import { IExercise } from '@/types/exercise';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ExerciseForm } from './AddExerciseForm';

interface AddExerciseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddExercise: (exercise: IExercise) => void;
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
        </DialogHeader>
        <DialogDescription className="text-sm">Fields marked with (*) are mandatory.</DialogDescription>

        <ExerciseForm onSubmit={onAddExercise} />
      </DialogContent>
    </Dialog>
  );
}
