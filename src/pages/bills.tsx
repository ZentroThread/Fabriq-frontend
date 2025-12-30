import { useEffect, useMemo, useState } from "react";
import { billingService } from "@/services/billing.service";
import { DollarSign, FileText } from "lucide-react";
import DashboardCard from "@/components/molecules/cards/dashboard-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Chart from "@/components/templates/Chart";
import { ItemSearchFilter } from "@/components/atoms/item-filter/item-filter";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useBillingStore from "@/store/billing-store";

type Customer = {
  custName?: string;
  custMobileNumber?: string;
};

type Billing = {
  billingCode?: string;
  billingDate?: string;
  billingTotal?: string;
  billingType?: string;
  customer?: Customer;
};

type RentItem = {
  id?: string | number;
  attireCode?: string;
  attire?: { attireCode?: string };
  rentDuration?: number | null;
  rentDate?: string | null;
  returnDate?: string | null;
};

const Bills = () => {
  const storeBillings = useBillingStore((s) => s.billings) as
    | Billing[]
    | undefined;
  const fetchBillings = useBillingStore((s) => s.fetchBillings);
  const [billings, setBillings] = useState<Billing[]>([]);
  const [rents, setRents] = useState<RentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterQuery, setFilterQuery] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const [selected, setSelected] = useState<Billing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (fetchBillings) await fetchBillings();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [fetchBillings]);

  useEffect(() => {
    setBillings(storeBillings || []);
  }, [storeBillings]);

  const filtered = useMemo(() => {
    const list = (billings || []).filter((bill) => {
      if (filterQuery) {
        const q = filterQuery.toLowerCase();
        const matchesCode =
          bill.billingCode?.toLowerCase().includes(q) || false;
        const matchesName =
          (bill.customer?.custName || "").toLowerCase().includes(q) || false;
        const matchesPhone =
          (bill.customer?.custMobileNumber || "").toLowerCase().includes(q) ||
          false;

        if (!(matchesCode || matchesName || matchesPhone)) return false;
      }
      if (filterStartDate) {
        const bd = bill.billingDate ? new Date(bill.billingDate) : null;
        const start = new Date(filterStartDate + "T00:00:00");
        if (!bd || bd < start) return false;
      }
      if (filterEndDate) {
        const bd = bill.billingDate ? new Date(bill.billingDate) : null;
        const end = new Date(filterEndDate + "T23:59:59");
        if (!bd || bd > end) return false;
      }
      return true;
    });

    // sort descending by billingDate
    list.sort((a: Billing, b: Billing) => {
      const da = a.billingDate ? new Date(a.billingDate).getTime() : 0;
      const db = b.billingDate ? new Date(b.billingDate).getTime() : 0;
      return db - da;
    });

    return list;
  }, [billings, filterQuery, filterStartDate, filterEndDate]);

  const countInRange = filtered.length;
  const totalInRange = filtered.reduce(
    (acc, b) => acc + (parseFloat(b.billingTotal || "0") || 0),
    0
  );

  function openDetails(bill: Billing) {
    setSelected(bill);
    setDialogOpen(true);
    (async () => {
      try {
        if (!bill.billingCode) {
          setRents([]);
          return;
        }
        const items = await billingService.getAttireRentsByBillingCode(
          bill.billingCode
        );
        setRents((items as RentItem[]) || []);
      } catch (e) {
        console.error(e);
        setRents([]);
      }
    })();
  }

  const rentItemsForSelected = useMemo(() => {
    if (!selected) return [];
    return rents || [];
  }, [rents, selected]);

  return (
    <div className="p-5 flex flex-col">
      <div className="text-style text-[30px] font-semibold">All Billings</div>
      <div className="text-position-text mb-4">
        View and search billing records
      </div>
      <div className="mt-3 mb-4 gap-6 flex items-center gap-4">
        <DashboardCard
          lable="Count"
          lable1={String(countInRange)}
          icon={FileText}
          iconbg="var(--color-pie-1)"
          width="w-full"
        />

        <DashboardCard
          lable="Total"
          lable1={totalInRange.toFixed(2)}
          icon={DollarSign}
          iconbg="var(--color-pie-2)"
          width="w-full"
        />
      </div>

      <Chart height="h-20" padding="p-2 pl-6">
        <div className="gap-2 flex pr-5 items-center">
          <ItemSearchFilter
            items={(billings || []).map((b) => ({
              id: b.billingCode || String(Math.random()),
              title: b.customer?.custName || b.billingCode || "",
              code: b.billingCode || "",
              description: b.customer?.custMobileNumber || "",
              category: {
                tenantId: "",
                categoryId: 0,
                categoryCode: "",
                categoryName: "",
              },
              status: "",
            }))}
            onSearchChange={(q) => setFilterQuery(q)}
          />

          <NativeSelectDemo
            option="All"
            value1="1"
            value2="3"
            string1="Last 1 month"
            string2="Last 3 months"
            value={""}
            onValueChange={() => {}}
            value3={""}
            string3={""}
          />

          <div className="flex items-center text-position-text  gap-2 ml-auto">
            <input
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              className="input bg-card p-2 font-extralight rounded"
            />
            <span className="text-position-text">to</span>
            <input
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              className="input bg-card font-extralight p-2 rounded"
            />
          </div>
        </div>
      </Chart>

      <div className="pt-5 flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-end justify-center pb-8">
            <svg
              className="animate-spin h-10 w-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ color: "var(--color-text-color)" }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-position-text">No billings found</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((bill) => (
              <Card
                key={bill.billingCode}
                className="w-auto overflow-hidden shadow-md bg-card rounded-xl hover:scale-101 cursor-pointer"
                onClick={() => openDetails(bill)}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-text-inactive text-style">
                    {bill.billingCode}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-24 text-left font-medium"
                        style={{ color: "var(--color-position-text)" }}
                      >
                        Date:
                      </div>
                      <div
                        className="flex-1 text-left truncate"
                        style={{ color: "var(--color-position-text)" }}
                      >
                        {bill.billingDate
                          ? new Date(bill.billingDate).toLocaleString()
                          : "-"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-24 text-left font-medium"
                        style={{ color: "var(--color-position-text)" }}
                      >
                        Total:
                      </div>
                      <div
                        className="flex-1 text-left truncate"
                        style={{ color: "var(--color-position-text)" }}
                      >
                        {bill.billingTotal || "-"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-24 text-left font-medium"
                        style={{ color: "var(--color-position-text)" }}
                      >
                        Contact:
                      </div>
                      <div
                        className="flex-1 text-left truncate"
                        style={{ color: "var(--color-position-text)" }}
                      >
                        {bill.customer?.custMobileNumber || "-"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-24 text-left font-medium"
                        style={{ color: "var(--color-position-text)" }}
                      >
                        Type:
                      </div>
                      <div
                        className="flex-1 text-left truncate"
                        style={{ color: "var(--color-position-text)" }}
                      >
                        {bill.billingType || "-"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl bg-card rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-style">
              {selected?.billingCode}
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 text-position-text font-extralight">
            <div className="mb-4 flex items-start gap-2">
              <div
                className="w-28 font-medium"
                style={{ color: "var(--color-position-text)" }}
              >
                Customer:
              </div>
              <div className="flex-1 truncate">
                {selected?.customer?.custName || "-"}
              </div>
            </div>
            <div className="mb-4 flex items-start gap-2">
              <div
                className="w-28 font-medium"
                style={{ color: "var(--color-position-text)" }}
              >
                Billing Date:
              </div>
              <div className="flex-1 truncate">
                {selected?.billingDate
                  ? new Date(selected.billingDate).toLocaleString()
                  : "-"}
              </div>
            </div>

            <div>
              <strong>Items</strong>
              <div className="mt-2">
                {rentItemsForSelected.length === 0 ? (
                  <div className="text-position-text">
                    No items found for this billing.
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-center border-b">
                        <th> Code</th>
                        <th>Days</th>
                        <th>Start</th>
                        <th>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentItemsForSelected.map((r) => (
                        <tr className="text-center" key={r.id}>
                          <td>{r.attireCode || r.attire?.attireCode || "-"}</td>
                          <td>{r.rentDuration ?? "-"}</td>
                          <td>
                            {r.rentDate
                              ? new Date(r.rentDate).toLocaleString()
                              : "-"}
                          </td>
                          <td>
                            {r.returnDate
                              ? new Date(r.returnDate).toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bills;
