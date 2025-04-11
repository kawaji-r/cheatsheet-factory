import React, { useRef, useEffect, useState, createRef } from 'react';
import CheatSheetItem from './CheatSheetItem';
import { CheatSheetItem as CheatSheetItemType } from '../types';

interface Props {
  columns: CheatSheetItemType[][];
  itemRefs: React.MutableRefObject<Map<string, React.RefObject<HTMLDivElement>>>;
  onRemove: (id: string) => void;
}

const A4Layout: React.FC<Props> = ({ columns, itemRefs, onRemove }) => {
  const a4Ref = useRef<HTMLDivElement>(null);
  const [printMode, setPrintMode] = useState(false);
  
  // A4サイズの設定
  const A4_ASPECT_RATIO = 210 / 297; // 高さ/幅
  const A4_LANDSCAPE_RATIO = 297 / 210; // 横置きの場合の比率
  
  // プリントモードの切り替え
  const togglePrintMode = () => {
    setPrintMode(!printMode);
  };
  
  // 印刷用にページ指定を開始
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="mt-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">チートシートプレビュー</h2>
        <div>
          <button 
            onClick={togglePrintMode} 
            className="bg-gray-200 px-3 py-1 rounded mr-2 hover:bg-gray-300"
            data-testid="toggle-print-mode"
          >
            {printMode ? 'プレビュー表示' : 'A4表示'}
          </button>
          <button 
            onClick={handlePrint} 
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            data-testid="print-button"
          >
            印刷
          </button>
        </div>
      </div>
      
      <div 
        ref={a4Ref}
        className={`mx-auto bg-white shadow-lg relative ${printMode ? 'p-5 print:p-0' : 'p-4'}`}
        style={{
          width: printMode ? '210mm' : '100%',
          height: printMode ? '297mm' : 'auto',
          aspectRatio: printMode ? '210/297' : 'auto',
          pageBreakAfter: 'always',
        }}
        data-testid="a4-layout"
      >
        <div className="grid grid-cols-3 gap-4 h-full">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col" data-testid={`column-${colIndex}`}>
              {column.map(item => {
                // 予め作成した参照を取得、または新しく作成
                let ref = itemRefs.current.get(item.id);
                if (!ref) {
                  ref = createRef<HTMLDivElement>();
                  itemRefs.current.set(item.id, ref);
                }
                
                return (
                  <CheatSheetItem 
                    key={item.id} 
                    item={item} 
                    onRemove={onRemove}
                    ref={ref}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default A4Layout;
