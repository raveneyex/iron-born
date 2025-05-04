import type { CompletedExercise } from '@/types/exercise';
import { ColumnDef } from '@tanstack/react-table';

export const completedExercisesTableColumns: ColumnDef<CompletedExercise>[] = [
  {
    accessorKey: 'name',
    header: 'Exercise',
    cell: ({ row }) => {
      return <div className="w-3/5truncate">{row.original.name}</div>;
    },
  },
  {
    header: 'Sets',
    accessorKey: 'sets',
  },
  {
    header: 'Reps',
    accessorKey: 'reps',
  },
  {
    header: 'Weight',
    accessorKey: 'weight',
  },
  {
    header: 'Date',
    accessorKey: 'dateCompleted',
    cell: ({ row }) => {
      const date = new Date(row.original.dateCompleted);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    },
  },
];
