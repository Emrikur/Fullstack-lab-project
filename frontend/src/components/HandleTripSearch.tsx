import styled from "styled-components";
import Bus4Me from "../assets/jonathan-borba-T5jzpRTVF1U-unsplash.jpg";
import Zero from "../assets/zero.png";
import Passenger from "../assets/passenger.png";
import { useState, useEffect } from "react";
import plusButton from "../assets/plus.png";
import minusButton from "../assets/minus.png";
import ArrowRight from "../assets/arrow-right.png";
import { format } from "date-fns";
import Loading from "../assets/way.gif";

const currentTime = format(new Date(), "hh:mm aa");
const evenNumbers: Array<{ time: string }> = [];
const oddNumbers: Array<{ time: string }> = [];

const TripBooking = styled.div`
  display: flex;
  background-image: url(${Bus4Me});
  background-size: cover;
  background-position: center;
  flex-direction: column;
  justify-content: center;
  height: 60%;
  padding-bottom: 40px;
  padding-top: 40px;
`;
const LocationInput = styled.div`
  background-color: white;
  padding: 6px;
  border: 0.3px #e9e9e9 solid;
  border-radius: 2.5px;
  width: 50%;
  margin: 2px auto;
`;
const Formlabel = styled.label`
  display: flex;
  flex-direction: column;
`;
const FormParagraph = styled.p`
  margin: 0;
  align-self: flex-start;
`;
const TripResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 70%;
  min-height: 70vh;
  height: auto;
  border: 0.3px #e9e9e9 solid;
  box-shadow: 1px 1px 15px 1px #e9e9e9;
  margin: 25px auto;
  background-color: white;
`;
const FormButton = styled.button`
  width: 20%;
  height: 50px;
  border-radius: 10px;
  background-color: #629085;
  font-weight: bold;
  font-size: 20px;
  color: white;
