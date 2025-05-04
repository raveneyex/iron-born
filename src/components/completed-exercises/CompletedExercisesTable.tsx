import { useAppSelector } from '@/redux/hooks';
import { selectCompletedExercises } from '@/redux/slices/exercisesSlice';
import { DataTable } from '../data-table/DataTable';
import { completedExercisesTableColumns } from './CompletedExercisesTableColumns';

export function CompletedExercisesTable() {
  const completedExercises = useAppSelector(selectCompletedExercises);

  return <DataTable columns={completedExercisesTableColumns} data={completedExercises} />;
}
