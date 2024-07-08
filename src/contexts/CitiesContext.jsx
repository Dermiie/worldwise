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
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      throw new error('Error loading data');
    } finally {
      setIsLoading(false);
    }
  }

  async function addNewCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
      console.log(data);
    } catch {
      alert('There was an error loading the data');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, { method: 'DELETE' });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert('There was an error in deleting selected city');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCurrentCity,
        addNewCity,
        deleteCity,
      }}
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
