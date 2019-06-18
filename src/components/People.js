import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const PStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
`;

const People = () => {
  return (
    <PStyle>
      <Query
        query={gql`
          {
            allPeople {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data.allPeople.edges.map(({ node }) => (
            <div key={node.id}>
              <p>{node.name}</p>
            </div>
          ));
        }}
      </Query>
    </PStyle>
  );
};
export default People;
