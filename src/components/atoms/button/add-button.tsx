import type { ReactNode } from "react";

interface AddButtonProps {
  text: string;
  icon?: ReactNode;
  width?: string;
  height?: string;
}

function Button({
  text,
  icon,
  width = "w-auto",
  height = "h-8",
}: AddButtonProps) {
  return (
    <div
      className={`${width} ${height} bg-support-button 
      hover:bg-support-button-hover text-support-button-text 
      font-semibold rounded-xl p-5 flex items-center gap-2 text-[14px] `}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default Button;
