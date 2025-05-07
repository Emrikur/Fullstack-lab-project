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
  background-color: #629085;
  height: 4rem;
`;
const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  background-color: #165f82;
  border-radius: 5px;
  padding: 15px 25px;
`;

function Header() {
  return (
    <>
      <Nav>
        <NavLinks>
          <Link style={{ color: "white" }} to="booktrip">
            Book trip
          </Link>
          <Link style={{ color: "white" }} to="travelroutes">
            Routes
          </Link>
          <Link style={{ color: "white" }} to="contact">
            Contact
          </Link>
        </NavLinks>
        <Link style={{ color: "white" }} to="/">
          <img src={companyLogo} />
        </Link>
      </Nav>
    </>
  );
}
export default Header;
