import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './modules/HomePage';
import { Catalog } from './modules/CatalogPage';
import { Cart } from './modules/CartPage';
import { Product } from './modules/ProductPage';
import { NotFound } from './modules/NotFoundPage';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer';

export const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phones" element={<Catalog type="phones" />} />
      <Route path="/tablets" element={<Catalog type="tablets" />} />
      <Route path="/accessories" element={<Catalog type="accessories" />} />
      <Route path="/favorites" element={<Catalog type="favorites" />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>

    <Footer />
  </div>
);
