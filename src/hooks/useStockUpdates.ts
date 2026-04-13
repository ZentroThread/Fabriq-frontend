// import { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { wsService } from "@/services/websocket.service";
// import { useItemStore } from "@/store/item-store";
// import { QUERY_KEYS } from "@/constants/query-keys";
// import type { Item } from "@/hooks/useItems";

// type StockUpdateMessage = {
//   attireCode: string;
//   attireStock: number;
// };

// export function useStockUpdates() {
//   const queryClient = useQueryClient();
//   const updateItemStock = useItemStore((s) => s.updateItemStock);
//   const setItems = useItemStore((s) => s.setItems);

//   useEffect(() => {
//     
//     wsService.connect();

//     wsService.subscribe("/topic/stock-updates", (message: unknown) => {
//       const data = message as StockUpdateMessage;
//       

//       const { attireCode, attireStock } = data;

//       if (attireCode && attireStock !== undefined) {
//         // 1. Update Zustand store (persisted to localStorage)
//         updateItemStock(attireCode, attireStock);

//         // 2. Update React Query cache optimistically
//         queryClient.setQueryData<Item[]>(QUERY_KEYS.ITEMS.ALL, (oldData) => {
//           if (!oldData) return oldData;
//           const updated = oldData.map((item) =>
//             item.code === attireCode ? { ...item, stock: attireStock } : item
//           );
//           
//           return updated;
//         });

//         // 3. Sync React Query → Zustand
//         const updatedData = queryClient.getQueryData<Item[]>(
//           QUERY_KEYS.ITEMS.ALL
//         );
//         if (updatedData) {
//           setItems(updatedData);
//         }

//         // ❌ REMOVED invalidateQueries - this was causing the rollback
//       }
//     });

//     return () => {
//       
//       wsService.disconnect();
//     };
//   }, [queryClient, updateItemStock, setItems]);
// }
