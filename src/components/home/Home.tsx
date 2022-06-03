import { useAppSelector } from "../../app/hooks";
import { detailsFetched, selectOrganizer } from "../../app/reservationsSlice";
import { Brand } from "../../enums/brand.enum";
import { Booking } from "../Booking/Booking";
import "./Home.css";

export function Home() {
  const eventFetched: boolean = useAppSelector(detailsFetched);
  const organizer: Brand = useAppSelector(selectOrganizer);

  if (!eventFetched) {
    return <></>;
  }

  return (
    <>
      <header>
        <h1>Welcome to {organizer} Day!</h1>
        <img className="logo" src={require(`../../assets/${organizer}.svg`)} />
      </header>
      <Booking></Booking>
    </>
  );
}
