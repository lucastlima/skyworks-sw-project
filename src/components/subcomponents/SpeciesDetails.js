import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import uuid from "uuid/v4";

const SpDetailsStyle = styled.div`
  display: flex;
  flex-flow: column wrap;

  & span {
    font-weight: bold;
  }
  & p {
    text-transform: capitalize;
    line-height: 1.2rem;
    margin: 0;
  }
  & .detailsBlock {
    display: flex;
    white-space: nowrap;
    flex-flow: column wrap;
    flex: 0 min-content;
    margin-bottom: 1rem;
    margin-left: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.9);
    border-radius: 0.5rem;
    padding: 1rem 2rem 2rem;
    overflow-y: auto;
  }
  & .detailsBlock h1,
  h3 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

function SpeciesDetail({ target }) {
  useEffect(() => {}, [target]);

  const [specieData, setSpecieData] = useState([]);

  const GET_SPECIE = gql`
    {
      species(id: "${target}") {
        id
        name
        classification
        designation
        averageHeight
        language
        averageLifespan
        skinColors
        hairColors
        eyeColors
        homeworld {
          id
          name
        }
      }
    }
  `;

  return (
    <SpDetailsStyle key={uuid()}>
      <Query query={GET_SPECIE}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          setSpecieData(data.species);

          return [specieData].map(
            ({
              id,
              name,
              classification,
              designation,
              averageHeight,
              language,
              averageLifespan,
              skinColors,
              hairColors,
              eyeColors,
              homeworld
            }) => (
              <React.Fragment key={uuid()}>
                <div className="detailsBlock" key={id}>
                  <h1>{name}</h1>
                  <p>
                    <span>Homeworld: </span>
                    {homeworld ? [homeworld].map(e => e.name) : ""}
                  </p>
                  <p>
                    <span>Classification: </span> {classification}
                  </p>
                  <p>
                    <span>Designation: </span> {designation}
                  </p>
                  <p>
                    <span>Language: </span> {language}
                  </p>
                  <p>
                    <span>Average Lifespan: </span>{" "}
                    {averageLifespan ? `${averageLifespan} years` : "N/A"}
                  </p>
                  <p>
                    <span>Average Height: </span>{" "}
                    {averageHeight ? averageHeight : "N/A"}
                  </p>
                </div>
                <div className="detailsBlock" key={uuid()}>
                  <h3>Skin Colors: </h3>{" "}
                  {skinColors
                    ? skinColors.map(e => <p key={uuid()}>{e}</p>)
                    : ""}
                </div>
                <div className="detailsBlock" key={uuid()}>
                  <h3>Eye Colors: </h3>{" "}
                  {eyeColors ? eyeColors.map(e => <p key={uuid()}>{e}</p>) : ""}
                </div>
                <div className="detailsBlock" key={uuid()}>
                  <h3>Hair Colors: </h3>{" "}
                  {hairColors
                    ? hairColors.map(e => <p key={uuid()}>{e}</p>)
                    : ""}
                </div>
              </React.Fragment>
            )
          );
        }}
      </Query>
    </SpDetailsStyle>
  );
}

export default SpeciesDetail;
