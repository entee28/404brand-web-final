import './App.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer';
import Shop from './components/Shop';

import Cart from './components/Cart';
import Product from './components/Product';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import Success from './components/Success';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/authActions';
import ChangePassword from './components/ChangePassword';
import About from './components/About';
import ScrollToTop from './ScrollToTop';
import AdminHome from './admin/pages/AdminHome';
import UserList from './admin/pages/UserList';
import User from './admin/pages/User';
import NewUser from './admin/pages/NewUser';
import ProductList from './admin/pages/ProductList';
import AdminProduct from './admin/pages/AdminProduct';
import NewProduct from './admin/pages/NewProduct';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [])

  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={Shop} path='/shop' />
        <Route component={About} path='/about' />
        <Route component={Cart} path='/cart' />
        <Route component={Contact} path='/contact' />
        <Route component={Product} path='/product/:id' />
        <Route component={Success} path='/success' />
        <Route component={Login} path='/login'>
          {isAuthenticated ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route component={Register} path='/register' >
          {isAuthenticated ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route component={ResetPassword} path='/passwordreset/:resetToken' />
        {/* {isAuthenticated ? <Redirect to="/" /> : <ResetPassword />}
        </Route> */}
        <Route component={ForgotPassword} path='/forgotpassword' >
          {isAuthenticated ? <Redirect to="/" /> : <ForgotPassword />}
        </Route>
        <Route component={ChangePassword} path='/changepassword' >
          {isAuthenticated ? <ChangePassword /> : <Redirect to='/' />}
        </Route>
        <Route path="/admin/"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={AdminHome} exact />
              <Route path={`${url}/users`} component={UserList} exact />
              <Route path={`${url}/user/:userId`} component={User} exact />
              <Route path={`${url}/newUser`} component={NewUser} exact />
              <Route path={`${url}/products`} component={ProductList} exact />
              <Route path={`${url}/product/:productId`} component={AdminProduct} exact />
              <Route path={`${url}/newProduct`} component={NewProduct} exact />
            </>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
