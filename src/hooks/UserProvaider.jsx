import { createContext, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [guardadoCotizacion, setguardadoCotizacion ] = useState({usuario:{},primerCotizacion:{a:b},colecionCotizacion:[{}]})
  return (
    <UserContext.Provider value={{ guardadoCotizacion, setguardadoCotizacion  }}>
      {children} 
    </UserContext.Provider>
  );
};