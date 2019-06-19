import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import uuid from 'uuid/v4';

const FilmsDtStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  height: 100%;

  & span {
    font-weight: bold;
  }
  & p {
    text-transform: capitalize;
  }
  & .detailsBlock {
    flex: 0 1 50rem;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.9);
    border-radius: 0.5rem;
    padding: 1rem 2rem 2rem;
    overflow: auto;
  }
  & .detailsBlock h1 {
    margin: 0;
  }
`;

function FilmsDetails({ target }) {
  useEffect(() => {}, [target]);

  const [filmData, setFilmData] = useState([]);

  const GET_FILM = gql`
    {
      film(id: "${target}") {
        id
        title
        episodeID
        openingCrawl
        director
        releaseDate
      }
    }
  `;

  return (
    <FilmsDtStyle>
      <Query query={GET_FILM} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          setFilmData(data.film);
          console.log(data.film);

          return [filmData].map(
            ({ id, title, episodeID, openingCrawl, director, releaseDate }) => (
              <div className="detailsBlock" key={uuid()}>
                <h1>{title}</h1>
                <p>
                  <span>Episode: </span> {episodeID}
                </p>
                <p>
                  <span>Director: </span> {director}
                </p>
                <p>
                  <span>Release Date:</span> {releaseDate}
                </p>
                <p>
                  <span>Opening Crawl: </span>
                  <br />
                  {openingCrawl}
                </p>
              </div>
            )
          );
        }}
      </Query>
    </FilmsDtStyle>
  );
}

export default FilmsDetails;
