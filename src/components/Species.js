import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import SpeciesDetails from "./subcomponents/SpeciesDetails";
import styled from "styled-components";
import uuid from "uuid/v4";

const SpecieStyle = styled.div`
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

  & .specieList::-webkit-scrollbar {
    display: none;
    border-radius: 0.5rem;
  }

  & .specieList {
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

  & .specieList ul {
    padding: 0;
    display: flex;
    flex-flow: column wrap;
    margin: 0;
  }

  & .specieList li {
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

const speciesQuery = `
  query {
    allSpecies {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const Species = () => {
  const [specieData, setSpecieData] = useState([]);
  const [inputValueSp, setInputSp] = useState("");
  const [targetSp, setTargetSp] = useState("cGVvcGxlOjE=");

  const handleChange = event => {
    setInputSp(event.target.value);
  };

  const handleSelection = el => {
    setTargetSp(el.target.id);
  };

  useEffect(() => {
    request("https://skyworks-sw-project.herokuapp.com/", speciesQuery)
      .then(data => setSpecieData(data.allSpecies.edges))
      .catch(err => console.error(err));
  }, []);

  let filterData = specieData.filter(
    el => el.node.name.indexOf(inputValueSp) !== -1
  );

  return (
    <SpecieStyle key={uuid()}>
      <div className="specieList" key="speciePanel">
        <ul>
          <div className="searchbox">
            <input value={inputValueSp} type="text" onChange={handleChange} />
          </div>
          {filterData.map(({ node }) => (
            <li key={node.id} id={node.id} onClick={handleSelection}>
              {node.name}
            </li>
          ))}
        </ul>
      </div>
      <SpeciesDetails target={targetSp} key={uuid()} />
    </SpecieStyle>
  );
};
export default Species;
