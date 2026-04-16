import Swal from "sweetalert2";

export const logger = {
  error: (message: string, error?: unknown, showToast = false) => {
    console.error(`[ERROR] ${message}`, error || "");
    if (showToast) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
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

  warn: (message: string, data?: unknown, showToast = false) => {
    console.warn(`[WARN] ${message}`, data || "");
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

  info: (message: string, data?: unknown, showToast = false) => {
    console.info(`[INFO] ${message}`, data || "");
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
