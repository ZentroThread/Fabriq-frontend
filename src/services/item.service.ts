import Swal from "sweetalert2";
import { useAuthStore } from "@/store/user-auth-store";

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
    const { user, token } = useAuthStore.getState();

    formData.append("attireCode", data.code);
    formData.append("attireName", data.title);
    formData.append("attireDescription", data.description);
    formData.append("attireStatus", data.status);
    formData.append("attirePrice", data.price.toString());
    formData.append("categoryId", data.category.toString());
    formData.append("attireStock", data.stock.toString());
    // formData.append("tenantId", tenantId);

    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }
    console.log("📦 FormData contents:");
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }
    const response = await fetch("http://localhost:8081/v1/attire/add", {
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
      console.error("Backend error response:", errorText);
      console.error("Response status:", response.status);
      console.error(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      let errorMessage = errorText || "Failed to add item";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData?.message || errorText;
      } catch {
        // Response is plain text, use it directly
        errorMessage = errorText;
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
