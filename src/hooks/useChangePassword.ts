import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services/login.service";
import Swal from "sweetalert2";

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const response = await loginService.changePassword(data);
      if (!response.success && response.message) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: async (data) => {
      await Swal.fire({
        icon: "success",
        title: "Password Changed",
        text: data.message || "Your password has been changed successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: async (error: Error) => {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to change password",
      });
    },
  });
}
