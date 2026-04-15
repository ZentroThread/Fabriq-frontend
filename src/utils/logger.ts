import Swal from "sweetalert2";

export const logger = {
  error: (message: string, error?: unknown, showToast = false) => {
    if (showToast) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        text: errorMsg,
        showConfirmButton: false,
        timer: 4000,
        toast: true,
      });
    }
  },

  warn: (message: string, _data?: unknown, showToast = false) => {
    if (showToast) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    }
  },

  info: (message: string, _data?: unknown, showToast = false) => {
    if (showToast) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
    }
  },
};
