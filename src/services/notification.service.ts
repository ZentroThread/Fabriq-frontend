import { API_ENDPOINTS } from "@/constants/api.constants";
import { apiClient } from "@/lib/client";
import { logger } from "@/utils/logger";

// Ensure proper typing for API responses
export interface CustomerApiResponse {
  custId?: string;
  cust_id?: string;
  custCode?: string;
  cust_code?: string;
  custName?: string;
  cust_name?: string;
  custMobileNumber?: string;
  custWhatsappNumber?: string;
  custEmail?: string;
}
class NotificationService {
  async sendWelcomeNotification(customer: CustomerApiResponse): Promise<void> {
    try {
      const phone = String(
        customer.custWhatsappNumber ?? customer.custMobileNumber ?? ""
      );
      const name = String(customer.custName ?? customer.cust_name ?? "");
      const email = String(customer.custEmail ?? "");
      const code = String(customer.custCode ?? customer.cust_code ?? "");

      const eventPayload = {
        eventType: "WELCOME",
        recipientPhone: phone,
        recipientEmail: email,
        recipientName: name,
        templateData: { custCode: code, custName: name },
        priority: 1,
        timestamp: new Date().toISOString(),
      };

      // Ensure consistent Axios integration (handles tokens/auth/tenant headers if applicable)
      await apiClient.request(API_ENDPOINTS.NOTIFICATION.PUBLISH, {
        method: "POST",
        data: eventPayload,
      });
    } catch (e) {
      logger.warn("Failed to publish welcome notification via Notification Service", e);
      throw e;
    }
  }
}

export const notificationService = new NotificationService();
