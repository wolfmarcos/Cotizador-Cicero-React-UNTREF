import { createContext, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userF, setUserF] = useState({usuario:{nombre:"asdasd"},cotiza:{fecha:"asdasd"},colecionCotizacion:[{datoDeCotizacion:"asdasd"},{datoDeCotizacion:"asdasd"}]});
  return (
    <UserContext.Provider value={{ userF, setUserF }}>
      {children}
    </UserContext.Provider>
  );
};