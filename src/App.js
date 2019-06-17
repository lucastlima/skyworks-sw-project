import React from 'react';
import Particles from 'react-particles-js';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import People from './components/People';

function App() {
  const client = new ApolloClient({
    uri: 'https://skyworks-sw-project.herokuapp.com/'
  });

  const particlesOptions = {
    particles: {
      number: { value: 160, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' },
        polygon: { nb_sides: 5 },
        image: { src: 'img/github.svg', width: 100, height: 100 }
      },
      opacity: {
        value: 1,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 4, size_min: 0.3, sync: false }
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 600 }
      }
    },
    retina_detect: true
  };

  return (
    <ApolloProvider client={client}>
      <Particles params={particlesOptions}>
        <div>
          <h2>Star Wars</h2>
        </div>
        <People />
      </Particles>
    </ApolloProvider>
  );
}

export default App;
