import { Brand } from "../enums/brand.enum";
import reservationSliceReducer, {
  createReservation,
  initialState,
  ReservationState,
  selectRoom,
} from "./reservationsSlice";

describe("reservation slice reducer", () => {
  const mockedInitialState: ReservationState = {
    eventDetails: {
      roomSchedule: {},
      organizer: Brand.Coke,
      date: new Date(),
      timePeriod: {
        from: new Date(),
        to: new Date(),
      },
    },
    selectedRoom: "",
    currentUserReservation: {
      hour: 10,
      roomName: "C01",
    },
    fetchReservationStatus: "idle",
    fetchEventDetailsStatus: "idle",
  };

  jest.mock("./reservationAPI", () => ({
    createReservationRequest: jest.fn(() => {
      return {
        roomId: "mockId",
        roomName: "C10",
        reservations: [],
        savedReservation: {
          roomName: "C10",
          hour: new Date().getHours(),
        },
      };
    }),
  }));

  it("should handle initial state", () => {
    expect(reservationSliceReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
  it("should handle room change", () => {
    const actual = reservationSliceReducer(
      mockedInitialState,
      selectRoom("C02")
    );
    expect(actual.selectedRoom).toEqual("C02");
  });
  it("should handle reservation change", () => {
    const actual = reservationSliceReducer(
      mockedInitialState,
      createReservation({
        reservation: { timeSlot: 10, userId: "123" },
        roomName: "C09",
      }) as any
    );
    expect(actual.currentUserReservation).toEqual({
      hour: 10,
      roomName: "C01",
    });
  });
});
