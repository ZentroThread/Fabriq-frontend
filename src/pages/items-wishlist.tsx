import { useEffect, useState } from "react";
import Chart from "@/components/templates/Chart";
import { attireRentService } from "@/services/attireRent.service";

export default function ItemsWishlistPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await attireRentService.getAll();
        if (!mounted) return;
        const rows = Array.isArray(resp) ? resp : resp?.data || resp || [];
        const today = new Date();
        const future = rows.filter(
          (r: any) => r.rentDate && new Date(r.rentDate) > today
        );
        setList(future);
      } catch (e) {
        console.warn(e);
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
        Future Reservations
      </div>
      <div className="text-position-text">Future rents / wishlist entries</div>
      <Chart
        
      >
        {loading ? (
          <div>Loading...</div>
        ) : list.length === 0 ? (
          <div className="text-position-text">
            No future reservations found.
          </div>
        ) : (
          <div className="space-y-2">
            {list.map((it, idx) => (
              <div key={idx} className="p-3 border rounded bg-card">
                <div className="font-medium">
                  {it.attireCode || it.attire?.attireCode}
                </div>
                <div className="text-sm text-position-text">
                  Customer: {it.custCode || it.customer?.custCode}
                </div>
                <div className="text-sm text-position-text">
                  Date: {it.rentDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </Chart>
    </div>
  );
}
