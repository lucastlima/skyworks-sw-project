import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SsDetailsStyle = styled.div`
  display: flex;
  flex-flow: row wrap;

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
    max-width: fit-content;
    min-width: fit-content;
    margin-bottom: 1rem;
    margin-left: 1rem;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.9);
    border-radius: 0.5rem;
    padding: 1rem 2rem 2rem;
    overflow-y: auto;
  }
  & .detailsBlock h1 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

function StarshipDetail({ target }) {
  useEffect(() => {}, [target]);

  const [starshipData, setStarshipData] = useState([]);

  const GET_STARSHIP = gql`
    {
      starship(id: "${target}") {
        id
        name
        model
        starshipClass
        manufacturers
        costInCredits
        length
        crew
        passengers
        maxAtmospheringSpeed
        hyperdriveRating
        MGLT
        cargoCapacity
        consumables    
      }
    }
  `;

  return (
    <SsDetailsStyle>
      <Query query={GET_STARSHIP}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          setStarshipData(data.starship);

          return [starshipData].map(
            ({
              id,
              name,
              model,
              starshipClass,
              manufacturers,
              costInCredits,
              length,
              crew,
              passengers,
              maxAtmospheringSpeed,
              hyperdriveRating,
              MGLT,
              cargoCapacity,
              consumables
            }) => (
              <React.Fragment>
                <div className="detailsBlock" key={id}>
                  <h1>{name}</h1>
                  <p>
                    <span>Model: </span> {model}
                  </p>
                  <p>
                    <span>Starship Class: </span> {starshipClass}
                  </p>
                  <p>
                    <span>Manufacturers: </span> {manufacturers}
                  </p>
                  <p>
                    <span>Cost In Credits: </span> {costInCredits}
                  </p>
                  <p>
                    <span>Length: </span> {length}
                  </p>
                  <p>
                    <span>Crew: </span> {crew}
                  </p>
                  <p>
                    <span>Passengers: </span> {passengers}
                  </p>
                  <p>
                    <span>Max Atmosphering Speed: </span> {maxAtmospheringSpeed}
                  </p>
                  <p>
                    <span>Hyperdrive Rating: </span> {hyperdriveRating}
                  </p>
                  <p>
                    <span>MGLT: </span> {MGLT}
                  </p>
                  <p>
                    <span>Cargo Capacity: </span> {cargoCapacity}
                  </p>
                  <p>
                    <span>Consumables: </span> {consumables}
                  </p>
                </div>
              </React.Fragment>
            )
          );
        }}
      </Query>
    </SsDetailsStyle>
  );
}

export default StarshipDetail;
