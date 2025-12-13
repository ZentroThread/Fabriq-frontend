import Button from "@/components/atoms/button/add-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SquarePen, Trash2 } from "lucide-react";

interface ItemCardProps {
  title: string;
  description: string;
  price: string;
  stock?: string;
  image: string;
  code: string;
}

export function ItemCard({
  title,
  description,
  price,
  stock,
  image,
  code,
}: ItemCardProps) {
  return (
    <Card className="w-auto overflow-hidden shadow-md bg-card rounded-xl hover:scale-105 ">
      <div className="relative">
        <img src={image} alt="attire" className="w-full h-70 object-cover" />

        {/* Corner Button */}
        <button className="absolute top-2 right-2 bg-support-button text-support-button-text border  px-3 py-1 rounded-xl text-xs shadow hover:opacity-90">
          Available
        </button>
      </div>
      <CardHeader>
        <CardTitle className="text-lg pl-2 text-text-inactive ">
          {title}.{code}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm  pb-5 text-position-text font-light">
          {description}
        </p>
        <div className="text-sm text-position-text font-light">
          <div className="flex justify-between items-center w-full ">
            <span>Per Day</span>
            <span>Stock</span>
          </div>
        </div>
        <div className="flex justify-between items-center w-full gap-x-4 mt-2">
          <span className="text-style">{price}</span>
          <span className="text-style font-extrabold">{stock}</span>
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
            icon={<SquarePen className="w-4" />}
          />
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
        </div>
      </CardContent>
    </Card>
  );
}
