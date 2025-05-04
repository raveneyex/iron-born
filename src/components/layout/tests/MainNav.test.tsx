import { render } from '@testing-library/react';
import * as reactRouterModule from 'react-router';
import { describe, expect, it } from 'vitest';
import { MainNav } from '../MainNav';

const { Route, Routes, MemoryRouter } = reactRouterModule;

describe('MainNav', () => {
  it('renders all navigation items', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <MainNav />
      </MemoryRouter>
    );

    expect(getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'History' })).toBeInTheDocument();
  });

  it('marks active link based on current location', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MainNav />
      </MemoryRouter>
    );

    const dashboardLink = getByRole('link', { name: 'Dashboard' });
    const historyLink = getByRole('link', { name: 'History' });

    expect(dashboardLink).toHaveAttribute('data-active', 'true');
    expect(historyLink).toHaveAttribute('data-active', 'false');
  });

  it('navigates to correct route when link is clicked', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<MainNav />} />
        </Routes>
      </MemoryRouter>
    );

    const historyLink = getByRole('link', { name: 'History' });
    expect(historyLink).toHaveAttribute('href', '/history');
  });
});
