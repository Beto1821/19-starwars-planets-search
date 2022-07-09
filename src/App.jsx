import React from 'react';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import FilterByNum from './components/FilterByNum';
import ProviderStarWars from './context/ProviderStarWars';

function App() {
  return (
    <ProviderStarWars>
      <Header />
      <FilterByNum />
      <Table />
    </ProviderStarWars>
  );
}

export default App;
