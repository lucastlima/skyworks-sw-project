import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import FilmsDetails from "./subcomponents/FilmsDetails";
import styled from "styled-components";

const FilmsStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-flow: row;
  flex: 1;
  height: 100%;
  justify-content: left;
  padding: 5rem 5rem 5rem 8rem;

  & > * {
    margin-left: 2rem;
  }

  & .filmList::-webkit-scrollbar {
    display: none;
    border-radius: 0.5rem;
  }

  & .filmList {
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

  & .filmList ul {
    padding: 0;
    display: flex;
    flex-flow: column wrap;
    margin: 0;
  }

  & .filmList li {
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

const filmsQuery = `
  query {
    allFilms {
      edges {
        node {
          id
          title
        }
      }
    }
    
  }
`;

const Films = () => {
  const [filmsData, setFilmsData] = useState([]);
  const [inputValue, setInput] = useState("");
  const [target, setTarget] = useState("ZmlsbXM6MQ==");

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSelection = el => {
    setTarget(el.target.id);
  };

  useEffect(() => {
    request("https://skyworks-sw-project.herokuapp.com/", filmsQuery)
      .then(data => setFilmsData(data.allFilms.edges))
      .catch(err => console.error(err));
  }, []);

  let filterData = filmsData.filter(
    el => el.node.title.indexOf(inputValue) !== -1
  );

  return (
    <FilmsStyle key="filmPanel">
      <div className="filmList">
        <ul>
          <div className="searchbox">
            <input value={inputValue} type="text" onChange={handleChange} />
          </div>
          {filterData.map(({ node }) => (
            <li key={node.id} id={node.id} onClick={handleSelection}>
              {node.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="details" keky="">
        <FilmsDetails target={target} />
      </div>
    </FilmsStyle>
  );
};
export default Films;
