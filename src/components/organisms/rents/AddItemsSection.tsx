import InputField from "@/components/molecules/input/inputField";
import { useState } from "react";

export default function AddItemsSection() {
  const [item, setItem] = useState("");
  const [days, setDays] = useState(1);

  const handleAdd = () => {
    console.log("Added:", { item, days });
  };

  return (
    <div className="p-6 rounded-3xl shadow bg-white border w-full border-(--color-border)">
      <div className="text-style text-[30px] font-semibold mb-1">Add Items</div>
      <div className="text-position-text mb-6">Select items to add to the rental</div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

        {/* Select Item */}
        <div className="md:col-span-6">
          <label className="block text-sm font-medium mb-1">Select Item</label>
          <div className="border border-input-border rounded-xl px-3 py-3 bg-white focus-within:ring-1 focus-within:ring-input-active-border focus-within:border-input-active-border">
            <input
              type="text"
              className="outline-none w-full"
              placeholder="Enter Item Code"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
        </div>

        {/* Days */}
        <div className="md:col-span-3">
          <InputField
            label="Days"
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </div>

        {/* Add Button */}
        <div className="md:col-span-3 flex justify-center items-start md:mt-6">
          <button
            onClick={handleAdd}
            className="w-full bg-(--color-button) text-(--color-button-text) py-3 rounded-2xl font-semibold cursor-pointer transition hover:bg-(--color-button-hover)"
          >
            <span className="text-lg mr-2">+</span>
            Add
          </button>
        </div>

      </div>
    </div>
  );
}
