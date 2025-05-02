import { test, expect } from "vitest";
import { render } from '@testing-library/react';

import App from "./App";

test("sum", () => {
  const { getByText } = render(<App />);
  expect(getByText("Click on the Vite and React logos to learn more")).toBeDefined();
});
