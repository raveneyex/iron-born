import { CompletedExercisesTable } from '@/components/completed-exercises/CompletedExercisesTable';

export function HistoryPage() {
  return (
    <div className="flex flex-col w-full p-4 justify-center self-center items-center">
      <h1 className="text-2xl font-bold mb-8">Here's Everything You've Completed!</h1>
      <CompletedExercisesTable />
    </div>
  );
}
