"use client";

import React from "react";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Props = {
  availableFrom: Date | undefined;
  setAvailableFrom: (date: Date | undefined) => void;
  availableTo: Date | undefined;
  setAvailableTo: (date: Date | undefined) => void;
};

const DateSetter = ({
  availableFrom,
  setAvailableFrom,
  availableTo,
  setAvailableTo,
}: Props) => {
  return (
    // className="flex justify-between gap-6 flex-col md:flex-row"
    //className="w-full flex justify-between items-center gap-2"
    <div className="flex justify-between gap-6 flex-col ">
      {/* Available From */}
      <div className="w-full flex md:flex-col md:items-start lg:flex-row lg:items-center justify-between items-center gap-2">
        <span className="text-lg font-semibold ">Available From :</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] pl-3 text-left font-normal",
                !availableFrom && "text-muted-foreground"
              )}
            >
              {availableFrom ? (
                format(availableFrom, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={availableFrom}
              onSelect={setAvailableFrom}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        <input
          type="hidden"
          name="availableFrom"
          value={availableFrom ? availableFrom.toISOString() : ""}
        />
      </div>

      {/* Available To */}
      <div className="w-full flex md:flex-col md:items-start lg:flex-row lg:items-center justify-between items-center gap-2">
        <span className="text-lg font-semibold ">Available To :</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] pl-3 text-left font-normal",
                !availableTo && "text-muted-foreground"
              )}
            >
              {availableTo ? (
                format(availableTo, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={availableTo}
              onSelect={setAvailableTo}
              initialFocus
              disabled={(date) => !availableFrom || date < availableFrom}
            />
          </PopoverContent>
        </Popover>
        <input
          type="hidden"
          name="availableTo"
          value={availableTo ? availableTo.toISOString() : ""}
        />
      </div>
    </div>
  );
};

export default DateSetter;
