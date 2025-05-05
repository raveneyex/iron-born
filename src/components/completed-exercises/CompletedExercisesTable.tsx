import { completedExercisesTableColumns } from './CompletedExercisesTableColumns';

import { DataTable } from '@/components/data-table/DataTable';
import { useAppSelector } from '@/redux/hooks';
import { selectCompletedExercises } from '@/redux/slices/exercisesSlice';

export function CompletedExercisesTable() {
  const completedExercises = useAppSelector(selectCompletedExercises);

  return <DataTable columns={completedExercisesTableColumns} data={completedExercises} />;
}
