import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

export function renderWithRedux(component: React.ReactElement, store: Store) {
  return render(<Provider store={store}>{component}</Provider>);
}
