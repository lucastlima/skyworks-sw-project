import React from "react";
import styled from "styled-components";

const FStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;

  flex-flow: column wrap;
  padding: 10rem;
`;

const Films = () => {
  return (
    <FStyle>
      <h1>Films</h1>
    </FStyle>
  );
};

export default Films;