`;

function HandleTripSearch() {
  useEffect(() => {
    fetch("http://localhost:8080/routes")
      .then((response) => response.json())
      .then((result) => {
        setTrip(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/timetable")
      .then((response) => response.json())
      .then((result) => {
        setTimetable(Object.values(result));
      });
  }, []);

  const [trip, setTrip] = useState(
    Array<{
      route_from_name: string;
      route_to_name: string;
      id: number;
      price: number;
      route_from_id: number;
    }> || []
  );
  const [passengers, setPassengers] = useState(0);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [searched, setSearched] = useState(false);
  const [cost, setCost] = useState(0);
  const [totalcost, setTotalCost] = useState(0);
  const [timetable, setTimetable] = useState(
    Array<{ time: string; id: number }> || []
  );
  const cityFrom = trip.find((city) => city.route_from_name === departure);
  const cityTo = trip.find((city) => city.route_to_name === destination);
  function fromCity(props: { target: { value: string } }) {
    setDeparture(props.target.value);
  }

  function toCity(props: { target: { value: string } }) {
    setDestination(props.target.value);
  }

  function addPassenger() {
    if (cityFrom && cityTo) {
      if (passengers <= 9) {
        setPassengers(passengers + 1);
        setSearched(false);
        console.log("Nr of passengers", passengers + 1);
      } else {
        alert("May only book 10 tickets");
      }
    }
  }
  function removePassenger() {
    if (cityFrom && cityTo) {
      if (passengers >= 1) {
        setPassengers(passengers - 1);
        setSearched(false);
        console.log("Nr of passengers", passengers - 1);
      }
    }
  }
  useEffect(() => {
    setTotalCost(passengers * cost);
    console.log("Total cost körs", passengers * cost);
  }, [passengers, cost]);

  function goSearch(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (destination.length >= 1 && departure.length >= 1) {
      if (cityFrom && cityTo) {
        if (searched === false) {
          setSearched(true);
        } else if (searched === true) {
          setSearched(false);
        }
      } else {
        setSearched(false);
        alert("No such station/stop");
      }
    } else {
      alert("You need to fill in both departure and arrival-stop");
    }
  }

  function handleSearch(city: { name: string; price: number }) {
    setDestination(city.name);

    if (timetable) {
      for (let i = 0; i < timetable.length; i++) {
        if (i % 2 === 0) {
          evenNumbers.push(timetable[i]);
        } else {
          oddNumbers.push(timetable[i]);
        }
      }
    }

    setCost(city.price);
  }

  return (
    <>
      <TripBooking>
        {/* //TODO:rootElement */}
        <h1 style={{ color: "white" }}>Book trip</h1>
        <form onSubmit={goSearch}>
          <LocationInput>
            {/* //TODO: Going-From-City-Input */}
            <Formlabel>
              <FormParagraph>From:</FormParagraph>
              <input
                id="departure_id"
                onChange={fromCity}
                style={{ padding: "5px 15px 5px 0px", border: "none" }}
                type="text"
                value={departure}
              />
            </Formlabel>
            <div style={{ display: "flex", gap: "15px" }}>
              {trip
                .filter(
                  (searchCity) =>
                    searchCity.route_from_name &&
                    searchCity.route_from_name !== departure &&
                    searchCity.route_from_id &&
                    searchCity.route_from_name.includes(departure)
                )
                .map(
                  (city: { route_from_name: string; id: number }) =>
                    departure.length > 0 && (
                      <p
                        key={city.id}
                        onClick={() => setDeparture(city.route_from_name)}
                        style={{ textDecoration: "underline" }}
                      >
                        {city.route_from_name}
                      </p>
                    )
                )}
            </div>
          </LocationInput>

          <LocationInput>
            {/* Going To City-Input */}
            <Formlabel>
              <FormParagraph>To:</FormParagraph>
              <input
                id="destination_id"
                onChange={toCity}
                style={{ padding: "5px 15px 5px 0px", border: "none" }}
                type="text"
                value={destination.toLocaleLowerCase()}
              />
            </Formlabel>
            <div style={{ display: "flex", gap: "15px" }}>
              {trip
                .filter(
                  (searchCity: { route_to_name: string }) =>
                    searchCity.route_to_name &&
                    searchCity.route_to_name !== destination &&
                    searchCity.route_to_name.includes(destination)
                )
                .map(
                  (city: {
                    route_to_name: string;
                    id: number;
                    price: number;
                  }) =>
                    destination.length > 0 && (
                      <p
                        key={city.id}
                        onClick={() =>
                          handleSearch({
                            name: city.route_to_name,
                            price: city.price,
                          })
                        }
                        style={{ textDecoration: "underline" }}
                      >
                        {city.route_to_name}
                      </p>
                    )
                )}
            </div>
          </LocationInput>

          <div
            style={{
              display: "flex",
              width: "51%",
              justifyContent: "center",
              margin: "2px auto",
              gap: "5px",
            }}
          >
            <LocationInput>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                <div>Total cost</div>
                {passengers === 0 ? (
                  <img src={Zero} alt="Icon of Zero" />
                ) : (
                  <p>{totalcost}</p>
                )}
              </div>
            </LocationInput>
            <LocationInput>
              <FormParagraph>How many:</FormParagraph>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <img
                  onClick={removePassenger}
                  style={{ height: "24px", width: "24px" }}
                  src={minusButton}
                  alt=""
                />
                <p>{passengers}</p>
                <img
                  onClick={addPassenger}
                  style={{ cursor: "point", height: "24px", width: "24px" }}
                  src={plusButton}
                  alt=""
                />
                <img src={Passenger} alt="Icon of passenger" />
              </div>
            </LocationInput>
          </div>
          <FormButton>Search</FormButton>
        </form>
      </TripBooking>

      <TripResults>
        <h2>{currentTime}</h2>
        {cityFrom &&
        cityTo &&
        passengers !== 0 &&
        searched !== false &&
        trip &&
        timetable ? (
          timetable
            .slice(9, 22)
            .map((TTInfo: { time: string; id: number }, index) => (
              <div
                key={TTInfo.id}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  backgroundColor: "beige",
                  border: "#629085, solid 1px",
                  width: "60%",
                  margin: "15px auto",
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    margin: "auto",
                  }}
                >
                  <h4>{departure} </h4>

                  <p>{evenNumbers[index].time}</p>

                  <img
                    src={ArrowRight}
                    alt="Icon of  an arrow, pointing right"
                  />
                  <h4>To: {destination}</h4>

                  <p>{oddNumbers[index].time}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "75%",
                    gap: "auto",
                  }}
                >
                  <p>
                    for {passengers} passengers ({totalcost}kr)
                  </p>
                  <button
                    style={{
                      cursor: "pointer",
                      width: "auto",
                      height: "auto",
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "#629085",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      fontSize: "16px",
                      color: "white",
                    }}
                  >
                    See details
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div>
            <h2>What is your next adventure?</h2>
            <img
              style={{ marginTop: "40px", width: "74px", height: "auto" }}
              src={Loading}
              alt="GIF of destinations"
            />
          </div>
        )}
      </TripResults>
    </>
  );
}

export default HandleTripSearch;
