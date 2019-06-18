import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Particles from "react-particles-js";
import particlesOptions from "./config/particles";
import { BrowserRouter, Route, Link } from "react-router-dom";
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

  const [isOpen, setMenu] = useState(true);

  return (
    <ApolloProvider client={client}>
      <Particles className="particlejs" params={particlesOptions} />
      <div className="wrapper">
        <BrowserRouter>
          <div className="logo">
            <img src={menuIcon} alt="Menu" onClick={() => setMenu(!isOpen)} />
            <nav className="menu_nav">
              <ul className="menu_list">
                <Trail
                  items={menuItems}
                  reverse={isOpen}
                  initial={null}
                  keys={item => item.id}
                  from={{ opacity: 0, transform: "translate3d(0,-1rem,0)" }}
                  to={{
                    opacity: isOpen ? 0 : 1,
                    transform: isOpen
                      ? "translate3d(0,-1rem,0)"
                      : "translate3d(0,0px,0)"
                  }}
                >
                  {item => props => (
                    <Link className="menu_item" to={item.to} style={props}>
                      {item.title}
                    </Link>
                  )}
                </Trail>
              </ul>
            </nav>
          </div>
          <Route exact path="/" component={Home} />
          <Route exact path="/people" component={People} />
          <Route exact path="/films" component={Films} />
          <Route exact path="/species" component={Species} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route exact path="/starships" component={Starships} />
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
