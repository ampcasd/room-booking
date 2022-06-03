import { useMemo } from "react";
import "./HourGridRow.css";

export interface HourGridRowData {
  date: Date;
  hourString: string;
}

export function HourGridRow(props: {
  rowData: HourGridRowData;
  isReserved: boolean;
  isLocked: boolean;
  isCurrentUserReservation: boolean;
  reserve: (rowData: HourGridRowData) => void;
  cancelReservation: () => void;
}): JSX.Element {
  const reservationButton = useMemo(() => {
    if (props.isCurrentUserReservation) {
      return <td onClick={() => props.cancelReservation()}>Reserved</td>;
    }
    if (props.isLocked || props.isReserved) {
      return (
        <td className={"reservation-locked"}>
          {props.isReserved ? "Reserved" : "Reserve"}
        </td>
      );
    }
    return <td onClick={() => props.reserve(props.rowData)}>Reserve</td>;
  }, [
    props.isReserved,
    props.isLocked,
    props.isCurrentUserReservation,
    props.reserve,
    props.cancelReservation,
  ]);

  return (
    <tr data-selected={props.isCurrentUserReservation ? true : null}>
      <td>{props.rowData.hourString}</td>
      {reservationButton}
    </tr>
  );
}
