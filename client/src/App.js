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
import { useSelector } from 'react-redux';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';

function App() {
  let user = null;
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={Shop} path='/shop' />
        <Route component={Cart} path='/cart' />
        <Route component={Contact} path='/contact' />
        <Route component={Product} path='/product/:id' />
        <Route component={Success} path='/success' />
        <Route component={Login} path='/login'>
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route component={Register} path='/register' >
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route component={ResetPassword} path='/passwordreset/:resetToken' >
          {user ? <Redirect to="/" /> : <ResetPassword />}
        </Route>
        <Route component={ForgotPassword} path='/forgotpassword' >
          {user ? <Redirect to="/" /> : <ForgotPassword />}
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
