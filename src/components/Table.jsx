import React from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { response, loading, error } = usefetch('https://swapi-trybe.herokuapp.com/api/planets/');
}