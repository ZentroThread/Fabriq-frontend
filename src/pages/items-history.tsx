import { useEffect } from "react";
import Chart from "@/components/atoms/frame/frame";
import { attireRentService } from "@/services/attireRent.service";
import { ItemsHistorySkeleton } from "@/components/molecules/skeletons/items-history-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useItemsHistoryStore,
  type AggregatedItem,
  type AttireRent,
} from "@/store/items-history-store";

export default function ItemsHistoryPage() {
  const {
    loading,
    agg,
    error,
    categoryFilter,
    currentPage,
    rowsPerPage,
    itemQuery,
    codes,
    showSuggestions,
    setList,
    setLoading,
    setAgg,
    setError,
    setCurrentPage,
    setRowsPerPage,
    setItemQuery,
    setShowSuggestions,
    setCategories,
    setCodes,
  } = useItemsHistoryStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await attireRentService.getAll();
        if (!mounted) return;
        const rawRows = Array.isArray(resp)
          ? resp
          : (resp as { data?: AttireRent[] })?.data || [];
        const rows: AttireRent[] = rawRows.map((row) => ({
          ...row,
          id: typeof row.id === "string" ? parseInt(row.id, 10) : row.id,
        }));
        const today = new Date();

        const map = new Map<string, AggregatedItem>();
        for (const r of rows) {
          const code = r.attireCode || r.attire?.attireCode || "-";
          const rentDate = r.rentDate ? new Date(r.rentDate) : null;
          const categoryId = r.attire?.category?.categoryId;

          if (!map.has(code)) {
            map.set(code, {
              code,
              upcomingCount: 0,
              previousCount: 0,
              totalCount: 0,
              rents: [],
              categoryId,
            });
          }

          const entry = map.get(code);
          if (entry) {
            if (entry.categoryId == null && categoryId != null) {
              entry.categoryId = categoryId;
            }

            if (rentDate) {
              entry.rents.push(rentDate.toISOString());
              if (rentDate > today) entry.upcomingCount += 1;
              else entry.previousCount += 1;
            }
          }
        }

        const aggregated = Array.from(map.values()).map((e) => ({
          ...e,
          rents: e.rents.sort(),
        }));

        setAgg(aggregated);
        const cats = Array.from(
          new Set(aggregated.map((a) => a.categoryId).filter((c) => c != null))
        ) as number[];
        setCategories(cats);
        const uniqueCodes = Array.from(new Set(aggregated.map((a) => a.code)));
        setCodes(uniqueCodes);

        const past = rows.filter(
          (r) => r.rentDate && new Date(r.rentDate) <= today
        );
        setList(past);
      } catch (e) {
        let msg = "Request failed";
        const error = e as { response?: { data?: unknown }; message?: string };

        if (error?.response && error.response.data) {
          try {
            msg =
              typeof error.response.data === "string"
                ? error.response.data
                : JSON.stringify(error.response.data);
          } catch {
            msg = String(error.response.data);
          }
        } else if (error?.message) {
          msg = error.message;
        }

        setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredAgg = agg.filter((item) => {
    if (categoryFilter && String(item.categoryId) !== categoryFilter)
      return false;
    if (itemQuery && !item.code.toLowerCase().includes(itemQuery.toLowerCase()))
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredAgg.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedAgg = filteredAgg.slice(startIdx, startIdx + rowsPerPage);

  if (loading) {
    return <ItemsHistorySkeleton />;
  }

  return (
    <div className="p-5">
      <div className="text-style text-[30px] font-semibold">
        Item Rental Analysis
      </div>
      <div className="text-position-text"></div>
      {!error && (
        <Chart height="h-20" padding="p-2 pl-6">
          <div className="gap-4 flex pr-5 items-center">
            <div className="relative">
              <input
                value={itemQuery}
                onChange={(e) => {
                  setItemQuery(e.target.value);
                  setShowSuggestions(true);
                  setCurrentPage(1);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Filter by item code"
                className="px-3 py-2 border border-(--color-border) rounded-md bg-main-bg text-position-text focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent"
              />
              {showSuggestions && itemQuery.trim() && (
                <ul className="absolute left-0 mt-1 w-56 max-h-48 overflow-auto bg-card border border-(--color-border) rounded-md z-20">
                  {codes
                    .filter((c) =>
                      c.toLowerCase().includes(itemQuery.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((c) => (
                      <li
                        key={c}
                        onMouseDown={() => {
                          setItemQuery(c);
                          setShowSuggestions(false);
                          setCurrentPage(1);
                        }}
                        className="px-3 py-2 text-position-text hover:bg-support-button hover:text-support-button-text cursor-pointer"
                      >
                        {c}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-(--color-border) rounded-md bg-main-bg text-position-text focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value={10}>10 rows</option>
              <option value={15}>15 rows</option>
              <option value={20}>20 rows</option>
            </select>
          </div>
        </Chart>
      )}
      <Chart>
        {error ? (
          <div className="p-4 text-red-400">Error: {error}</div>
        ) : agg.length === 0 ? (
          <div className="p-4 text-position-text">No rental history found.</div>
        ) : filteredAgg.length === 0 ? (
          <div className="p-4 text-position-text">
            No items found for selected category.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-style font-bold">
                      Item Code
                    </TableHead>
                    <TableHead className="text-style font-bold text-center">
                      Upcoming Count
                    </TableHead>
                    <TableHead className="text-style font-bold text-center">
                      Previous Rented Count
                    </TableHead>
                    <TableHead className="text-style font-bold text-center">
                      Total Rents
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAgg.map((item, idx) => (
                    <TableRow key={idx} className="hover:bg-card">
                      <TableCell className="font-medium text-text-inactive">
                        {item.code}
                      </TableCell>
                      <TableCell className="text-center text-position-text">
                        {item.upcomingCount}
                      </TableCell>
                      <TableCell className="text-center text-position-text">
                        {item.previousCount}
                      </TableCell>
                      <TableCell className="text-center text-position-text">
                        {item.upcomingCount + item.previousCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between px-4">
              <div className="text-sm text-position-text">
                Showing {startIdx + 1} -{" "}
                {Math.min(startIdx + rowsPerPage, filteredAgg.length)} of{" "}
                {filteredAgg.length} entries
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
          </>
        )}
      </Chart>
    </div>
  );
}
