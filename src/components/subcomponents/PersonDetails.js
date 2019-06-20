import React, { useEffect } from "react";
import styled from "styled-components";

import uuid from "uuid/v4";

const PdStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  overflow: auto;
  & span {
    font-weight: bold;
  }
  & p {
    text-transform: capitalize;
    line-height: 1.8rem;
    margin: 0;
  }
  & .detailsBlock {
    display: flex;
    white-space: nowrap;
    flex-flow: column;
    flex: 0 18rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.9);
    border-radius: 0.5rem;
    padding: 1rem 2rem 2rem;
    overflow: auto;
  }
  & .detailsBlock h2 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

function PersonDetails({ target, peopleData }) {
  useEffect(() => {}, [target]);

  return (
    <PdStyle>
      {peopleData.map(({ node }) => (
        <React.Fragment key={uuid()}>
          <div className="detailsBlock" key={node.id}>
            <h2>{node.name}</h2>
            <p>
              <span>Homeworld: </span>
              {node.homeworld ? [node.homeworld].map(e => e.name) : ""}
            </p>
            <p>
              <span>Specie: </span>
              {node.species ? [node.species].map(e => e.name) : "N/A"}
            </p>
            <p>
              <span>Gender: </span> {node.gender}
            </p>
            <p>
              <span>Birth Year: </span> {node.birthYear}
            </p>
            <p>
              <span>Hair Color: </span> {node.hairColor}
            </p>
            <p>
              <span>Eye Color: </span> {node.eyeColor}
            </p>
            <p>
              <span>Skin Color: </span> {node.skinColor}
            </p>
            <p>
              <span>Mass: </span> {node.mass === null ? "N/A" : node.mass}
            </p>
          </div>
          {target && (
            <div className="detailsBlock" key={uuid()}>
              <h2>Films</h2>
              {node.filmConnection.edges ? (
                node.filmConnection.edges.map(({ node }) => (
                  <p key={uuid()}>{node.title}</p>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
          )}
          {target && (
            <div className="detailsBlock" key={uuid()}>
              <h2>Starships</h2>
              {node.starshipConnection.edges.length > 0 ? (
                node.starshipConnection.edges.map(({ node }) => (
                  <p key={uuid()}>{node.name}</p>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </PdStyle>
  );
}

export default PersonDetails;
