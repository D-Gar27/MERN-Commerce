import './APP.scss';

import { Navigate } from 'react-router';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Products from './pages/products/Products';
import SingleProduct from './pages/singleProduct/SingleProduct';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart';
import ScrollToTop from './ScrollToTop.jsx';
import { useSelector } from 'react-redux';
import AdminHome from './pages/admin/home/AdminHome';
import AdminProducts from './pages/admin/products/AdminProducts';
import AdminUsers from './pages/admin/users/AdminUsers';
import CreateProduct from './pages/admin/createProduct/CreateProduct';
import EditProduct from './pages/admin/createProduct/EditProduct';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import CheckOut from './pages/checkOut/CheckOut';

function App() {
  const user = useSelector((state) => state.user.user);
  const { token, admin } = user;
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route
          exact
          path="/"
          element={
            admin ? (
              <Navigate to="/admin" />
            ) : token && !admin ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/admin"
          element={token && admin ? <AdminHome /> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/admin/products"
          element={
            token && admin ? <AdminProducts /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/admin/products/create"
          element={
            token && admin ? <CreateProduct /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/admin/products/:id"
          element={token && admin ? <EditProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/users"
          element={token && admin ? <AdminUsers /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/products"
          element={token && !admin ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/products/:category"
          element={token && !admin ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/product/:id"
          element={
            token && !admin ? <SingleProduct /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/cart"
          element={token && !admin ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/checkout"
          element={token && !admin ? <CheckOut /> : <Navigate to="/login" />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            token && !admin ? <PageNotFound /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
