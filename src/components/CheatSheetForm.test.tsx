import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheatSheetForm from './CheatSheetForm';

const mockSetTitle = jest.fn();
const mockSetMethod = jest.fn();
const mockAddItem = jest.fn();

const defaultProps = {
  title: '',
  method: '',
  setTitle: mockSetTitle,
  setMethod: mockSetMethod,
  addItem: mockAddItem,
};

describe('CheatSheetForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(<CheatSheetForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/タイトル/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/方法/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('updates title input correctly', () => {
    render(<CheatSheetForm {...defaultProps} />);
    
    const titleInput = screen.getByTestId('title-input');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    
    expect(mockSetTitle).toHaveBeenCalledWith('Test Title');
  });

  test('updates method input correctly', () => {
    render(<CheatSheetForm {...defaultProps} />);
    
    const methodInput = screen.getByTestId('method-input');
    fireEvent.change(methodInput, { target: { value: 'Test Method' } });
    
    expect(mockSetMethod).toHaveBeenCalledWith('Test Method');
  });

  test('calls addItem when form is submitted', () => {
    render(<CheatSheetForm {...defaultProps} />);
    
    const form = screen.getByTestId('cheatsheet-form');
    fireEvent.submit(form);
    
    expect(mockAddItem).toHaveBeenCalledTimes(1);
  });
});
