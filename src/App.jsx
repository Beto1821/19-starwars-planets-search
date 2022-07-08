import React from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <DataProvider>
      <Table />
    </DataProvider>
  );
}

export default App;
