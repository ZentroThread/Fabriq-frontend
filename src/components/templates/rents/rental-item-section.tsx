import { Trash2, Ruler } from "lucide-react";

/* type RentalItem = {
  name: string;
  price: number;
  days: number;
}; */

export default function RentalItemsSection() {
  const items = [
    { name: "Saree A", price: 2000, days: 3 },
    { name: "Saree B", price: 2500, days: 2 },
    { name: "Saree C", price: 1800, days: 5 },
  ];

  function onDelete(index: number): void {
    console.log("Deleted item at index:", index);
  }

  function ChangeMeasurementPopup(index: number): void {
    console.log("Change measurement for item at index:", index);
  }

  return (
    <div className="p-6 rounded-3xl shadow bg-card  w-full ">
      {/* Title */}
      <div className="text-[28px] text-style mb-4">Rental Items</div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">No items added to the rental.</p>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <table className="hidden md:table w-full text-left">
            <thead>
              <tr className="border-b text-gray-600 font-semibold text-sm">
                <th className="py-2 w-[40%] text-muted-foreground">Item</th>
                <th className="py-2 w-[20%] text-muted-foreground">
                  Price/Day
                </th>
                <th className="py-2 w-[10%] text-muted-foreground">Days</th>
                <th className="py-2 w-[20%] text-muted-foreground">Total</th>
                <th className="py-2 w-[10%] text-center text-muted-foreground">
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
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">LKR {item.price.toLocaleString()}</td>
                  <td className="py-3 font-semibold">{item.days}</td>
                  <td className="py-3 font-bold">
                    LKR {(item.price * item.days).toLocaleString()}
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

          {/* MOBILE CARDS */}
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
                  Price/Day: LKR {item.price.toLocaleString()}
                </div>

                <div className="text-sm text-gray-600">Days: {item.days}</div>

                <div className="font-bold text-gray-800">
                  Total: LKR {(item.price * item.days).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
