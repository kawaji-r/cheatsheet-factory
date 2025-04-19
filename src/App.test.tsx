import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders print button', () => {
    render(<App />);
    const printButton = screen.getByRole('button', { name: /印刷/i });
    expect(printButton).toBeInTheDocument();
  });

  test('print button triggers window.print', () => {
    const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});
    render(<App />);
    const printButton = screen.getByRole('button', { name: /印刷/i });
    fireEvent.click(printButton);
    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });
});
