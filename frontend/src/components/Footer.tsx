import styled from "styled-components";
import Facebook from "../assets/facebook.png";
import Insta from "../assets/instagram.png";
import { Link } from "react-router-dom";

// Social Media
const imageLink1 = "https://www.facebook.com";
const imageLink2 = "https://www.instagram.com";
// Guides
const imageLink3 =
  "https://goteborg.se/wps/portal/start/uppleva-och-gora/evenemang-och-turistinformation";
const imageLink4 = "https://www.kungalv.se/kultur--fritid/evenemang-kungalv/";
const imageLink5 = "https://ale.se/uppleva-och-gora/evenemang.html";
// Memes
const markoLink = "https://www.youtube.com/watch?v=-J3xjYf8L-8";
const thomasLink = "https://www.youtube.com/watch?v=SJ3j7MvZL1g";

const FooterHeadings = styled.h4`
  color: white;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
  justify-content: space-between;
  background-color: #154263;
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
            <FooterHeadings>Support</FooterHeadings>
            <ul>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <Link style={{ color: "white" }} to="/">
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
                <Link style={{ color: "white" }} to="/">
                  Refund
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <FooterHeadings>Guides</FooterHeadings>
            <ul>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <a
                  style={{ color: "white" }}
                  href={imageLink3}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Göteborg
                </a>
              </li>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <a
                  style={{ color: "white" }}
                  href={imageLink4}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kungälv
                </a>
              </li>
              <li
                style={{
                  textAlign: "left",
                }}
              >
                <a
                  style={{ color: "white" }}
                  href={imageLink5}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ale
                </a>
              </li>
            </ul>
          </div>
          <div>
            <FooterHeadings>Bus-Memes</FooterHeadings>
            <ul>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <a
                  style={{ color: "white" }}
                  href={markoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Markoolio
                </a>
              </li>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "left",
                }}
              >
                <a
                  style={{ color: "white" }}
                  href={thomasLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Thomas
                </a>
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
          <a
            title="Instagram"
            href={imageLink2}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Insta} alt="Icon-link to Instagram" />
          </a>
          <a
            title="Facebook"
            href={imageLink1}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Facebook} alt="Icon link to Facebook" />
          </a>
        </div>
      </Main>
    </>
  );
}

export default Footer;
