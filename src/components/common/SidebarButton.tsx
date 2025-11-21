import {  type LucideIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  to: string;  
  active: boolean;               // NEW
  onClick: () => void;  
}


const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  label,
  to,
  active,
  onClick,
}) => {
  const navigate = useNavigate();

const handleClick = () => {
    onClick();       // set active button in parent
    navigate(to);    // navigate to route
  };
  return (
    <div
     onClick={handleClick}
      className={`
        w-60 h-14 ml-5 mt-3 p-3 pl-6 rounded-2xl flex items-center cursor-pointer transition-all
        ${
          active
            ? "bg-gradient-to-r from-[#FDF9F7] to-[#FCE4EC] shadow-md"
            : "bg-white hover:shadow-sm"
        }
      `}
    >
      <Icon className={`${active ? "text-[#AB7057]" : "text-black"}`} />
      <span
        className={`pl-6 font-medium ${
          active ? "text-[#AB7057]" : "text-black"
        }`}
      >
        {label}
      </span>
    </div>
  )
}

export default SidebarButton