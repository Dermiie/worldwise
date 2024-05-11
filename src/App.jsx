import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './Pages/AppLayout';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="pricing" element={<Pricing></Pricing>}></Route>
        <Route path="product" element={<Product></Product>}></Route>
        <Route path="app" element={<AppLayout></AppLayout>}>
          <Route index="cities"></Route>
          <Route path="cities" element={<p>List of cities</p>}></Route>
          <Route path="country" element={<p>List of countries</p>}></Route>
        </Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
