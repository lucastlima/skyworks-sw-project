import React, { useState, useEffect } from "react";
import PersonDetails from "./subcomponents/PersonDetails";
import styled from "styled-components";
import uuid from "uuid/v4";

const PStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-flow: row; /*Fine*/
  flex: 1; /*Fine*/
  padding: 5rem 5rem 5rem 9rem;

  & > * {
    margin-left: 2rem;
  }
  & .pplList::-webkit-scrollbar {
    display: none;
    border-radius: 0.5rem;
  }
  & .pplList {
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
  & .pplList ul {
    padding: 0;
    display: flex;
    flex-flow: column wrap;
    margin: 0;
  }
  & .pplList li {
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
  & .detailsContainer {
    display: flex;
    flex: 1;
    overflow: auto;
  }
`;

const People = ({ data }) => {
  const [peopleData, setPeopleData] = useState([]);
  const [inputValueP, setInputP] = useState("");
  const [targetP, setTargetP] = useState(false);

  const handleChange = event => {
    setInputP(event.target.value);
  };

  const handleSelection = el => {
    setTargetP(el.target.id);
  };

  console.log(targetP);

  useEffect(() => {
    if (data) {
      setPeopleData(data.edges);
    }
  }, []);

  let filterData = peopleData.filter(
    el => el.node.name.indexOf(inputValueP) !== -1
  );

  return (
    <PStyle key="peopleData">
      <div className="pplList" key="peoplePanel">
        <ul>
          <div className="searchbox">
            <input value={inputValueP} type="text" onChange={handleChange} />
          </div>
          {filterData.map(({ node }) => (
            <li key={node.id} id={node.id} onClick={handleSelection}>
              {node.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="detailsContainer">
        <PersonDetails target={targetP} peopleData={filterData} key={uuid()} />
      </div>
    </PStyle>
  );
};
export default People;
