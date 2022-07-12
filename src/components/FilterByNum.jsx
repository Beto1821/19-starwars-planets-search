import React, { useState, useContext } from 'react';
import ContextStarWars from '../context/ContextStarWars';
import './FilterByNum.css';

function FilterByNum() {
  const columnlist = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [newOptions, setNewOptions] = useState(columnlist);

  const { setFilterByNumericValues, filterByNumericValues } = useContext(ContextStarWars);

  const addNumericFilter = (Filter) => {
    setFilterByNumericValues([...filterByNumericValues, Filter]);
    setNewOptions((oldOptions) => oldOptions.filter((item) => item !== column));
    console.log(newOptions);
    setColumn(newOptions[0]);
  };

  const comparisonList = ['maior que', 'menor que', 'igual a'];

  return (
    <form>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ (event) => setColumn(event.target.value) }
      >
        {newOptions.map((item) => (
          <option
            key={ item }
            value={ item }
          >
            {item}

          </option>
        ))}
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ (event) => setComparison(event.target.value) }
      >
        {comparisonList.map((item) => (
          <option
            key={ item }
            value={ item }
          >
            {item}
          </option>))}
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ (event) => setValue(event.target.value) }
      />

      <button
        className="btn btn-outline btn-warning"
        data-testid="button-filter"
        type="button"
        onClick={ () => addNumericFilter({ column, comparison, value }) }
      >
        FILTRAR
      </button>
    </form>
  );
}

export default FilterByNum;
