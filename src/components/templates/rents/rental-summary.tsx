import { useState, useMemo, useEffect } from "react";
import { Wallet, CreditCard, Banknote } from "lucide-react";
import Chart from "../Chart";
import CustomButton from "@/components/atoms/button/add-button";
import useBillingStore from "@/store/billing-store";
import { API_BASE_URL } from "@/constants/constdata";

type BillingItem = {
  attire?: {
    attirePrice?: number;
    attireCode?: string;
  };
  attireCode?: string;
  itemCode?: string;
  price?: number;
  rentDuration?: number;
};

declare global {
  interface Window {
    payhere: any;
  }
}

export default function RentalSummary() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [discount, setDiscount] = useState<number>(0);

  const items = useBillingStore((s) => s.items);
  const currentBilling = useBillingStore((s) => s.currentBilling);
  const payBilling = useBillingStore((s) => s.payBilling);

  const displayItems = useMemo((): BillingItem[] => {
    if (currentBilling && Array.isArray(currentBilling.items))
      return currentBilling.items as BillingItem[];
    return items as BillingItem[];
  }, [currentBilling, items]);

  const subtotal = useMemo(() => {
    return displayItems.reduce((acc: number, it: BillingItem) => {
      if (it.attire && it.attire.attirePrice)
        return acc + (it.attire.attirePrice || 0) * (it.rentDuration || 1);
      if (it.price) return acc + it.price;
      return acc;
    }, 0);
  }, [displayItems]);

  const discountAmount =
    (Math.max(0, Math.min(100, discount)) / 100) * subtotal;

  const total = subtotal - discountAmount;

  async function onPay() {
    await startPayment(total);
  }

  async function startPayment(total: number) {
    try {
      const orderId = "ORDER_" + Date.now();

      const res = await fetch(`${API_BASE_URL}/v1/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount: total.toFixed(2),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Payment API error:", text);
        alert("Payment initialization failed");
        return;
      }

      const data = await res.json();

      if (!window.payhere) {
        alert("Payment system not loaded");
        return;
      }

      const payment = {
        sandbox: true,
        merchant_id: data.merchant_id,

        return_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancel`,
        notify_url: `${API_BASE_URL}/v1/payment/notify`,

        order_id: data.order_id,
        items: "Bridal Rental",
        currency: data.currency,
        amount: data.amount,
        hash: data.hash,

        first_name: "Customer",
        last_name: "User",
        email: "customer@email.com",
        phone: "0772744053",
        address: "Sri Lanka",
        city: "Colombo",
        country: "Sri Lanka",
      };

      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed to start");
    }
  }

  useEffect(() => {
    if (!window.payhere) return;

    window.payhere.onCompleted = async function (orderId: string) {
      console.log("Payment completed:", orderId);

      try {
        await payBilling({
          discountPercentage: discount,
          paymentMethod: paymentMethod,
        });
      } catch (error) {
        console.error("Billing error:", error);
      }
    };

    window.payhere.onDismissed = function () {
      console.log("Payment dismissed");
    };

    window.payhere.onError = function (error: any) {
      console.log("Payment error:", error);
    };
  }, [discount, paymentMethod]);

  return (
    <div>
      <Chart
        label={"Rental Summary"}
        description={"Confirm and pay the bill"}
        height="max-h-screen"
      >
        {/* Items */}
        <div className="mb-3">
          {displayItems && displayItems.length > 0 ? (
            <div className="space-y-2">
              {displayItems.map((it: BillingItem, idx: number) => {
                const code =
                  it.attireCode ||
                  (it.attire && it.attire.attireCode) ||
                  it.itemCode ||
                  "-";

                const price = it.attire?.attirePrice ?? it.price ?? 0;

                return (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-position-text">{code}</span>
                    <span className="text-style-white">
                      LKR {price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-between text-sm mb-2">
              <span className="text-position-text font-light">Subtotal</span>
              <span className="text-style-white">LKR 0</span>
            </div>
          )}
        </div>

        <div className="border-t my-3 border-position-text" />

        {/* Totals */}
        <div className="flex justify-between text-sm mb-2">
          <span className="text-position-text font-light">Subtotal</span>
          <span className="text-style-white">
            LKR {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="text-position-text">Discount (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-24 p-2 rounded border border-input-border bg-card text-style-white"
          />
        </div>

        <div className="flex justify-between font-semibold mb-4">
          <span className="text-xl text-position-text">Total</span>
          <span className="text-xl font-bold">
            LKR {total.toLocaleString()}
          </span>
        </div>

        <p className="text-sm font-medium mb-2 text-position-text">
          Payment Method
        </p>

        <div className="space-y-3 mb-6">
          <label
            className={`flex items-center gap-3 p-4 border rounded-xl text-position-text cursor-pointer transition ${
              paymentMethod === "cash"
                ? "border-[#c18966]"
                : "border-input-border"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            <Wallet size={20} className="text-[#c18966]" />
            <span className="font-medium">Cash</span>
          </label>

          <label
            className={`flex items-center gap-3 p-4 border rounded-2xl text-position-text cursor-pointer transition ${
              paymentMethod === "card"
                ? "border-[#c18966]"
                : "border-input-border"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <CreditCard size={20} className="text-[#c18966]" />
            <span className="font-medium">Card</span>
          </label>

          <CustomButton
            text={"Pay"}
            width="w-full"
            icon={<Banknote />}
            onClick={onPay}
          />
        </div>
      </Chart>
    </div>
  );
}