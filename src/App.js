import React, { useState, useEffect } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Particles from "react-particles-js";
import particlesOptions from "./config/particles";
import mainQuery from "./config/mainQuery";
import menuIcon from "./images/res-emp-logo.svg";
import menuItems from "./config/menu";
import "./App.css";
import { Trail } from "react-spring/renderprops";
import Home from "./components/Home";
import People from "./components/People";
import Films from "./components/Films";
import Species from "./components/Species";
import Vehicles from "./components/Vehicles";
import Starships from "./components/Starships";

function App() {
  const client = new ApolloClient({
    uri: "https://skyworks-sw-project.herokuapp.com/"
  });
  const [data, setData] = useState([]);
  const [finishedFetching, setFetching] = useState(false);
  const [isOpen, setMenu] = useState(true);
  const [currentComponent, setComponent] = useState("home");

  useEffect(() => {
    client.query(mainQuery).then(({ data, loading }) => {
      setData(data);
      setFetching(loading);
    });
  }, []);

  const handleMenuSelection = el => {
    console.log(el.target.id);
    setComponent(el.target.id);
  };

  const renderSwitch = param => {
    switch (param) {
      case "home":
        return <Home finishedFetching={finishedFetching} />;
      case "people":
        return (
          <People finishedFetching={finishedFetching} data={data.allPeople} />
        );
      case "films":
        return (
          <Films finishedFetching={finishedFetching} data={data.allFilms} />
        );
      case "species":
        return (
          <Species finishedFetching={finishedFetching} data={data.allSpecies} />
        );
      case "vehicles":
        return (
          <Vehicles
            finishedFetching={finishedFetching}
            data={data.allVehicles}
          />
        );
      case "starships":
        return (
          <Starships
            finishedFetching={finishedFetching}
            data={data.allStarships}
          />
        );
      default:
        return <Home finishedFetching={finishedFetching} />;
    }
  };

  console.log(data);

  return (
    <ApolloProvider client={client}>
      <Particles className="particlejs" params={particlesOptions} />
      <div className="wrapper">
        <div className="logo">
          <img src={menuIcon} alt="Menu" onClick={() => setMenu(!isOpen)} />
          <nav className="menu_nav">
            <ul className="menu_list">
              <Trail
                items={menuItems}
                reverse={isOpen}
                initial={null}
                keys={item => item.id}
                from={{
                  opacity: 0,
                  transform: "translate3d(0,-1rem,0)"
                }}
                to={{
                  opacity: isOpen ? 0 : 1,
                  transform: isOpen
                    ? "translate3d(0,-1rem,0)"
                    : "translate3d(0,0px,0)"
                }}
              >
                {item => props => (
                  <li
                    className="menu_item"
                    onClick={handleMenuSelection}
                    id={item.to}
                    style={props}
                  >
                    {item.title}
                  </li>
                )}
              </Trail>
            </ul>
          </nav>
        </div>
        {renderSwitch(currentComponent)}
      </div>
    </ApolloProvider>
  );
}

export default App;
