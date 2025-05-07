import styled from "styled-components";
import Facebook from "../assets/facebook.png";
import Insta from "../assets/instagram.png";
import { Link } from "react-router-dom";

// Social Media
const imageLink1 = "https://www.facebook.com";
const imageLink2 = "https://www.instagram.com";
// Guides
const imageLink3 = "https://goteborg.se/wps/portal/start/uppleva-och-gora/evenemang-och-turistinformation";
const imageLink4 = "https://www.kungalv.se/kultur--fritid/evenemang-kungalv/";
const imageLink5 = "https://ale.se/uppleva-och-gora/evenemang.html";




const Main = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
  justify-content: space-between;
  background-color: #629085;
  height: fit-content;
`;
function Footer() {
  return (
    <>
      <Main>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "50%",
            alignItems: "center",
          }}
        >
          <div>
            <h4>Support</h4>
            <ul>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <Link style={{ color: "black" }} to="/">
                  Delays
                </Link>
              </li>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <Link style={{ color: "black" }} to="/">
                  Refund
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Guides</h4>
            <ul>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <a style={{color:"black"}} href={imageLink3} target="_blank" rel="noopener noreferrer">Göteborg</a>
              </li>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <a style={{color:"black"}} href={imageLink4} target="_blank" rel="noopener noreferrer">Kungälv</a>
              </li>
              <li
                style={{
                  textAlign: "left",
                }}
              >
                <a style={{color:"black"}} href={imageLink5} target="_blank" rel="noopener noreferrer">Ale</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Bus-Memes</h4>
            <ul>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <Link style={{ color: "black" }} to="/">
                  Markoolio
                </Link>
              </li>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <Link style={{ color: "black" }} to="/">
                  Thomas
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: "10%",
            gap: "30px",
          }}
        >
          <a title="Instagram" href={imageLink2} target="_blank" rel="noopener noreferrer">
            <img src={Insta} alt="Icon-link to Instagram" />
          </a>
          <a title="Facebook" href={imageLink1} target="_blank" rel="noopener noreferrer">
            <img src={Facebook} alt="Icon link to Facebook" />
          </a>
        </div>
      </Main>
    </>
  );
}

export default Footer;
