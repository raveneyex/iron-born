export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export const RequestStatuses: Record<string, RequestStatus> = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
};
