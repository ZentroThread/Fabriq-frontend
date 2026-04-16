import type { ReactNode } from "react";

const Label = ({ children }: { children: ReactNode }) => {
  return <label className="mb-1 text-sm">{children}</label>;
};

export default Label;
