import React, { useState, useEffect } from 'react';
import './index.css';

export interface CheatSheetItem {
  id: string;
  title: string;
  method: string;
}

const STORAGE_KEY_ITEMS = 'cheatsheet-items';
const STORAGE_KEY_TITLE = 'cheatsheet-title';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [sheetTitle, setSheetTitle] = useState(() => {
    const storedTitle = localStorage.getItem(STORAGE_KEY_TITLE);
    return storedTitle || '';
  });

  // LocalStorage から初期値を取得
  const [items, setItems] = useState<CheatSheetItem[]>(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY_ITEMS);
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // LocalStorage に保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    localStorage.setItem(STORAGE_KEY_TITLE, sheetTitle);
    setJsonInput(JSON.stringify(items, null, 2));
  }, [items, sheetTitle]);

  // 新しい項目を追加
  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !method.trim()) return;

    const newItem: CheatSheetItem = {
      id: Date.now().toString(),
      title: title.trim(),
      method: method.trim(),
    };

    setItems(prev => [...prev, newItem]);
    setTitle('');
    setMethod('');
  };

  // 項目を削除
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // JSONエディタを保存
  const saveJson = () => {
    try {
      const parsedItems: CheatSheetItem[] = JSON.parse(jsonInput);
      if (Array.isArray(parsedItems) && parsedItems.every(item => item.id && item.title && item.method)) {
        setItems(parsedItems);
      } else {
        alert('無効なJSON形式です。');
      }
    } catch (error) {
      alert('JSONの解析に失敗しました。');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8 text-center print:hidden">
        <h1 className="text-3xl font-bold mb-2">チートシートファクトリー</h1>
        <p className="text-gray-600">知識やノウハウを簡単に管理してA4用紙で出力できます</p>
      </header>

      {sheetTitle && (
        <h2 className="text-2xl font-bold mb-6 text-center">{sheetTitle}</h2>
      )}
      <div className="grid grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="p-3 bg-white border border-gray-200 rounded shadow-sm relative flex items-center">
            <button
              className="absolute right-5 text-3xl text-gray-400 hover:text-red-500 print:hidden"
              onClick={() => removeItem(item.id)}
              aria-label="Remove item"
            >
              ×
            </button>
            <div className="text-sm min-w-[120px] mr-4 pr-2 flex-1">{item.title}</div>
            <div className="text-sm whitespace-pre-wrap flex-1">{item.method}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-emerald-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          印刷
        </button>
      </div>

      <main className="mt-8">
        <section className="mb-8 print:hidden">
          <label htmlFor="sheetTitle" className="block mb-2 text-lg font-semibold">チートシートタイトル</label>
          <input
            type="text"
            id="sheetTitle"
            value={sheetTitle}
            onChange={(e) => setSheetTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="チートシートのタイトルを入力してください"
          />
        </section>

        <section className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md print:hidden">
          <h2 className="text-xl font-bold mb-4">新しい項目を追加</h2>
          <form onSubmit={addItem}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 text-lg font-medium">やりたいこと</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="method" className="block mb-2 text-lg font-medium">方法</label>
              <textarea
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[120px]"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-sky-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                登録
              </button>
            </div>
          </form>
        </section>

        <section className="p-6 bg-gray-50 rounded-lg shadow-md print:hidden">
          <h2 className="text-xl font-bold mb-4">JSONエディタ</h2>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[200px]"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={saveJson}
              className="bg-sky-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              保存
            </button>
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 print:hidden">
        <p>&copy; {new Date().getFullYear()} チートシートファクトリー</p>
      </footer>
    </div>
  );
};

export default App;
