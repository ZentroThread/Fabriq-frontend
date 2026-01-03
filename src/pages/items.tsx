import { useState, useMemo, useEffect } from "react";
import Button from "@/components/atoms/button/add-button";
import DashboardCard from "@/components/molecules/cards/dashboard-card";
import { ItemCard } from "@/components/molecules/cards/item-card";
import { ItemsSkeleton } from "@/components/molecules/skeletons/items-skeleton";
import Chart from "@/components/templates/Chart";
import { BanknoteArrowUp, Package, Plus, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddItemForm } from "@/components/organisms/forms/additem-form";
import { useFilteredItems } from "@/hooks/useItems";
import { ItemSearchFilter } from "@/components/atoms/item-filter/item-filter";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import { useStockUpdates } from "@/hooks/useStockUpdates";
import { useItemStore } from "@/store/item-store";

function Items() {
  useStockUpdates();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const allItemsFromStore = useItemStore((s) => s.items);
  const { isLoading, error, refetch } = useFilteredItems("");
  const allItems = allItemsFromStore;
  useEffect(() => {
    refetch(); // Get latest from database
  }, [refetch]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!allItems) return [];

    let result = allItems;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.code?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((item) => {
        if (typeof item.category === "object" && item.category !== null) {
          return String(item.category.categoryId) === categoryFilter;
        }
        return false;
      });
    }

    return result;
  }, [allItems, searchQuery, categoryFilter]); // 👈 Add categoryFilter dependency

  //console.log("📦 Filtered Items:", filteredItems);
  console.log("📦 All Items:", allItems);

  const handleItemAdded = () => {
    setIsDialogOpen(false);
    // No need to manually refetch - TanStack Query handles it automatically
  };

  // Calculate stats from all items
  const totalItems = allItems?.length || 0;
  const withus =
    allItems?.filter((item) => item.status !== "Rented").length || 0;
  const rented =
    allItems?.filter((item) => item.status === "Rented").length || 0;
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    // 👈 Add this handler
    setCategoryFilter(category);
    console.log("Category changed to:", category);
  };

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
      <div className="grid lg:grid-cols-3  sm:grid-cols-1  md:grid-cols-2 gap-6 mt-5 mb-5">
        <DashboardCard
          lable={"Total Items"}
          lable1={String(totalItems)}
          icon={Package}
        />
        <DashboardCard
          lable={"Available + In Laundry"}
          lable1={String(withus)}
          icon={Tag}
          iconbg="var(--color-light-pie-1)"
        />
        <DashboardCard
          lable={"Rented Items"}
          lable1={String(rented)}
          icon={BanknoteArrowUp}
          iconbg="var(--color-dbcard)"
        />
      </div>

      <Chart height="h-20" padding="p-2 pl-6">
        <div className="gap-2 flex pr-5 items-center">
          {/* <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
          /> */}
          <ItemSearchFilter
            items={(allItems || []).map((item) => ({
              ...item,
              id: String(item.id),
              image: typeof item.image === "string" ? item.image : undefined,
            }))}
            onSearchChange={handleSearchChange}
          />
          <NativeSelectDemo
            option="All Categories"
            value1="1"
            value2="2"
            value3="3"
            string1="Saree"
            string2="Nilame Costume"
            string3="Jewellary"
            value={categoryFilter}
            onValueChange={handleCategoryChange}
          />
        </div>
      </Chart>

      {error ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-destructive mb-4">
            {error instanceof Error
              ? "No items Found. Add New Items"
              : "Failed to load items"}
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
                    lg:grid-cols-3"
        >
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              code={item.code}
              title={item.title || "Untitled"}
              description={item.description || "No description"}
              price={item.price || 0}
              stock={(item.stock || 0).toString()}
              image={
                typeof item.image === "string"
                  ? item.image
                  : "no photo available"
              }
              status={item.status}
              categoryId={
                typeof item.category === "object" ? item.category : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Items;
