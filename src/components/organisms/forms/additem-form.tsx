"use client";

import { z } from "zod";
import Swal from "sweetalert2";
import { useAddItem } from "@/hooks/useItems";
import { useAuthStore } from "@/store/user-auth-store";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { addItemFormSchema } from "@/schemas/user.schema";
import { useAddItemForm } from "@/hooks/useAddItemForm";
import { categories, status } from "@/constants/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUpdateItem } from "@/hooks/useItems";
import { useEffect } from "react";

interface AddItemFormProps {
  onClose?: () => void;
  editMode?: boolean;
  itemData?: {
    id: number;
    code: string;
    title: string;
    description: string;
    price: number;
    stock: string;
    status: string;
    category: {
      tenantId: string;
      categoryId: number;
      categoryCode: string;
      categoryName: string;
    };
    image?: string;
  };
}

export function AddItemForm({
  onClose,
  editMode = false,
  itemData,
}: AddItemFormProps) {
  const form = useAddItemForm();
  // Pre-fill form when in edit mode
  useEffect(() => {
    if (editMode && itemData) {
      form.reset({
        code: itemData.code,
        title: itemData.title,
        description: itemData.description,
        price: itemData.price.toString(), // Convert to string for form
        stock: itemData.stock.toString(), // Convert to string for form
        status: itemData.status,
        categoryId: itemData.category.categoryId,
        image: undefined, // Image will need to be re-uploaded in edit mode
      });
    }
  }, [editMode, itemData, form]);

  const updateItemMutation = useUpdateItem();
  const addItemMutation = useAddItem();
  const { getTenantId, isAuthenticated } = useAuthStore();

  async function onSubmit(values: z.infer<typeof addItemFormSchema>) {
    // Validate authentication and tenant ID before submitting
    if (!isAuthenticated()) {
      await Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please log in to continue.",
      });
      return;
    }

    const tenantId = getTenantId();
    if (!tenantId) {
      await Swal.fire({
        icon: "error",
        title: "Session Error",
        text: "Tenant ID not found. Please log out and log back in.",
      });
      console.error("❌ Tenant ID is missing from auth store");
      return;
    }

    console.log("✅ Submitting with tenant ID:", tenantId);

    const payload = {
      ...values,
      // ensure numeric types
      price: parseFloat(values.price) || 0,
      stock: parseInt(values.stock, 10) || 0,
      category: Number(values.categoryId),
      // ensure required string fields are always strings
      title: values.title ?? "",
      description: values.description ?? "",
    };

    if (editMode && itemData) {
      // Update existing item
      try {
        await updateItemMutation.mutateAsync({
          id: String(itemData.id),
          data: payload,
        });
        await Swal.fire({
          icon: "success",
          title: "Item updated successfully!",
          timer: 1600,
          showConfirmButton: false,
        });
        if (onClose) onClose();
      } catch (error: unknown) {
        console.error("Error updating item:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to update item. Refresh the page.",
          text: error instanceof Error ? error.message : "Unknown error",
        });
      }
    } else {
      // Add new item
      try {
        await addItemMutation.mutateAsync(payload);
        if (onClose) onClose();
      } catch (error: unknown) {
        console.error("Error adding item:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to add item",
          text: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  }

  return (
    <Form {...form}>
      {/* SweetAlert2 used for success messages; inline SuccessAlert removed */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card">
        <ScrollArea className="h-[500px] w-full pr-4 [&>div>div]:space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nilame Suit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ATR001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Black color with purls"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (LKR)</FormLabel>
                  <FormControl>
                    <Input
                      type="numeric "
                      placeholder="e.g., 8000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="numeric" placeholder="e.g., 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-2 justify-between">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <NativeSelect
                        className="rounded-md border-1 border-position-text w-50"
                        {...field}
                        value={field.value?.toString() || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        <NativeSelectOption className="" value="" disabled>
                          Select category
                        </NativeSelectOption>
                        {categories.map((category) => (
                          <NativeSelectOption
                            key={category.value}
                            value={category.value.toString()}
                          >
                            {category.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <NativeSelect
                        className="rounded-md border-1 border-position-text w-50"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <NativeSelectOption value="" disabled>
                          Select status
                        </NativeSelectOption>

                        {status.map((statusOption) => (
                          <NativeSelectOption
                            key={statusOption.value}
                            value={statusOption.value}
                          >
                            {statusOption.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>
                    Image{" "}
                    {editMode &&
                      itemData?.image &&
                      "(Current image displayed below)"}
                  </FormLabel>
                  <FormControl>
                    <div>
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                      />

                      <label
                        htmlFor="imageUpload"
                        className="bg-support-button text-support-button-text text-[14px] p-2 rounded-md font-light hover:bg-support-button-hover cursor-pointer"
                      >
                        {editMode ? "Change Image" : "Choose Image"}
                      </label>
                    </div>
                  </FormControl>
                  {/* <FormDescription className="text-position-text font-light ">Upload an image file</FormDescription> */}
                  <FormMessage />

                  {/* Preview the uploaded image */}
                  {value && value instanceof File ? (
                    <div className="mt-2">
                      <p className="text-xs text-position-text mb-1">
                        New Image Preview:
                      </p>
                      <img
                        src={URL.createObjectURL(value)}
                        alt="Preview"
                        className="max-w-xs max-h-48 rounded border"
                      />
                    </div>
                  ) : editMode && itemData?.image ? (
                    <div className="mt-2">
                      <p className="text-xs text-position-text mb-1">
                        Current Image:
                      </p>
                      <img
                        src={itemData.image}
                        alt="Current"
                        className="max-w-xs max-h-48 rounded border"
                      />
                    </div>
                  ) : null}
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                className="bg-bg-red  hover:opacity-80 hover:bg-bg-red"
                onClick={onClose}
                disabled={addItemMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className=" bg-bg-green hover:opacity-80 hover:bg-bg-green "
                disabled={
                  addItemMutation.isPending || updateItemMutation.isPending
                }
              >
                {editMode
                  ? updateItemMutation.isPending
                    ? "Updating..."
                    : "Update Item"
                  : addItemMutation.isPending
                    ? "Adding..."
                    : "Add Item"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
}
