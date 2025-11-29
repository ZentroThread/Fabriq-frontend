interface RentalBillingLayoutProps {
  customerInfo: React.ReactNode;
  duration: React.ReactNode;
  items: React.ReactNode;
  summary: React.ReactNode;
  rentList: React.ReactNode;
}

export default function RentalBillingLayout({
  customerInfo,
  duration,
  items,
  summary,
  rentList,
}: RentalBillingLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT SIDE (customer + duration + items + rentList) */}
      <div className="flex flex-col gap-6 md:col-span-2">
        {customerInfo}
        {duration}
        {items}
        {rentList}
      </div>

      {/* RIGHT SIDE (summary) */}
      <div className="md:col-span-1">{summary}</div>
    </div>
  );
}
