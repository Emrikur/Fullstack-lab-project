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

/* interface TimetableProps {
oddNumbers:Array<string|number>,
evenNumbers:Array<string|number>
} */
function HandleTripSearch() {
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((result) => {
        setTrip(result);
        //console.log(result[0].trips.stations)
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/timetable")
      .then((response) => response.json())
      .then((result) => {
        setTimetable(Object.values(result));

        //if(result.id)
      });
  }, []);

  const [isTrip, setTrip] = useState([]);
  const [isPassengers, setPassengers] = useState(0);
  const [isDeparture, setDeparture] = useState("");
  const [isDestination, setDestination] = useState("");
  const [isSearched, setSearched] = useState(false);
  const [isCost, setCost] = useState(0);
  const [isTotalCost, setTotalCost] = useState(0);
  const [isTimeTable, setTimetable] = useState([]);

  function fromCity(props: { target: { value: string } }) {
    setDeparture(props.target.value);
    console.log(props.target.value);
  }

  function toCity(props: { target: { value: string } }) {
    setDestination(props.target.value);
    console.log(props.target.value);
  }

  function addPassenger() {
    if (isPassengers <= 9) {
      setPassengers(isPassengers + 1);
      setSearched(false);
      console.log("Nr of passengers", isPassengers + 1);
      //setTotalCost((isPassengers + 1) * isCost)
    } else {
      alert("May only book 10 tickets");
    }
  }
  function removePassenger() {
    if (isPassengers >= 1) {
      setPassengers(isPassengers - 1);
      setSearched(false);
      console.log("Nr of passengers", isPassengers - 1);
    }
  }
  useEffect(() => {
    setTotalCost(isPassengers * isCost);
    console.log("Total cost körs", isPassengers * isCost);
  }, [isPassengers, isCost]);

  function goSearch(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (isSearched === false) {
      setSearched(true);
    } else if (isSearched === true) {
      setSearched(false);
    }
    //console.log("Submitted");
  }

  function handleSearch(city: { name: string; price: number }) {
    //console.log(city);
    setDestination(city.name);
    //setCost(0);

    if (isTimeTable) {
      for (let i = 0; i < isTimeTable.length; i++) {
        //console.log(result[i])
        if (i % 2 === 0) {
          evenNumbers.push(isTimeTable[i]);
        } else {
          oddNumbers.push(isTimeTable[i]);
        }
      }

      /* evenNumbers.filter((evenTime => evenTime.time.includes(currentTime.valuea)))
        oddNumbers.filter((oddTime => oddTime.time.includes(currentTime)))
        console.log(currentTime)

        console.log("Check evenNumbersMatch "+ checkEvenNumberTime[0])
        console.log("Check oddNumbersMatch "+ checkOddNumberTime[0]) */

      /*   console.log("Even numbers"+ evenNumbers[0].time)
        console.log("Odd numbers"+ oddNumbers[0].time) */
    }

    setCost(city.price);
  }

  return (
    <>
      <TripBooking>
        {" "}
        {/* //TODO:rootElement */}
        <h1 style={{ color: "white" }}>Book trip</h1>
        <form onSubmit={goSearch}>
          <LocationInput>
            {" "}
            {/* //TODO: Going-From-City-Input */}
            <Formlabel>
              <FormParagraph>From:</FormParagraph>
              <input
                onChange={fromCity}
                style={{ padding: "5px 15px 5px 0px", border: "none" }}
                type="text"
                value={isDeparture}
              />
            </Formlabel>
            <div style={{ display: "flex", gap: "15px" }}>
              {isTrip
                .filter(
                  (searchCity: {
                    route_from_name: string;
                    route_from_id: number;
                  }) =>
                    searchCity.route_from_name &&
                    searchCity.route_from_name !== isDeparture &&
                    searchCity.route_from_id &&
                    searchCity.route_from_name.includes(isDeparture)
                )
                .map(
                  (city: { route_from_name: string; id: number }) =>
                    isDeparture.length > 0 && (
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
                onChange={toCity}
                style={{ padding: "5px 15px 5px 0px", border: "none" }}
                type="text"
                value={isDestination}
              />
            </Formlabel>
            <div style={{ display: "flex", gap: "15px" }}>
              {isTrip
                .filter(
                  (searchCity: { route_to_name: string }) =>
                    searchCity.route_to_name &&
                    searchCity.route_to_name !== isDestination &&
                    searchCity.route_to_name.includes(isDestination)
                )
                .map(
                  (city: {
                    route_to_name: string;
                    id: number;
                    price: number;
                  }) =>
                    isDestination.length > 0 && (
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
                {isPassengers === 0 ? (
                  <img src={Zero} alt="Icon of Zero" />
                ) : (
                  <p>{isTotalCost}</p>
                )}
              </div>
            </LocationInput>
            <LocationInput>
              <Formlabel>
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
                  <p>{isPassengers}</p>
                  <img
                    onClick={addPassenger}
                    style={{ cursor: "point", height: "24px", width: "24px" }}
                    src={plusButton}
                    alt=""
                  />
                  <img src={Passenger} alt="Icon of passenger" />
                </div>
              </Formlabel>
            </LocationInput>
          </div>
          <FormButton>Search</FormButton>
        </form>
      </TripBooking>

      <TripResults>
        <h2>{currentTime}</h2>
        {isDeparture &&
        isDestination &&
        isPassengers !== 0 &&
        isSearched !== false &&
        isTrip &&
        isTimeTable ? (
          isTimeTable
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
                  <h4>{isDeparture} </h4>

                  <p>{evenNumbers[index].time}</p>

                  <img
                    src={ArrowRight}
                    alt="Icon of  an arrow, pointing right"
                  />
                  <h4>To: {isDestination}</h4>

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
                    for {isPassengers} passengers ({isTotalCost}kr)
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
