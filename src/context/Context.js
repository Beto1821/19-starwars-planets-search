import React, { useState } from 'react';
import { createContext } from "react";

const Context = createContext();

const DataProvider = ({ children }) => {

}


return (
  <Context.Provider value={ context }>
    {children}
  </Context.Provider>
)