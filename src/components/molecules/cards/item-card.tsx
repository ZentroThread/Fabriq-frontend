import { useState } from "react";
import { AlertDialogDemo } from "@/components/atoms/alert/alert-dialog";
import Button from "@/components/atoms/button/custom-button";
import { AddItemForm } from "@/components/organisms/forms/additem-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteItem } from "@/hooks/attire/useItems";
import { cn } from "@/utils/style";
import { SquarePen, Trash2 } from "lucide-react";

interface ItemCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  stock?: string;
  image: string;
  code: string;
  status: string;
  categoryId?: {
    tenantId: string;
    categoryId: number;
    categoryCode: string;
    categoryName: string;
  };
  selectedDate?: string;
}

export function ItemCard({
  id,
  title = "NO title",
  description,
  price,
  stock,
  image,
  code,
  status,
  categoryId,
}: ItemCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const deleteItemMutation = useDeleteItem();

  const handleDelete = () => {
    deleteItemMutation.mutate(Number(id));
  };

  return (
    <>
      <Card className="w-auto overflow-hidden shadow-md bg-card rounded-xl hover:scale-105">
        <div className="relative">
          <img src={image} alt="attire" className="w-full h-70 object-cover" />

          {/* Corner Button */}
          <button
            className={cn(
              "absolute top-2 right-2 border px-3 py-1 rounded-xl text-xs shadow hover:opacity-90",
              status === "Available"
                ? "bg-support-button text-support-button-text"
                : status === "In Laundry"
                  ? "bg-bg-green text-light-white"
                  : status === "Rented"
                    ? "bg-bg-red text-light-white"
                    : "bg-support-button"
            )}
          >
            #{stock} {status}
          </button>
        </div>
        <CardHeader>
          <CardTitle className="text-lg pl-2 text-text-inactive ">
            {title}
            <br />
            {code}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm  pb-5 text-position-text font-light">
            {description}
          </p>
          <div className="text-sm text-position-text font-light ">
            <div className="flex justify-between items-center w-full ">
              <span>Per Day (LKR)</span>
              <span>Stock</span>
            </div>
          </div>
          <div className="flex justify-between items-center w-full gap-x-4 mt-2">
            <span className="text-style">
              {typeof price === "number"
                ? price.toLocaleString("en-US")
                : price}
            </span>
            <span className="text-style font-extrabold">
              {stock && !isNaN(Number(stock))
                ? Number(stock).toLocaleString("en-US")
                : stock}
            </span>
          </div>
          <div className="flex flex-2 justify-center gap-4 p-3">
            <Button
              text={"Edit"}
              bgcolor={"bg-bg-card1"}
              hoverbg={""}
              width="w-25"
              height="h-4"
              padding="p-4"
              textcolor={"text-icon-card1"}
              bordercolor={"border-border-card1"}
              onClick={() => setIsEditDialogOpen(true)}
              icon={<SquarePen className="w-4" />}
            />
            <AlertDialogDemo
              title={"Delete Item"}
              description={"Are you sure, do you want to delete the item?"}
              cancel={"Cancel"}
              yes={"Delete"}
              yesColor="bg-red border-1 "
              onConfirm={handleDelete}
            >
              <Button
                text={"Delete"}
                bgcolor={"bg-bg-card3"}
                hoverbg={""}
                width="w-25"
                height="h-4"
                padding="p-4"
                textcolor={"text-icon-card3"}
                icon={<Trash2 className="w-4" />}
              />
            </AlertDialogDemo>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] bg-card">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-style font-extrabold text-xl">
              Edit Item
            </DialogTitle>
            <DialogDescription className="text-position-text font-light">
              Update the item details in your bridal attire and accessories
              inventory
            </DialogDescription>
          </DialogHeader>
          <AddItemForm
            editMode={true}
            itemData={{
              id,
              code,
              title,
              description,
              price,
              stock: stock || "0",
              status,
              category: categoryId || {
                tenantId: "",
                categoryId: 0,
                categoryCode: "",
                categoryName: "",
              },
              image,
            }}
            onClose={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
