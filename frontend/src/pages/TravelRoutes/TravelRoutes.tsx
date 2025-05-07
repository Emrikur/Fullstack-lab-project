import styled from "styled-components";
import myBusStop from "../../assets/bus-stop.jpg";
import { useState, useEffect } from "react";

interface TravelRoutes {
  //TODO: Varför fungerar inte detta?
  timeTable: { stops: Array<string>; timetable: Array<number> };
}

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
  const [stations, setStations] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/routes")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setStations(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/timetable")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTimeTable(Object.values(result));
      });
  }, []);

  return (
    <>
      <Main>
        <MainContainer>
          {/* Div */}
          {timeTable &&
            stations.map(
              (station: {
                route_from_name: string;
                route_to_name: string;
                id: number;
              }) => (
                <div key={station.id}>
                  <h2>
                    {station.route_from_name} - {station.route_to_name}{" "}
                  </h2>

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
              )
            )}
        </MainContainer>
      </Main>
    </>
  );
}

export default TravelRoutes;
