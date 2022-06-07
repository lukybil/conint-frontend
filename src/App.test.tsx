import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders Get Cards button test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Get Cards/i);
  expect(linkElement).toBeInTheDocument();
});
