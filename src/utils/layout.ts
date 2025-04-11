import { CheatSheetItem } from '../types';

// A4サイズの寸法 (mm)
const A4_WIDTH = 297; // 横置き
const A4_HEIGHT = 210;

// コンテンツ領域のサイズ（余白を考慮）
const CONTENT_MARGIN = 20;
const CONTENT_HEIGHT = A4_HEIGHT - (CONTENT_MARGIN * 2);

// 3列レイアウト用のカラム計算
const COLUMN_COUNT = 3;
const COLUMN_GAP = 10;

export const calculateLayout = (items: CheatSheetItem[]): CheatSheetItem[][] => {
  const columns: CheatSheetItem[][] = [[], [], []];
  const columnHeights = [0, 0, 0];
  
  items.forEach(item => {
    if (!item.height) return;
    
    const itemHeight = item.height; // 型を確定するために変数に代入
    
    // 最も高さが低いカラムを見つける
    const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
    
    // 現在のカラム高さとアイテム高さの合計がA4の高さを超える場合、次のカラムへ
    if (columnHeights[minHeightIndex] + itemHeight > CONTENT_HEIGHT) {
      // すべてのカラムが埋まっている場合は、強制的に最も低いカラムに追加
      if (columnHeights.every(height => height + itemHeight > CONTENT_HEIGHT)) {
        columns[minHeightIndex].push(item);
        columnHeights[minHeightIndex] += itemHeight;
      } else {
        // まだ空きのあるカラムを探す
        const availableIndex = columnHeights.findIndex(height => height + itemHeight <= CONTENT_HEIGHT);
        if (availableIndex !== -1) {
          columns[availableIndex].push(item);
          columnHeights[availableIndex] += itemHeight;
        } else {
          // 全てのカラムが埋まっている場合は最も低いカラムに追加
          columns[minHeightIndex].push(item);
          columnHeights[minHeightIndex] += itemHeight;
        }
      }
    } else {
      // 高さが足りるのでそのカラムに追加
      columns[minHeightIndex].push(item);
      columnHeights[minHeightIndex] += itemHeight;
    }
  });
  
  return columns;
};
