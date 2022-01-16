import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer';
import Shop from './components/Shop';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route component={Home} path='/' exact />
          <Route component={Shop} path='/shop' />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
