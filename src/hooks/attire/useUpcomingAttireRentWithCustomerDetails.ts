import { useGetAllAttireRents } from "@/hooks/attire/useAttireRents";
import { FetchCustomers } from "@/hooks/customer/useCustomer";
import { getUpcomingRentalEndDate } from "@/utils/date";
import { useGetAllAttire } from "@/hooks/attire/useAttire";

type CustomerWithUpcomingRental = {
  rentalId: string;
  customerName: string;
  contactNumber: string;
  itemName: string;
  rentalDate: string;
  returnDate: string;
};

export const useUpcomingAttireRentWithCustomerDetails = (dateRange?: string) => {
  const { data: attireRents } = useGetAllAttireRents();
  const { data: customers } = FetchCustomers();
  const { data: attires } = useGetAllAttire();

  if (!attireRents || !customers || !attires) return [];

  const startDate = getUpcomingRentalEndDate(dateRange);
  const today = new Date();

  const customerMap = new Map(
    customers.map((customer) => [customer.custCode, customer])
  );

  const attireMap = new Map(
    attires.map((attire) => [attire.id, attire])
  );

  const upcomingRentals: CustomerWithUpcomingRental[] = attireRents

    .filter((rent) => {
      const rentDate = new Date(rent.rentDate || "");
      return rentDate >= today && rentDate >= startDate;
    })

    .sort(
      (a, b) =>
        new Date(a.rentDate || "").getTime() -
        new Date(b.rentDate || "").getTime()
    )

    .map((rent) => {
      const customer = customerMap.get(rent.custCode);
      const attire = attireMap.get(parseInt(rent.attireCode || "", 10));

      return {
        rentalId: String(rent.id),
        customerName: customer?.custName ?? "Unknown Customer",
        contactNumber: customer?.custMobileNumber ?? "N/A",
        itemName: attire?.name ?? "Unknown Item",
        rentalDate: new Date(rent.rentDate || "").toLocaleDateString(),
        returnDate: new Date(rent.returnDate || "").toLocaleDateString(),
      };
    });

  return upcomingRentals;
};
