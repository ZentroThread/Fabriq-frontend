import InputField from "@/components/molecules/input/input-feild";
import { useEffect, useState } from "react";
import { useItems } from "@/hooks/useItems";
import { useItemStore } from "@/store/item-store";
import type { Item } from "@/types/item.types";
import Chart from "../Chart";
import Button from "@/components/atoms/button/add-button";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import useBillingStore from "@/store/billing-store";
import type { BillingState } from "@/store/billing-store";
import { useStockUpdates } from "@/hooks/useStockUpdates";
import { itemService } from "@/services/item.service";
import { useReservationCleanup } from "@/hooks/useReservationCleanup";

// Extended type to handle both custCode and cust_id
interface CustomerData {
  custCode?: string;
  cust_id?: number | string;
  [key: string]: unknown;
}

// Type for items that might have different stock field names
interface ItemWithStock
  extends Omit<
    Partial<Item>,
    "stock" | "quantity" | "availableQty" | "attire_stock"
  > {
  stock?: number | string;
  quantity?: number | string;
  availableQty?: number | string;
  attire_stock?: number | string;
}

export default function AddItemsSection() {
  // ensure items are fetched into the local zustand store for suggestions
  useItems();
  useStockUpdates();
  useReservationCleanup();
  const selectedCustomer = useBillingStore(
    (s: BillingState) => s.selectedCustomer
  ) as CustomerData | null;

  const addItem = useBillingStore((s: BillingState) => s.addItem);
  const setSelectedCustomer = useBillingStore(
    (s: BillingState) => s.setSelectedCustomer
  );

  const [itemCode, setItemCode] = useState<string | null>("");
  const [customerCode, setCustomerCode] = useState<string>("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [days, setDays] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Local item store
  const allItems = useItemStore((s) => s.items);
  const isLoading = useItemStore((s) => s.isLoading);
  const isError = Boolean(useItemStore((s) => s.error));

  // debounced search term so we don't spam the API while typing
  useEffect(() => {
    const t = setTimeout(() => setSearchTerm((itemCode ?? "").trim()), 150);
    return () => clearTimeout(t);
  }, [itemCode]);

  // Local suggestions from zustand store
  const suggestions = (
    searchTerm
      ? allItems.filter((it) => {
          const q = searchTerm.toUpperCase();
          return Boolean(it.code && it.code.toUpperCase().startsWith(q));
        })
      : []
  ) as Item[];

  const getCurrentStock = (itemCode: string): number | null => {
    const item = allItems.find((it) => it.code === itemCode);
    return normalizeStock(item as ItemWithStock | null);
  };

  const getSuggestionCode = (item: Item): string => {
    return item.code || (item.id ? String(item.id) : "");
  };

  // Derived state from local store lookup
  const localItem =
    allItems.find((it) => {
      const q = (itemCode ?? "").trim();
      return (
        (it.code && it.code.toUpperCase() === q.toUpperCase()) ||
        String(it.id) === q
      );
    }) || null;

  const itemName = localItem?.title || "";
  const price = Number(localItem?.price ?? 0);

  const [displayedStock, setDisplayedStock] = useState<number | null>(null);

  // normalize stock from different backend field names
  const normalizeStock = (item: ItemWithStock | null): number | null => {
    if (!item) return null;

    const toNumber = (value: unknown): number | null => {
      if (typeof value === "number" && Number.isFinite(value)) return value;
      if (typeof value === "string" && value.trim() !== "") {
        const num = Number(value);
        return Number.isFinite(num) ? num : null;
      }
      return null;
    };

    const keys: (keyof ItemWithStock)[] = [
      "stock",
      "quantity",
      "availableQty",
      "attire_stock",
    ];

    for (const key of keys) {
      if (key in item) {
        const value = item[key];
        const num = toNumber(value);
        if (num !== null) return num;
      }
    }

    return null;
  };

  // Update displayed stock whenever local item OR store changes
  useEffect(() => {
    if (localItem) {
      const liveStock = getCurrentStock(localItem.code || "");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedStock(liveStock);
    } else {
      setDisplayedStock(null);
    }
  }, [localItem, allItems]); // ← Add allItems dependency

  // keep local customerCode in sync with selectedCustomer and allow edits
  useEffect(() => {
    if (!selectedCustomer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCustomerCode("");
      return;
    }

    const code =
      selectedCustomer.custCode ||
      (selectedCustomer.cust_id ? String(selectedCustomer.cust_id) : "");
    setCustomerCode(code);
  }, [selectedCustomer]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!startDate || !endDate) return setDays(0);
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    setDays(Math.max(0, diff));
  }, [startDate, endDate]);

  async function onAdd() {
    const code = (itemCode ?? "").trim();
    const name = localItem?.title || itemName || "";
    if (!code || !name) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await itemService.reserveItem({
        attireCode: code,
        customerCode: customerCode,
      });

      // Add to billing
      addItem({
        itemCode: code,
        name,
        price: price || 0,
        days,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        customerCode: customerCode,
      });

      // Reset form
      setStartDate(null);
      setEndDate(null);
      setItemCode("");
      setDays(0);
    } catch (error: unknown) {
      let message = "Failed to reserve item";
      if (error instanceof Error) {
        message = error.message || message;
      } else if (typeof error === "object" && error !== null) {
        const errObj = error as Record<string, unknown>;
        const resp = errObj.response as Record<string, unknown> | undefined;
        if (resp && typeof resp.data === "string") {
          message = resp.data;
        }
      } else if (typeof error === "string") {
        message = error;
      }
      alert(message);
    }
  }

  const handleCustomerCodeChange = (value: string) => {
    setCustomerCode(value);
    try {
      if (selectedCustomer) {
        setSelectedCustomer({
          ...selectedCustomer,
          custCode: value,
        } as CustomerData);
      } else {
        setSelectedCustomer({ custCode: value } as CustomerData);
      }
    } catch (err) {
      // swallow; keep local value at least
      console.warn("Failed to update selected customer code", err);
    }
  };

  return (
    <div>
      <Chart
        label={"Add Items"}
        description={"Select items to add to the rental"}
        height="h-auto"
      >
        <InputField
          label="Customer Code"
          placeholder="Enter customer code"
          value={customerCode}
          onChange={(e) => handleCustomerCodeChange(e.target.value)}
        />

        <div className="relative">
          <InputField
            label="Item Code"
            placeholder="Enter item code"
            value={itemCode ?? ""}
            onChange={(e) => setItemCode(e.target.value)}
          />
          {isLoading && (
            <div className="absolute right-3 top-9 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && itemCode && (
            <ul className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-auto rounded-md border bg-background">
              {suggestions.map((suggestion, idx) => {
                const code = getSuggestionCode(suggestion);
                const name = suggestion.title || suggestion.name || "-";
                const stock = getCurrentStock(code); // ← Gets LIVE stock from store

                return (
                  <li
                    key={`${code}-${idx}`}
                    className="px-3 py-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      if (!code) return;
                      setItemCode(code);
                      // Use getCurrentStock instead of normalizeStock
                      setDisplayedStock(getCurrentStock(code)); // ← CHANGED THIS LINE
                    }}
                  >
                    <div className="text-sm">
                      <div className="font-medium">{code}</div>
                      <div className="text-xs text-muted-foreground">
                        {name}
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <div className="font-medium">
                        Rs. {Number(suggestion.price ?? 0).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stock === null ? (
                          <span className="italic text-muted-foreground">
                            N/A
                          </span>
                        ) : stock > 0 ? (
                          <span>{stock}</span>
                        ) : (
                          <span className="text-destructive">0</span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Show error message if lookup fails */}
        {isError && itemCode && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>Item not found or error loading</span>
          </div>
        )}

        {/* Show item details when available locally */}
        {localItem && !isError && (
          <div className="rounded-md border border-border bg-muted/30 p-3 space-y-2">
            <div className="text-sm">
              <span className="font-medium">Item:</span> {itemName}
            </div>
            <div className="text-sm">
              <span className="font-medium">Price:</span> Rs. {price.toFixed(2)}
            </div>
            <div className="text-sm">
              <span className="font-medium">Stock:</span>{" "}
              {displayedStock === null ? (
                <span className="italic text-muted-foreground">N/A</span>
              ) : displayedStock > 0 ? (
                <span>{displayedStock} available</span>
              ) : (
                <span className="text-destructive">Out of stock</span>
              )}
            </div>
          </div>
        )}

        <InputField
          label="Start Date"
          type="date"
          value={startDate ?? ""}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const val = e.target.value || null;
            if (!val) return setStartDate(null);
            const chosen = new Date(val);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (chosen < today) {
              setStartDate(today.toISOString().split("T")[0]);
            } else {
              setStartDate(val);
            }
          }}
        />

        <InputField
          label="End Date"
          type="date"
          value={endDate ?? ""}
          min={startDate ?? new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const val = e.target.value || null;
            if (!val) return setEndDate(null);
            const chosen = new Date(val);
            const start = startDate ? new Date(startDate) : new Date();
            start.setHours(0, 0, 0, 0);
            if (chosen < start) {
              setEndDate(start.toISOString().split("T")[0]);
            } else {
              setEndDate(val);
            }
          }}
        />

        <InputField label="Days" type="number" value={days} readOnly />

        <div className="mt-3">
          <Button
            width="w-full"
            text={"Add"}
            icon={<Plus />}
            onClick={onAdd}
            disabled={
              !itemCode ||
              !itemName ||
              isLoading ||
              (displayedStock !== null && displayedStock <= 0)
            }
          />
        </div>
      </Chart>
    </div>
  );
}
