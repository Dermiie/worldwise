import { useState, useEffect, createContext, useContext } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:9000';

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(
    function () {
      async function fetchCities() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch (error) {
          throw new error('Error loading data');
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    },

    []
  );

  async function fetchCurrentCity(id) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      throw new error('Error loading data');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, fetchCurrentCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('Cities context was used outside its provider');
  return context;
}

export { CitiesProvider, useCities };
