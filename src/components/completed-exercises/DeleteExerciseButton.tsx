import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { deleteExercise } from '@/redux/slices/exercisesSlice';

interface DeleteExerciseButtonProps {
  exerciseId: string;
  exerciseName: string;
  variant?: 'icon' | 'default';
}

export function DeleteExerciseButton(props: DeleteExerciseButtonProps) {
  const { exerciseId, exerciseName, variant = 'default' } = props;

  const dispatch = useAppDispatch();

  const handleDeleteExercise = () => {
    dispatch(deleteExercise(exerciseId));
    toast.success(`${exerciseName} deleted`);
  };

  const buttonSize = variant === 'icon' ? 'icon' : 'default';

  const buttonVariant = variant === 'icon' ? 'outline' : 'destructive';

  return (
    <Button variant={buttonVariant} size={buttonSize} onClick={handleDeleteExercise}>
      {variant === 'icon' ? <TrashIcon className="w-4 h-4" /> : 'Delete Exercise'}
      <span className="sr-only">Delete Exercise</span>
    </Button>
  );
}
