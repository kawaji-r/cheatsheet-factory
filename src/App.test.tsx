import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/チートシートファクトリー/i);
  expect(headerElement).toBeInTheDocument();
});
