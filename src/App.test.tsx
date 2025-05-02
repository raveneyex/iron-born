import { test, expect } from "vitest";
import { render } from '@testing-library/react';

import sum from "./sum";
import App from "./App";

test("sum", () => {
  const { getByText } = render(<App />);
  expect(getByText("Click on the React logo to learn more")).toBeDefined();
  expect(sum(1, 2)).toBe(3);
});
