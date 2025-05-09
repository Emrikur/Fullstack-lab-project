import styled from "styled-components";
import "../../App.css";
import { useState, useEffect } from "react";
import backgroundPattern from "../../assets/travelroutes.jpg"

interface CrewDetailProps {
  name: string;
  id: number;
  email: string;
  role: string;
  image_path: string;
}

const Main = styled.main`
  margin: 0;
  background-image:url(${backgroundPattern});
`;

const CrewMainContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  align-items: center;
  justify-content: center;
  font-family: MainPageFont;
  margin: 0px auto;
  width: fit-content;
  padding: 5%;
  gap: 35px;
`;

function Contact() {
  const [isCrewDb, setCrewDb] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/contact")
      .then((response) => response.json())
      .then((result) => {
        setCrewDb(result);
      });
  }, []);

  return (
    <>
      <Main>
        <div style={{ paddingTop: "30px" }}>
          <h1>Our team</h1>
          <CrewMainContainer>
            {isCrewDb &&
              isCrewDb.map((crewDetail: CrewDetailProps) => (
                <div
                  style={{
                    backgroundColor: "#156063",
                    borderRadius:"5px",
                    boxShadow: "1px 1px 15px 1px #cccbcb",
                    padding: "20px",
                    width: "15vw",
                    height: "50vh",
                  }}
                  key={crewDetail.id}
                >
                  <div style={{ width: "fit-content", margin: "auto" }}>
                    <img
                      style={{ width: "70%", height: "auto" }}
                      src={`http://localhost:8080/${crewDetail.image_path}`}
                      alt="photo of a team member"
                    />
                  </div>
                  <h3 style={{color:"#E8EDF2"}}>{crewDetail.name}</h3>

                  <h4 style={{color:"#E8EDF2"}}>{crewDetail.role}</h4>
                  <p style={{color:"#E8EDF2"}}>{crewDetail.email}</p>
                </div>
              ))}
          </CrewMainContainer>
        </div>
      </Main>
    </>
  );
}

export default Contact;
