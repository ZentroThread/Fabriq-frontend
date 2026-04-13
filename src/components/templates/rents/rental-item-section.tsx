import { Trash2, Ruler } from "lucide-react";
import useBillingStore from "@/store/billing-store";
import type { BillingState } from "@/store/billing-store";

export default function RentalItemsSection() {
  const items = useBillingStore((s: BillingState) => s.items);
  const removeItem = useBillingStore((s: BillingState) => s.removeItem);
  const selectedCustomer = useBillingStore(
    (s: BillingState) => s.selectedCustomer
  );
  void selectedCustomer; // Intentionally unused for now


  function onDelete(index: number): void {
    // Remove from UI only - no API calls needed
    removeItem(index);
  }

  function ChangeMeasurementPopup(index: number): void {
    void index;
  }

  const totalAmount = items.reduce((acc, it) => acc + (it.price || 0), 0);

  return (
    <div className="p-6 rounded-3xl shadow bg-card w-full">
      <div className="text-[28px] text-style font-semibold mb-4">
        Rental Items
      </div>

      {items.length === 0 ? (
        <p className="text-position-text text-center">
          Not found rental items.
        </p>
      ) : (
        <>
          <table className="hidden md:table w-full text-center">
            <thead>
              <tr className="border-b text-position-text font-normal">
                <th className="py-2">Item</th>
                <th className="py-2">Fee</th>
                <th className="py-2">Days</th>
                <th className="py-2">Total</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-3 text-style font-normal">
                    {item.itemCode}
                  </td>
                  <td className="py-3 text-position-text font-normal">
                    LKR {(item.price || 0).toLocaleString()}
                  </td>
                  <td className="py-3 text-position-text font-normal">
                    {item.days}
                  </td>
                  <td className="py-3 text-position-text font-normal">
                    LKR {(item.price || 0).toLocaleString()}
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex justify-center gap-3 items-center">
                      <button
                        className="flex items-center gap-2 text-position-text font-normal cursor-pointer"
                        onClick={() => onDelete(index)}
                      >
                        <Trash2 size={16} className="text-position-text" />
                      </button>
                      {/* <button
                        className="flex items-center gap-2 text-position-text font-normal cursor-pointer"
                        onClick={() => ChangeMeasurementPopup(index)}
                      >
                        <Ruler size={16} className="text-text-active" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="border border-border font-extralight rounded-xl p-4 shadow-sm flex flex-col gap-2 bg-card"
              >
                <div className="flex justify-between">
                  <span className=" ">{item.name}</span>
                  <div className="flex gap-3">
                    <Trash2
                      size={18}
                      className="text-destructive cursor-pointer"
                      onClick={() => onDelete(index)}
                    />
                    <Ruler
                      size={18}
                      className="text-text-active cursor-pointer"
                      onClick={() => ChangeMeasurementPopup(index)}
                    />
                  </div>
                </div>

                <div className="text-sm text-position-text">
                  Fee: LKR {(item.price || 0).toLocaleString()}
                </div>

                <div className="text-sm text-position-text">
                  Days: {item.days}
                </div>

                <div className=" text-position-text">
                  Total: LKR {(item.price || 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end items-center gap-4">
            <div className="font-semibold text-position-text text-style-white">
              Total: LKR {totalAmount.toLocaleString()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
