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
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
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
              <Route path="cities" element={<CityList></CityList>}></Route>
              <Route path="cities/:id" element={<City></City>}></Route>
              {/* <Route path="cities" element={<CityList></CityList>}></Route> */}
              <Route
                path="countries"
                element={<CountryList></CountryList>}
              ></Route>
              <Route path="form" element={<Form></Form>}></Route>
            </Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
