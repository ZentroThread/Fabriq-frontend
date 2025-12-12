"use client";

import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useItemStore } from "@/store/item-store";
import { itemService } from "@/services/item.service";
import SuccessAlert from "@/components/atoms/alert/success-alert";
import { useState } from "react";

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
import { useAddItemForm } from "@/hooks/hooks";
import { categories, status } from "@/constants/data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddItemFormProps {
  onClose?: () => void;
}

export function AddItemForm({ onClose }: AddItemFormProps) {
  const form = useAddItemForm();
  const queryClient = useQueryClient();
  const addItem = useItemStore((state) => state.addItem);
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: itemService.addItem,
    onSuccess: (data) => {
      // Update Zustand store
      if (data.value) {
        addItem(data.value);
      }

      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ["items"] });

      // Show success alert
      setShowSuccess(true);

      // Hide success alert after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) onClose();
      }, 3000);
    },
    onError: (error) => {
      console.error("Error adding item:", error);
      // Show error message to user
      alert(`Failed to add item: ${error.message || "Unknown error"}`);
    },
  });

  function onSubmit(values: z.infer<typeof addItemFormSchema>) {
    mutation.mutate({
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
      category: Number(values.categoryId),
    });
  }

  return (
    <Form {...form}>
      {showSuccess && (
        <div className="mb-4">
          <SuccessAlert
            title="Success!"
            description="Item added successfully!"
          />
        </div>
      )}
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
                    <Input type="number" placeholder="e.g., 8000" {...field} />
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
                    <Input type="number" placeholder="e.g., 3" {...field} />
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
                  <FormLabel>Image </FormLabel>
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
                        className="bg-support-button text-support-button-text text-[14px] p-2 rounded-md font-light hover:bg-support-button-hover"
                      >
                        Choose Image
                      </label>
                    </div>
                  </FormControl>
                  {/* <FormDescription className="text-position-text font-light ">Upload an image file</FormDescription> */}
                  <FormMessage />

                  {/* Preview the uploaded image */}
                  {value && value instanceof File && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(value)}
                        alt="Preview"
                        className="max-w-xs max-h-48 rounded border"
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                className="bg-bg-red  hover:opacity-80 hover:bg-bg-red"
                onClick={onClose}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className=" bg-bg-green hover:opacity-80 hover:bg-bg-green "
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Adding..." : "Add Item"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
}
