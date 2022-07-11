import React, { useContext } from 'react';
import ContextStarWars from '../context/ContextStarWars';
import './Table.css';
import Loading from './Loading';

function Table() {
  const { isLoading, data, filterByName,
    filterByNumericValues } = useContext(ContextStarWars);

  const filterByText = () => data
    .filter((planet) => planet.name.includes(filterByName.name));

  const applyFilter = (filter, array) => {
    const { column, comparison, value } = filter;
    if (comparison === 'maior que') {
      return array.filter((item) => Number(item[column]) > Number(value));
    }
    if (comparison === 'menor que') {
      return array.filter((item) => Number(item[column]) < Number(value));
    }

    return array.filter((item) => Number(item[column]) === Number(value));
  };

  const filterByNumbers = (dataPlanets) => {
    let planetsFiltered = dataPlanets;
    filterByNumericValues.forEach((filter) => {
      planetsFiltered = applyFilter(filter, planetsFiltered);
    });
    // console.log(planetsFiltered);
    return planetsFiltered;
  };

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
          {filterByNumbers(filterByText()).map((planet) => (
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
