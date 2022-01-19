import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer';
import Shop from './components/Shop';
import { Provider } from 'react-redux';
import store from './store';
import Cart from './components/Cart';
import Product from './components/Product';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route component={Home} path='/' exact />
          <Route component={Shop} path='/shop' />
          <Route component={Cart} path='/cart' />
          <Route component={Contact} path='/contact' />
          <Route component={Product} path='/product/:id' />
          <Route component={Register} path='/register' />
          <Route component={Login} path='/login' />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
