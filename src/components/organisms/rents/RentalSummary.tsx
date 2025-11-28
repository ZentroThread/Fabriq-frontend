import { useState } from "react";
import { Wallet, CreditCard } from "lucide-react";
import Chart from "../charts/Chart";
import AttendanceCard from "@/components/molecules/cards/attendance-card";


export default function RentalSummary({
  subtotal = 18000,
  taxPercentage = 5,
  securityDeposit = 3600,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const taxAmount = Math.round((subtotal * taxPercentage) / 100);
  const total = subtotal + taxAmount;

  return (
    
      
      <div>
        <Chart
          label={"Rental Summary"}
          description={"Select items to add to the rental"}
          height="min-h-[550px] max-h-screen"
        >
          {/* Subtotal */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-position-text font-light">Subtotal</span>
        <span className="text-style-white">LKR {subtotal.toLocaleString()}</span>
      </div>
          {/* Tax */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-position-text font-light">Tax ({taxPercentage}%)</span>
        <span className="text-style-white">LKR {taxAmount.toLocaleString()}</span>
      </div>

      <div className="border-t my-3 border-position-text" />

      {/* Total */}
      <div className="flex justify-between font-semibold mb-4">
        <span className="text-xl text-position-text">Total</span>
        <span className="text-xl text-style font-bold ">
          LKR {total.toLocaleString()}
        </span>
      </div>

      {/* Security Deposit Box */}
      <div className="rounded-2xl p-4 mb-6  bg-(--color-security-deposit-bg) border border-(--color-border)">
        <div className="flex font-medium justify-between mb-1">
          <span className="text-text-active">Security Deposit</span>
          <span className="text-style-white font-bold">
            LKR {securityDeposit.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-(--color-security-deposit-text) font-light">
          Refundable upon return of items in good condition
        </p>
      </div>

      {/* Payment Method */}
      <p className="text-sm font-medium mb-2 text-position-text">Payment Method</p>

      <div className="space-y-3 mb-6">

        {/* Cash Option */}
        <label
          className={`flex items-center gap-3 p-4 border  rounded-xl text-position-text cursor-pointer transition 
          ${
            paymentMethod === "cash"
              ? "border-[#c18966] "
              : "border-input-border "
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
            className="border-input-border "
          />
          <Wallet size={20} className="text-[#c18966]" />
          <span className="font-medium">Cash</span>
        </label>

          
        {/* Card Option */}
        <label
          className={`flex items-center gap-3 p-4 border text-position-text rounded-2xl cursor-pointer transition 
          ${
            paymentMethod === "card"
              ? "border-[#c18966] "
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
        </Chart>
      </div>
    
    
  );
}
