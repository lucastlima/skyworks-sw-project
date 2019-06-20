import gql from "graphql-tag";

const mainQuery = {
  query: gql`
    {
      allPeople {
        edges {
          node {
            id
            name
            hairColor
            birthYear
            eyeColor
            height
            mass
            gender
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
      }
      allFilms {
        edges {
          node {
            id
            title
            episodeID
            openingCrawl
            director
            releaseDate
          }
        }
      }
      allSpecies {
        edges {
          node {
            id
            name
            classification
            designation
            averageHeight
            language
            averageLifespan
            skinColors
            hairColors
            eyeColors
            homeworld {
              id
              name
            }
          }
        }
      }
      allStarships {
        edges {
          node {
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
      }
      allVehicles {
        edges {
          node {
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
      }
    }
  `
};

export default mainQuery;
