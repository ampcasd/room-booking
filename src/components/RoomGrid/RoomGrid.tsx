import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUserReservation,
  selectRoom,
} from "../../app/reservationsSlice";
import { RoomSchedule } from "../../interfaces/room.interface";
import "./RoomGrid.css";

export function RoomGrid(props: {
  rooms: RoomSchedule;
  selectedRoomName: string;
}) {
  const dispatch = useDispatch();
  const currentUserReservation = useSelector(selectCurrentUserReservation);

  const badge = (roomName: string) => {
    if (currentUserReservation.roomName === roomName) {
      return <span className="badge">reserved</span>;
    }
  };

  return (
    <div>
      <p>
        <strong>Rooms</strong>
      </p>

      <div className="wrapper">
        {Object.keys(props.rooms)
          .sort()
          .map((roomName: string) => {
            return (
              <div
                onClick={() => dispatch(selectRoom(roomName))}
                key={roomName}
                data-selected={
                  props.selectedRoomName === roomName ? true : null
                }
                className="room-block"
              >
                {roomName}
                {badge(roomName)}
              </div>
            );
          })}
      </div>
    </div>
  );
}
