import type { CompletedExercise } from '@/types/exercise';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { DeleteExerciseButton } from './DeleteExerciseButton';

export const completedExercisesTableColumns: ColumnDef<CompletedExercise>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Exercise
          <ArrowUpDown className="ml-2 h-4 w-4" />
          <span className="sr-only">Sort by exercise name</span>
        </Button>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Sets
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: 'sets',
    cell: ({ row }) => {
      return <div>{row.original.totalSets}</div>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Reps
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: 'totalReps',
    cell: ({ row }) => {
      return <div>{row.original.totalReps}</div>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Weight
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: 'totalWeight',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.totalWeight} {row.original.weightUnits}
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
  {
    id: 'delete',
    cell: ({ row }) => {
      return <DeleteExerciseButton exerciseId={row.original.id} exerciseName={row.original.name} variant="icon" />;
    },
  },
];
