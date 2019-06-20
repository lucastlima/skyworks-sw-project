import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import uuid from "uuid/v4";

const PdStyle = styled.div`
  display: flex;
  flex-flow: column wrap;

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
  & .detailsBlock h2 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

function PersonDetails({ target }) {
  useEffect(() => {}, [target]);

  const [personData, setPerson] = useState([]);

  const GET_PERSON = gql`
        {
          person(id: "${target}") {
            id
            name
            hairColor
            birthYear
            eyeColor
            height
            mass
            gender
            skinColor
            species {
                id
                name
            }
            homeworld {
                id
                name
            }
            filmConnection {
              edges {
                node {
                  id
                  title
                }
              }
            }
            starshipConnection {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        
        }
      `;

  return (
    <PdStyle>
      <Query query={GET_PERSON}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          setPerson(data.person);
          console.log(data.person);

          return [personData].map(
            ({
              name,
              birthYear,
              id,
              homeworld,
              hairColor,
              species,
              skinColor,
              mass,
              gender,
              eyeColor,
              filmConnection,
              starshipConnection
            }) => (
              <React.Fragment key={uuid()}>
                <div className="detailsBlock" key={uuid()}>
                  <h2>{name}</h2>
                  <p>
                    <span>Homeworld: </span>
                    {homeworld ? [homeworld].map(e => e.name) : ""}
                  </p>
                  <p>
                    <span>Specie: </span>
                    {species ? [species].map(e => e.name) : "N/A"}
                  </p>
                  <p>
                    <span>Gender: </span> {gender}
                  </p>
                  <p>
                    <span>Birth Year: </span> {birthYear}
                  </p>
                  <p>
                    <span>Hair Color: </span> {hairColor}
                  </p>
                  <p>
                    <span>Eye Color: </span> {eyeColor}
                  </p>
                  <p>
                    <span>Skin Color: </span> {skinColor}
                  </p>
                  <p>
                    <span>Mass: </span> {mass === null ? "N/A" : mass}
                  </p>
                </div>
                <div className="detailsBlock" key={uuid()}>
                  <h2>Films</h2>
                  {filmConnection ? (
                    filmConnection.edges.map(({ node }) => (
                      <p key={uuid()}>{node.title}</p>
                    ))
                  ) : (
                    <h2>Test</h2>
                  )}
                </div>
                <div className="detailsBlock" key={uuid()}>
                  <h2>Starships</h2>
                  {starshipConnection ? (
                    starshipConnection.edges.map(({ node }) => (
                      <p key={uuid()}>{node.name}</p>
                    ))
                  ) : (
                    <h2>Test</h2>
                  )}
                </div>
              </React.Fragment>
            )
          );
        }}
      </Query>
    </PdStyle>
  );
}

export default PersonDetails;
