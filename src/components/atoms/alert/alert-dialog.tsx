import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface AlertDialogProps {
  title: string;
  description: string;
  cancel: string;
  yes: string;
  children?: ReactNode;
  onConfirm?: () => void;
}

export function AlertDialogDemo({
  title,
  description,
  cancel,
  yes,
  children,
  onConfirm,
}: AlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children || <Button variant="outline">Show Dialog</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-card ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-style font-extrabold text-xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-position-text font-light">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{yes}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
