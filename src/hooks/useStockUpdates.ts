import { useEffect } from "react";
import { wsService } from "@/services/websocket.service";
import { useItemStore } from "@/store/item-store";

type StockUpdateMessage = {
  attireCode: string;
  attireStock: number;
};

export function useStockUpdates() {
  useEffect(() => {
    console.log(
      "🌐 [WEBSOCKET] Connecting and subscribing to stock updates..."
    );
    wsService.connect();

    wsService.subscribe("/topic/stock-updates", (message: unknown) => {
      const data = message as StockUpdateMessage;
      console.log("📦 [WEBSOCKET] Stock update received:", data);
      useItemStore
        .getState()
        .updateItemStock(data.attireCode, data.attireStock);
    });

    return () => {
      console.log("🔌 [WEBSOCKET] Disconnecting...");
      wsService.disconnect();
    };
  }, []);
}
