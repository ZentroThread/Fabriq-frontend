
interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex items-center gap-2 text-position-text">
    <div className="w-24 text-left font-medium">{label}</div>
    <div className="flex-1 text-left truncate">{value || "-"}</div>
  </div>
);