interface RentalBillingLayoutProps {
  items: React.ReactNode;
  summary: React.ReactNode;
  rentList: React.ReactNode;
}

export default function RentalBillingLayout({
  summary,
  rentList,
}: RentalBillingLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col gap-6 md:col-span-2">{rentList}</div>

      <div className="md:col-span-1">{summary}</div>
    </div>
  );
}
