import React, { useContext } from 'react';
import ContextStarWars from '../context/ContextStarWars';
import './Table.css';
import Loading from './Loading';

function Table() {
  const { isLoading, data, filterByName } = useContext(ContextStarWars);

  const filterByText = () => data
    .filter((planet) => planet.name.includes(filterByName.name));

  return isLoading ? <Loading /> : data.length && (
    <div className="table">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0])
              .map((title) => <th key={ title }>{title}</th>) }
          </tr>
        </thead>
        <tbody>
          {filterByText().map((planet) => (
            <tr key={ planet.name }>
              { Object.values(planet)
                .map((value) => <td key={ value }>{value}</td>)}
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
