import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const VhDetailsStyle = styled.div`
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

function VehiclesDetail({ target }) {
  useEffect(() => {}, [target]);

  const [vehicleData, setVehicleData] = useState([]);

  const GET_VEHICLE = gql`
    {
      vehicle(id: "${target}") {
        id
        name
        model
        vehicleClass
        manufacturers
        costInCredits
        costInCredits
        length
        crew
        passengers
        maxAtmospheringSpeed
        cargoCapacity
        consumables
      }
    }
  `;

  return (
    <VhDetailsStyle>
      <Query query={GET_VEHICLE} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          setVehicleData(data.vehicle);

          return [vehicleData].map(
            ({
              id,
              name,
              model,
              vehicleClass,
              manufacturers,
              costInCredits,
              length,
              crew,
              passengers,
              maxAtmospheringSpeed,
              cargoCapacity,
              consumables
            }) => (
              <React.Fragment>
                <div className="detailsBlock" key={id}>
                  <h1>{name}</h1>
                  <p>
                    <span>Model: </span>
                    {model}
                  </p>
                  <p>
                    <span>Vehicle Class: </span> {vehicleClass}
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
    </VhDetailsStyle>
  );
}

export default VehiclesDetail;
