import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getErrorMessage,swalSuccess } from "@/utils/swal";
import { feedbackService } from "@/services/feedback.service";

export const useFeedback = () => {
  const queryClient = useQueryClient();

  const feedbackQuery = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      try {
        return await feedbackService.getAll();
      } catch (error) {
        console.error("Error fetching feedback:", error);
        throw error;
      }
    },
    retry: 1,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  const approveMutation = useMutation({
    mutationFn: async (id: number) => {
      try {
        return await feedbackService.approveFeedback(id);
      } catch (error) {
        console.error("Error approving feedback:", error);
        throw error;
      }
    },
    onSuccess: () => {
      swalSuccess("Feedback approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
    onError: (error) => {
      Swal.fire("Error", getErrorMessage(error), "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      try {
        await feedbackService.deleteFeedback(id);
      } catch (error) {
        console.error("Error deleting feedback:", error);
        throw error;
      }
    },
    onSuccess: () => {
      swalSuccess("Feedback deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
    onError: (error) => {
      Swal.fire("Error", getErrorMessage(error), "error");
    },
  });

  return {
    feedbackQuery,
    approveFeedback: approveMutation.mutate,
    deleteFeedback: deleteMutation.mutate,
  };  

};