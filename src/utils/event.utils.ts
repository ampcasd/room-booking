import {
  EventDetailsRaw,
  EventDetails,
} from "../interfaces/eventDetails.interface";
import {
  Reservation,
  ReservationRaw,
} from "../interfaces/reservation.interface";
import { RoomSchedule, RoomScheduleRaw } from "../interfaces/room.interface";

export function normalizeEventDetailsResponse(
  rawEventDetails: EventDetailsRaw
): EventDetails | void {
  if (!rawEventDetails) {
    return;
  }

  return {
    ...rawEventDetails,
    roomSchedule: normalizeRoomSchedule(rawEventDetails.roomSchedule) || {},
    date: new Date(rawEventDetails.date),
    timePeriod: {
      from: setTimeOnDate(rawEventDetails.from, new Date(rawEventDetails.date)),
      to: setTimeOnDate(rawEventDetails.to, new Date(rawEventDetails.date)),
    },
  };
}

export function normalizeRoomSchedule(
  roomSchedule: RoomScheduleRaw[]
): RoomSchedule | void {
  if (!roomSchedule?.length) {
    return;
  }

  const normalizedRoomSchedule: RoomSchedule = {};

  roomSchedule.forEach((roomSchedule: RoomScheduleRaw) => {
    normalizedRoomSchedule[roomSchedule.name] = roomSchedule.reservations.map(
      (reservation: ReservationRaw) => {
        return normalizeReservation(reservation);
      }
    );
  });

  return normalizedRoomSchedule;
}

export function normalizeReservations(
  reservations: ReservationRaw[]
): Reservation[] {
  return reservations?.map((reservation: ReservationRaw) => {
    return normalizeReservation(reservation);
  });
}

export function normalizeReservation(reservation: ReservationRaw): Reservation {
  return {
    userId: reservation.userId,
    timeSlot: new Date(reservation.timeSlot),
  };
}

export function setTimeOnDate(time: string, date: Date): Date {
  const [hours, minutes] = time.split(":");

  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date;
}
