import { Brand } from "../enums/brand.enum";
import { RoomSchedule, RoomScheduleRaw } from "./room.interface";
import { TimeSlot } from "./timeSlot.interface";

export interface EventDetails {
  organizer: Brand;
  roomSchedule: RoomSchedule;
  date: Date;
  timePeriod: TimeSlot;
}

export interface EventDetailsRaw {
  organizer: Brand;
  roomSchedule: RoomScheduleRaw[];
  date: string;
  from: string;
  to: string;
}
