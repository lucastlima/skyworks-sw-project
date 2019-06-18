import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import PeopleDetails from "./subcomponents/PeopleDetails";
import styled from "styled-components";

const PStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-flow: row;
  flex: 1;
  height: 100%;
  justify-content: left;
  padding: 10rem;

  & > * {
    margin-left: 2rem;
    /* background-color: rgba(0, 0, 0, 0.5); */
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.9);
    border-radius: 0.5rem;
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
    height: 50rem;
    overflow: auto;
    padding: 1rem 2rem;
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
  & .details {
    height: fit-content;
    width: 30rem;
    padding: 1rem 2rem;
  }
`;

const pplQuery = `
  query {
    allPeople {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const People = () => {
  const [pplData, setPplData] = useState([]);
  const [inputValue, setInput] = useState("");
  const [target, setTarget] = useState("cGVvcGxlOjE=");

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSelection = el => {
    setTarget(el.target.id);
  };

  useEffect(() => {
    request("https://skyworks-sw-project.herokuapp.com/", pplQuery)
      .then(data => setPplData(data.allPeople.edges))
      .catch(err => console.error(err));
  }, []);

  let filterData = pplData.filter(
    el => el.node.name.indexOf(inputValue) !== -1
  );

  return (
    <PStyle>
      <div className="pplList">
        <ul>
          <div className="searchbox">
            <input value={inputValue} type="text" onChange={handleChange} />
          </div>
          {filterData.map(({ node }) => (
            <li key={node.id} id={node.id} onClick={handleSelection}>
              {node.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="details">
        <PeopleDetails target={target} />
      </div>
    </PStyle>
  );
};
export default People;
