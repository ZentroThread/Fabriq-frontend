import { useEffect, useRef } from "react";
import useBillingStore from "@/store/billing-store";

export function useReservationCleanup() {
  const items = useBillingStore((s) => s.items);
  const clearAll = useBillingStore((s) => s.clearAll);
  // const selectedCustomer = useBillingStore((s) => s.selectedCustomer);

  // Track if we're currently confirming an order
  const isConfirming = useRef(false);
  // Store the items at mount time to cleanup on unmount only
  const itemsRef = useRef(items);

  // Update the ref whenever items change (but don't trigger cleanup)
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    // Run cleanup ONLY when component unmounts (page navigation)
    const beforeUnloadHandler = () => {
      // No unreserve calls needed - handled by frontend only
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);

      const cleanup = async () => {
        const currentItems = itemsRef.current;

        // Don't cleanup if user is confirming order
        if (isConfirming.current || currentItems.length === 0) return;


        // Clear billing store locally (no API calls needed)
        clearAll();
      };

      cleanup();
    };
  }, []); // Empty dependency array - only run on mount/unmount

  // Return function to mark order as confirming
  return {
    markConfirming: () => {
      isConfirming.current = true;
    },
  };
}
