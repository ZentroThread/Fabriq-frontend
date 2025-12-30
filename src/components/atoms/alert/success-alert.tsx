import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { CheckCircle2Icon } from "lucide-react";

interface SuccessAlertProps {
  title: string;
  description: string;
}

function SuccessAlert({ title, description }: SuccessAlertProps) {
  return (
    <div>
      <Alert className="border-1 border-green bg-bg-add">
        <CheckCircle2Icon className="border-green" />
        <AlertTitle className="text-bg-green">{title}</AlertTitle>
        <AlertDescription className="text-light-gray-medium">
          {description}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default SuccessAlert;
