"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerInputProps {
  label: string
  value?: Date
  onChange?: (date?: Date) => void
}

export function DatePickerInput({ label, value, onChange }: DatePickerInputProps) {
  const [date, setDate] = React.useState<Date | undefined>(value)

  const handleSelect = (selectedDate?: Date) => {
    setDate(selectedDate)
    onChange?.(selectedDate)
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-[#c18966] hover:border-[#c18966] focus-visible:ring-0",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Select date</span>}
          </Button>

        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            classNames={{
              day: "hover:bg-purple-100 rounded-lg",
              day_selected: "bg-[#c18966]! text-white",
              day_today: "border border-purple-600",
              nav_button: "hover:bg-purple-100",
              caption_label: "text-purple-600 font-bold",
            }}
            className="bg-[#ffffff]! border-none"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default DatePickerInput;