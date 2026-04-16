import { useAuthStore } from "@/store/user-auth-store";
import { useBookings } from "@/hooks/booking/useBooking";
import type { Booking } from "@/schemas/booking.shema";
import BookingCard from "@/components/molecules/cards/booking-card";

export default function Bookings() {
  const tenantId = useAuthStore((state) => state.tenantId);

  const { bookings, isLoading, error, approveMutation, rejectMutation } =
    useBookings(tenantId!);

  if (isLoading) {
    return (
      <p className="text-center py-10 text-(--color-text-color)">
        Loading bookings...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-(--color-error)">
        Error loading bookings
      </p>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-(--color-main-bg)">
      <h1 className="text-3xl font-bold mb-6 text-(--color-text-color)">
        Booking Requests
      </h1>
      {bookings?.length === 0 ? (
        <p className="text-(--color-text-color)">No booking requests found.</p>
      ) : (
        <div className="space-y-4">
          {bookings?.map((b: Booking) => (
            <BookingCard
              key={b.id}
              b={b}
              approveMutation={approveMutation}
              rejectMutation={rejectMutation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
