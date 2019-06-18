import React from "react";
import hero from "../images/hero2.png";
import styled from "styled-components";
import bg from "../images/main-bg4.svg";

const HomeStyle = styled.div`
  width: 100%;
  height: 100%;
  background: url(${bg}) left center no-repeat;
  background-size: cover;

  & .hero {
    position: absolute;
    left: 65%;
    bottom: -5%;
    transform: translateX(-50%);
    z-index: 0;
    max-width: 80rem;
    width: 120%;
  }
  & .hero > img {
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 1920px) {
    & .hero {
      max-width: 110rem;
    }
  }
`;

function Home() {
  return (
    <HomeStyle>
      <div className="hero">
        <img src={hero} alt="Star Wars" />
      </div>
    </HomeStyle>
  );
}
export default Home;
