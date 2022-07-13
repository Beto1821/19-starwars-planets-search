import React, { useContext } from 'react';
import './Header.css';
import ContextStarWars from '../context/ContextStarWars';

function Header() {
  const { filterByName, setfilterByName } = useContext(ContextStarWars);
  return (
    <div className="header">
      <img src="https://i.pinimg.com/564x/a8/3b/d1/a83bd10c4c668a6192ba3dec798bc4c7.jpg" alt="starwarslogo" />
      <div className="input">
        <div>Projeto Star Wars - Tyrbe</div>
        <input
          className="input input-bordered input-error w-full max-w-xs"
          type="text"
          data-testid="name-filter"
          value={ filterByName.name }
          onChange={ (item) => setfilterByName({ name: item.target.value }) }
        />
      </div>
    </div>
  );
}

export default Header;
