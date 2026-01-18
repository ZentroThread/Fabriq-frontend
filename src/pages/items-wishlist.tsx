import { useEffect, useState } from "react";
import Chart from "@/components/templates/Chart";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import type { ComponentProps } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ItemsWishlistPage() {
  // Zustand store
  const {
    list,
    isLoading: loading,
    currentPage,
    rowsPerPage,
    searchQuery,
    selectedDate,
    fetchWishlist,
    setCurrentPage,
    setRowsPerPage,
    setSearchQuery,
    setSelectedDate,
    clearDateFilter,
  } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const filteredList = list.filter((it) => {
    // Filter by selected date first
    if (selectedDate) {
      if (!it?.rentDate) return false;
      const rentDate = new Date(it.rentDate);
      const selectedDateOnly = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      const rentDateOnly = new Date(
        rentDate.getFullYear(),
        rentDate.getMonth(),
        rentDate.getDate()
      );
      if (rentDateOnly.getTime() !== selectedDateOnly.getTime()) return false;
    }

    // Then filter by search query
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const custCode = (it.custCode || it.customer?.custCode || "").toLowerCase();
    const billCode = (
      it.billingCode ||
      it.billing?.billingCode ||
      ""
    ).toLowerCase();
    const attireCode = (
      it.attireCode ||
      it.attire?.attireCode ||
      ""
    ).toLowerCase();
    return (
      custCode.includes(query) ||
      billCode.includes(query) ||
      attireCode.includes(query)
    );
  });

  // Sort by rent date in ascending order
  const sortedList = [...filteredList].sort((a, b) => {
    const dateA = a.rentDate ? new Date(a.rentDate).getTime() : 0;
    const dateB = b.rentDate ? new Date(b.rentDate).getTime() : 0;
    return dateA - dateB;
  });

  const totalPages = Math.ceil(sortedList.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedList = sortedList.slice(startIdx, startIdx + rowsPerPage);

  const { dateCounts } = (() => {
    const map = new Map<string, Set<string>>();
    const toKey = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    for (const it of list) {
      if (!it?.rentDate) continue;
      const d = new Date(it.rentDate);
      if (isNaN(d.getTime())) continue;
      const key = toKey(d);
      const bill =
        it.billingCode || it.billing?.billingCode || it.billing?.code;
      const billKey = String(bill ?? "-");
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)!.add(billKey);
    }

    const counts = new Map<string, number>();
    const bills = new Map<string, string[]>();
    for (const [k, s] of map.entries()) {
      counts.set(k, s.size);
      bills.set(k, Array.from(s));
    }

    return { dateCounts: counts };
  })();

  const todayStart = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })();

  return (
    <div className="p-5">
      <div className="text-style text-[30px] font-semibold">
        Future Reservations
      </div>
      <div className="text-position-text">Future rents / wishlist entries</div>
      {loading ? (
        <div>Loading...</div>
      ) : list.length === 0 ? (
        <div className="text-position-text">No future reservations found.</div>
      ) : (
        <>
          <Chart height="h-20" padding="p-2 pl-6">
            <div className="gap-4 flex pr-5 items-center">
              <input
                type="text"
                placeholder="Search by Customer Code, Bill Number or Item Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-(--color-border) rounded-md bg-main-bg text-position-text placeholder:text-position-text focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              {selectedDate && (
                <button
                  onClick={clearDateFilter}
                  className="px-3 py-2 border border-(--color-border) rounded-md bg-main-bg text-position-text hover:bg-(--color-hover-bg) transition-colors whitespace-nowrap"
                >
                  Clear Date Filter
                </button>
              )}
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="px-3 py-2 border border-(--color-border) rounded-md bg-main-bg text-position-text focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value={10}>10 rows</option>
                <option value={15}>15 rows</option>
                <option value={20}>20 rows</option>
              </select>
            </div>
          </Chart>

          <div className="flex gap-8 items-baseline mt-5">
            <Chart className="flex-1" label="Whishlist">
              <Table className="text-position-text font-light">
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Code</TableHead>
                    <TableHead>Bill Number</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Rent Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedList.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-position-text py-8"
                      >
                        No items available
                        {selectedDate ? " for the selected date" : ""}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedList.map((it, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {it.custCode || it.customer?.custCode}
                        </TableCell>
                        <TableCell>
                          {it.billingCode || it.billing?.billingCode}
                        </TableCell>
                        <TableCell>
                          {it.attireCode || it.attire?.attireCode}
                        </TableCell>
                        <TableCell>
                          {it.rentDate
                            ? new Date(it.rentDate).toLocaleString()
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow />
                </TableFooter>
              </Table>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-position-text">
                  Showing {startIdx + 1} -{" "}
                  {Math.min(startIdx + rowsPerPage, filteredList.length)} of{" "}
                  {filteredList.length} entries
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-(--color-border) rounded-md bg-main-bg text-position-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-(--color-hover-bg) transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-position-text">
                    Page {currentPage} of {totalPages || 1}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage >= totalPages}
                    className="px-3 py-1 border border-(--color-border) rounded-md bg-main-bg text-position-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-(--color-hover-bg) transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </Chart>

            <div className="w-[280px]">
              <Calendar
                className="bg-card rounded-xl p-3"
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: todayStart }}
                components={{
                  DayButton: ({ day, modifiers, ...props }) => {
                    const toKey = (d: Date) => {
                      const y = d.getFullYear();
                      const m = String(d.getMonth() + 1).padStart(2, "0");
                      const dayS = String(d.getDate()).padStart(2, "0");
                      return `${y}-${m}-${dayS}`;
                    };
                    const key = toKey(day.date);
                    const [open, setOpen] = useState(false);
                    const count = dateCounts.get(key) || 0;
                    // const bills = dateBills.get(key) || [];

                    if (count > 0) {
                      return (
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <div
                              onPointerEnter={() => setOpen(true)}
                              onPointerLeave={() => setOpen(false)}
                            >
                              <CalendarDayButton
                                {...(props as ComponentProps<
                                  typeof CalendarDayButton
                                >)}
                                day={day}
                                modifiers={modifiers}
                                className={cn(
                                  props.className,
                                  "bg-support-button text-support-button-text"
                                )}
                              />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent
                            side="top"
                            className="p-2 text-center w-10 rounded-full bg-support-button/75"
                          >
                            <div className="font-medium text-black">{`${count} `}</div>
                            {/* <div className="text-position-text text-sm mt-1">
                            {bills.join(", ")}
                          </div> */}
                          </PopoverContent>
                        </Popover>
                      );
                    }

                    return (
                      <CalendarDayButton
                        {...(props as ComponentProps<typeof CalendarDayButton>)}
                        day={day}
                        modifiers={modifiers}
                        className={cn(
                          props.className,
                          modifiers.today ? "text-light-black-dark" : ""
                        )}
                      />
                    );
                  },
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
