import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function DateCalendarValue({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DemoItem label="">
          <DateCalendar
            className="border rounded my-2"
            value={value}
            onChange={(newValue) => {
              console.log(newValue);

              setValue(newValue);
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
