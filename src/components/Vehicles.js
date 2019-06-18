import React from "react";
import styled from "styled-components";

const VStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;

  flex-flow: column wrap;
  padding: 10rem;
`;

function Vehicles() {
  return (
    <VStyle>
      <h1>Vehicles</h1>
    </VStyle>
  );
}

export default Vehicles;
