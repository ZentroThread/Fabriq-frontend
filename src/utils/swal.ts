import Swal from "sweetalert2";

export const swalSuccess = (title: string, text?: string) =>
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#16a34a",
  });

export const swalError = (title: string, text?: string) =>
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#dc2626",
  });

export const swalConfirm = (
  title: string,
  text: string
): Promise<boolean> =>
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
  }).then((res) => res.isConfirmed);

export const swalLoading = (title = "Processing...") =>
  Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
