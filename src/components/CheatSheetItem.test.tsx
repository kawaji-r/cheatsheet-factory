import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheatSheetItem from './CheatSheetItem';

const mockItem = {
  id: 'test-id-1',
  title: 'Test Title',
  method: 'Test Method',
};

const mockOnRemove = jest.fn();

describe('CheatSheetItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders item content correctly', () => {
    render(<CheatSheetItem item={mockItem} onRemove={mockOnRemove} />);
    
    expect(screen.getByTestId('item-title')).toHaveTextContent('Test Title');
    expect(screen.getByTestId('item-method')).toHaveTextContent('Test Method');
  });

  test('calls onRemove when remove button is clicked', () => {
    render(<CheatSheetItem item={mockItem} onRemove={mockOnRemove} />);
    
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    
    expect(mockOnRemove).toHaveBeenCalledWith('test-id-1');
  });
});
