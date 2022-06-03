export function DaySlider(props: { date: Date }) {
  return <h3>{props.date.toDateString()}</h3>;
}
