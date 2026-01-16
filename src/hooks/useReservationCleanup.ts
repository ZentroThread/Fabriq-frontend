import { useEffect, useRef } from "react";
import useBillingStore from "@/store/billing-store";
import { itemService } from "@/services/item.service";
import { API_BASE_URL } from "@/constants/constdata";
import { API_ENDPOINTS } from "@/constants/api.constants";

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
    // Also register a beforeunload handler that uses sendBeacon / fetch keepalive
    const beforeUnloadHandler = () => {
      const currentItems = itemsRef.current;

      if (isConfirming.current || currentItems.length === 0) return;

      console.log(
        "🧹 [CLEANUP] (beforeunload) Unreserving items:",
        currentItems.length
      );

      // Try to use navigator.sendBeacon for reliable delivery during unload
      currentItems.forEach((item) => {
        const payload = JSON.stringify({
          attireCode: item.itemCode,
          customerCode: item.customerCode || selectedCustomer?.custCode || "",
        });

        try {
          const url = `${API_BASE_URL}${API_ENDPOINTS.ATTIRE.UNRESERVE}`;
          const blob = new Blob([payload], { type: "application/json" });
          const sent = navigator.sendBeacon && navigator.sendBeacon(url, blob);

          if (!sent) {
            // Fallback to fetch with keepalive
            // Note: keepalive is supported in modern browsers and allows the request to continue
            // even when the page is unloading.
            fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: payload,
              keepalive: true,
              credentials: "include",
            }).catch((err) => {
              console.error("Failed to send keepalive unreserve:", err);
            });
          }
        } catch (err) {
          console.error("Beforeunload unreserve error:", err);
        }
      });
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);

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
        // Also clear billing store locally
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
