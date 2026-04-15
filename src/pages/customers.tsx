import { useEffect, useMemo, useState } from "react";
import useBillingStore from "@/store/customer-store";
import { ItemSearchFilter } from "@/components/atoms/item-filter/item-filter";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import AddCustomerForm from "@/components/organisms/forms/addcustomer-form";
import type { BackendCustomerPayload } from "@/types/item.types";
import type { AddCustomerFormValues } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Pencil } from "lucide-react";
import Swal from "sweetalert2";
import { logger } from "@/utils/logger";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Chart from "@/components/templates/Chart";
import { CustomersSkeleton } from "@/components/molecules/skeletons/customers-skeleton";

function Customers() {
  const customers = useBillingStore((s) => s.customers);
  const isLoading = useBillingStore((s) => s.isLoading);
  const fetchCustomers = useBillingStore((s) => s.fetchCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [range, setRange] = useState("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<BackendCustomerPayload | null>(null);

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

  // sort by registration date (newest first), then by custCode (desc)
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ta = a.custRegistrationDate
        ? new Date(a.custRegistrationDate).getTime()
        : 0;
      const tb = b.custRegistrationDate
        ? new Date(b.custRegistrationDate).getTime()
        : 0;
      if (tb !== ta) return tb - ta;
      const ac = a.custCode ?? "";
      const bc = b.custCode ?? "";
      return bc.localeCompare(ac);
    });
  }, [filtered]);

  // paging
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  // Edit dialog submit handler
  const handleEditSubmit = async (data: Partial<AddCustomerFormValues>) => {
    if (!selectedCustomer) return;
    const payload = {
      custName: data.fullName,
      custAddress: data.address,
      custMobileNumber: data.mobileNumber,
      custLandLine: data.landline ?? "",
      custWhatsappNumber: data.whatsapp ?? data.mobileNumber ?? "",
      custEmail: data.email ?? "",
    };
    const updated = await useBillingStore
      .getState()
      .updateCustomer(selectedCustomer.custCode, payload);
    if (updated) {
      // updateCustomer already updates local state; avoid refetch
      // which would re-load backend data and discard local changes
      logger.info("Customer updated", undefined, true);
      setIsEditDialogOpen(false);
      setSelectedCustomer(null);
    } else {
      logger.error("Update failed", undefined, true);
    }
  };

  if (isLoading) {
    return <CustomersSkeleton />;
  }

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
          <NativeSelectDemo
            option="Show"
            value1="10"
            value2="15"
            value3="20"
            string1="10 per page"
            string2="15 per page"
            string3="20 per page"
            value={String(pageSize)}
            onValueChange={(v) => {
              const n = Number(v) || 10;
              setPageSize(n);
              setCurrentPage(1);
            }}
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
        <Chart height="h-auto" padding="p-4">
          {filtered.length === 0 ? (
            <div className="text-position-text">No customers found</div>
          ) : (
            <>
              <Table className="text-position-text font-light">
                <TableHeader>
                  <TableRow className="text-position-text">
                    <TableHead className="w-[120px]">Customer Code</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paged.map((c) => (
                    <TableRow key={c.custCode}>
                      <TableCell className="font-medium">
                        {c.custCode}
                      </TableCell>
                      <TableCell>{c.custName}</TableCell>
                      <TableCell>{c.custAddress}</TableCell>
                      <TableCell>{c.custMobileNumber}</TableCell>
                      <TableCell>{c.custWhatsappNumber}</TableCell>
                      <TableCell>
                        {c.custRegistrationDate
                          ? new Date(
                              c.custRegistrationDate
                            ).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Pencil
                            className="w-4 h-4 cursor-pointer text-position-text"
                            onClick={() => {
                              setSelectedCustomer(c);
                              setIsEditDialogOpen(true);
                            }}
                          />
                          <Trash2
                            className="w-4 h-4 cursor-pointer text-[#fa7f83]"
                            onClick={async () => {
                              const res = await Swal.fire({
                                title: "Delete customer",
                                text: `Delete ${c.custName}? This action cannot be undone.`,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Delete",
                              });
                              if (res.isConfirmed) {
                                try {
                                  await useBillingStore
                                    .getState()
                                    .deleteCustomer(c.custCode);
                                  await fetchCustomers();
                                  logger.info("Deleted", undefined, true);
                                } catch (err) {
                                  logger.error("Failed to delete customer", err, true);
                                }
                              }
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow></TableRow>
                </TableFooter>
              </Table>

              {/* Pagination controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-position-text">
                  Showing {(currentPage - 1) * pageSize + 1} -{" "}
                  {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded-md border"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded-md border ${currentPage === i + 1 ? "bg-position-text text-white" : ""}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 rounded-md border"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </Chart>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] bg-card">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-style font-extrabold text-xl">
              Edit Customer
            </DialogTitle>
          </DialogHeader>
          <AddCustomerForm
            editMode
            customerData={{
              fullName: selectedCustomer?.custName ?? "",
              address: selectedCustomer?.custAddress ?? "",
              mobileNumber: selectedCustomer?.custMobileNumber ?? "",
              landline: selectedCustomer?.custLandLine ?? "",
              whatsapp: selectedCustomer?.custWhatsappNumber ?? "",
              email: selectedCustomer?.custEmail ?? "",
            }}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedCustomer(null);
            }}
            onSubmit={handleEditSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Customers;
