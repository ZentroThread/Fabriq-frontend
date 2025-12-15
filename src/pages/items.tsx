import { useState } from "react";
import Button from "@/components/atoms/button/add-button";
import DashboardCard from "@/components/molecules/cards/dashboard-card";
import { ItemCard } from "@/components/molecules/cards/item-card";
import { ItemsSkeleton } from "@/components/molecules/skeletons/items-skeleton";
import { Input } from "@/components/molecules/input/input";
import Chart from "@/components/templates/Chart";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import { BanknoteArrowUp, Package, Plus, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddItemForm } from "@/components/organisms/forms/additem-form";
import { useFilteredItems, useAddItem } from "@/hooks/useItems";
import nilame1 from "@/assets/items/nilame1.jpeg";

function Items() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    items: filteredItems,
    allItems,
    isLoading,
    error,
    refetch,
  } = useFilteredItems(searchQuery);
  const addItemMutation = useAddItem();

  console.log("📦 Filtered Items:", filteredItems);
  console.log("📦 All Items:", allItems);

  const handleItemAdded = () => {
    setIsDialogOpen(false);
    // No need to manually refetch - TanStack Query handles it automatically
  };

  // Calculate stats from all items
  //const totalRevenue = allItems.reduce((sum, item) => sum + (item.price * item.stock), 0);
  //const activeRentals = allItems.filter(item => item.status === "RENTED").length;

  if (isLoading) {
    return <ItemsSkeleton />;
  }

  return (
    <div className="p-5 flex flex-col ">
      <div className="text-style text-[30px] font-semibold">
        Item Management
      </div>
      <div className="text-position-text ">
        Manage bridal attire and accessories inventory
      </div>
      <div className="flex gap-2 lg:mr-5 lg:ml-auto  sm:ml-0 sm:mr-auto">
        <Button
          text={"Add New Item"}
          width="w-45"
          icon={<Plus />}
          onClick={() => setIsDialogOpen(true)}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-card ">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-style font-extrabold text-xl">
              Add New Item
            </DialogTitle>
            <DialogDescription className="text-position-text font-light">
              Add a new item to your bridal attire and accessories inventory
            </DialogDescription>
          </DialogHeader>
          <AddItemForm onClose={handleItemAdded} />
        </DialogContent>
      </Dialog>
      <div className="grid lg:grid-cols-3  sm:grid-cols-2  gap-6 mt-5 mb-5">
        <DashboardCard
          lable={"Total Revenue"}
          lable1={"LKR 3.28M"}
          icon={Package}
        />
        <DashboardCard
          lable={"Active Rentals"}
          lable1={"28"}
          icon={Tag}
          iconbg="var(--color-light-pie-1)"
        />
        <DashboardCard
          lable={"Attendance Rate"}
          lable1={"93%"}
          icon={BanknoteArrowUp}
          iconbg="var(--color-dbcard)"
        />
      </div>

      <Chart height="h-20" padding="p-2 pl-6">
        <div className="gap-2 flex pr-5 items-center">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
          />
          <NativeSelectDemo />
        </div>
      </Chart>

      {error ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-destructive mb-4">
            {error instanceof Error ? error.message : "Failed to load items"}
          </p>
          <Button text="Retry" onClick={() => refetch()} />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-position-text">
            {searchQuery
              ? "No items match your search"
              : "No items found. Add your first item!"}
          </p>
        </div>
      ) : (
        <div
          className="pt-5 grid gap-6 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4"
        >
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              code={item.code}
              title={item.title || "Untitled"}
              description={item.description || "No description"}
              price={`LKR ${(item.price || 0).toLocaleString()}`}
              stock={(item.stock || 0).toString()}
              image={item.image || "no photo available"}
              status={item.status}
              categoryId={item.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Items;
