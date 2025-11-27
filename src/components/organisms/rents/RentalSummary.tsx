import { useState } from "react";
import { Wallet, CreditCard } from "lucide-react";
import Button from "@/components/atoms/button/Button";

export default function RentalSummary({
  subtotal = 18000,
  taxPercentage = 5,
  securityDeposit = 3600,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const taxAmount = Math.round((subtotal * taxPercentage) / 100);
  const total = subtotal + taxAmount;

  return (
    <div className="p-6 bg-white rounded-3xl shadow border border-(--color-border)">

      {/* Title */}
      <h2 className="text-2xl text-style mb-4">Rental Summary</h2>

      {/* Subtotal */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-semibold">LKR {subtotal.toLocaleString()}</span>
      </div>

      {/* Tax */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">Tax ({taxPercentage}%)</span>
        <span className="font-semibold">LKR {taxAmount.toLocaleString()}</span>
      </div>

      <div className="border-t my-3" />

      {/* Total */}
      <div className="flex justify-between font-semibold mb-4">
        <span className="text-xl">Total</span>
        <span className="text-xl text-[#c18966] font-bold ">
          LKR {total.toLocaleString()}
        </span>
      </div>

      {/* Security Deposit Box */}
      <div className="rounded-2xl p-4 mb-6  bg-(--color-security-deposit-bg) border border-(--color-border)">
        <div className="flex justify-between font-medium mb-1">
          <span className="text-(--color-security-deposit-title)">Security Deposit</span>
          <span className="text-gray-900 font-bold">
            LKR {securityDeposit.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-(--color-security-deposit-text)">
          Refundable upon return of items in good condition
        </p>
      </div>

      {/* Payment Method */}
      <p className="text-sm font-medium mb-2">Payment Method</p>

      <div className="space-y-3 mb-6">

        {/* Cash Option */}
        <label
          className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition 
          ${
            paymentMethod === "cash"
              ? "border-[#c18966] bg-[#fff7f3]"
              : "border-input-border"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
            className="border-input-border"
          />
          <Wallet size={20} className="text-[#c18966]" />
          <span className="font-medium">Cash</span>
        </label>

        {/* Card Option */}
        <label
          className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition 
          ${
            paymentMethod === "card"
              ? "border-[#c18966] bg-[#fff7f3]"
              : "border-input-border"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
            className="border-input-border"
          />
          <CreditCard size={20} className="text-[#c18966]" />
          <span className="font-medium">Card</span>
        </label>
      </div>

      {/* Button */}
      <button className="w-full bg-(--color-button) text-(--color-button-text) py-3 rounded-2xl font-semibold cursor-pointer transition hover:bg-(--color-button-hover)">
        Generate Rental Agreement
      </button>
      
    </div>
    
  );
}
