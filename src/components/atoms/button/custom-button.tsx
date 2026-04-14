import type { ReactNode } from "react";

interface AddButtonProps {
  text: string;
  icon?: ReactNode;
  width?: string;
  height?: string;
  bgcolor?: string;
  hoverbg?: string;
  textcolor?: string;
  bordercolor?: string;
  hovertext?: string;
  padding?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function CustomButton({
  text,
  icon,
  width = "w-35",
  height = "h-8",
  bgcolor = "bg-support-button",
  hoverbg = "hover:bg-support-button-hover",
  textcolor = "text-support-button-text ",
  hovertext,
  bordercolor,
  padding = "p-5",
  onClick,
  disabled = false,
}: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${width} ${height} ${bgcolor}
  ${hoverbg} ${textcolor} ${bordercolor} ${padding}  ${hovertext} 
  font-semibold rounded-xl border-1 mt-4 mb-4 flex items-center justify-center gap-2 text-[14px]`}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
}

export default CustomButton;
