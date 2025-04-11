import React, { FormEvent } from 'react';

interface Props {
  title: string;
  method: string;
  setTitle: (value: string) => void;
  setMethod: (value: string) => void;
  addItem: () => void;
}

const CheatSheetForm: React.FC<Props> = ({
  title,
  method,
  setTitle,
  setMethod,
  addItem
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addItem();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded shadow-sm" data-testid="cheatsheet-form">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-medium">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          data-testid="title-input"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="method" className="block mb-1 font-medium">方法</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
          data-testid="method-input"
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        data-testid="submit-button"
      >
        登録
      </button>
    </form>
  );
};

export default CheatSheetForm;
