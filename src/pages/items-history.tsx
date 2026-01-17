import { useEffect, useState } from "react";
import Chart from "@/components/templates/Chart";
import { attireRentService } from "@/services/attireRent.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define types
interface AttireRent {
  id?: number;
  attireCode?: string;
  custCode?: string;
  billingCode?: string;
  rentDate?: string;
  returnDate?: string;
  rentDuration?: number;
  attire?: {
    attireCode?: string;
  };
}

interface AggregatedItem {
  code: string;
  upcomingCount: number;
  previousCount: number;
  rents: string[];
}

export default function ItemsHistoryPage() {
  const [list, setList] = useState<AttireRent[]>([]);
  const [loading, setLoading] = useState(true);
  const [agg, setAgg] = useState<AggregatedItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await attireRentService.getAll();
        if (!mounted) return;
        const rows: AttireRent[] = Array.isArray(resp)
          ? resp
          : resp?.data || resp || [];
        const today = new Date();

        // build aggregated stats by attire code
        const map = new Map<string, AggregatedItem>();

        // category fields removed — no normalization required

        for (const r of rows) {
          const code = r.attireCode || r.attire?.attireCode || "-";
          const rentDate = r.rentDate ? new Date(r.rentDate) : null;

          if (!map.has(code)) {
            map.set(code, {
              code,
              upcomingCount: 0,
              previousCount: 0,
              rents: [],
            });
          }

          const entry = map.get(code);
          if (entry && rentDate) {
            entry.rents.push(rentDate.toISOString());
            if (rentDate > today) entry.upcomingCount += 1;
            else entry.previousCount += 1;
          }
        }

        const aggregated = Array.from(map.values()).map((e) => ({
          ...e,
          rents: e.rents.sort(),
        }));

        setAgg(aggregated);

        // also set list to past rentals for backwards compat display
        const past = rows.filter(
          (r) => r.rentDate && new Date(r.rentDate) <= today
        );
        setList(past);
      } catch (e) {
        // extract meaningful message from axios error-like objects
        let msg = "Request failed";
        const error = e as { response?: { data?: unknown }; message?: string };

        if (error?.response && error.response.data) {
          try {
            msg =
              typeof error.response.data === "string"
                ? error.response.data
                : JSON.stringify(error.response.data);
          } catch (_err) {
            msg = String(error.response.data);
          }
        } else if (error?.message) {
          msg = error.message;
        }

        console.warn("items-history.tsx error:", msg);
        setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-5">
      <div className="text-style text-[30px] font-semibold">
        Item Rental Analysis
      </div>
      <div className="text-position-text"></div>
      <Chart>
        {loading ? (
          <div className="p-4 text-position-text justify-center">
            Loading...
          </div>
        ) : error ? (
          <div className="p-4 text-red-400">Error: {error}</div>
        ) : agg.length === 0 ? (
          <div className="p-4 text-position-text">No rental history found.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {agg.map((item, idx) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Chart>
    </div>
  );
}
