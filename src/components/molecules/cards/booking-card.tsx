import { useAttireGetById } from "@/hooks/attire/useAttire";
import type { Booking } from "@/schemas/booking.shema";
import type { UseMutationResult } from "@tanstack/react-query";

interface Props {
  b: Booking;

  approveMutation: UseMutationResult<
    Booking,
    Error,
    number,
    unknown
  >;

  rejectMutation: UseMutationResult<
    Booking,
    Error,
    number,
    unknown
  >;
}

export default function BookingCard({
  b,
  approveMutation,
  rejectMutation,
}: Props) {
  const { data: attireData, isLoading } = useAttireGetById(
    b.attireId?.toString()
  );

  return (
    <div
      className="border rounded-xl p-5 
      bg-(--color-card) 
      border-(--color-border) 
      shadow-[0_2px_6px_var(--color-shadow)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <div className="flex flex-col gap-2">
          <p className="text-(--color-text-color)">
            <strong>Booking ID:</strong> {b.id}
          </p>

          <p className="text-(--color-text-color)">
            <strong>User:</strong> {b.userEmail}
          </p>

          <p className="text-(--color-text-color)">
            <strong>Start Date:</strong> {b.startDate}
          </p>

          <p className="text-(--color-text-color)">
            <strong>End Date:</strong> {b.endDate}
          </p>

          <p className="text-(--color-text-color)">
            <strong>Status:</strong>{" "}
            <span
              className={
                b.status === "APPROVED"
                  ? "text-(--color-green) font-semibold"
                  : b.status === "REJECTED"
                  ? "text-(--color-error) font-semibold"
                  : "text-(--color-pie-2) font-semibold"
              }
            >
              {b.status}
            </span>
          </p>

          <p className="text-sm text-(--color-text-color)">
            Requested on:{" "}
            {b.createdAt
              ? new Date(b.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          
          <div>
            <p className="text-(--color-text-color)">
              <strong>Attire:</strong>{" "}
              {isLoading
                ? "Loading..."
                : attireData?.name || attireData?.code || "N/A"}
            </p>
          </div>
          {attireData?.image && (
            <img
              src={
                typeof attireData.image === "string"
                  ? attireData.image
                  : URL.createObjectURL(attireData.image)
              }
              alt={attireData.name}
              className="w-full max-w-[200px] h-40 object-cover rounded-lg border"
            />
          )}
          {b.status === "PENDING" && b.id && (
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={() => approveMutation.mutate(b.id!)}
                className="px-4 py-2 rounded-md 
                bg-(--color-green) 
                text-(--color-button-text) 
                hover:opacity-90 
                transition"
              >
                Approve
              </button>

              <button
                onClick={() => rejectMutation.mutate(b.id!)}
                className="px-4 py-2 rounded-md 
                bg-(--color-error) 
                text-(--color-button-text) 
                hover:opacity-90 
                transition"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}