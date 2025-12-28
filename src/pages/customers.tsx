import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBillingStore from "@/store/customer-store";
import { ItemSearchFilter } from "@/components/atoms/item-filter/item-filter";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import CustomerCard from "@/components/molecules/cards/customer-card";
import AddCustomerForm from "@/components/organisms/forms/addcustomer-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Chart from "@/components/templates/Chart";

function Customers() {
  const navigate = useNavigate();
  const { customers, isLoading, error, fetchCustomers } = useBillingStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [range, setRange] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const mappedForSearch = (customers || []).map((c) => ({
    // eslint-disable-next-line react-hooks/purity
    id: c.custCode || String(Math.random()),
    title: c.custName,
    code: c.custMobileNumber,
    description: c.custAddress || "",
    category: {
      tenantId: "",
      categoryId: 0,
      categoryCode: "",
      categoryName: "",
    },
    status: "",
  }));

  const filtered = useMemo(() => {
    if (!customers) return [];
    const q = searchQuery.trim().toLowerCase();
    let res = customers.filter((c) => {
      if (!q) return true;
      return (
        (c.custName || "").toLowerCase().includes(q) ||
        (c.custMobileNumber || "").toLowerCase().includes(q) ||
        (c.custWhatsappNumber || "").toLowerCase().includes(q)
      );
    });

    if (range) {
      // eslint-disable-next-line react-hooks/purity
      const now = Date.now();
      let months = 0;
      if (range === "1") months = 1;
      if (range === "3") months = 3;
      if (range === "6") months = 6;
      if (range === "12") months = 12;
      if (months > 0) {
        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - months);
        res = res.filter((c) => {
          const d = c.custRegistrationDate
            ? new Date(c.custRegistrationDate)
            : null;
          return d ? d >= cutoff : false;
        });
      }
    }

    return res;
  }, [customers, searchQuery, range]);

  return (
    <div className="p-5 flex flex-col">
      <div className="text-style text-[30px] font-semibold">Customers</div>
      <div className="text-position-text ">All registered customers</div>

      {/* <div className="flex gap-2 lg:mr-5 lg:ml-auto sm:ml-0 sm:mr-auto mt-4">
        <CustomButton
          text={"Add Customer"}
          width="w-auto"
          icon={<Plus />}
          onClick={() => setIsDialogOpen(true)}
        />
      </div> */}
      <Chart height="h-20" padding="p-2 pl-6">
        <div className="gap-2 flex pr-5 items-center">
          <ItemSearchFilter
            items={mappedForSearch}
            onSearchChange={(q) => setSearchQuery(q)}
          />
          <NativeSelectDemo
            option="All registrations"
            value1="1"
            value2="3"
            value3="6"
            string1="Last 1 month"
            string2="Last 3 months"
            string3="Last 6 months"
            value={range}
            onValueChange={(v) => setRange(v)}
          />
        </div>
      </Chart>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] bg-card">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-style font-extrabold text-xl">
              Add Customer
            </DialogTitle>
          </DialogHeader>
          <AddCustomerForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <div className="pt-5 flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-end justify-center pb-8">
            <svg
              className="animate-spin h-10 w-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ color: "var(--color-text-color)" }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-position-text">No customers found</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((c) => (
              <CustomerCard key={c.custCode} customer={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
