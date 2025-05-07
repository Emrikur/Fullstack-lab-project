import myImage from "./jonathan-borba-T5jzpRTVF1U-unsplash.jpg";
import styled from "styled-components";

const WelcomeMessage = styled.div`
  display: flex;
  font-family: MainPageFont;
  font-weight: normal;
  justify-content: center;
  align-items: center;
  background-image: url(${myImage});
  background-position: center;
  background-size: cover;
  height: 60vh;
  color: white;
  font-size: 30px;
`;
const Main = styled.main`
  margin: 5% auto;
  background-color: white;
  width: 60%;
  padding: 15px;
  color: #0e293e;
  border-radius: 3px;
  box-shadow: 1px 1px 15px 1px #e9e9e9;
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: auto;
  min-height: 60vh;
  margin: 5px auto;
  font-size: 20px;
`;

function Home() {
  return (
    <>
      <WelcomeMessage>
        <h1>Welcome to Logoipsum Adventures</h1>
      </WelcomeMessage>
      <Main>
        <h1>Why travel with Logoipsum Trips?</h1>
        <WelcomeSection>
          <h3>Perfect for Every Traveler</h3>
          <ul style={{ width: "60%" }}>
            <li>
              Daily Commuters: Skip the stress of rush-hour traffic and arrive
              at work refreshed and on time.
            </li>
            <br />
            <li>
              Tourists & Explorers: Discover the hidden gems of the city and
              surrounding areas without the hassle of driving.
            </li>
            <br />
            <li>
              Event-Goers: Heading to a concert, sports game, or festival? Let
              us handle the transportation so you can focus on having fun.
            </li>
          </ul>

          <h3>Join Us on the Road to Better Travel!</h3>
          <p>
            Experience the difference with our top-tier bus travel service.
            Whether you’re commuting, exploring, or simply looking for a
            reliable ride, we are here to make your journey smooth, safe, and
            enjoyable.
            <br />
            Hop aboard today and see where the road takes you!
          </p>
        </WelcomeSection>
      </Main>
    </>
  );
}

export default Home;
