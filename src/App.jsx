import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './Pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

const BASE_URL = 'http://localhost:9000';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      setIsLoading(true);
      async function fetchCities() {
        try {
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
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Homepage></Homepage>}></Route> */}
        <Route index element={<Homepage></Homepage>}></Route>
        <Route path="pricing" element={<Pricing></Pricing>}></Route>
        <Route path="product" element={<Product></Product>}></Route>
        <Route path="app" element={<AppLayout></AppLayout>}>
          <Route
            index
            element={<Navigate replace to="cities"></Navigate>}
          ></Route>
          <Route
            path="cities"
            element={
              <CityList cities={cities} isLoading={isLoading}></CityList>
            }
          ></Route>
          <Route path="cities/:id" element={<City></City>}></Route>
          <Route
            path="cities"
            element={
              <CityList cities={cities} isLoading={isLoading}></CityList>
            }
          ></Route>
          <Route
            path="countries"
            element={
              <CountryList cities={cities} isLoading={isLoading}></CountryList>
            }
          ></Route>
          <Route path="form" element={<Form></Form>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
