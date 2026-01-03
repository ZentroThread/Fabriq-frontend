import { useEffect } from 'react';
import { wsService } from '@/services/websocket.service';
import { useItemStore } from '@/store/item-store';

type StockUpdateMessage = {
  attireCode: string;
  attireStock: number;
};

export function useStockUpdates() {
  useEffect(() => {
    wsService.connect();

    wsService.subscribe('/topic/stock-updates', (message: unknown) => {
      const data = message as StockUpdateMessage;
      useItemStore.getState().updateItemStock(data.attireCode, data.attireStock);
    });

    return () => wsService.disconnect();
  }, []);
}