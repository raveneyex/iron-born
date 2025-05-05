import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import type { Store } from '@reduxjs/toolkit';

export function renderWithRedux(component: React.ReactElement, store: Store) {
  return render(<Provider store={store}>{component}</Provider>);
}
