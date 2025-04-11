import React, { forwardRef } from 'react';
import { CheatSheetItem as CheatSheetItemType } from '../types';

interface Props {
  item: CheatSheetItemType;
  onRemove: (id: string) => void;
}

const CheatSheetItem = forwardRef<HTMLDivElement, Props>(({ item, onRemove }, ref) => {
  return (
    <div
      ref={ref}
      className="p-3 mb-3 bg-white border border-gray-200 rounded shadow-sm relative"
      data-testid="cheatsheet-item"
    >
      <button
        className="absolute top-1 right-1 text-gray-400 hover:text-red-500"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
        data-testid="remove-button"
      >
        ×
      </button>
      <h3 className="font-bold text-lg mb-2 pr-5" data-testid="item-title">{item.title}</h3>
      <div className="text-sm whitespace-pre-wrap" data-testid="item-method">{item.method}</div>
    </div>
  );
});

export default CheatSheetItem;
