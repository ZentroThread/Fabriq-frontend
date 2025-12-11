import Swal from "sweetalert2";
import { useAuthStore } from "@/store/user-auth-store";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { API_BASE_URL } from "@/constants/constdata";

interface AddItemPayload {
  code: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: number;
  status: string;
  image?: File | string;
}

export const itemService = {
  addItem: async (data: AddItemPayload) => {
    const formData = new FormData();
    const { token } = useAuthStore.getState();

    formData.append("attireCode", data.code);
    formData.append("attireName", data.title);
    formData.append("attireDescription", data.description);
    formData.append("attireStatus", data.status);
    formData.append("attirePrice", data.price.toString());
    formData.append("categoryId", data.category.toString());
    formData.append("attireStock", data.stock.toString());

    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }
    // console.log("📦 FormData contents:");
    // for (const [key, value] of formData.entries()) {
    //   console.log(`  ${key}:`, value);
    // }
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ATTIRE.ADD}`, {
      method: "POST",
      headers: {
        // Add Authorization header if you need it
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    console.log(formData);
    if (!response.ok) {
      const errorText = await response.text();

      let errorMessage = errorText || "Failed to add item";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData?.message || errorText;
      } catch {
        /* empty */
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();

    // Show success message
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item added successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    return result;
  },
};
