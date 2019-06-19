import React, { useState, useEffect } from 'react';
import { request } from 'graphql-request';
import StarshipDetails from './subcomponents/StarshipDetails';
import styled from 'styled-components';

const StarshipStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-flow: row;
  flex: 1;
  height: 100%;
  justify-content: left;
  padding: 5rem 5rem 5rem 9rem;

  & > * {
    margin-left: 2rem;
  }

  & .starshipList::-webkit-scrollbar {
    display: none;
    border-radius: 0.5rem;
  }

  & .starshipList {
    display: flex;
    flex-flow: column;
    width: 20rem;
    min-width: 10rem;
    height: 100%;
    overflow: auto;
    padding: 1rem 2rem;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.9);
    border-radius: 0.5rem;
  }

  & .starshipList ul {
    padding: 0;
    display: flex;
    flex-flow: column wrap;
    margin: 0;
  }

  & .starshipList li {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    list-style: none;
    color: black;
    background-color: var(--color4);
    border: 0.1rem solid var(--color5);
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.9);
  }

  & .searchbox input {
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
    border-radius: 0.5rem;
    line-height: 2rem;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    color: white;
  }
  & .details {
    flex: 1;
  }
`;

const starshipsQuery = `
  query {
    allStarships {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const Startship = () => {
  const [starshipData, setStarshipData] = useState([]);
  const [inputValueSs, setInputSs] = useState('');
  const [targetSs, setTargetSs] = useState('c3RhcnNoaXBzOjI=');

  const handleChange = event => {
    setInputSs(event.target.value);
  };

  const handleSelection = el => {
    setTargetSs(el.target.id);
  };

  useEffect(() => {
    request('https://skyworks-sw-project.herokuapp.com/', starshipsQuery)
      .then(data => setStarshipData(data.allStarships.edges))
      .catch(err => console.error(err));
  }, []);

  let filterData = starshipData.filter(
    el => el.node.name.indexOf(inputValueSs) !== -1
  );

  return (
    <StarshipStyle>
      <div className="starshipList" key="starshipPanel">
        <ul>
          <div className="searchbox">
            <input value={inputValueSs} type="text" onChange={handleChange} />
          </div>
          {filterData.map(({ node }) => (
            <li key={node.id} id={node.id} onClick={handleSelection}>
              {node.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="details">
        <StarshipDetails target={targetSs} />
      </div>
    </StarshipStyle>
  );
};
export default Startship;
