import styled from "styled-components";
import Bus4Me from "../assets/jonathan-borba-T5jzpRTVF1U-unsplash.jpg";
import Zero from "../assets/zero.png";
import Passenger from "../assets/passenger.png";
import { useState, useEffect } from "react";
import plusButton from "../assets/plus.png";
import minusButton from "../assets/minus.png";
import ArrowRight from "../assets/arrow-right.png";
import { format, parse, isAfter } from "date-fns";
import Loading from "../assets/way.gif";

const currentTime = format(new Date(), "hh:mm aa");
const currentCompareTime = format(new Date(), "HH:mm");
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
  border: 0.3px 	#154263 solid;
  box-shadow: 1px 1px 5px 1px #e9e9e9;
  margin: 25px auto;
  background-color: white;
`;
const FormButton = styled.button`
  width: 20%;
  height: 50px;
  border-radius: 10px;
  background-color: #EAC67A;
  font-weight: bold;
  font-size: 20px;
  color: #1E1F26;
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
      name: string;
      id: number;
      price: number;
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
  const cityFrom = trip.find((city) => city.name === departure);
  const cityTo = trip.find((city) => city.name === destination);

  //Matchar currentTime med en tid i timetable
  const filterTimetable = timetable.filter((startTime) => {
    const newTime = parse(startTime.time, "HH:mm", new Date());
    const nowTime = parse(currentCompareTime, "HH:mm", new Date());
    return isAfter(newTime, nowTime);
  });


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

      }
    }
  }
  useEffect(() => {
    setTotalCost(passengers * cost);
    // console.log("Total cost körs", passengers * cost);
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

    // Delar upp avgångstider och ankomsttider
    if (timetable) {
      for (let i = 0; i < filterTimetable.length; i++) {
        if (i % 2 === 0) {
          evenNumbers.push(filterTimetable[i]);
        } else {
          oddNumbers.push(filterTimetable[i]);
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
            <div
              style={{
                display: "flex",
                width: "50%",
                paddingLeft: "7px",
                paddingRight: "5.7px",
                transform: "translateX(-1.5%)",
                backgroundColor: "white",
                flexWrap: "wrap",
                gap: "15px",
                position: "absolute",
                zIndex: "2",
              }}
            >
              {trip
                .filter(
                  (searchCity) =>
                    searchCity.name &&
                    searchCity.name !== departure &&
                    searchCity.name.includes(departure)
                )
                .map(
                  (city: { name: string; id: number }) =>
                    departure.length > 0 && (
                      <p
                        key={city.id}
                        onClick={() => setDeparture(city.name)}
                        style={{ textDecoration: "underline" }}
                      >
                        {city.name}
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
                style={{
                  padding: "5px 15px 5px 0px",
                  border: "none",
                  zIndex: "1",
                }}
                type="text"
                value={destination.toLocaleLowerCase()}
              />
            </Formlabel>
            <div
              style={{
                display: "flex",
                width: "50%",
                paddingLeft: "7px",
                paddingRight: "5.7px",
                transform: "translateX(-1.5%)",
                backgroundColor: "white",
                flexWrap: "wrap",
                gap: "15px",
                position: "absolute",
                zIndex: "2",
              }}
            >
              {trip
                .filter(
                  (searchCity: { name: string }) =>
                    searchCity.name &&
                    searchCity.name !== destination &&
                    searchCity.name.includes(destination)
                )
                .map(
                  (city: { name: string; id: number; price: number }) =>
                    destination.length > 0 && (
                      <p
                        key={city.id}
                        onClick={() =>
                          handleSearch({
                            name: city.name,
                            price: city.price,
                          })
                        }
                        style={{ textDecoration: "underline" }}
                      >
                        {city.name}
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
          filterTimetable
            .slice(0, 7)
            .map((TTInfo: { time: string; id: number }, index) => (
              <div
                key={TTInfo.id}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  backgroundColor: "#d5e0ec",
                  border: "#629085, solid 1px",
                  borderRadius:"5px",
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
                  <h4>From: {departure} </h4>

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
                      backgroundColor: "#EAC67A",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      fontSize: "16px",
                      color: "black",
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
