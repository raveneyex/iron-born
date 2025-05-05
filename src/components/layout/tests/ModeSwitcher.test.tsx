import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ModeSwitcher } from '../ModeSwitcher';
import { ThemeProvider } from '../ThemeProvider';

const setThemeMock = vi.fn();
const themeMock = vi.fn().mockReturnValue('light');

vi.mock(import('../ThemeProvider'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTheme: () => ({
      theme: themeMock(),
      setTheme: setThemeMock,
    }),
  };
});

describe('ModeSwitcher', () => {
  beforeEach(() => {
    setThemeMock.mockClear();
  });

  it('switches from light to dark theme when clicked', async () => {
    const { getByRole } = render(
      <ThemeProvider defaultTheme="light">
        <ModeSwitcher />
      </ThemeProvider>
    );

    const button = getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });

  it('switches from dark to light theme when clicked', async () => {
    themeMock.mockReturnValue('dark');
    const { getByRole } = render(
      <ThemeProvider defaultTheme="dark">
        <ModeSwitcher />
      </ThemeProvider>
    );

    const button = getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});
