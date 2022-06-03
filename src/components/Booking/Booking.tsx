import { useSelector } from "react-redux";
import {
  selectedRoom,
  selectEventDate,
  selectRoomSchedule,
} from "../../app/reservationsSlice";
import { DaySlider } from "../DaySlider/DaySlider";
import { HourGrid } from "../HourGrid/HourGrid";
import { RoomGrid } from "../RoomGrid/RoomGrid";
import "./Booking.css";

export function Booking() {
  const selectedRoomName = useSelector(selectedRoom);
  const rooms = useSelector(selectRoomSchedule);
  const eventDate = useSelector(selectEventDate);

  return (
    <>
      <DaySlider date={eventDate}></DaySlider>

      <div className="grids">
        <RoomGrid rooms={rooms} selectedRoomName={selectedRoomName}></RoomGrid>
        {selectedRoomName && <HourGrid></HourGrid>}
      </div>
    </>
  );
}
