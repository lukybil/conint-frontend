import { render, screen } from '@testing-library/react';
import App, { Card } from './App';

test('renders Get Cards button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Get Cards/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Token input field', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('User token');
  expect(inputElement).toHaveAttribute('id', 'input-userToken');
  expect(inputElement).toBeInTheDocument();
});

test('renders Card', () => {
  render(<Card card={{ id: '0', race: 6, damage: 85, element: 1 }} />);
  expect(screen.getByText('Water Kraken')).toBeInTheDocument();
  expect(screen.getByText('Kraken')).toBeInTheDocument();
  expect(screen.getByText('85')).toBeInTheDocument();
});
