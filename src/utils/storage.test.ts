import { saveItems, getItems } from './storage';
import { CheatSheetItem } from '../types';

describe('Storage Utils', () => {
  beforeEach(() => {
    // LocalStorage のモック
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    
    // LocalStorage をクリア
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('saveItems saves items to localStorage', () => {
    const testItems: CheatSheetItem[] = [
      { id: '1', title: 'Test 1', method: 'Method 1' }
    ];
    
    saveItems(testItems);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cheatsheet-items', 
      JSON.stringify(testItems)
    );
  });

  test('getItems returns items from localStorage', () => {
    const testItems: CheatSheetItem[] = [
      { id: '1', title: 'Test 1', method: 'Method 1' }
    ];
    
    localStorage.setItem('cheatsheet-items', JSON.stringify(testItems));
    
    const result = getItems();
    
    expect(result).toEqual(testItems);
    expect(localStorage.getItem).toHaveBeenCalledWith('cheatsheet-items');
  });

  test('getItems returns empty array when localStorage is empty', () => {
    const result = getItems();
    
    expect(result).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith('cheatsheet-items');
  });
});
