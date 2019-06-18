import React from "react";
import styled from "styled-components";

const SStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;

  flex-flow: column wrap;
  padding: 10rem;
`;

function Species() {
  return (
    <SStyle>
      <h1>Species </h1>
    </SStyle>
  );
}

export default Species;
