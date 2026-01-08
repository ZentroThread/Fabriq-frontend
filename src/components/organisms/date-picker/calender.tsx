"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Calendar28Props {
  height?: string;
  onDateChange?: (date: Date | undefined) => void; // callback to notify parent
}

// Format date to "Month Day, Year"
function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Check if a date is valid
function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

export function Calendar28({ height = "h-12", onDateChange }: Calendar28Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  // Handles date selection from calendar or input
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setValue(formatDate(newDate));
    setMonth(newDate);
    if (onDateChange) {
      onDateChange(newDate); // notify parent component
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex gap-2">
        {/* Input field for typing date */}
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className={`bg-background text-position-text font-light pr-10 rounded-xl ${height}`}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(newDate)) {
              handleDateChange(newDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        {/* Calendar popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateChange} // called when a date is clicked
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
