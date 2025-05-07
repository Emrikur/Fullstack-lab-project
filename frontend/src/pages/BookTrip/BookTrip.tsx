import HandleTripSearch from "../../components/HandleTripSearch";

interface BookTrip {
  isBusStops: { stops: string; id: number };
  props: { stops: string };
}

function BookTrip() {
  return (
    <>
      <div>
        <HandleTripSearch />
      </div>
    </>
  );
}

export default BookTrip;
