import React, { useContext } from 'react';
import ContextStarWars from '../context/ContextStarWars';

function Table() {
  const { data } = useContext(ContextStarWars);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {data.length && Object.keys(data[0])
              .map((title) => <th key={ title }>{title}</th>) }
          </tr>
        </thead>
        <tbody>
          {data.length && data.map((planet) => (
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
