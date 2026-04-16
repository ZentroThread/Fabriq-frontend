import { bookingService } from "@/services/booking.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useBookings = (tenantId: string) => {
  const queryClient = useQueryClient();

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", tenantId],
    queryFn: () => bookingService.getAllByTenant(tenantId),
  });

  const approveMutation = useMutation({
    mutationFn: bookingService.ApproveStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", tenantId] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: bookingService.RejectStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", tenantId] });
    },
  });

  return { bookings, isLoading, error, approveMutation, rejectMutation };
};
