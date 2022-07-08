import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextStarWars from './ContextStarWars';

function ProviderStarWars({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const PLANETS_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getPlanets = async () => {
      await fetch(PLANETS_URL)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          json.results.forEach((planet) => delete planet.residents);
          setData(json.results);
        });
    };
    getPlanets();
  }, []);

  const context = {
    data,
    setData,
  };

  return (
    <ContextStarWars.Provider value={ context }>
      {children}
    </ContextStarWars.Provider>
  );
}
ProviderStarWars.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ProviderStarWars;
