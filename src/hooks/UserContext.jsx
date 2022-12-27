import { createContext, useState,useEffect } from 'react';


export const UserContext = createContext();



export const UserProvider = ({ children }) => {
  
  // useEffect(() => {
    const [userF, setUserF] = useState({usuario:{nombre:"asdasd"},cotiza:{fecha:"asdasd"},colecionCotizacion:[{}]});
    return (
      <UserContext.Provider value={{ userF, setUserF }}>
      {children}
    </UserContext.Provider>
  );
// }, [])
};