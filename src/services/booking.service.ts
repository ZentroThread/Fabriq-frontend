import { apiClient } from "@/lib/client";
import { getErrorMessage } from "@/utils/swal";
import type { Booking } from "@/schemas/booking.shema";
import { API_ENDPOINTS } from "@/constants/api.constants";

export const bookingService = {
  async getAllByTenant(tenantId: string): Promise<Booking[]> {
    try {
      const response = await apiClient.request<Booking[]>(
        `${API_ENDPOINTS.BOOKINGS.ByTenant(tenantId)}`,
        { method: "GET" }
      );
      return response;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to fetch bookings."));
    }
  },

  async ApproveStatus(bookingId: number): Promise<Booking> {
    try {
      const response = await apiClient.request<Booking>(
        `${API_ENDPOINTS.BOOKINGS.Approve(bookingId)}`,
        {
          method: "PUT",
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "Failed to update booking status.")
      );
    }
  },

  async RejectStatus(bookingId: number): Promise<Booking> {
    try {
      const response = await apiClient.request<Booking>(
        `${API_ENDPOINTS.BOOKINGS.Reject(bookingId)}`,
        {
          method: "PUT",
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "Failed to update booking status.")
      );
    }
  },
};

//  async getAll(): Promise<Feedback[]> {
//     const response = await apiClient.request<Feedback[]>(
//       API_ENDPOINTS.FEEDBACK.All,
//       { method: "GET" }
//     );
//     return z.array(FeedbackSchema).parse(response);
//   },
