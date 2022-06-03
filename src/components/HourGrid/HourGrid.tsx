import { MutableRefObject, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteReservation,
  createReservation,
  selectCurrentUserReservation,
  selectedRoom,
  selectedRoomSchedule,
  selectTimePeriod,
} from "../../app/reservationsSlice";
import { selectUserDetails } from "../../app/userSlice";
import { Reservation } from "../../interfaces/reservation.interface";
import { HourGridRow, HourGridRowData } from "../HourGridRow/HourGridRow";
import "./HourGrid.css";
import { generateTimeSlots } from "./hourGrid.utils";

export function HourGrid() {
  const dispatch = useAppDispatch();

  const userDetails = useAppSelector(selectUserDetails);
  const roomSchedule = useAppSelector(selectedRoomSchedule);
  const timePeriod = useSelector(selectTimePeriod);
  const selectedRoomName = useSelector(selectedRoom);
  const currentUserReservation = useSelector(selectCurrentUserReservation);

  const timeSlots: MutableRefObject<HourGridRowData[]> = useRef(
    generateTimeSlots(timePeriod.from, timePeriod.to)
  );

  const reserve = useCallback(
    (timeSlot: HourGridRowData) => {
      dispatch(
        createReservation({
          reservation: {
            timeSlot: timeSlot.date.getTime(),
            userId: userDetails.id,
          },
          roomName: selectedRoomName,
        })
      );
    },
    [selectedRoomName]
  );

  const cancelReservation = useCallback(() => {
    dispatch(
      deleteReservation({
        userId: userDetails.id,
        roomName: selectedRoomName,
      })
    );
  }, [selectedRoomName]);

  const reservedHours: Set<number> = new Set();

  roomSchedule.forEach((reservation: Reservation) => {
    reservedHours.add(reservation.timeSlot.getHours());
  });

  if (!timeSlots.current.length) {
    return <></>;
  }

  return (
    <table>
      <tbody>
        {timeSlots.current.map((rowData: HourGridRowData) => (
          <HourGridRow
            rowData={rowData}
            isReserved={reservedHours.has(rowData.date.getHours())}
            isCurrentUserReservation={
              reservedHours.has(rowData.date.getHours()) &&
              currentUserReservation.hour === rowData.date.getHours()
            }
            isLocked={currentUserReservation.hour !== null}
            reserve={reserve}
            cancelReservation={cancelReservation}
            key={rowData.hourString}
          ></HourGridRow>
        ))}
      </tbody>
    </table>
  );
}
