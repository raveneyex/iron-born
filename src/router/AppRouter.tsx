import { AppLayout } from '@/components/layout/AppLayout';
import { Route, Routes } from 'react-router';
import App from '../App';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<App />} />
      </Route>
    </Routes>
  );
}
