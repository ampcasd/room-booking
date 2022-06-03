import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import {
  DeleteReservationPayload,
  CreateReservationPayload,
  Reservation,
} from "../interfaces/reservation.interface";
import {
  fetchEventDetails,
  deleteReservationRequest,
  createReservationRequest,
} from "./reservationAPI";
import { EventDetails } from "../interfaces/eventDetails.interface";
import { RoomId } from "../types/roomId.type";
import { FetchStatus } from "../types/fetchStatus.type";
import { Nullable } from "../types/nullable.type";
import { toast } from "react-toastify";

export interface ReservationState {
  eventDetails: EventDetails;
  fetchEventDetailsStatus: FetchStatus;
  fetchReservationStatus: FetchStatus;
  selectedRoom: RoomId;
  currentUserReservation: {
    roomName: Nullable<string>;
    hour: Nullable<number>;
  };
}

export const initialState: ReservationState = {
  eventDetails: {} as EventDetails,
  fetchEventDetailsStatus: "idle",
  fetchReservationStatus: "idle",
  selectedRoom: "",
  currentUserReservation: {
    roomName: null,
    hour: null,
  },
};

export const getEventDetails = createAsyncThunk("getEventDetails", async () => {
  return await fetchEventDetails();
});

export const createReservation = createAsyncThunk(
  "createReservation",
  async (payload: CreateReservationPayload) => {
    return await createReservationRequest(payload).catch((err) =>
      console.error(err)
    );
  }
);

export const deleteReservation = createAsyncThunk(
  "deleteReservation",
  async (payload: DeleteReservationPayload) => {
    return await deleteReservationRequest(payload).catch((err) =>
      console.error(err)
    );
  }
);

export const preselectReservation = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    let reservationHour: Nullable<number> = null;

    const [roomName] =
      Object.entries(getState().reservations.eventDetails.roomSchedule).find(
        ([roomName, reservations]) => {
          return reservations.find((reservation: Reservation) => {
            reservationHour = reservation.timeSlot.getHours();
            return reservation.userId === getState().user.user.id;
          });
        }
      ) || [];

    if (roomName) {
      dispatch(selectRoom(roomName));
      dispatch(
        saveCurrentUserReservation({
          roomName,
          hour: reservationHour,
        })
      );
    }
  };
};

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    selectRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    saveCurrentUserReservation: (state, action) => {
      state.currentUserReservation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventDetails.pending, (state) => {
        state.fetchEventDetailsStatus = "loading";
      })
      .addCase(getEventDetails.fulfilled, (state, action) => {
        state.fetchEventDetailsStatus = "idle";
        if (action.payload) {
          state.eventDetails = action.payload;
        }
      })
      .addCase(getEventDetails.rejected, (state) => {
        state.fetchEventDetailsStatus = "failed";
      })
      .addCase(createReservation.pending, (state) => {
        state.fetchReservationStatus = "loading";
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.fetchReservationStatus = "idle";
        if (action.payload) {
          state.eventDetails.roomSchedule[action.payload.roomName] =
            action.payload.reservations;
          state.currentUserReservation = action.payload.savedReservation;
          toast("Reservation created!");
        }
      })
      .addCase(deleteReservation.pending, (state) => {
        state.fetchReservationStatus = "loading";
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.fetchReservationStatus = "idle";
        if (action.payload) {
          state.eventDetails.roomSchedule[action.payload.name] =
            action.payload.reservations;
          state.currentUserReservation.hour = null;
          state.currentUserReservation.roomName = null;
          toast("Reservation removed!");
        }
      })
      .addCase(deleteReservation.rejected, (state) => {
        state.fetchReservationStatus = "failed";
      });
  },
});

export const { selectRoom, saveCurrentUserReservation } =
  reservationsSlice.actions;

export const selectEventDetails = (state: RootState) =>
  state.reservations.eventDetails;
export const selectTimePeriod = (state: RootState) =>
  state.reservations.eventDetails.timePeriod;
export const detailsFetched = (state: RootState) =>
  state.reservations.fetchEventDetailsStatus === "idle";
export const selectRoomSchedule = (state: RootState) =>
  state.reservations.eventDetails.roomSchedule;
export const selectedRoom = (state: RootState) =>
  state.reservations.selectedRoom;
export const selectOrganizer = (state: RootState) =>
  state.reservations.eventDetails.organizer;
export const selectEventDate = (state: RootState) =>
  state.reservations.eventDetails.date;
export const selectedRoomSchedule = (state: RootState) =>
  state.reservations.eventDetails.roomSchedule[state.reservations.selectedRoom];
export const selectCurrentUserReservation = (state: RootState) => {
  return state.reservations.currentUserReservation;
};

export default reservationsSlice.reducer;
