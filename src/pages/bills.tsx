import { useEffect, useMemo, useState } from "react";
import { billingService } from "@/services/billing.service";
import { DollarSign, FileText } from "lucide-react";
import DashboardCard from "@/components/molecules/cards/dashboard-card";
import { formatDateTime, parseDate } from "@/utils/date";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Chart from "@/components/atoms/frame/frame";
import { BillsSkeleton } from "@/components/molecules/skeletons/bills-skeleton";
import { ItemSearchFilter } from "@/components/atoms/item-filter/item-filter";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
// Card components not used in this page; removed to fix unused import
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBillingStore from "@/store/billing-store";

type Customer = {
  custName?: string;
  custMobileNumber?: string;
  custCode?: string;
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

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selected, setSelected] = useState<Billing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (fetchBillings) await fetchBillings();
      } catch (e) {
        /* empty */
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
        const bd = parseDate(bill.billingDate);
        const start = new Date(filterStartDate + "T00:00:00");
        if (!bd || bd < start) return false;
      }
      if (filterEndDate) {
        const bd = parseDate(bill.billingDate);
        const end = new Date(filterEndDate + "T23:59:59");
        if (!bd || bd > end) return false;
      }
      return true;
    });

    // sort descending by billingDate
    list.sort((a: Billing, b: Billing) => {
      const da = parseDate(a.billingDate);
      const db = parseDate(b.billingDate);
      const timeA = da ? da.getTime() : 0;
      const timeB = db ? db.getTime() : 0;
      return timeB - timeA; // descending order (newest first)
    });

    return list;
  }, [billings, filterQuery, filterStartDate, filterEndDate]);

  const countInRange = filtered.length;
  const totalInRange = filtered.reduce(
    (acc, b) => acc + (parseFloat(b.billingTotal || "0") || 0),
    0
  );

  // paging for table
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

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
        setRents([]);
      }
    })();
  }

  const rentItemsForSelected = useMemo(() => {
    if (!selected) return [];
    return rents || [];
  }, [rents, selected]);

  if (loading) {
    return <BillsSkeleton />;
  }

  return (
    <div className="p-5 flex flex-col">
      <div className="text-style text-[30px] font-semibold">All Billings</div>
      <div className="text-position-text mb-4">
        View and search billing records
      </div>
      <div className="mt-3 mb-4 flex items-center gap-6">
        {/*Fixed duplicate gap class*/}
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

          <NativeSelectDemo
            option="Show"
            value1="10"
            value2="15"
            value3="20"
            string1="10 per page"
            string2="15 per page"
            string3="20 per page"
            value={String(pageSize)}
            onValueChange={(v) => {
              const n = Number(v) || 10;
              setPageSize(n);
              setCurrentPage(1);
            }}
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
        {filtered.length === 0 ? (
          <div className="text-position-text">No billings found</div>
        ) : (
          <Chart height="h-auto" padding="p-4">
            <Table className="text-position-text font-light">
              <TableHeader>
                <TableRow className="text-position-text">
                  <TableHead className="w-[140px]">Bill No</TableHead>
                  <TableHead>Customer Code</TableHead>
                  <TableHead>Issued Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((bill) => (
                  <TableRow
                    key={bill.billingCode}
                    className="cursor-pointer"
                    onClick={() => openDetails(bill)}
                  >
                    <TableCell className="font-medium">
                      {bill.billingCode}
                    </TableCell>
                    <TableCell>{bill.customer?.custCode || "-"}</TableCell>
                    <TableCell>
                      {formatDateTime(bill.billingDate as string | undefined)}
                    </TableCell>
                    <TableCell>{bill.billingTotal || "-"}</TableCell>
                    <TableCell>
                      {bill.customer?.custMobileNumber || "-"}
                    </TableCell>
                    <TableCell>{bill.billingType || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow></TableRow>
              </TableFooter>
            </Table>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-position-text">
                Showing {(currentPage - 1) * pageSize + 1} -{" "}
                {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 rounded-md border"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded-md border ${currentPage === i + 1 ? "bg-position-text text-white" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded-md border"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </Chart>
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
                {formatDateTime(selected?.billingDate as string | undefined)}
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
                            {formatDateTime(
                              r.rentDate as string | null | undefined
                            )}
                          </td>
                          <td>
                            {formatDateTime(
                              r.returnDate as string | null | undefined
                            )}
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
