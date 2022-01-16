import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer';
import Shop from './components/Shop';
import { Provider } from 'react-redux';
import store from './store';
import Cart from './components/Cart';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route component={Home} path='/' exact />
          <Route component={Shop} path='/shop' />
          <Route component={Cart} path='/cart' />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
