import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello message', () => {
  render(<App />);
  const helloParagraph = screen.getByText(/hello fabriqfrontend/i);
  expect(helloParagraph).toBeInTheDocument();
});
