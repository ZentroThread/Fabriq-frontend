import InputField from "@/components/molecules/input/input-feild";
import { useEffect, useState, useMemo } from "react";
import { logger } from "@/utils/logger";
import { useItems } from "@/hooks/attire/useItems";
import { useItemStore } from "@/store/item-store";
import type { Item } from "@/types/item.types";
import Chart from "../../atoms/frame/frame";
import Button from "@/components/atoms/button/custom-button";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import useBillingStore from "@/store/billing-store";
import type { BillingState } from "@/store/billing-store";

interface CustomerData {
  custCode?: string;
  cust_id?: number | string;
  [key: string]: unknown;
}

interface ItemWithStock extends Omit<
  Partial<Item>,
  "stock" | "quantity" | "availableQty" | "attire_stock"
> {
  stock?: number | string;
  quantity?: number | string;
  availableQty?: number | string;
  attire_stock?: number | string;
}

export default function AddItemsSection() {
  useItems();

  const selectedCustomer = useBillingStore(
    (s: BillingState) => s.selectedCustomer
  ) as CustomerData | null;

  const addItem = useBillingStore((s: BillingState) => s.addItem);
  const setSelectedCustomer = useBillingStore(
    (s: BillingState) => s.setSelectedCustomer
  );

  const [formType, setFormType] = useState<"regular" | "customized">("regular");
  const [itemCode, setItemCode] = useState<string | null>("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [days, setDays] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [customCode, setCustomCode] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>("");

  const allItems = useItemStore((s) => s.items);
  const isLoading = useItemStore((s) => s.isLoading);
  const isError = Boolean(useItemStore((s) => s.error));

  useEffect(() => {
    const t = setTimeout(() => setSearchTerm((itemCode ?? "").trim()), 150);
    return () => clearTimeout(t);
  }, [itemCode]);

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

  const customerCode = useMemo(() => {
    if (!selectedCustomer) return "";
    return (
      selectedCustomer.custCode ||
      (selectedCustomer.cust_id ? String(selectedCustomer.cust_id) : "")
    );
  }, [selectedCustomer]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!startDate || !endDate) return setDays(0);
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    setDays(Math.max(0, diff));
  }, [startDate, endDate]);

  function onAdd() {
    const code = (itemCode ?? "").trim();
    const name = localItem?.title || itemName || "";
    if (!code || !name) return;

    const payload = {
      itemCode: code,
      name,
      price: price || 0,
      days,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      customerCode: customerCode,
    };

    addItem(payload);
    setStartDate(null);
    setEndDate(null);
    setItemCode("");
    setDays(0);
  }

  function onAddCustomized() {
    const code = customCode.trim();
    const priceValue = parseFloat(customPrice);

    if (!code || !priceValue || isNaN(priceValue)) return;

    const payload = {
      itemCode: code,
      name: `Custom Item - ${code}`,
      price: priceValue,
      days,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      customerCode: customerCode,
      isCustomItem: true,
    };
    addItem(payload);

    setCustomCode("");
    setCustomPrice("");
    setStartDate(null);
    setEndDate(null);
    setDays(0);
  }

  const handleCustomerCodeChange = (value: string) => {
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
      logger.error("Failed to update customer code", err, true);
    }
  };

  return (
    <div>
      <Chart
        label={"Add Items"}
        description={"Select items to add to the rental"}
        height="h-auto"
      >
        {/* Toggle between Regular and Customized */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-4 p-2 bg-muted rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="formType"
                value="regular"
                checked={formType === "regular"}
                onChange={() => setFormType("regular")}
                className="cursor-pointer"
              />
              <span className="text-sm font-medium">Regular Items</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="formType"
                value="customized"
                checked={formType === "customized"}
                onChange={() => setFormType("customized")}
                className="cursor-pointer"
              />
              <span className="text-sm font-medium">Customized Items</span>
            </label>
          </div>
        </div>

        <InputField
          label="Customer Code"
          placeholder="Enter customer code"
          value={customerCode}
          onChange={(e) => handleCustomerCodeChange(e.target.value)}
        />

        {formType === "regular" ? (
          <>
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
                    const stock = getCurrentStock(code);

                    return (
                      <li
                        key={`${code}-${idx}`}
                        className="px-3 py-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          if (!code) return;
                          setItemCode(code);
                          setDisplayedStock(getCurrentStock(code));
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
                  <span className="font-medium">Price:</span> Rs.{" "}
                  {price.toFixed(2)}
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
          </>
        ) : (
          <>
            {/* Customized Items Form */}
            <InputField
              label="Item Code"
              placeholder="Enter item code"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
            />

            <InputField
              label="Price"
              type="number"
              placeholder="Enter price"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              step="0.01"
              min="0"
            />
          </>
        )}

        <InputField
          label="Start Date"
          type="date"
          value={startDate ?? ""}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const val = e.target.value || null;
            if (!val) {
              setStartDate(null);
              return;
            }

            const chosen = new Date(val);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (chosen < today) {
              const sVal = today.toISOString().split("T")[0];
              setStartDate(sVal);
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
          {formType === "regular" ? (
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
          ) : (
            <Button
              width="w-full"
              text={"Add"}
              icon={<Plus />}
              onClick={onAddCustomized}
              disabled={
                !customCode || !customPrice || isNaN(parseFloat(customPrice))
              }
            />
          )}
        </div>
      </Chart>
    </div>
  );
}
