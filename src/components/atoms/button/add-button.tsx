import type { LucideIcon } from "lucide-react";

interface AddButtonProps {
  text: string;
  icon?: LucideIcon;
}

function AddButton({ text, icon: Icon }: AddButtonProps) {
  return (
    <div
      className="w-auto h-8 bg-support-button 
      hover:bg-support-button-hover text-support-button-text 
      font-semibold rounded-xl p-5 flex items-center gap-2 text-[14px]"
    >
      <span>{Icon && <Icon className="w-5 h-5" />}</span>
      <span>{text}</span>
    </div>
  );
}

export default AddButton;
