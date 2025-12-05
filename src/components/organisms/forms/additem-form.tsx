"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addItemFormSchema } from "@/schemas/user.schema";
import { useAddItemForm } from "@/hooks/hooks";

interface AddItemFormProps {
  onClose?: () => void;
}

export function AddItemForm({ onClose }: AddItemFormProps) {
  const form = useAddItemForm();

  function onSubmit(values: z.infer<typeof addItemFormSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend
    // For now, we'll just close the dialog
    if (onClose) {
      onClose();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-card"
      >
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Black color with purls" {...field} />
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

        <FormField
  control={form.control}
  name="image"
  render={({ field: { value, onChange, ...field } }) => (
    <FormItem>
      <FormLabel>Image (Optional)</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          {...field}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Convert to base64 or handle file
              const reader = new FileReader();
              reader.onloadend = () => {
                onChange(reader.result); // This will be a base64 string
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </FormControl>
      {/* <FormDescription className="text-position-text font-light ">Upload an image file</FormDescription> */}
      <FormMessage />
      
      {/* Preview the uploaded image */}
      {value && (
        <div className="mt-2">
          <img 
            src={value} 
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
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className=" bg-bg-green hover:opacity-80 hover:bg-bg-green "
          >
            Add Item
          </Button>
        </div>
      </form>
    </Form>
  );
}
