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
  padding?: string;
}

function Button({
  text,
  icon,
  width = "w-auto",
  height = "h-8",
  bgcolor = "bg-support-button",
  hoverbg = "hover:bg-support-button-hover",
  textcolor = "text-support-button-text ",
  bordercolor,
  padding = "p-5",
}: AddButtonProps) {
  return (
    <div
  className={`${width} ${height} ${bgcolor}
  ${hoverbg} ${textcolor} ${bordercolor} ${padding}
  font-semibold rounded-xl border-1 mt-4 mb-4 flex items-center justify-center gap-2 text-[14px]`}
>
  {icon && <span>{icon}</span>}
  <span>{text}</span>
</div>

  );
}

export default Button;
