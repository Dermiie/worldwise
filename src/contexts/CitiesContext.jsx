import { useEffect, createContext, useContext, useReducer } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:9000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  function reducer(state, action) {
    switch (action.type) {
      case 'loading':
        return {
          ...state,
          isLoading: true,
        };

      case 'cities/loaded':
        return {
          ...state,
          isLoading: false,
          cities: action.payload,
        };

      case 'city/loaded':
        return {
          ...state,
          isLoading: false,
          currentCity: action.payload,
        };
      case 'city/created':
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };
      case 'city/deleted':
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
          currentCity: {},
        };
      case 'rejected':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
    }
  }

  useEffect(
    function () {
      async function fetchCities() {
        dispatch({ type: 'loading' });
        try {
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();

          dispatch({ type: 'cities/loaded', payload: data });
        } catch {
          dispatch({
            type: 'rejected',
            payload: 'There was an error loading the cities',
          });
        }
      }
      fetchCities();
    },

    []
  );

  async function fetchCurrentCity(id) {
    if (currentCity.id === Number(id)) return;

    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city data',
      });
    }
  }

  async function addNewCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({
        type: 'city/created',
        payload: data,
      });
      // setCities((cities) => [...cities, data]);
      console.log(data);
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city data',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, { method: 'DELETE' });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city data',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
