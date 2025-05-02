import { RotatingQuotes } from '@/components/rotating-quotes/RotatingQuotes';

export function DashboardPage() {
  return (
    <div className="flex flex-col w-4/5 justify-center self-center items-center">
      <h1 className="text-2xl font-bold mb-8">Let's Pump Some Iron!</h1>
      <RotatingQuotes />
    </div>
  );
}
