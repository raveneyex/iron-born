import type { CompletedExercise } from '@/types/exercise';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

export const completedExercisesTableColumns: ColumnDef<CompletedExercise>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Exercise
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      return <div>{row.original.sets.length}</div>;
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
    accessorKey: 'reps',
    cell: ({ row }) => {
      return <div>{row.original.sets.reduce((acc, set) => acc + (set.reps ?? 0), 0)}</div>;
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
    accessorKey: 'weight',
    cell: ({ row }) => {
      console.log('Row', row);
      const originalWeight = row.original.sets.reduce((acc, set) => acc + (set.weight?.weight ?? 0), 0);
      if (!originalWeight) {
        return <div>--</div>;
      }
      return (
        <div>
          {originalWeight} {row.original.sets[0].weight?.units}
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
];
