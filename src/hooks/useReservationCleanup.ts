import { useEffect, useRef } from "react";
import useBillingStore from "@/store/billing-store";
import { itemService } from "@/services/item.service";

export function useReservationCleanup() {
  const items = useBillingStore((s) => s.items);
  const clearAll = useBillingStore((s) => s.clearAll);
  const selectedCustomer = useBillingStore((s) => s.selectedCustomer);

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
    return () => {
      const cleanup = async () => {
        const currentItems = itemsRef.current;

        // Don't cleanup if user is confirming order
        if (isConfirming.current || currentItems.length === 0) return;

        console.log(
          "🧹 [CLEANUP] Unreserving items on unmount:",
          currentItems.length
        );

        // Unreserve all items in parallel
        const promises = currentItems.map((item) =>
          itemService
            .unreserveItem({
              attireCode: item.itemCode,
              customerCode:
                item.customerCode || selectedCustomer?.custCode || "",
            })
            .catch((err) => {
              console.error("Failed to unreserve:", item.itemCode, err);
            })
        );

        await Promise.all(promises);
        console.log("✅ [CLEANUP] All items unreserved");
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
