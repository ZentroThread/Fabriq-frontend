import type { ReactNode } from "react";

interface AddButtonProps {
  text: string;
  icon?: ReactNode;
}

function Button({ text, icon }: AddButtonProps) {
  return (
    <div
      className="w-auto h-8 bg-support-button 
      hover:bg-support-button-hover text-support-button-text 
      font-semibold rounded-xl p-5 flex items-center gap-2 text-[14px]"
    >
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default Button;
