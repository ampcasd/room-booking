import { UTCTimestamp } from "../types/date.type";

export interface Reservation {
  userId: string;
  timeSlot: Date;
}

export interface ReservationRaw {
  userId: string;
  timeSlot: UTCTimestamp;
}

export interface CreateReservationPayload {
  roomName: string;
  reservation: {
    userId: string;
    timeSlot: UTCTimestamp;
  };
}

export interface DeleteReservationPayload {
  userId: string;
  roomName: string;
}
