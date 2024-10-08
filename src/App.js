import Overview from './component/pages/overview';
import Region from './component/pages/region';
import Customer from './component/pages/customers';
import Product from './component/pages/product';
import './App.css';
import HeaderTop from './component/headertop';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <HeaderTop/>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Overview />}/>
          
          <Route path="/products" element={<Product />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/region" element={<Region />} />
          
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
