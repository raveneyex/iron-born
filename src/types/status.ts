export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export const statuses: Record<string, Status> = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
};
