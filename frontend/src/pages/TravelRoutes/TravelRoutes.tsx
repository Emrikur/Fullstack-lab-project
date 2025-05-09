import styled from "styled-components";
import myBusStop from "../../assets/travelroutes.jpg";
import { useState, useEffect } from "react";

const Main = styled.main`
  background-image: url(${myBusStop});
  margin: 0;
  padding: 20px;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 70vw;
  min-height: 70vh;
  margin: 50px auto;
  background: rgb(255, 255, 255, 0.98);
  padding: 35px;
  border: 0.3px #e9e9e9 solid;
  border-radius: 5px;
  box-shadow: 1px 1px 15px 1px #585858;
`;

function TravelRoutes() {
  const [timeTable, setTimeTable] = useState([]);
  const [stations, setStations] = useState(
    Array<{
      zone_id: number;
      id: number;
      route_to_name: string;
      route_from_name: string;
    }> || []
  );
  const [stops, setStops] = useState(
    Array<{ name: string; zone_id: number; id: number }> || []
  );
  useEffect(() => {
    fetch("http://localhost:8080/travelRoutes")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setStations(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/routes/stops")
      .then((response) => response.json())
      .then((result) => {
        setStops(result);
        console.log(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/timetable")
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setTimeTable(Object.values(result));
      });
  }, []);

  return (
    <>
      <Main>
        <MainContainer>
          {/* Div */}
          {timeTable &&
            stations.map((station) => (
              <div key={station.id}>
                <h2>
                  {station.route_from_name} - {station.route_to_name}{" "}
                </h2>
                <div style={{display: "inline-flex", gap:"10px", justifyContent:"space-evenly",alignItems:"center", width:"fit-content", flexWrap:"wrap"}}>
                {stops
                  .filter((findstops) => findstops.zone_id === station.zone_id)
                  .map((stopsByZone) => (

                      <div key={stopsByZone.id}>
                        <p>{stopsByZone.name} -</p>
                      </div>


                  ))}</div>

                <h6>The line depart every full hour from the end stops</h6>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px",
                    flexWrap: "wrap",
                    width: "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {timeTable.map(
                    (travelStops: { time: string; id: number }) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        key={travelStops.id}
                      >
                        <p>{travelStops.time}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
        </MainContainer>
      </Main>
    </>
  );
}

export default TravelRoutes;
