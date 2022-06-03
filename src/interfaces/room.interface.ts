import { RoomId } from "../types/roomId.type";
import { Reservation, ReservationRaw } from "./reservation.interface";

type RoomName = string;

export interface RoomSchedule {
  [key: RoomName]: Reservation[];
}

export interface RoomScheduleRaw {
  _id: string;
  name: string;
  reservations: ReservationRaw[];
}
