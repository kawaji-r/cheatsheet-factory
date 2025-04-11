import { CheatSheetItem } from '../types';

const STORAGE_KEY = 'cheatsheet-items';

export const saveItems = (items: CheatSheetItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const getItems = (): CheatSheetItem[] => {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};
