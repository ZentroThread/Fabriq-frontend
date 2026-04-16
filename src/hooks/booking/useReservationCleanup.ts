import { useEffect, useRef } from "react";
import useBillingStore from "@/store/billing-store";

export function useReservationCleanup() {
  const items = useBillingStore((s) => s.items);
  const clearAll = useBillingStore((s) => s.clearAll);
  const isConfirming = useRef(false);
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    const beforeUnloadHandler = () => {};

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);

      const cleanup = async () => {
        const currentItems = itemsRef.current;
        if (isConfirming.current || currentItems.length === 0) return;
        clearAll();
      };

      cleanup();
    };
  }, []);
  return {
    markConfirming: () => {
      isConfirming.current = true;
    },
  };
}
