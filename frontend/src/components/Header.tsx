import styled from "styled-components";
import companyLogo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  list-style: none;
  align-items: center;
  padding: 5px 20px;
  justify-content: space-between;
  background-color: #154263;
  height: 4rem;
`;
const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  background-color: #EAC67A;
  border-radius: 5px;
  padding: 15px 25px;
`;

function Header() {
  return (
    <>
      <Nav>
        <NavLinks>
          <Link style={{ color: "#1E1F26" }} to="booktrip">
            Book trip
          </Link>
          <Link style={{ color: "#1E1F26" }} to="travelroutes">
            Routes
          </Link>
          <Link style={{ color: "#1E1F26" }} to="contact">
            Contact
          </Link>
        </NavLinks>
        <div style={{backgroundColor:"#EAC67A", padding:"5px",borderRadius:"5px"}}>
        <Link style={{ color: "white" }} to="/">
          <img src={companyLogo} alt="image of the company logo, Logoipsum" />
        </Link>
        </div>
      </Nav>
    </>
  );
}
export default Header;
