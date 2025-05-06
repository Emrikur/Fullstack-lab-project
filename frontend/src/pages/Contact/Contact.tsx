import styled from "styled-components"
import CrewDetails from "../../components/CrewDetails"
import { useState } from "react"

interface CrewDetailProps {
  firstName:string,
  id:number,
  lastName:string,
  email:string,
  company:{title:string},
  image:string
}


const Main = styled.main`
 margin: 0;
  `

const CrewMainContainer = styled.div`
 display:flex;
 flex-wrap:wrap;
 flex-direction:row;
 align-items:center;
 justify-content:space-evenly;
 margin:10px auto;
 width:fit-content;
 padding:5%;
 gap:35px;

`

function Contact(){
const [isCrewDb, setCrewDb] = useState([])

function fetchCrew(value){
    setCrewDb(value)
  //console.log(value)
  }


  return (
    <>
    <Main>
      <div style={{paddingTop:"30px"}}>
        <h1>Our team</h1>
        <CrewMainContainer>
          {isCrewDb &&
          isCrewDb.slice(0, 6).map((crewDetail:CrewDetailProps) =>
            <div style={{backgroundColor:"#629085",boxShadow: "1px 1px 15px 1px #cccbcb", padding:"20px", width:"300px"}} key={crewDetail.id}>
              <div style={{backgroundColor:"white", width:"fit-content", margin:"auto"}}>
                <img src={crewDetail.image} alt="" />
              </div>
            <h3>{crewDetail.firstName} {crewDetail.lastName}</h3>

            <h4>{crewDetail.company.title}</h4>
            <p>{crewDetail.email}</p>
          </div>

          )}
        </CrewMainContainer>

      </div>


      <CrewDetails value={fetchCrew}/>


    </Main>
    </>
  )

}

export default Contact
