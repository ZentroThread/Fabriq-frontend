import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { cn } from "@/utils/style";

interface SuccessAlertProps {
  title: string;
  description: string;
  className?: string;
}

function SuccessAlert({ title, description, className }: SuccessAlertProps) {
  return (
    <Alert className={cn("border-1 border-green bg-bg-add", className)}>
      <CheckCircle2Icon className="border-green" />
      <AlertTitle className="text-bg-green">{title}</AlertTitle>
      <AlertDescription className="text-light-gray-medium">
        {description}
      </AlertDescription>
    </Alert>
  );
}

export default SuccessAlert;
