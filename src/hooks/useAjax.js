import  { useState, useEffect } from 'react';

// const url ='../../public/datos.json'
export const useAjax =  (url) => { 
   const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    
     fetch(url)
      
     .then((response) => {
      return response.json()
    })
    .then((data) => {
    
    setdata((set)=>set=data);
    setIsLoading(false)
      
     

    })
     .catch ( e=>console.log('Pedido fallido',e),
    //  setError(true)
     ) 
    //  setIsLoading(false)
    
  

  
    
  }, [url]);
  return [data, isLoading]
}

      








