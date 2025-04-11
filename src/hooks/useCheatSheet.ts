import { useState, useEffect, useRef, RefObject, createRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheatSheetItem } from '../types';
import { saveItems, getItems } from '../utils/storage';
import { calculateLayout } from '../utils/layout';

export const useCheatSheet = () => {
  const [items, setItems] = useState<CheatSheetItem[]>([]);
  const [columns, setColumns] = useState<CheatSheetItem[][]>([[], [], []]);
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const itemRefs = useRef<Map<string, RefObject<HTMLDivElement>>>(new Map());
  
  // LocalStorage から項目を読み込む
  useEffect(() => {
    const storedItems = getItems();
    setItems(storedItems);
  }, []);

  // itemsが変更されたらLayoutを再計算し、LocalStorageを更新
  useEffect(() => {
    saveItems(items);
    
    // 高さ測定後にレイアウト計算
    setTimeout(() => {
      const itemsWithHeight = items.map(item => {
        const ref = itemRefs.current.get(item.id);
        const height = ref?.current?.offsetHeight || 0;
        return { ...item, height };
      });
      
      const newColumns = calculateLayout(itemsWithHeight);
      setColumns(newColumns);
    }, 0);
  }, [items]);

  // 新しい項目を追加
  const addItem = () => {
    if (!title.trim() || !method.trim()) return;
    
    const newItem: CheatSheetItem = {
      id: uuidv4(),
      title: title.trim(),
      method: method.trim(),
    };
    
    setItems(prev => [...prev, newItem]);
    
    // 新しいアイテム用の参照を作成
    itemRefs.current.set(newItem.id, createRef());
    
    // フォームをリセット
    setTitle('');
    setMethod('');
  };

  // 項目を削除
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    itemRefs.current.delete(id);
  };

  return {
    items,
    columns,
    title,
    setTitle,
    method,
    setMethod,
    addItem,
    removeItem,
    itemRefs
  };
};