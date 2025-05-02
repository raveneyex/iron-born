import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

import App from './App.tsx'

import './index.css'

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(container)
  .render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  );
