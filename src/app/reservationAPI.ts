import { EventDetailsRaw } from "../interfaces/eventDetails.interface";
import {
  DeleteReservationPayload,
  CreateReservationPayload,
} from "../interfaces/reservation.interface";
import { RoomScheduleRaw } from "../interfaces/room.interface";
import { NESTJS_URL } from "../url.constants";
import {
  normalizeEventDetailsResponse,
  normalizeReservations,
} from "../utils/event.utils";
import { get, post } from "../utils/http.utils";

export function fetchEventDetails() {
  return get<EventDetailsRaw>(`${NESTJS_URL}/getEventDetails`).then(
    async (response: EventDetailsRaw) => {
      return normalizeEventDetailsResponse(response);
    }
  );
}

export function createReservationRequest(
  reservation: CreateReservationPayload
) {
  return post<RoomScheduleRaw>(
    "https://room-booking-repository-v2ovhbpppq-uc.a.run.app/createReservation",
    reservation
  ).then((updatedRoomSchedule: RoomScheduleRaw) => {
    return {
      roomId: updatedRoomSchedule._id,
      roomName: updatedRoomSchedule.name,
      reservations: normalizeReservations(updatedRoomSchedule.reservations),
      savedReservation: {
        roomName: updatedRoomSchedule.name,
        hour: new Date(reservation.reservation.timeSlot).getHours(),
      },
    };
  });
}

export function deleteReservationRequest(
  reservation: DeleteReservationPayload
) {
  return post<RoomScheduleRaw>(
    `${NESTJS_URL}/deleteReservation`,
    reservation
  ).then((updatedRoomSchedule: RoomScheduleRaw) => {
    return {
      id: updatedRoomSchedule._id,
      name: updatedRoomSchedule.name,
      reservations: normalizeReservations(updatedRoomSchedule.reservations),
    };
  });
}
