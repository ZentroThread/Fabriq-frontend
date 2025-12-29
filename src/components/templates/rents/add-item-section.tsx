import InputField from "@/components/molecules/input/input-feild";
import { useEffect, useState } from "react";
import { useItemStore } from "@/store/item-store";
import Chart from "../Chart";
import Button from "@/components/atoms/button/add-button";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import useBillingStore from "@/store/billing-store";
import type { BillingState } from "@/store/billing-store";

export default function AddItemsSection() {
  const selectedCustomer = useBillingStore(
    (s: BillingState) => s.selectedCustomer
  );
  const addItem = useBillingStore((s: BillingState) => s.addItem);
  const setSelectedCustomer = useBillingStore(
    (s: BillingState) => s.setSelectedCustomer
  );

  const [itemCode, setItemCode] = useState("");
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
    const t = setTimeout(() => setSearchTerm(itemCode.trim()), 150);
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
  ) as unknown[];

  const getSuggestionCode = (s?: any) => s?.code || (s?.id ? String(s.id) : "");

  // Derived state from local store lookup
  const localItem =
    allItems.find(
      (it) =>
        (it.code && it.code.toUpperCase() === itemCode.trim().toUpperCase()) ||
        String(it.id) === itemCode.trim()
    ) || null;

  const itemName = localItem?.title || "";
  const price = Number(localItem?.price ?? 0);

  const [displayedStock, setDisplayedStock] = useState<number | null>(null);

  // normalize stock from different backend field names
  const normalizeStock = (d?: any) => {
    if (!d) return null;
    return (d.stock ||
      d.quantity ||
      d.availableQty ||
      d.attire_stock ||
      null) as number | null;
  };

  // update displayed stock whenever local item changes
  useEffect(() => {
    setDisplayedStock(normalizeStock(localItem as any));
  }, [localItem]);

  // keep local customerCode in sync with selectedCustomer and allow edits
  useEffect(() => {
    const code =
      (selectedCustomer?.custCode as string | undefined) ||
      (selectedCustomer?.cust_id ? String(selectedCustomer.cust_id) : "") ||
      "";
    setCustomerCode(code);
  }, [selectedCustomer]);

  useEffect(() => {
    if (!startDate || !endDate) return setDays(0);
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    setDays(Math.max(0, diff));
  }, [startDate, endDate]);

  function onAdd() {
    if (!itemCode || !itemName) return;
    addItem({
      itemCode,
      name: itemName,
      price: price || 0,
      days,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
    // Decrease local displayed stock by 1 (UI only). Persist happens on confirm.
    setDisplayedStock((s) => (s && s > 0 ? s - 1 : s));
    setStartDate(null);
    setEndDate(null);
    setDays(0);
  }

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
          onChange={(e) => {
            const v = e.target.value;
            setCustomerCode(v);
            try {
              if (selectedCustomer) {
                setSelectedCustomer({ ...selectedCustomer, custCode: v });
              } else {
                setSelectedCustomer({ custCode: v });
              }
            } catch (err) {
              // swallow; keep local value at least
              console.warn("Failed to update selected customer code", err);
            }
          }}
        />

        <div className="relative">
          <InputField
            label="Item Code"
            placeholder="Enter item code"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
          />
          {isLoading && (
            <div className="absolute right-3 top-9 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
          {/* Suggestions dropdown */}
          {suggestions && suggestions.length > 0 && itemCode && (
            <ul className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-auto rounded-md border bg-background">
              {suggestions.map((s, idx) => {
                const code = getSuggestionCode(s);
                const name = s.title || s.name || "-";
                const stk = normalizeStock(s as any);
                return (
                  <li
                    key={`${code}-${idx}`}
                    className="px-3 py-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      if (!code) return;
                      setItemCode(code);
                      // set displayed stock immediately for snappy UI
                      setDisplayedStock(normalizeStock(s as any));
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
                        Rs. {Number(s.price ?? 0).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stk === null ? (
                          <span className="italic text-muted-foreground">
                            N/A
                          </span>
                        ) : stk > 0 ? (
                          <span>{stk}</span>
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
