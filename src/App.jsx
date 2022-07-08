import React from 'react';
import './App.css';
import Table from './components/Table';
import ProviderStarWars from './context/ProviderStarWars';

function App() {
  return (
    <ProviderStarWars>
      <Table />
      <span>Hello, App!</span>
    </ProviderStarWars>
  );
}

export default App;
