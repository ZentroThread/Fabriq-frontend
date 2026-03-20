import { useAuthStore } from "@/store/user-auth-store";
import { useBookings } from "@/hooks/useBooking";
import type { Booking } from "@/schemas/booking.shema";

export default function Bookings() {
  const tenantId = useAuthStore((state) => state.tenantId);

  const {
    bookings,
    isLoading,
    error,
    approveMutation,
    rejectMutation,
  } = useBookings(tenantId!);

  if (isLoading) {
    return <p className="text-center py-10">Loading bookings...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Error loading bookings</p>;
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Booking Requests</h1>

      {bookings?.length === 0 ? (
        <p>No booking requests found.</p>
      ) : (
        <div className="space-y-4">
          {bookings?.map((b: Booking) => (
            <div
              key={b.id}
              className="border rounded-lg p-5 shadow-sm flex flex-col gap-2"
            >
              <p><strong>Booking ID:</strong> {b.id}</p>
              <p><strong>Attire ID:</strong> {b.attireId}</p>
              <p><strong>User:</strong> {b.userEmail}</p>

              <p><strong>Start Date:</strong> {b.startDate}</p>
              <p><strong>End Date:</strong> {b.endDate}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    b.status === "APPROVED"
                      ? "text-green-600"
                      : b.status === "REJECTED"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {b.status}
                </span>
              </p>

              {/* ACTION BUTTONS */}
              {b.status === "PENDING" && b.id && (
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => approveMutation.mutate(b.id!)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectMutation.mutate(b.id!)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}