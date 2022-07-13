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
  const [options, setOptions] = useState(columnlist);

  const { setFilterByNumericValues, filterByNumericValues } = useContext(ContextStarWars);
  const comparisonList = ['maior que', 'menor que', 'igual a'];

  const addNumericFilter = (Filter) => {
    setFilterByNumericValues([...filterByNumericValues, Filter]);
    setNewOptions((oldOptions) => oldOptions.filter((item) => item !== column));
    // console.log(newOptions);
    setColumn(newOptions[0]);
  };

  const removeFilter = ({ target: { name } }) => {
    const delOptions = [...options, name];

    setOptions(delOptions);
    setColumn(delOptions[0]);
    setFilterByNumericValues((oldList) => {
      console.log(oldList, name);
      return oldList.filter((e) => e.column !== name);
    });
  };

  const resetFilters = () => {
    setFilterByNumericValues([]);
    setOptions(filterByNumericValues);
    setColumn('population');
  };

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
        FILTERS
      </button>
      <button
        className="btn btn-outline btn-warning"
        data-testid="button-remove-filters"
        type="button"
        onClick={ resetFilters }
      >
        REMOVE FILTERS
      </button>
      <div className="filtros">
        { filterByNumericValues.map((item, index) => (
          <span key={ index } data-testid="filter">
            {`${item.column} ${item.comparison} ${item.value}`}
            <button
              type="button"
              onClick={ removeFilter }
              name={ item.column }
            >
              Remove
            </button>
          </span>
        ))}
      </div>
    </form>
  );
}

export default FilterByNum;
