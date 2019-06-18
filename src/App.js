import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Particles from 'react-particles-js';
import particlesOptions from './config/particles';
import menu from './images/res-emp-logo.svg';
import './App.css';
import { Trail } from 'react-spring/renderprops';
//import People from './components/People';
import Home from './components/Home';

function App() {
  const client = new ApolloClient({
    uri: 'https://skyworks-sw-project.herokuapp.com/'
  });

  const [isOpen, setMenu] = useState(false);

  const menuItems = [
    {
      id: 0,
      title: 'People'
    },
    {
      id: 1,
      title: 'Films'
    },
    {
      id: 2,
      title: 'Species'
    },
    {
      id: 3,
      title: 'Vehicles'
    },
    {
      id: 4,
      title: 'Starships'
    }
  ];

  return (
    <ApolloProvider client={client}>
      <Particles className="particlejs" params={particlesOptions} />
      <div className="wrapper">
        <div className="logo">
          <img src={menu} alt="Menu" onClick={() => setMenu(!isOpen)} />
          <nav className="menu_nav">
            <ul className="menu_list">
              <Trail
                items={menuItems}
                reverse={isOpen}
                initial={null}
                keys={item => item.id}
                from={{ opacity: 0, transform: 'translate3d(0,0px,0)' }}
                to={{
                  opacity: isOpen ? 0 : 1,
                  transform: isOpen
                    ? 'translate3d(0,-4rem,0)'
                    : 'translate3d(0,0px,0)'
                }}
              >
                {item => props => <li style={props}>{item.title}</li>}
              </Trail>
            </ul>
          </nav>
        </div>
        <Home />
        {/* <People /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
