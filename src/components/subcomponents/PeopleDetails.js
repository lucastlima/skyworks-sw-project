import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const PdStyle = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 2rem;
  & span {
    font-weight: bold;
  }
  & p {
    text-transform: capitalize;
  }
`;

function PeopleDetails({ target }) {
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
              eyeColor
            }) => (
              <React.Fragment>
                <div key={id}>
                  <h1>{name}</h1>
                  <p>
                    <span>Homeworld: </span>
                    {homeworld ? [homeworld].map(e => e.name) : ""}
                  </p>
                  <p>
                    <span>Specie: </span>
                    {species ? [species].map(e => e.name) : "N/A"}
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
              </React.Fragment>
            )
          );
        }}
      </Query>
    </PdStyle>
  );
}

export default PeopleDetails;
