import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/HomePage';
import Pricing from './Pages/Pricing';
import Product from './Pages/Product';
import PageError from './Pages/PageError';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="pricing" element={<Pricing></Pricing>}></Route>
        <Route path="product" element={<Product></Product>}></Route>
        <Route path="*" element={<PageError></PageError>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
