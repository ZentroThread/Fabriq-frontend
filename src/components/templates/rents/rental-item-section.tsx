import { Trash2, Ruler } from "lucide-react";
import useBillingStore from "@/store/billing-store";
import type { BillingState } from "@/store/billing-store";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/atoms/button/add-button";

export default function RentalItemsSection() {
  const items = useBillingStore((s: BillingState) => s.items);
  const removeItem = useBillingStore((s: BillingState) => s.removeItem);
  const confirmOrder = useBillingStore((s: BillingState) => s.confirmOrder);

  function onDelete(index: number): void {
    removeItem(index);
  }

  function ChangeMeasurementPopup(index: number): void {
    console.log("Change measurement for item at index:", index);
  }

  const totalAmount = items.reduce(
    (acc, it) => acc + (it.price || 0),
    0
  );

  return (
    <div className="p-6 rounded-3xl shadow bg-card  w-full ">
      <div className="text-[28px] text-style mb-4">Rental Items</div>

      {items.length === 0 ? (
        <p className="text-position-text">Not found rental items.</p>
      ) : (
        <>
          <table className="hidden md:table w-full text-left">
            <thead>
              <tr className="border-b text-gray-600 font-semibold text-sm">
                <th className="py-2 w-[40%] text-position-text">Item</th>
                <th className="py-2 w-[20%] text-position-text">
                  Price/Day
                </th>
                <th className="py-2 w-[10%] text-position-text">Days</th>
                <th className="py-2 w-[20%] text-position-text">Total</th>
                <th className="py-2 w-[10%] text-center text-position-text">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none text-gray-800"
                >
                  <td className="py-3">{item.itemCode}</td>
                  <td className="py-3">
                    LKR {(item.price || 0).toLocaleString()}
                  </td>
                  <td className="py-3 font-semibold">{item.days}</td>
                  <td className="py-3 font-bold">
                    LKR{" "}
                    {/* {((item.price || 0) * (item.days || 0)).toLocaleString()} */}
                    LKR {(item.price || 0).toLocaleString()}
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <Trash2
                        size={18}
                        className="text-[#f38d8d] cursor-pointer"
                        onClick={() => onDelete(index)}
                      />
                      <Ruler
                        size={18}
                        className="text-[#b77e66] cursor-pointer"
                        onClick={() => ChangeMeasurementPopup(index)}
                      />
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
                className="border border-(--color-border) rounded-xl p-4 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{item.name}</span>
                  <div className="flex gap-3">
                    <Trash2
                      size={18}
                      className="text-[#f38d8d] cursor-pointer"
                      onClick={() => onDelete(index)}
                    />
                    <Ruler
                      size={18}
                      className="text-[#b77e66] cursor-pointer"
                      onClick={() => ChangeMeasurementPopup(index)}
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Price/Day: LKR {(item.price || 0).toLocaleString()}
                </div>

                <div className="text-sm text-gray-600">Days: {item.days}</div>

                <div className="font-bold text-gray-800">
                  Total: LKR{" "}
                  {(item.price || 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end items-center gap-4">
            <div className="font-semibold">
              Total: LKR {totalAmount.toLocaleString()}
            </div>
            
          </div>
          <CustomButton text={"Confirm Order"} onClick={confirmOrder}/>
        </>
      )}
    </div>
  );
}
