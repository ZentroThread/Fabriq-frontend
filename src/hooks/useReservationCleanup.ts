import { useEffect, useRef } from 'react';
import useBillingStore from '@/store/billing-store';
import { itemService } from '@/services/item.service';

export function useReservationCleanup() {
  const items = useBillingStore(s => s.items);
  const clearAll = useBillingStore(s => s.clearAll);
  const selectedCustomer = useBillingStore(s => s.selectedCustomer);
  
  // Track if we're currently confirming an order
  const isConfirming = useRef(false);

  useEffect(() => {
    const cleanup = async () => {
      // Don't cleanup if user is confirming order
      if (isConfirming.current || items.length === 0) return;

      console.log('🧹 Unreserving items:', items.length);

      // Unreserve all items in parallel
      const promises = items.map(item =>
        itemService.unreserveItem({
          attireCode: item.itemCode,
          customerCode: item.customerCode || selectedCustomer?.custCode || "",
        }).catch(err => {
          console.error('Failed to unreserve:', item.itemCode, err);
        })
      );

      await Promise.all(promises);
      console.log('✅ All items unreserved');
      clearAll();
    };

    // Run cleanup when component unmounts (page navigation)
    return () => {
      cleanup();
    };
  }, [items, clearAll, selectedCustomer]);

  // Return function to mark order as confirming
  return {
    markConfirming: () => { isConfirming.current = true; }
  };
}