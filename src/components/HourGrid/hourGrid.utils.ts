import { HourGridRowData } from "../HourGridRow/HourGridRow";

export function generateTimeSlots(from: Date, to: Date): HourGridRowData[] {
  const dateToIncrement = new Date(from);
  const timeSlots = [];

  while (dateToIncrement < to) {
    timeSlots.push({
      date: new Date(dateToIncrement),
      hourString: dateToIncrement.toTimeString().substring(0, 5),
    });
    dateToIncrement.setMinutes(dateToIncrement.getMinutes() + 60);
  }

  return timeSlots;
}
