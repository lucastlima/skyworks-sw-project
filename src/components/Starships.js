import React from "react";
import styled from "styled-components";

const StStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;

  flex-flow: column wrap;
  padding: 10rem;
`;

function Starships() {
  return (
    <StStyle>
      <h1>Starships</h1>
    </StStyle>
  );
}

export default Starships;
