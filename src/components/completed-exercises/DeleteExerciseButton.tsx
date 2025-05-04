import { useAppDispatch } from '@/redux/hooks';
import { deleteExercise } from '@/redux/slices/exercisesSlice';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

interface DeleteExerciseButtonProps {
  exerciseId: string;
  exerciseName: string;
}

export function DeleteExerciseButton(props: DeleteExerciseButtonProps) {
  const { exerciseId, exerciseName } = props;

  const dispatch = useAppDispatch();

  const handleDeleteExercise = () => {
    dispatch(deleteExercise(exerciseId));
    toast.success(`${exerciseName} deleted`);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleDeleteExercise}>
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
