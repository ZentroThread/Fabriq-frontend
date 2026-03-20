import { API_ENDPOINTS } from "@/constants/api.constants";
import { z } from "zod";
import { apiClient } from "@/lib/client";
import type { Feedback } from "@/schemas/feedback.schema";
import {  FeedbackSchema } from "@/schemas/feedback.schema";

export const feedbackService = {
  async getAll(): Promise<Feedback[]> {
    const response = await apiClient.request<Feedback[]>(
      API_ENDPOINTS.FEEDBACK.All,
      { method: "GET" }
    );
    return z.array(FeedbackSchema).parse(response);
  },

  async approveFeedback(id: number): Promise<Feedback> {
    const response = await apiClient.request<Feedback>(
      API_ENDPOINTS.FEEDBACK.Approve(id),
      { method: "PUT" }
    );
    return FeedbackSchema.parse(response);
  },
  async deleteFeedback(id: number): Promise<void> {
    await apiClient.request(
      API_ENDPOINTS.FEEDBACK.Delete(id),
      { method: "DELETE" }
    );
  }
};
