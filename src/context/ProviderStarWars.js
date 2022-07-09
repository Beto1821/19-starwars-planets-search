import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextStarWars from './ContextStarWars';

function ProviderStarWars({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterByName, setfilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  });

  useEffect(() => {
    const PLANETS_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getPlanets = async () => {
      setIsLoading(true);
      await fetch(PLANETS_URL)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          json.results.forEach((planet) => delete planet.residents);
          setData(json.results);
          setIsLoading(false);
        });
    };
    getPlanets();
  }, []);

  const context = {
    isLoading,
    data,
    filterByName,
    setfilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <ContextStarWars.Provider value={ context }>
      {children}
    </ContextStarWars.Provider>
  );
}
ProviderStarWars.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderStarWars;
